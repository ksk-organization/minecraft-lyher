<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\GameMode;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {

        return Inertia::render('admin/product/Index', [
            // Performance: Select only necessary columns and eager load with constraints
            'products' => Product::query()
                ->select(['id', 'game_mode_id', 'short_description', 'category_id', 'name', 'slug', 'price', 'stock', 'is_active', 'main_icon_url'])
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
        // 1. Validation: Secure & Performant
        $validated = $request->validate([
            'game_mode_id'      => 'required|exists:game_modes,id',
            'category_id'       => 'required|exists:categories,id',
            'name'              => 'required|string|max:255',
            'slug'              => 'required|string|unique:products,slug',
            'price'             => 'required|numeric|min:0',
            'stock'             => 'nullable|integer|min:0',
            'is_active'         => 'boolean',
            'short_description' => 'nullable|string',
            'long_description'  => 'nullable|string',
            'main_icon_url'     => 'nullable|image|mimes:webp,png,jpg,jpeg|max:3072', // Up to 3MB
            'images'            => 'nullable|array',
            'images.*.file'     => 'nullable|image|mimes:webp,png,jpg,jpeg|max:3072',
        ]);

        // 2. Wrap in Transaction for Database Integrity
        return DB::transaction(function () use ($request, $validated) {

            // Handle Main Icon Upload
            if ($request->hasFile('main_icon_url')) {
                $validated['main_icon_url'] = $request->file('main_icon_url')
                    ->store('products/icons', 'public');
            }

            // Create the Product
            $product = Product::create($validated);

            // 3. Handle Gallery Images (Optimized for Frontend 'images' array)
            if ($request->has('images')) {
                foreach ($request->input('images') as $index => $imageData) {

                    // Check if this specific index contains a file upload
                    if ($request->hasFile("images.{$index}.file")) {
                        $path = $request->file("images.{$index}.file")
                            ->store('products/gallery', 'public');

                        $product->images()->create([
                            'image_url' => $path // Ensure this matches your DB column
                        ]);
                    }
                }
            }

            return redirect()->back()->with('success', 'Product created successfully.');
        });
    }

    public function update(Request $request, Product $product)
    {
        // dd($request->all());
        // 1. Validation (Strict mimes & sizes for speed/security)
        $validated = $request->validate([
            'game_mode_id'      => 'required|exists:game_modes,id',
            'category_id'       => 'required|exists:categories,id',
            'name'              => 'required|string|max:255',
            'slug'              => 'required|string|unique:products,slug,' . $product->id,
            'price'             => 'required|numeric|min:0',
            'stock'             => 'nullable|integer|min:0',
            'is_active'         => 'boolean',
            'short_description' => 'nullable|string',
            'main_icon_url'     => 'nullable',
            'images'            => 'nullable|array',
            'images.*.id'       => 'nullable|integer|exists:product_images,id', // Check if existing image belongs to DB
            'images.*.file'     => 'nullable|image|mimes:webp,png,jpg,jpeg|max:3072',
        ]);

        return DB::transaction(function () use ($request, $product, $validated) {

            // 2. Handle Main Icon (Atomic Swap)
            if ($request->hasFile('main_icon_url')) {
                // Delete old file if it exists to keep storage clean
                if ($product->main_icon_url) {
                    Storage::disk('public')->delete($product->main_icon_url);
                }
                $validated['main_icon_url'] = $request->file('main_icon_url')
                    ->store('products/icons', 'public');
            } else {
                // If main_icon_url is not a file, it's either the existing string or null.
                // We remove it from $validated so we don't overwrite the existing path with null.
                unset($validated['main_icon_url']);
            }

            $product->update($validated);

            // 3. Handle Gallery Syncing
            $currentImageIds = [];

            if ($request->has('images')) {
                foreach ($request->input('images') as $index => $imgData) {

                    // Case A: New File Upload
                    if ($request->hasFile("images.{$index}.file")) {
                        $path = $request->file("images.{$index}.file")
                            ->store('products/gallery', 'public');

                        $newImg = $product->images()->create(['image_url' => $path]);
                        $currentImageIds[] = $newImg->id;
                    }
                    // Case B: Existing Image (Keep it)
                    elseif (isset($imgData['id'])) {
                        $currentImageIds[] = $imgData['id'];
                    }
                }
            }

            // 4. Cleanup: Delete images from Disk and DB that are no longer in the array
            $product->images()
                ->whereNotIn('id', $currentImageIds)
                ->get()
                ->each(function ($img) {
                    Storage::disk('public')->delete($img->image_url);
                    $img->delete();
                });

            return redirect()->back()->with('success', 'Product updated successfully.');
        });
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
