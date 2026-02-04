<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\GameModeController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\PaymentController;
use App\Models\Coupon;
use App\Models\GameMode;

Route::get('/', function () {

    $gamemodes = GameMode::get();

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'gamemodes' => $gamemodes
    ]);
})->name('home');

Route::get('/store', [StoreController::class, 'index']);
Route::resource('/products', StoreController::class)->names('product');
Route::resource('/payment', PaymentController::class)->names('payment');
Route::get('checkout/coupon/check', [CouponController::class, 'check'])->name('checkout.check-coupon');


Route::prefix('admin')->as('admin.')->middleware(['auth', 'can:access-admin-page',])->group(function () {

    Route::get('dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index']);

    Route::resource('products', ProductController::class)->names('products');
    Route::resource('game-modes', GameModeController::class)->names('game-modes');
    Route::resource('categories', CategoryController::class)->names('categories');
    Route::resource('coupons', CouponController::class)->names('coupons');


    // Route::get('orders', [OrderController::class, 'index']);
    // Route::get('orders/{order}', [OrderController::class, 'show']);
    // Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
});


require __DIR__ . '/settings.php';
