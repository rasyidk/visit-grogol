<?php

namespace Database\Seeders;

use App\Models\Homestay;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HomestaySeeder extends Seeder
{
    public function run(): void
    {
        $homestays = [
            [
                'title' => 'Omah Grogol Asri',
                'title_en' => 'Grogol Asri House',
                'price' => 'Rp 250.000 / Malam',
                'facilities' => 'AC, TV, Wifi, Kamar Mandi Dalam, Sarapan, Air Panas',
                'thumbnail' => 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
                ],
                'is_active' => true,
                'is_gallery_active' => true,
            ],
            [
                'title' => 'Pondok Wisata Bambu',
                'title_en' => 'Bamboo Tourism Lodge',
                'price' => 'Rp 150.000 / Malam',
                'facilities' => 'Kipas Angin, Kamar Mandi Luar, Sarapan Pagi, Teras',
                'thumbnail' => 'https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1618773928120-2c70034a70b4?q=80&w=2070&auto=format&fit=crop',
                ],
                'is_active' => true,
                'is_gallery_active' => true,
            ],
            [
                'title' => 'Villa Puncak Kaloka',
                'title_en' => 'Kaloka Peak Villa',
                'price' => 'Rp 500.000 / Malam',
                'facilities' => 'AC, TV, Wifi Cepat, Dapur, Kolam Renang, Parkir Luas',
                'thumbnail' => 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2127&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
                ],
                'is_active' => true,
                'is_gallery_active' => true,
            ],
        ];

        foreach ($homestays as $homestay) {
            $homestay['slug'] = Str::slug($homestay['title']);
            Homestay::create($homestay);
        }
    }
}
