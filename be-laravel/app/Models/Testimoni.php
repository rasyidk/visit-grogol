<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimoni extends Model
{
    protected $table = 'testimoni';

    protected $fillable = [
        'name',
        'role',
        'role_en',
        'origin',
        'avatar',
        'message',
        'message_en',
        'rating',
        'is_approved',
        'position',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_approved' => 'boolean',
        'position' => 'integer',
    ];
}
