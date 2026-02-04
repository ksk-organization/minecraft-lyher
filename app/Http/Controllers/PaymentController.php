<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function store(Request $request)
    {

    // array:5 [▼ // app\Http\Controllers\PaymentController.php:18
    //   "product_id" => "1"
    //   "minecraft_name" => "duhiwu"
    //   "platform" => "java"
    //   "promo_code" => null
    //   "receipt" => 
    // Illuminate\Http
    // \
    // UploadedFile
    //  {#1581 ▶}
    // ]
        
        $user = Auth::user(); // ← remove or make optional if guest checkout is allowed

        $validated = $request->validate([
            'product_id'     => 'required|exists:products,id',
            'minecraft_name' => 'required|string|min:3|max:16|regex:/^[a-zA-Z0-9_]+$/',
            'platform'       => ['required', Rule::in(['java', 'bedrock', 'pocket'])],
            'promo_code'     => 'nullable|string|max:50',
            'receipt'        => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120', // 5MB
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if (!$product->is_active || $product->stock < 1) {
            return back()
                ->withErrors(['product' => 'This product is currently unavailable or out of stock.'])
                ->withInput();
        }

        // ─── Coupon logic ───────────────────────────────────────────────────────
        $coupon = null;
        $discountAmount = 0;

        if (filled($validated['promo_code'])) {
            $coupon = Coupon::where('code', strtoupper($validated['promo_code']))
                ->where('is_active', true)
                ->where(function ($query) {
                    $query->whereNull('expires_at')
                          ->orWhere('expires_at', '>=', now());
                })
                ->first();

            if (!$coupon) {
                return back()
                    ->withErrors(['promo_code' => 'The promo code is invalid or has expired.'])
                    ->withInput();
            }

            $discountAmount = $product->price * ($coupon->discount_percentage / 100);
        }

        $subtotal = (float) $product->price;
        $total    = max(0, $subtotal - $discountAmount);

        // ─── Store receipt ──────────────────────────────────────────────────────
        $receiptPath = null;
        if ($request->hasFile('receipt') && $request->file('receipt')->isValid()) {
            $receiptPath = $request->file('receipt')
                ->store('receipts/' . now()->format('Y-m'), 'public');
        }

        // ─── Create order ───────────────────────────────────────────────────────
        $order = Order::create([
            'minecraft_username' => $validated['minecraft_name'],
            'email'              => $user?->email ?? null,           // or make required if needed
            'platform'           => $validated['platform'],
            'subtotal'           => $subtotal,
            'coupon_id'          => $coupon?->id,
            'discount_total'     => $discountAmount,
            'total'              => $total,
            'status'             => 'pending',
            'transaction_id'     => null,                             // fill later if you add gateway
            'attachment_url'     => $receiptPath,
            'user_id'         => $user?->id,                       // ← uncomment if you add user_id column
            'product_id'      => $product->id,                     // ← optional if using items relation
        ]);

        // Optional: link product via OrderItem (if using items relation)
        // $order->items()->create([
        //     'product_id' => $product->id,
        //     'price'      => $product->price,
        //     'quantity'   => 1,
        // ]);

        // Optional: reduce stock immediately (careful with race conditions)
        // $product->decrement('stock');

        // Optional: generate friendly transaction ID
        // $order->update(['transaction_id' => 'ORD-' . $order->id . '-' . Str::upper(Str::random(4))]);

        return redirect()
            // ->route('orders.show', $order->id)   // or wherever you want to redirect
            ->back()
            ->with('success', 'Your payment receipt has been submitted successfully. We will review it shortly.');
    }
}