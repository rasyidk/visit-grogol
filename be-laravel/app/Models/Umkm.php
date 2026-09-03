<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'title_en',
        'content',
        'content_en',
        'thumbnail',
        'images',
        'is_active',
        'is_gallery_active',
    ];

    protected $casts = [
        'images' => 'array',
        'is_active' => 'boolean',
        'is_gallery_active' => 'boolean',
    ];
}
