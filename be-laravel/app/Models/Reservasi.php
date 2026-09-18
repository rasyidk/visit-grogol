<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservasi extends Model
{
    protected $table = 'reservasi';

    protected $fillable = [
        'name',
        'email',
        'arrival_date',
        'guests',
        'package_type',
        'note',
        'status',
    ];

    protected $casts = [
        'arrival_date' => 'date:Y-m-d',
        'guests' => 'integer',
    ];
}
