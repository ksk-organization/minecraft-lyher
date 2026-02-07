<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PaymentController extends Controller
{

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'product_id'     => 'required|integer|exists:products,id',
            'minecraft_name' => 'required|string|min:3|max:16|regex:/^[a-zA-Z0-9_]+$/',
            'platform'       => ['required', Rule::in(['java', 'bedrock', 'pocket'])],
            'qty'            => 'required|integer|min:1|max:100', // Added max to prevent overflow logic
            'promo_code'     => 'nullable|string|max:50',
            'receipt'        => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        // Use a Database Transaction to ensure data integrity and handle concurrency
        return DB::transaction(function () use ($validated, $user, $request) {

            // PERFORMANCE: Use lockForUpdate() to prevent race conditions on stock
            $product = Product::with(['gameMode', 'category'])
                ->lockForUpdate()
                ->findOrFail($validated['product_id']);

            // 1. Availability & Stock Check
            if (!$product->is_active || $product->stock < $validated['qty']) {
                throw ValidationException::withMessages(['product' => 'Insufficient stock or product inactive.']);
            }

            // 2. Coupon Logic
            $coupon = null;
            $discountAmount = 0;
            $subtotal = (float) $product->price * $validated['qty'];

            if (filled($validated['promo_code'])) {
                $coupon = Coupon::where('code', strtoupper($validated['promo_code']))
                    // ->where('is_active', true)
                    ->where(function ($q) {
                        $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
                    })
                    ->first();

                if (!$coupon) {
                    throw ValidationException::withMessages(['promo_code' => 'Invalid or expired code.']);
                }

                if ($coupon->min_spend && $subtotal < $coupon->min_spend) {
                    throw ValidationException::withMessages(['promo_code' => "Minimum spend of $" . number_format($coupon->min_spend, 2) . " required."]);
                }

                // Calculate Discount
                $discountAmount = ($coupon->type === 'percent')
                    ? ($subtotal * ($coupon->value / 100))
                    : $coupon->value;

                $discountAmount = min($discountAmount, $subtotal); // Secure against negative totals

                // PERFORMANCE: Increment used count atomically
                $coupon->increment('used_count');
            }

            $total = $subtotal - $discountAmount;

            // 3. Optimized File Handling
            // Store path early; use a hash-based name for security
            $receiptPath = $request->file('receipt')->store('receipts/' . date('Y/m'), 'public');

            // 4. Create Order
            $order = Order::create([
                'user_id'            => $user->id ?? 1, // Consider if '1' is a safe default system user
                'minecraft_username' => $validated['minecraft_name'],
                'email'              => $user->email ?? 'guest@nomroti.net',
                'qty'                => $validated['qty'],
                'platform'           => $validated['platform'],
                'subtotal'           => $subtotal,
                'coupon_id'          => $coupon?->id,
                'discount_total'     => $discountAmount,
                'total'              => $total,
                'status'             => 'pending',
                'attachment_url'     => $receiptPath,
                'product_id'         => $product->id,
                'transaction_id'     => 'TRX-' . strtoupper(Str::random(12)), // Increased length for security
            ]);

            // PERFORMANCE: Atomic decrement to prevent stock errors
            $product->decrement('stock', $validated['qty']);

            return back()->with('success', 'Order submitted! We are reviewing your receipt.');
        });
    }


    public function show($id) {}

}
