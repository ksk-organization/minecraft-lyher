<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::with('products.images')
            ->when($request->gamemodes, function ($query) use ($request) {
                $query->whereHas('products', function ($q) use ($request) {
                    $q->where('game_mode_id', $request->gamemodes);
                });
            })
            ->get();

        return Inertia::render('game-mode', [
            'categories' => $categories,
            'filters' => [
                'gamemodes' => $request->gamemodes
            ]
        ]);
    }


    public function show($id)
    {

        $product = Product::with('images')->findOrFail($id);
        return Inertia::render('product-detail', compact('product'));
    }
}
