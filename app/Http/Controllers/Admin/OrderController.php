<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function approve(Request $request)
    {
        Order::where('id', $request->orderId)->update(['status' => 'completed']);

        return back()->with('success', 'Approval Successfully');
    }
}
