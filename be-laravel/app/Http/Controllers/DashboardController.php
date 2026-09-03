<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'data' => [
                'counts' => [
                    'destinasi' => 0,
                    'berita' => 0,
                    'event' => 0,
                    'testimoni' => 0,
                    'galeriFoto' => 0,
                    'reservasi' => 0,
                    'subscribers' => 0,
                    'admins' => User::count(),
                ],
                'topDestinasi' => [],
                'latestReservasi' => []
            ]
        ]);
    }
}
