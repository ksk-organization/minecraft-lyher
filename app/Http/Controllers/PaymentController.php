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
    // public function store(Request $request)
    // {
    //     $user = Auth::user(); // ← remove or make optional if guest checkout is allowed

    //     $validated = $request->validate([
    //         'product_id'     => 'required|exists:products,id',
    //         'minecraft_name' => 'required|string|min:3|max:16|regex:/^[a-zA-Z0-9_]+$/',
    //         'platform'       => ['required', Rule::in(['java', 'bedrock', 'pocket'])],
    //         'qty'     => 'required|integer',
    //         'promo_code'     => 'nullable|string|max:50',
    //         'receipt'        => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120', // 5MB
    //     ]);

    //     $product = Product::findOrFail($validated['product_id']);

    //     if (!$product->is_active || $product->stock < 1) {
    //         return back()
    //             ->withErrors(['product' => 'This product is currently unavailable or out of stock.'])
    //             ->withInput();
    //     }

    //     // ─── Coupon logic ───────────────────────────────────────────────────────
    //     $coupon = null;
    //     $discountAmount = 0;

    //     if (filled($validated['promo_code'])) {
    //         $coupon = Coupon::where('code', strtoupper($validated['promo_code']))
    //             // ->where('is_active', true)
    //             // ->where(function ($query) {
    //             //     $query->whereNull('expires_at')
    //             //         ->orWhere('expires_at', '>=', now());
    //             // })
    //             ->first();

    //         if (!$coupon) {
    //             return back()
    //                 ->withErrors(['promo_code' => 'The promo code is invalid or has expired.'])
    //                 ->withInput();
    //         }

    //         $discountAmount = $product->price * ($coupon->discount_percentage / 100);
    //     }

    //     $subtotal = (float) $product->price * $validated['qty'];
    //     $total    = max(0, $subtotal - $discountAmount);

    //     // ─── Store receipt ──────────────────────────────────────────────────────
    //     $receiptPath = null;
    //     if ($request->hasFile('receipt') && $request->file('receipt')->isValid()) {
    //         $receiptPath = $request->file('receipt')
    //             ->store('receipts/' . now()->format('Y-m'), 'public');
    //     }

    //     // ─── Create order ───────────────────────────────────────────────────────
    //     $order = Order::create([
    //         'minecraft_username' => $validated['minecraft_name'],
    //         'email'              => $user?->email ?? ' ',           // or make required if needed
    //         'qty'           => $validated['qty'],
    //         'platform'           => $validated['platform'],
    //         'subtotal'           => $subtotal,
    //         'coupon_id'          => $coupon?->id,
    //         'discount_total'     => $discountAmount,
    //         'total'              => $total,
    //         'status'             => 'pending',
    //         'transaction_id'     => ' ',                             // fill later if you add gateway
    //         'attachment_url'     => $receiptPath,
    //         'user_id'         => $user?->id,                       // ← uncomment if you add user_id column
    //         'product_id'      => $product->id,                     // ← optional if using items relation
    //     ]);

    //     // Optional: link product via OrderItem (if using items relation)
    //     // $order->items()->create([
    //     //     'product_id' => $product->id,
    //     //     'price'      => $product->price,
    //     //     'quantity'   => 1,
    //     // ]);

    //     // Optional: reduce stock immediately (careful with race conditions)
    //     // $product->decrement('stock');

    //     // Optional: generate friendly transaction ID
    //     // $order->update(['transaction_id' => 'ORD-' . $order->id . '-' . Str::upper(Str::random(4))]);


    //     // ... after Order::create(...)

    //     // return redirect()->route('payment.success')
    //     //     ->with('payment', 'success')
    //     //     ->with('order_id', $order->id)           // optional - pass order for display
    //     //     ->with('success', 'Payment receipt submitted! We will review it soon.');

    //     return redirect()
    //         ->back()
    //         ->with('success', 'Your payment receipt has been submitted successfully. We will review it shortly.');
    // }

    public function store(Request $request)
    {
        $user = Auth::user(); // optional - can be null for guest checkout

        $validated = $request->validate([
            'product_id'     => 'required|exists:products,id',
            'minecraft_name' => 'required|string|min:3|max:16|regex:/^[a-zA-Z0-9_]+$/',
            'platform'       => ['required', Rule::in(['java', 'bedrock', 'pocket'])],
            'qty'            => 'required|integer|min:1',
            'promo_code'     => 'nullable|string|max:50',
            'receipt'        => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120', // 5MB
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // Product availability check
        if (!$product->is_active || $product->stock < $validated['qty']) {
            return back()
                ->withErrors(['product' => 'This product is unavailable or does not have enough stock.'])
                ->withInput();
        }

        // ─── Coupon logic ───────────────────────────────────────────────────────────────
        $coupon = null;
        $discountAmount = 0;
        $couponValidationError = null;

        if (filled($validated['promo_code'])) {
            $coupon = Coupon::where('code', strtoupper($validated['promo_code']))
                // ->where('is_active', true)
                // ->where(function ($query) {
                //     $query->whereNull('expires_at')
                //           ->orWhere('expires_at', '>=', now());
                // })
                ->first();

            if (!$coupon) {
                $couponValidationError = 'The promo code is invalid or has expired.';
            } else {
                $subtotal = (float) $product->price * $validated['qty'];

                // Check minimum spend requirement
                if ($coupon->min_spend && $subtotal < $coupon->min_spend) {
                    $couponValidationError = "Minimum spend of $" . number_format($coupon->min_spend, 2) . " required to use this coupon.";
                } else {
                    // Calculate discount
                    if ($coupon->type === 'percent') {
                        $discountAmount = $subtotal * ($coupon->value / 100);
                    } else {
                        // fixed
                        $discountAmount = $coupon->value;
                        // $discountAmount = min($coupon->value, $subtotal);
                    }
                }
            }

            if ($couponValidationError) {
                return back()
                    ->withErrors(['promo_code' => $couponValidationError])
                    ->withInput();
            }
        } else {

            $subtotal = (float) $product->price * $validated['qty'];
        }
        // Final calculations
        $total    = $subtotal - $discountAmount;

        // ─── Store receipt ──────────────────────────────────────────────────────────────
        $receiptPath = null;
        if ($request->hasFile('receipt') && $request->file('receipt')->isValid()) {
            $receiptPath = $request->file('receipt')
                ->store('receipts/' . now()->format('Y-m'), 'public');
        }

        // ─── Create order ───────────────────────────────────────────────────────────────
        $order = Order::create([
            'user_id'             => $user?->id,                    // nullable if guest allowed
            'minecraft_username'  => $validated['minecraft_name'],
            'email'               => $user?->email ?? 'guest@nomroti.net', // fallback or make required
            'qty'                 => $validated['qty'],
            'platform'            => $validated['platform'],
            'subtotal'            => $subtotal,
            'coupon_id'           => $coupon?->id,
            'discount_total'      => $discountAmount,
            'total'               => $total,
            'status'              => 'pending',
            'attachment_url'      => $receiptPath,
            'product_id'          => $product->id,               // optional - if not using order_items
            'transaction_id'      => 'PENDING-' . Str::upper(Str::random(8)), // temporary
        ]);

        // Optional: Reduce stock (be careful with concurrency - use pessimistic lock if needed)
        // $product->decrement('stock', $validated['qty']);

        // Optional: Create order item relation (recommended for future flexibility)
        /*
        $order->items()->create([
            'product_id' => $product->id,
            'price'      => $product->price,
            'quantity'   => $validated['qty'],
        ]);
        */

        return redirect()
            ->back()
            ->with('success', 'Your payment receipt has been submitted successfully. We will review it shortly.');
    }

    public function show($id) {}
}
