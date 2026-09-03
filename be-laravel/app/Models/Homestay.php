<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Homestay extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'title_en',
        'price',
        'facilities',
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title') && empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }
}
