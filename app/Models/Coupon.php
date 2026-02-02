<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $table = 'coupons';
    protected $fillable = [
        'code',
        'type',
        'value',
        'min_spend',
        'max_uses',
        'used_count',
        'expires_at'
    ];

    protected $casts = [
        'expires_at' => 'datetime'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function isValid($subtotal)
    {
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        if ($subtotal < $this->min_spend) {
            return false;
        }

        if ($this->max_uses && $this->used_count >= $this->max_uses) {
            return false;
        }

        return true;
    }

    public function calculateDiscount($subtotal)
    {
        return $this->type === 'percent'
            ? ($subtotal * $this->value / 100)
            : $this->value;
    }
}
