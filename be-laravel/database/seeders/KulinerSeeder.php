<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kuliner;
use Illuminate\Support\Str;

class KulinerSeeder extends Seeder
{
    public function run(): void
    {
        $dummyData = [
            [
                'title' => 'Makanan Tradisional',
                'title_en' => 'Traditional Food',
                'content' => '<p>Kumpulan makanan tradisional khas yang kaya akan rempah dan bumbu warisan leluhur. Sajian utamanya meliputi Nasi Kuning, Nasi Liwet, Sego Wiwit, dan aneka sayur lodeh yang selalu disajikan segar setiap hari.</p>',
                'content_en' => '<p>A collection of traditional foods rich in spices and ancestral seasonings. Main dishes include Yellow Rice, Liwet Rice, Sego Wiwit, and various fresh vegetable stews served daily.</p>',
            ],
            [
                'title' => 'Jajan Pasar',
                'title_en' => 'Traditional Market Snacks',
                'content' => '<p>Nikmati aneka jajanan pasar tradisional Nusantara yang manis dan gurih, seperti Klepon, Cenil, Getuk, Tiwul, hingga Lemper. Cocok sebagai kudapan pendamping minum teh atau kopi di sore hari.</p>',
                'content_en' => '<p>Enjoy a variety of sweet and savory traditional market snacks, such as Klepon, Cenil, Getuk, Tiwul, and Lemper. Perfect as an afternoon tea or coffee companion.</p>',
            ],
            [
                'title' => 'Ragam Minuman',
                'title_en' => 'Various Beverages',
                'content' => '<p>Menyajikan berbagai minuman tradisional yang menghangatkan maupun menyegarkan dahaga. Mulai dari Wedang Jahe, Kunyit Asam, Wedang Uwuh, hingga Es Dawet dan Es Cincau hijau alami.</p>',
                'content_en' => '<p>Serving various traditional beverages that warm or quench thirst. Ranging from Ginger Drink, Tamarind Turmeric, Wedang Uwuh, to Es Dawet and natural green Grass Jelly ice.</p>',
            ]
        ];

        $images = [
            'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', // Food
            'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80', // Snacks
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', // Beverages
        ];

        foreach ($dummyData as $index => $data) {
            $thumbnail = $images[$index % count($images)];
            $gallery = [
                $images[($index + 1) % count($images)],
                $images[($index + 2) % count($images)],
            ];

            Kuliner::create([
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
