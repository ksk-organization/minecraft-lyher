<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\GameMode;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
// public function index()
// {
//     // Use fast pagination and specific selects to reduce DB I/O and Network Latency
//     $products = Product::query()
//         ->select(['id', 'game_mode_id', 'category_id', 'name', 'price', 'stock', 'is_active', 'main_icon_url', 'created_at'])
//         ->with([
//             'gameMode:id,title',
//             'category:id,name'
//         ])
//         ->latest()
//         ->paginate(10) // Prevents memory crashes; Inertia handles this seamlessly
//         ->withQueryString();

//     return Inertia::render('admin/product/Index', [
//         'products' => $products,
//         // Cached or lightweight selects for filters/dropdowns
//         'game_modes' => GameMode::select('id', 'title')->toBase()->get(),
//         'categories' => Category::select('id', 'name')->toBase()->get(),
//     ]);
// }

public function index()
    {

        // dd(Product::query()
        //         ->select(['id', 'game_mode_id', 'category_id', 'name', 'slug', 'price', 'stock', 'is_active', 'main_icon_url'])
        //         ->with([
        //             'gameMode:id,title',
        //             'category:id,name',
        //             'images'
        //         ])
        //         ->latest()
        //         ->paginate(10)
        //         ->withQueryString());

        return Inertia::render('admin/product/Index', [
            // Performance: Select only necessary columns and eager load with constraints
            'products' => Product::query()
                ->select(['id', 'game_mode_id', 'category_id', 'name', 'slug', 'price', 'stock', 'is_active', 'main_icon_url'])
                ->with([
                    'gameMode:id,title',
                    'category:id,name',
                    'images'
                ])
                ->latest()
                ->paginate(10)
                ->withQueryString(),

            // Optimization: toBase() skips Eloquent hydration for static dropdowns
            'game_modes' => GameMode::select('id', 'title')->toBase()->get(),
            'categories' => Category::select('id', 'name')->toBase()->get(),
        ]);
    }

public function store(Request $request)
{

    $validated = $request->validate([
        'game_mode_id' => 'required|exists:game_modes,id',
        'category_id'  => 'required|exists:categories,id',
        'name'         => 'required|string|max:255',
        'slug'         => 'required|string|unique:products,slug',
        'price'        => 'required|numeric',
        'stock'        => 'nullable|integer',
        'is_active'    => 'boolean',
        'long_description' => 'nullable|string',

        'main_icon_url' => 'nullable|image|max:2048',

        'images' => 'nullable|array',
        'images.*.type' => 'required|in:file,url',
        'images.*.file' => 'required_if:images.*.type,file|image|max:2048',
        'images.*.value' => 'required_if:images.*.type,url|string',
    ]);

    /* Upload main icon */
    if ($request->hasFile('main_icon_url')) {
        $validated['main_icon_url'] = $request->file('main_icon_url')
            ->store('products/gallery', 'public');
    }

    /* Create product */
    $product = Product::create($validated);


    if ($request->has('images')) {
        foreach ($request->images as $index => $imgData) {
            $url = $imgData['value'];

            if ($imgData['type'] === 'file' && $request->hasFile("images.{$index}.file")) {
                $url = $request->file("images.{$index}.file")->store('products/gallery', 'public');
            }

            if ($url) {
                $product->images()->create(['image_url' => $url]);
            }
        }
    }

    return redirect()->back();
}

public function update(Request $request, Product $product)
{

    // dd($request->all());
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'images' => 'nullable|array',
        'images.*.type' => 'required|in:file,url',
        'images.*.file' => 'nullable|image|max:2048',
        'images.*.value' => 'nullable|string',
    ]);

    \DB::transaction(function () use ($request, $product) {
        // 1. Update Core Product Data
        $product->update($request->only([
            'game_mode_id', 'category_id', 'name', 'slug', 'price', 'stock', 'is_active', 'main_icon_url', 'long_description'
        ]));

        // 2. Sync Multimedia Gallery
        if ($request->has('images')) {
            $currentImageUrls = [];

            foreach ($request->images as $index => $imgData) {
                $finalUrl = null;

                if ($imgData['type'] === 'file' && $request->hasFile("images.{$index}.file")) {
                    // Fast Storage: Store new file
                    $finalUrl = $request->file("images.{$index}.file")->store('products/gallery', 'public');
                } else {
                    // Keep existing URL or use provided URL string
                    // We strip the "/storage/" prefix if it exists to keep DB paths consistent
                    $finalUrl = str_replace('/storage/', '', $imgData['value'] ?? '');
                }

                if ($finalUrl) {
                    // UpdateOrCreate prevents duplicate rows and keeps sort order
                    $product->images()->updateOrCreate(
                        ['image_url' => $finalUrl],
                        ['image_url' => $finalUrl]
                    );
                    $currentImageUrls[] = $finalUrl;
                }
            }

            // 3. Performance Cleanup: Remove images that were deleted in the UI
            // This prevents "Ghost Assets" from cluttering the DB
            $product->images()->whereNotIn('image_url', $currentImageUrls)->delete();
        } else {
            // If no images sent, purge the gallery for this product
            $product->images()->delete();
        }
    });

    return redirect()->back()->with('success', 'Asset synchronized successfully.');
}

    public function destroy(Product $product)
    {
        if ($product->main_icon_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->main_icon_url));
        }

        $product->delete();

        return back()->with('success', 'Product deleted successfully.');
    }
}
