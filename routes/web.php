<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\GameModeController;
use App\Http\Controllers\StoreController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


// Route::get('/game-mode', function () {
//     return Inertia::render('game-mode');
// });
Route::get('/store', [StoreController::class, 'index']);
Route::resource('/products', StoreController::class)->names('product');
Route::get('/detail', function () {
    return Inertia::render('product-detail');
});



Route::prefix('admin')->as('admin.')->middleware('auth')->group(function () {

    Route::get('dashboard', [App\Http\Controllers\Admin\DashboardController::class , 'index']);
    // Route::resource('products', App\Http\Controllers\Admin\ProductController::class)->names('products');

    Route::resource('products', ProductController::class)->names('products');
    Route::resource('game-modes', GameModeController::class)->names('game-modes');
    Route::resource('categroies', CategoryController::class)->names('categroies');



    Route::resource('game-modes', GameModeController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('coupons', CouponController::class);

    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
});


require __DIR__ . '/settings.php';
