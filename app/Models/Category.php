<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'display_order'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function productsByGameMode($gamemode = null)
    {
        $query = $this->hasMany(Product::class , 'category_id' , 'id');

        if ($gamemode) {
            $query->where('game_mode_id', $gamemode);
        }

        return $query;
    }
}
