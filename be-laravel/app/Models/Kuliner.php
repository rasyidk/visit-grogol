<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kuliner extends Model
{
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

    protected $appends = [
        'titleEn',
        'contentEn',
        'isActive',
        'isGalleryActive',
    ];

    public function getTitleEnAttribute()
    {
        return $this->attributes['title_en'] ?? null;
    }

    public function getContentEnAttribute()
    {
        return $this->attributes['content_en'] ?? null;
    }

    public function getIsActiveAttribute()
    {
        return (bool) ($this->attributes['is_active'] ?? false);
    }

    public function getIsGalleryActiveAttribute()
    {
        return (bool) ($this->attributes['is_gallery_active'] ?? true);
    }
}
