<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Membuat Roles
        $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin']);
        $anggotaRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'anggota']);

        // Membuat Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@visitgrogol.com'],
            [
                'name' => 'Administrator',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );

        $admin->assignRole($adminRole);

        $this->call([
            BeritaSeeder::class,
        ]);
    }
}
