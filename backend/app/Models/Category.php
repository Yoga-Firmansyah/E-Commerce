<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image'
    ];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => url('/storage/categories/' . $value),
        );
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

}
