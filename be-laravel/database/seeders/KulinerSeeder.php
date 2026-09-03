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
                'title' => 'Sego Wiwit Tradisional',
                'title_en' => 'Traditional Sego Wiwit',
                'content' => '<p>Hidangan khas syukuran panen raya dengan lauk komplit, tempe garit, ikan asin, dan sambal gepeng yang nikmat.</p>',
                'content_en' => '<p>A typical harvest thanksgiving dish with complete side dishes, garit tempeh, salted fish, and delicious gepeng chili paste.</p>',
            ],
            [
                'title' => 'Omah Rempah Mbah Putri',
                'title_en' => 'Grandma\'s Spice House',
                'content' => '<p>Tempat makan legendaris yang menyajikan aneka masakan tradisional Jawa dengan bumbu rempah warisan.</p>',
                'content_en' => '<p>A legendary eatery serving various traditional Javanese dishes with heirloom spice blends.</p>',
            ],
            [
                'title' => 'Warung Kopi Sawah',
                'title_en' => 'Paddy Field Coffee Shop',
                'content' => '<p>Menikmati seduhan kopi lokal asli dengan pemandangan hamparan sawah hijau yang menyejukkan mata.</p>',
                'content_en' => '<p>Enjoy a brew of authentic local coffee with a soothing view of green paddy fields.</p>',
            ],
            [
                'title' => 'Teras Langit Resto',
                'title_en' => 'Sky Terrace Resto',
                'content' => '<p>Restoran modern dengan sentuhan etnik, menyajikan hidangan fusion Nusantara di atas bukit yang indah.</p>',
                'content_en' => '<p>A modern restaurant with an ethnic touch, serving Nusantara fusion dishes on a beautiful hill.</p>',
            ],
            [
                'title' => 'Jajanan Pasar Tradisional',
                'title_en' => 'Traditional Market Snacks',
                'content' => '<p>Kumpulan aneka kue basah tradisional seperti klepon, cenil, dan getuk yang manis dan menggugah selera.</p>',
                'content_en' => '<p>A collection of various traditional wet cakes like klepon, cenil, and getuk that are sweet and appetizing.</p>',
            ]
        ];

        $images = [
            'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
            'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
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
