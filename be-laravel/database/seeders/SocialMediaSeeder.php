<?php

namespace Database\Seeders;

use App\Models\SocialMedia;
use Illuminate\Database\Seeder;

class SocialMediaSeeder extends Seeder
{
    public function run(): void
    {
        $accounts = [
            ['platform' => 'INSTAGRAM', 'name' => 'Instagram Visit Grogol', 'username' => '@desawisata.official', 'url' => 'https://instagram.com/desawisata.official', 'position' => 0],
            ['platform' => 'TIKTOK', 'name' => 'TikTok Visit Grogol', 'username' => '@visitgrogol', 'url' => 'https://tiktok.com/@visitgrogol', 'position' => 1],
            ['platform' => 'FACEBOOK', 'name' => 'Facebook Visit Grogol', 'username' => 'Visit Grogol', 'url' => 'https://facebook.com/visitgrogol', 'position' => 2],
        ];

        foreach ($accounts as $account) {
            SocialMedia::firstOrCreate(
                ['platform' => $account['platform']],
                $account + ['is_active' => true]
            );
        }
    }
}
