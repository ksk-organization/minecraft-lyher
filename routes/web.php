<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\GameModeController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\StoreController;
use App\Models\Coupon;
use App\Models\GameMode;

Route::get('/', function () {

    $gamemodes = GameMode::get();

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'gamemodes' => $gamemodes
    ]);
})->name('home');

    Route::get('/storage-link', function () {
        $targetFolder = storage_path('app/public');
        $linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/storage';
        symlink($targetFolder, $linkFolder);
    });

    Route::get('/build', function () {
        $targetFolder = public_path('build');
        $linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/build';

        try {
            // Check if the symlink already exists
            if (!file_exists($linkFolder)) {
                // Create the symbolic link
                symlink($targetFolder, $linkFolder);
                return 'Symbolic link created successfully.';
            } else {
                return 'Symbolic link already exists.';
            }
        } catch (\Throwable $e) {
            return 'Error creating symbolic link: ' . $e->getMessage();
        }
    });

    Route::get('/assets', function () {
        $targetFolder = public_path('assets');
        $linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/assets';

        try {
            // Check if the symlink already exists
            if (!file_exists($linkFolder)) {
                // Create the symbolic link
                symlink($targetFolder, $linkFolder);
                return 'Symbolic link created successfully.';
            } else {
                return 'Symbolic link already exists.';
            }
        } catch (\Throwable $e) {
            return 'Error creating symbolic link: ' . $e->getMessage();
        }
    });

Route::get('/store', [StoreController::class, 'index']);
Route::resource('/products', StoreController::class)->names('product');
Route::get('/detail', function () {
    return Inertia::render('product-detail');
});

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
