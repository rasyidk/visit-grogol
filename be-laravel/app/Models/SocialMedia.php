<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    protected $table = 'social_media';

    protected $fillable = [
        'platform',
        'name',
        'username',
        'url',
        'is_active',
        'position',
    ];

    protected $appends = ['isActive'];

    protected $casts = [
        'is_active' => 'boolean',
        'position' => 'integer',
    ];

    public function getIsActiveAttribute(): bool
    {
        return (bool) ($this->attributes['is_active'] ?? false);
    }
}
