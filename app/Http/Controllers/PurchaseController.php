<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index(){

     $user = Auth::user();

        if (!$user) {
            // Optional: redirect to login or show guest message
            return redirect()->route('login');
            // or: return Inertia::render('Auth/Login', ['message' => 'Please log in to view your purchases']);
        }

        $orders = Order::query()
            ->where('user_id', $user->id)
            ->with([
                'product',           // if you still have product_id directly on order
                'orderItems.product', // preferred if using order_items pivot
                'coupon',
            ])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                $mainProduct = $order->orderItems->first()?->product 
                    ?? $order->product;

                $receiptUrl = $order->attachment_url 
                    ? asset('storage/' . $order->attachment_url) 
                    : null;

                return [
                    'id'                  => $order->id,
                    'order_number'        => $order->transaction_id ?? ('ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT)),
                    'status'              => $order->status,
                    'status_label'        => match ($order->status) {
                        'pending'   => 'Waiting for Review',
                        'paid'      => 'Payment Confirmed',
                        'completed' => 'Delivered',
                        'failed'    => 'Rejected / Failed',
                        default     => ucfirst($order->status),
                    },
                    'status_color'        => match ($order->status) {
                        'pending'   => 'yellow',
                        'paid'      => 'blue',
                        'completed' => 'green',
                        'failed'    => 'red',
                        default     => 'gray',
                    },
                    'minecraft_username'  => $order->minecraft_username,
                    'platform'            => ucfirst($order->platform),
                    'product_name'        => $mainProduct?->name ?? 'Multiple items',
                    'product_image'       => $mainProduct?->image_url ?? null, // assuming you have this field
                    'quantity'            => $order->qty,
                    'subtotal'            => number_format($order->subtotal, 2),
                    'discount'            => $order->discount_total > 0 
                        ? number_format($order->discount_total, 2) 
                        : null,
                    'total'               => number_format($order->total, 2),
                    'coupon_code'         => $order->coupon?->code,
                    'created_at'          => $order->created_at->format('d M Y • H:i'),
                    'created_at_human'    => $order->created_at->diffForHumans(),
                    'receipt_url'         => $receiptUrl,
                    'is_receipt_available'=> !!$receiptUrl,
                ];
            });

        return Inertia::render('purchase', [
            'orders' => $orders,
            'user'   => [
                'name'  => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
