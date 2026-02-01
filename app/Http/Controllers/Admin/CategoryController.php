<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/category/Index', [
            'categories' => Category::orderBy('display_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:100|unique:categories,name',
            'slug'          => 'required|string|max:120|unique:categories,slug',
            'display_order' => 'nullable|integer|min:0',
        ]);

        Category::create($validated);

        return back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:100|unique:categories,name,' . $category->id,
            'slug'          => 'required|string|max:120|unique:categories,slug,' . $category->id,
            'display_order' => 'nullable|integer|min:0',
        ]);

        $category->update($validated);

        return back()->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return back()->with('success', 'Category deleted successfully.');
    }
}
