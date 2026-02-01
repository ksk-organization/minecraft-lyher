<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
protected $fillable = [
        'minecraft_username',
        'email',
        'platform',
        'subtotal',
        'coupon_id',
        'discount_total',
        'total',
        'status',
        'transaction_id',
        'attachment_url'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function getFormattedTotalAttribute()
    {
        return number_format($this->total, 2);
    }
}
