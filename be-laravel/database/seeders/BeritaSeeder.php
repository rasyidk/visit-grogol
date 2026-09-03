<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $beritas = [
            [
                'title' => 'Festival Budaya Grogol Kembali Digelar Tahun Ini',
                'title_en' => 'Grogol Cultural Festival is Back This Year',
                'content' => '<p>Desa Grogol kembali mengadakan festival budaya tahunan yang sangat dinantikan oleh warga lokal maupun wisatawan. Acara ini akan menampilkan berbagai kesenian tradisional dan kuliner khas desa.</p>',
                'content_en' => '<p>Grogol Village is holding its highly anticipated annual cultural festival once again. The event will feature various traditional arts and authentic village culinary delights.</p>',
                'thumbnail' => 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800',
                'author' => 'Admin Grogol',
                'is_active' => true,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Bantuan Alat Pertanian untuk Warga Desa Grogol',
                'title_en' => 'Agricultural Tools Assistance for Grogol Villagers',
                'content' => '<p>Pemerintah daerah baru saja memberikan bantuan berupa traktor dan alat pertanian modern lainnya untuk mendukung program ketahanan pangan di Desa Wisata Grogol.</p>',
                'content_en' => '<p>The local government has just provided assistance in the form of tractors and other modern agricultural tools to support the food security program in Grogol Tourism Village.</p>',
                'thumbnail' => 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800',
                'author' => 'Humas Desa',
                'is_active' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Peresmian Balai Warga Baru',
                'title_en' => 'Inauguration of the New Community Hall',
                'content' => '<p>Balai warga yang telah direnovasi selama 3 bulan akhirnya diresmikan hari ini oleh Bapak Kepala Desa. Balai ini diharapkan menjadi pusat interaksi dan pengembangan ide kreatif pemuda desa.</p>',
                'content_en' => '<p>The community hall that has been under renovation for 3 months was finally inaugurated today by the Village Head. This hall is expected to become a center for interaction and the development of creative ideas for village youth.</p>',
                'thumbnail' => 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
                'author' => 'Admin Grogol',
                'is_active' => true,
                'published_at' => now()->subDays(10),
            ],
        ];

        foreach ($beritas as $berita) {
            $berita['slug'] = Str::slug($berita['title']);
            Berita::create($berita);
        }
    }
}
