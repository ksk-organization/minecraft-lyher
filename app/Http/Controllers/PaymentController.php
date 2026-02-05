<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class PaymentController extends Controller
{

    public function store(Request $request)
    {
        $user = Auth::user(); // nullable for guest checkout

        // dd($request->all());


        $validated = $request->validate([
            'product_id'     => 'required|exists:products,id',
            'minecraft_name' => 'required|string|min:3|max:16|regex:/^[a-zA-Z0-9_]+$/',
            'platform'       => ['required', Rule::in(['java', 'bedrock', 'pocket'])],
            'qty'            => 'required|integer|min:1',
            'promo_code'     => 'nullable|string|max:50',
            'receipt'        => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120', // 5MB
            // If you want to keep these from webhook_upload, add them (optional)
            // 'product_name'   => 'required|string',   // ← added if coming from frontend
            // 'category'       => 'nullable|string',
            // 'gamemode'       => 'nullable|string',
        ]);

        $product = Product::with('gameMode', 'category')->findOrFail($validated['product_id']);

        // Check availability
        if (!$product->is_active || $product->stock < $validated['qty']) {
            return back()
                ->withErrors(['product' => 'This product is unavailable or does not have enough stock.'])
                ->withInput();
        }

        // ─── Coupon logic ───────────────────────────────────────────────────────────────
        $coupon = null;
        $discountAmount = 0;
        $couponValidationError = null;
        $subtotal = (float) $product->price * $validated['qty'];

        if (filled($validated['promo_code'])) {
            $coupon = Coupon::where('code', strtoupper($validated['promo_code']))
                // ->where('is_active', true)
                // ->where(function ($q) {
                //     $q->whereNull('expires_at')->orWhere('expires_at', '>=', now());
                // })
                ->first();

            if (!$coupon) {
                $couponValidationError = 'The promo code is invalid or has expired.';
            } elseif ($coupon->min_spend && $subtotal < $coupon->min_spend) {
                $couponValidationError = "Minimum spend of $" . number_format($coupon->min_spend, 2) . " required.";
            } else {
                if ($coupon->type === 'percent') {
                    $discountAmount = $subtotal * ($coupon->value / 100);
                } else {
                    $discountAmount = $coupon->value;
                    // $discountAmount = min($coupon->value, $subtotal); // safer version
                }
            }

            if ($couponValidationError) {
                return back()
                    ->withErrors(['promo_code' => $couponValidationError])
                    ->withInput();
            }
        }

        $total = $subtotal - $discountAmount;

        // ─── Store receipt file ────────────────────────────────────────────────────────
        $receiptPath = null;
        $receiptFile = null;

        if ($request->hasFile('receipt') && $request->file('receipt')->isValid()) {
            $receiptPath = $request->file('receipt')
                ->store('receipts/' . now()->format('Y-m'), 'public');

            $receiptFile = $request->file('receipt');
        }

        // ─── Create order ───────────────────────────────────────────────────────────────
        $order = Order::create([
            'user_id'             => $user?->id,
            'minecraft_username'  => $validated['minecraft_name'],
            'email'               => $user?->email ?? 'guest@nomroti.net',
            'qty'                 => $validated['qty'],
            'platform'            => $validated['platform'],
            'subtotal'            => $subtotal,
            'coupon_id'           => $coupon?->id,
            'discount_total'      => $discountAmount,
            'total'               => $total,
            'status'              => 'pending',
            'attachment_url'      => $receiptPath,
            'product_id'          => $product->id,
            'transaction_id'      => 'PENDING-' . Str::upper(Str::random(8)),
        ]);

        // Optional: decrease stock (consider transaction/lock in production)
        // $product->decrement('stock', $validated['qty']);

        // ─── Send Discord Webhook Notification ─────────────────────────────────────────
        if ($receiptFile) {
            $webhookUrl = 'https://discord.com/api/webhooks/1468233211254542523/SV1wCnLhVGW3R5eEcOGTRmnaNDBajrOqRO7DDoWDz8PRxDkp1PfOd5wms0DcSQIqTch1';

            $embed = [
                "title" => "📦 NEW ORDER: " . strtoupper($product->name ?? 'Unknown Product'),
                "color" => 0x00A2FF,
                "fields" => [
                    ["name" => "🎮 Platform",     "value" => "`" . strtoupper($validated['platform']) . "`", "inline" => true],
                    ["name" => "⚔️ Gamemode",     "value" => "`" . ucfirst($product->gameMode->title ?? '—') . "`", "inline" => true],
                    ["name" => "💎 Item Details", "value" => "**" . ($product->name ?? '—') . "**" .
                        (" (Category: {$product->category->name})"), "inline" => false],
                    ["name" => "👤 Player IGN",   "value" => $validated['minecraft_name'], "inline" => true],
                    ["name" => "🔢 Quantity",     "value" => "x{$validated['qty']}", "inline" => true],
                    ["name" => "📋 Status",       "value" => "Pending", "inline" => true],
                    ["name" => "💰 Total Paid",   "value" => "```yaml\n$ " . number_format($total, 2) . "```", "inline" => true],
                    ["name" => "🎟️ Coupon",       "value" => "```\n" . ($validated['promo_code'] ?? 'None') . "```", "inline" => true],
                ],
                "image" => ["url" => "attachment://receipt.png"],
                "footer" => ["text" => "NOMROTI Store • " . now()->format('d M Y, H:i')],
            ];

            try {
                $response = Http::attach(
                    'file',
                    file_get_contents($receiptFile->getRealPath()),
                    'receipt.' . $receiptFile->getClientOriginalExtension() // better than forcing .png
                )->post($webhookUrl, [
                    'payload_json' => json_encode(['embeds' => [$embed]])
                ]);

                // You can log failure silently or handle it
                // if (!$response->successful()) { \Log::warning('Discord webhook failed', $response->json()); }
            } catch (\Exception $e) {
                // Optional: log error, but don't fail the order
                \Log::error('Discord webhook error: ' . $e->getMessage());
            }
        }

        // ─── Success response ──────────────────────────────────────────────────────────
        return back()->with('success', 'Your payment receipt has been submitted successfully. We will review it shortly.');
    }




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

    // public function store(Request $request)
    // {
    //     $user = Auth::user(); // optional - can be null for guest checkout

    //     $validated = $request->validate([
    //         'product_id'     => 'required|exists:products,id',
    //         'minecraft_name' => 'required|string|min:3|max:16|regex:/^[a-zA-Z0-9_]+$/',
    //         'platform'       => ['required', Rule::in(['java', 'bedrock', 'pocket'])],
    //         'qty'            => 'required|integer|min:1',
    //         'promo_code'     => 'nullable|string|max:50',
    //         'receipt'        => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120', // 5MB
    //     ]);

    //     $product = Product::findOrFail($validated['product_id']);

    //     // Product availability check
    //     if (!$product->is_active || $product->stock < $validated['qty']) {
    //         return back()
    //             ->withErrors(['product' => 'This product is unavailable or does not have enough stock.'])
    //             ->withInput();
    //     }

    //     // ─── Coupon logic ───────────────────────────────────────────────────────────────
    //     $coupon = null;
    //     $discountAmount = 0;
    //     $couponValidationError = null;

    //     if (filled($validated['promo_code'])) {
    //         $coupon = Coupon::where('code', strtoupper($validated['promo_code']))
    //             // ->where('is_active', true)
    //             // ->where(function ($query) {
    //             //     $query->whereNull('expires_at')
    //             //           ->orWhere('expires_at', '>=', now());
    //             // })
    //             ->first();

    //         if (!$coupon) {
    //             $couponValidationError = 'The promo code is invalid or has expired.';
    //         } else {
    //             $subtotal = (float) $product->price * $validated['qty'];

    //             // Check minimum spend requirement
    //             if ($coupon->min_spend && $subtotal < $coupon->min_spend) {
    //                 $couponValidationError = "Minimum spend of $" . number_format($coupon->min_spend, 2) . " required to use this coupon.";
    //             } else {
    //                 // Calculate discount
    //                 if ($coupon->type === 'percent') {
    //                     $discountAmount = $subtotal * ($coupon->value / 100);
    //                 } else {
    //                     // fixed
    //                     $discountAmount = $coupon->value;
    //                     // $discountAmount = min($coupon->value, $subtotal);
    //                 }
    //             }
    //         }

    //         if ($couponValidationError) {
    //             return back()
    //                 ->withErrors(['promo_code' => $couponValidationError])
    //                 ->withInput();
    //         }
    //     } else {

    //         $subtotal = (float) $product->price * $validated['qty'];
    //     }
    //     // Final calculations
    //     $total    = $subtotal - $discountAmount;

    //     // ─── Store receipt ──────────────────────────────────────────────────────────────
    //     $receiptPath = null;
    //     if ($request->hasFile('receipt') && $request->file('receipt')->isValid()) {
    //         $receiptPath = $request->file('receipt')
    //             ->store('receipts/' . now()->format('Y-m'), 'public');
    //     }

    //     // ─── Create order ───────────────────────────────────────────────────────────────
    //     $order = Order::create([
    //         'user_id'             => $user?->id,                    // nullable if guest allowed
    //         'minecraft_username'  => $validated['minecraft_name'],
    //         'email'               => $user?->email ?? 'guest@nomroti.net', // fallback or make required
    //         'qty'                 => $validated['qty'],
    //         'platform'            => $validated['platform'],
    //         'subtotal'            => $subtotal,
    //         'coupon_id'           => $coupon?->id,
    //         'discount_total'      => $discountAmount,
    //         'total'               => $total,
    //         'status'              => 'pending',
    //         'attachment_url'      => $receiptPath,
    //         'product_id'          => $product->id,               // optional - if not using order_items
    //         'transaction_id'      => 'PENDING-' . Str::upper(Str::random(8)), // temporary
    //     ]);

    //     // Optional: Reduce stock (be careful with concurrency - use pessimistic lock if needed)
    //     // $product->decrement('stock', $validated['qty']);

    //     // Optional: Create order item relation (recommended for future flexibility)
    //     /*
    //     $order->items()->create([
    //         'product_id' => $product->id,
    //         'price'      => $product->price,
    //         'quantity'   => $validated['qty'],
    //     ]);
    //     */

    //     return redirect()
    //         ->back()
    //         ->with('success', 'Your payment receipt has been submitted successfully. We will review it shortly.');
    // }

    public function show($id) {}

    // public function webhook_upload(Request $request)
    // {

    //     $webhookUrl = 'https://discord.com/api/webhooks/1468233211254542523/SV1wCnLhVGW3R5eEcOGTRmnaNDBajrOqRO7DDoWDz8PRxDkp1PfOd5wms0DcSQIqTch1';

    //     $file = $request->file('receipt');

    //     $embed = [
    //         "title" => "📦 NEW ORDER: " . strtoupper($request->product_name),
    //         "color" => 0x00A2FF, // Bright Blue
    //         "fields" => [
    //             // Row 1: Platform & Mode (Short)
    //             ["name" => "🎮 Platform", "value" => "`" . strtoupper($request->platform) . "`", "inline" => true],
    //             ["name" => "⚔️ Gamemode", "value" => "`" . ucfirst($request->gamemode) . "`", "inline" => true],

    //             // Row 2: Product Detail (Full Width)
    //             ["name" => "💎 Item Details", "value" => "**{$request->product_name}** (Category: {$request->category})", "inline" => false],

    //             // Row 3: Player & Quantity (3 Cols)
    //             ["name" => "👤 Player IGN", "value" => "{$request->minecraft_ign}", "inline" => true],
    //             ["name" => "🔢 Quantity", "value" => "x{$request->qty}", "inline" => true],
    //             ["name" => "📋 Status", "value" => "Pending", "inline" => true],

    //             // Row 4: Pricing (Large Highlight)
    //             ["name" => "💰 Total Paid", "value" => "```yaml\n$ {$request->total_amount}```", "inline" => true],
    //             ["name" => "🎟️ Coupon", "value" => "```\n" . ($request->coupon_code ?? 'None') . "```", "inline" => true],
    //         ],
    //         "image" => ["url" => "attachment://receipt.png"],
    //         "footer" => ["text" => "NOMROTI Store Log • " . now()->format('d M Y, H:i')],
    //     ];

    //     $response = Http::attach(
    //         'file',
    //         file_get_contents($file->getRealPath()),
    //         'receipt.png'
    //     )->post($webhookUrl, [
    //         'payload_json' => json_encode(['embeds' => [$embed]])
    //     ]);

    //     return $response;

    //     // return $response->successful() ? back() : abort(500);
    // }
}
