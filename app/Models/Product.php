<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
use SoftDeletes;

    protected $fillable = [
        'game_mode_id',
        'category_id',
        'name',
        'slug',
        'short_description',
        'long_description',
        'price',
        'stock',
        'main_icon_url',
        'is_active'
    ];

    public function gameMode()
    {
        return $this->belongsTo(GameMode::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    /* Useful scope */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
