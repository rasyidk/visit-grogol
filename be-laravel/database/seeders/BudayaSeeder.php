<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Budaya;
use Illuminate\Support\Str;

class BudayaSeeder extends Seeder
{
    public function run(): void
    {
        $dummyData = [
            [
                'title' => 'Tari Tradisional Pendet',
                'title_en' => 'Traditional Pendet Dance',
                'content' => '<p>Tarian tradisional selamat datang yang sangat indah, menggambarkan rasa syukur dan penghormatan kepada tamu.</p>',
                'content_en' => '<p>A very beautiful traditional welcome dance, depicting gratitude and respect to guests.</p>',
            ],
            [
                'title' => 'Upacara Adat Bersih Desa',
                'title_en' => 'Village Cleansing Ceremony',
                'content' => '<p>Upacara tahunan masyarakat untuk memohon keselamatan dan hasil panen yang melimpah.</p>',
                'content_en' => '<p>An annual community ceremony to pray for safety and abundant harvests.</p>',
            ],
            [
                'title' => 'Seni Ukir Kayu Jati',
                'title_en' => 'Teak Wood Carving Art',
                'content' => '<p>Kesenian mengukir kayu jati yang sudah diwariskan turun-temurun dengan motif khas daerah.</p>',
                'content_en' => '<p>The art of carving teak wood passed down through generations with distinctive regional motifs.</p>',
            ],
            [
                'title' => 'Gamelan Pusaka',
                'title_en' => 'Heirloom Gamelan',
                'content' => '<p>Pertunjukan alat musik tradisional gamelan yang dimainkan secara harmoni oleh warga desa.</p>',
                'content_en' => '<p>A traditional gamelan musical instrument performance played harmoniously by the villagers.</p>',
            ],
            [
                'title' => 'Kerajinan Batik Tulis',
                'title_en' => 'Hand-drawn Batik Craft',
                'content' => '<p>Melihat langsung proses pembuatan batik tulis dengan pewarna alami dari dedaunan sekitar.</p>',
                'content_en' => '<p>Witness the process of making hand-drawn batik with natural dyes from surrounding leaves.</p>',
            ]
        ];

        $images = [
            'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
        ];

        foreach ($dummyData as $index => $data) {
            $thumbnail = $images[$index % count($images)];
            $gallery = [
                $images[($index + 1) % count($images)],
                $images[($index + 2) % count($images)],
            ];

            Budaya::create([
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
