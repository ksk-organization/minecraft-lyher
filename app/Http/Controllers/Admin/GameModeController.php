<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameMode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

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
            'image_url'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240', // ← important change
            'image_background'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240', // ← important change
            'is_active'   => 'boolean',
        ]);

        // Handle image upload if a file was provided
        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $file = $request->file('image_url');

            // Generate a unique filename
            $extension = $file->getClientOriginalExtension();
            $filename = Str::uuid() . '.' . $extension;

            // Store the file in storage/app/public/game-modes
            $path = $file->storeAs('game-modes', $filename, 'public');

            // Save the public URL in the database
            $validated['image_url'] = Storage::url($path);
        }
        if ($request->hasFile('image_background') && $request->file('image_background')->isValid()) {
            $file = $request->file('image_background');

            // Generate a unique filename
            $extension = $file->getClientOriginalExtension();
            $filename = Str::uuid() . '.' . $extension;

            // Store the file in storage/app/public/game-modes
            $path = $file->storeAs('game-modes', $filename, 'public');

            // Save the public URL in the database
            $validated['image_background'] = Storage::url($path);
        }
        // If no file was uploaded, image_url remains null (as per validation)

        GameMode::create($validated);

        return back()->with('success', 'Game mode created successfully.');
    }

    public function update(Request $request, GameMode $gameMode)
    {

        $validated = $request->validate([
            'title'       => 'required|string|max:100|unique:game_modes,title,' . $gameMode->id,
            'slug'        => 'required|string|max:120|unique:game_modes,slug,' . $gameMode->id,
            'description' => 'nullable|string|max:1000',
            'server_ip'   => 'required|string|max:100',
            // 'image_url'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $file = $request->file('image_url');

            // Delete old image if it exists
            if ($gameMode->image_url) {
                $oldPath = str_replace('/storage/', '', $gameMode->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $extension = $file->getClientOriginalExtension() ?: 'jpg';
            $filename = Str::uuid() . '.' . $extension;

            $path = $file->storeAs('game-modes', $filename, 'public');

            $validated['image_url'] = Storage::url($path);
        } else {
            // Keep existing image when no new file is uploaded
            $validated['image_url'] = $gameMode->image_url;
        }
        if ($request->hasFile('image_background') && $request->file('image_background')->isValid()) {
            $file = $request->file('image_background');

            // Delete old image if it exists
            if ($gameMode->image_background) {
                $oldPath = str_replace('/storage/', '', $gameMode->image_background);
                Storage::disk('public')->delete($oldPath);
            }

            $extension = $file->getClientOriginalExtension() ?: 'jpg';
            $filename = Str::uuid() . '.' . $extension;

            $path = $file->storeAs('game-modes', $filename, 'public');

            $validated['image_background'] = Storage::url($path);
        } else {
            // Keep existing image when no new file is uploaded
            $validated['image_background'] = $gameMode->image_background;
        }

        $gameMode->update($validated);

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
