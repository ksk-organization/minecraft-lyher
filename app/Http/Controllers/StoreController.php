<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;

class StoreController extends Controller
{
    public function index(){

        $categories = Category::with('products.images')->get();

        // return response()->json($categories);
        // [
        // {
        // "id": 1,
        // "name": "Dolan Mathis",
        // "slug": "Laudantium dicta ve",
        // "display_order": 68,
        // "created_at": "2026-02-01T14:39:46.000000Z",
        // "updated_at": "2026-02-01T14:39:46.000000Z",
        // "products": [
        // {
        // "id": 1,
        // "game_mode_id": 1,
        // "category_id": 1,
        // "name": "Ut ut numquam commod",
        // "slug": "Magnam do sed velit",
        // "short_description": null,
        // "long_description": null,
        // "price": 47,
        // "stock": 14,
        // "main_icon_url": "products/gallery/KhjjDUFuXfbtMJIjy1VLN0pAdaioF89tgD7aqBXB.jpg",
        // "is_active": 1,
        // "created_at": "2026-02-01T14:40:10.000000Z",
        // "updated_at": "2026-02-01T14:40:10.000000Z",
        // "deleted_at": null,
        // "images": [
        // {
        // "id": 1,
        // "product_id": 1,
        // "image_url": "products/gallery/4wcsBkszhZRFa9Qaohkfp6pg9N0zCpOsJ4A49nAD.jpg",
        // "sort_order": 0
        // },
        // {
        // "id": 2,
        // "product_id": 1,
        // "image_url": "products/gallery/4NVhoDnPlnrWglgF8dbgNEfZtysIjh946uWs8y5M.jpg",
        // "sort_order": 0
        // }
        // ]
        // }
        // ]
        // }
        // ]

        return Inertia::render('game-mode' , compact('categories'));
    }

    public function show($id){

        $product = Product::with('images')->findOrFail($id);
        return Inertia::render('product-detail' , compact('product'));
    }
}
