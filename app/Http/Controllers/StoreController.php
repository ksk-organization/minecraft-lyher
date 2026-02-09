<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\GameMode;
use App\Models\Product;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $gamemode = $request->gamemode;



        $categories = Category::with([
            'products' => function ($query) use ($gamemode) {
                if ($gamemode) {
                    $query->where('game_mode_id', $gamemode);
                }
            }
        ])
            ->when($gamemode, function ($q) use ($gamemode) {
                $q->whereHas('products', function ($query) use ($gamemode) {
                    $query->where('game_mode_id', $gamemode);
                });
            })
            ->orderBy('display_order')
            ->get();


        $gamemodes = GameMode::findOrFail($gamemode);


        return Inertia::render('game-mode', [
            'categories' => $categories,
            'gamemodes' => $gamemodes,
            'filters' => [
                'gamemodes' => $gamemode
            ]
        ]);
    }




    public function show($id)
    {

        $product = Product::with('images' , 'category')->findOrFail($id);

        
        return Inertia::render('product-detail', compact('product'));
    }
}
