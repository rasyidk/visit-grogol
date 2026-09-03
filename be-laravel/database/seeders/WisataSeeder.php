<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Wisata;
use Illuminate\Support\Str;

class WisataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dummyData = [
            [
                'title' => 'Pantai Pasir Putih Grogol',
                'title_en' => 'Grogol White Sand Beach',
                'content' => '<p>Pantai yang indah dengan pasir putih bersih dan air laut yang jernih. Cocok untuk bersantai bersama keluarga.</p>',
                'content_en' => '<p>A beautiful beach with clean white sand and crystal clear seawater. Perfect for relaxing with family.</p>',
            ],
            [
                'title' => 'Bukit Bintang Kaloka',
                'title_en' => 'Kaloka Star Hill',
                'content' => '<p>Nikmati pemandangan kota dari atas bukit pada malam hari. Suasana romantis dengan kerlap-kerlip lampu kota.</p>',
                'content_en' => '<p>Enjoy the city view from the top of the hill at night. Romantic atmosphere with twinkling city lights.</p>',
            ],
            [
                'title' => 'Air Terjun Lembah Hijau',
                'title_en' => 'Green Valley Waterfall',
                'content' => '<p>Air terjun tersembunyi di balik rimbunnya hutan tropis. Udaranya sangat sejuk dan menyegarkan.</p>',
                'content_en' => '<p>A hidden waterfall behind a lush tropical forest. The air is very cool and refreshing.</p>',
            ],
            [
                'title' => 'Desa Wisata Budaya',
                'title_en' => 'Cultural Tourism Village',
                'content' => '<p>Kenali lebih dekat adat istiadat dan kebudayaan lokal masyarakat Grogol di desa wisata yang asri ini.</p>',
                'content_en' => '<p>Get closer to the customs and local culture of the Grogol people in this beautiful tourism village.</p>',
            ],
            [
                'title' => 'Taman Nasional Hutan Jati',
                'title_en' => 'Teak Forest National Park',
                'content' => '<p>Jelajahi keanekaragaman hayati di hutan jati terbesar di kawasan ini. Tersedia rute trekking untuk pemula hingga profesional.</p>',
                'content_en' => '<p>Explore the biodiversity in the largest teak forest in the region. Trekking routes are available for beginners to professionals.</p>',
            ],
            [
                'title' => 'Danau Biru Cermin',
                'title_en' => 'Mirror Blue Lake',
                'content' => '<p>Danau vulkanik dengan air berwarna biru pekat yang bisa memantulkan bayangan awan layaknya cermin raksasa.</p>',
                'content_en' => '<p>A volcanic lake with deep blue water that can reflect clouds like a giant mirror.</p>',
            ],
            [
                'title' => 'Pasar Seni Tradisional',
                'title_en' => 'Traditional Art Market',
                'content' => '<p>Pusat perbelanjaan suvenir dan kerajinan tangan lokal. Tempat terbaik untuk membeli cinderamata khas Grogol.</p>',
                'content_en' => '<p>A shopping center for local souvenirs and handicrafts. The best place to buy typical Grogol souvenirs.</p>',
            ]
        ];

        $images = [
            'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        ];

        foreach ($dummyData as $index => $data) {
            $thumbnail = $images[$index % count($images)];
            $gallery = [
                $images[($index + 1) % count($images)],
                $images[($index + 2) % count($images)],
                $images[($index + 3) % count($images)],
            ];

            Wisata::create([
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
