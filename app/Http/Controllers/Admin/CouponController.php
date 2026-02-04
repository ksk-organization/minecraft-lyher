<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Coupon::query()
            ->when($request->search, fn($q) => $q->where('code', 'like', "%{$request->search}%"));

        return Inertia::render('admin/coupon/Index', [
            'coupons' => $query->latest()->get(), // or paginate()
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'       => 'required|string|unique:coupons,code|max:20|alpha_num:ascii',
            'type'       => 'required|in:fixed,percent',
            'value'      => 'required|numeric|min:0.01',
            'min_spend'  => 'nullable|numeric|min:0',
            'max_uses'   => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date|after:now',
            'is_active'  => 'boolean',
        ]);

        Coupon::create($validated);

        return back()->with('success', 'Coupon created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Coupon $coupon)
    {
        $validated = $request->validate([
            'code'       => 'required|string|max:20|alpha_num:ascii|unique:coupons,code,' . $coupon->id,
            'type'       => 'required|in:fixed,percent',
            'value'      => 'required|numeric|min:0.01',
            'min_spend'  => 'nullable|numeric|min:0',
            'max_uses'   => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date|after:now',
            'is_active'  => 'boolean',
        ]);

        $coupon->update($validated);

        return back()->with('success', 'Coupon updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }



    // routes/web.php or api.php
    // Route::get('/checkout/coupon/check', function (Request $request) {
    //     $code = $request->query('code');

    //     if (!$code) {
    //         return response()->json(['valid' => false, 'message' => 'No code provided']);
    //     }

    //     $coupon = Coupon::where('code', strtoupper($code))
    //         ->where('is_active', true)
    //         ->where(function ($q) {
    //             $q->whereNull('expires_at')
    //               ->orWhere('expires_at', '>=', now());
    //         })
    //         ->first();

    //     if (!$coupon) {
    //         return response()->json(['valid' => false, 'message' => 'Invalid or expired code']);
    //     }

    //     // You can add more checks: min_spend, usage limit, etc.

    //     return response()->json([
    //         'valid' => true,
    //         'discount' => $coupon->value,
    //         'type' => $coupon->type,
    //         'message' => $coupon->type === 'percentage' ? "{$coupon->value}% off" : "\${$coupon->value} off",
    //     ]);
    // })->name('checkout.check-coupon');

    public function check(Request $request)
    {
        $code = $request->query('code');

        if (!$code) {
            return response()->json(['valid' => false, 'message' => 'No code provided']);
        }

        $coupon = Coupon::where('code', strtoupper($code))
            // ->where('is_active', true)
            // ->where(function ($q) {
            //     $q->whereNull('expires_at')
            //         ->orWhere('expires_at', '>=', now());
            // })
            ->first();

        if (!$coupon) {
            return response()->json(['valid' => false, 'message' => 'Invalid or expired code']);
        }

        // You can add more checks: min_spend, usage limit, etc.
        // {
        //     "id": 1,
        //     "code": "KIKILO",
        //     "type": "percent",
        //     "value": "10.00",
        //     "min_spend": "10.00",
        //     "max_uses": 10,
        //     "used_count": 0,
        //     "expires_at": "2030-01-10T00:00:00.000000Z",
        //     "created_at": "2026-02-04T10:08:01.000000Z",
        //     "updated_at": "2026-02-04T10:08:01.000000Z"
        // }
        // return response()->json($coupon);
        return response()->json([
            'valid' => true,
            'discount' => $coupon->value,
            'type' => $coupon->type,
            'min_spend' => $coupon->min_spend,
            "max_uses" => $coupon->max_uses,
            "used_count"=> $coupon->used_count,
            'message' => $coupon->type === 'percent' ? "{$coupon->value}% off" : "\${$coupon->value} off",
        ]);
    }
}
