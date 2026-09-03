<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Umkm;
use Illuminate\Support\Str;

class UmkmSeeder extends Seeder
{
    public function run(): void
    {
        $dummyData = [
            [
                'title' => 'Semesta Inc',
                'title_en' => 'Semesta Inc',
                'content' => '<p>Usaha rintisan kreatif yang bergerak di bidang kerajinan barang-barang daur ulang estetik. Menyulap barang bekas menjadi kerajinan rumah tangga bernilai seni tinggi seperti lampu hias, vas bunga, dan ornamen ruang tamu.</p>',
                'content_en' => '<p>A creative startup engaged in aesthetic recycled goods crafts. Transforming used items into high-art household crafts such as decorative lights, flower vases, and living room ornaments.</p>',
            ],
            [
                'title' => 'Dapur Flanel',
                'title_en' => 'Flannel Kitchen',
                'content' => '<p>Industri rumahan yang memproduksi kerajinan tangan berbahan dasar kain flanel. Mulai dari gantungan kunci lucu, boneka kustom, hingga hiasan mahar pernikahan yang dikerjakan dengan sangat teliti.</p>',
                'content_en' => '<p>A home industry producing handicrafts made of flannel cloth. Ranging from cute keychains, custom dolls, to dowry decorations crafted with great care.</p>',
            ],
            [
                'title' => 'Mebel Pandansari',
                'title_en' => 'Pandansari Furniture',
                'content' => '<p>Pengrajin mebel kayu jati dan mahoni asli dengan ukiran khas nusantara. Melayani pesanan meja, kursi, lemari pakaian, dan bufet untuk pasar domestik maupun kebutuhan suvenir skala kecil.</p>',
                'content_en' => '<p>Craftsmen of authentic teak and mahogany furniture with distinct archipelago carvings. Serving orders for tables, chairs, wardrobes, and sideboards for domestic markets and small-scale souvenirs.</p>',
            ]
        ];

        $images = [
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
            'https://images.unsplash.com/photo-1616422285623-aa301f409bd3?w=800&q=80',
            'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80',
        ];

        foreach ($dummyData as $index => $data) {
            $thumbnail = $images[$index % count($images)];
            $gallery = [
                $images[($index + 1) % count($images)],
                $images[($index + 2) % count($images)],
            ];

            Umkm::create([
                'slug' => Str::slug($data['title']),
                'title' => $data['title'],
                'title_en' => $data['title_en'],
                'content' => $data['content'],
                'content_en' => $data['content_en'],
                'thumbnail' => $thumbnail,
                'images' => $gallery,
                'is_active' => true,
                'is_gallery_active' => true,
            ]);
        }
    }
}
