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
                    'wisata' => \App\Models\Wisata::count(),
                    'budaya' => \App\Models\Budaya::count(),
                    'kuliner' => \App\Models\Kuliner::count(),
                    'umkm' => \App\Models\Umkm::count(),
                    'homestay' => \App\Models\Homestay::count(),
                    'berita' => \App\Models\Berita::count(),
                    'reservasi' => 0,
                    'admins' => \App\Models\User::count(),
                ]
            ]
        ]);
    }
}
