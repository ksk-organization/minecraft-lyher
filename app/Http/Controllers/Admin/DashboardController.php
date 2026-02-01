<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\GameMode;
use App\Models\Category;

use App\Models\Order;

use Inertia\Inertia;

class DashboardController extends Controller
{
// app/Http/Controllers/Admin/DashboardController.php

public function index()
{
    // Quick stats
    $pendingCount = Order::where('status', 'pending')->count();
    $approvedCount = Order::where('status', 'paid')->orWhere('status', 'completed')->count();
    $rejectedCount = Order::where('status', 'failed')->count(); // or add 'rejected' status if needed

    $totalRevenue = Order::whereIn('status', ['paid', 'completed'])
        ->sum('total');

    // Pending orders – latest 10
    $pendingOrders = Order::with(['orderItems.product'])
        ->where('status', 'pending')
        ->latest()
        ->take(10)
        ->get()
        ->map(function ($order) {
            $firstItem = $order->orderItems->first();
            return [
                'id'       => $order->id,
                'minecraft_username' => $order->minecraft_username,
                'avatar'   => "https://minotar.net/helm/{$order->minecraft_username}/64.png",
                'platform' => $order->platform,
                'item'     => $firstItem ? $firstItem->product->name : 'Multiple items',
                'price'    => $order->total,
                'receipt'  => $order->attachment_url,
                'time'     => $order->created_at->diffForHumans(),
            ];
        });

    // Recent history – last 20 processed orders
    $history = Order::with(['orderItems.product', 'coupon'])
        ->whereNotIn('status', ['pending'])
        ->latest()
        ->take(20)
        ->get()
        ->map(function ($order) {
            $firstItem = $order->orderItems->first();
            return [
                'id'       => $order->id,
                'user'     => $order->minecraft_username,
                'item'     => $firstItem ? $firstItem->product->name : 'Multiple items',
                'amount'   => $order->total,
                'status'   => ucfirst($order->status),
                'staff'    => 'Admin', // ← replace with real staff reference later
                'time'     => $order->updated_at->diffForHumans(),
            ];
        });

    return Inertia::render('dashboard', [
        'stats' => [
            'pending'   => $pendingCount,
            'revenue'   => number_format($totalRevenue, 2, '.', ','),
            'approved'  => $approvedCount,
            'rejected'  => $rejectedCount,
        ],
        'pending_orders' => $pendingOrders,
        'history'        => $history,
        'game_modes'     => GameMode::select('id', 'title')->get(),
        'categories'     => Category::select('id', 'name')->get(),
    ]);
}
}
