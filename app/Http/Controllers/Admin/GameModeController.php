<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameMode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GameModeController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/game-mode/Index', [
            'game_modes' => GameMode::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:100|unique:game_modes,title',
            'slug'        => 'required|string|max:120|unique:game_modes,slug',
            'description' => 'nullable|string|max:1000',
            'server_ip'   => 'required|string|max:100',
            // 'image_url'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:3072', // 3MB
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('game-modes', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        GameMode::create($validated);

        return back()->with('success', 'Game mode created successfully.');
    }

    public function update(Request $request, GameMode $game_mode)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:100|unique:game_modes,title,' . $game_mode->id,
            'slug'        => 'required|string|max:120|unique:game_modes,slug,' . $game_mode->id,
            'description' => 'nullable|string|max:1000',
            'server_ip'   => 'required|string|max:100',
            // 'image_url'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:3072',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('image_url')) {
            // Delete old image if exists
            if ($game_mode->image_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $game_mode->image_url));
            }
            $path = $request->file('image_url')->store('game-modes', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $game_mode->update($validated);

        return back()->with('success', 'Game mode updated successfully.');
    }

    public function destroy(GameMode $game_mode)
    {
        if ($game_mode->image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $game_mode->image_url));
        }

        $game_mode->delete();

        return back()->with('success', 'Game mode deleted successfully.');
    }
}
