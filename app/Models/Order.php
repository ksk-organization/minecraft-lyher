<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Order extends Model
{
    protected $fillable = [
        'user_id',              // ← add if login required / nullable
        'product_id',           // ← add to directly reference the product
        'minecraft_username',
        'qty',
        'email',
        'platform',
        'subtotal',
        'coupon_id',
        'discount_total',
        'total',
        'status',
        'transaction_id',
        'attachment_url',         // ← clearer name than attachment_url
    ];

    protected $casts = [
        'subtotal'      => 'decimal:2',
        'discount_total'=> 'decimal:2',
        'total'         => 'decimal:2',
        'created_at'    => 'datetime',
        'updated_at'    => 'datetime',
    ];

    // Relationships

    public function orderItems(){
        return $this->hasMany(OrderItem::class , 'order_id' , 'id' );
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    // Accessors
    protected function formattedTotal(): Attribute
    {
        return Attribute::make(
            get: fn () => number_format($this->total, 2)
        );
    }

    protected function formattedSubtotal(): Attribute
    {
        return Attribute::make(
            get: fn () => number_format($this->subtotal, 2)
        );
    }

    // Optional: status helpers
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
}