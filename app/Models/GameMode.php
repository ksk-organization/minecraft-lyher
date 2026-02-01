<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameMode extends Model
{
protected $fillable = [
        'title',
        'slug',
        'description',
        'server_ip',
        'image_url',
        'is_active'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    }
