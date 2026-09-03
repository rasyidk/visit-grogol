<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat Roles
        $superAdminRole = Role::firstOrCreate(['name' => 'SUPERADMIN']);
        $adminRole = Role::firstOrCreate(['name' => 'ADMIN']);

        // 2. Buat Akun Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@visitgrogolkaloka.com'],
            [
                'name' => 'Super Administrator',
                'password' => Hash::make('VisitGrogol2026!'),
                'is_active' => true,
            ]
        );
        $superAdmin->assignRole($superAdminRole);

        // 3. Buat Akun Admin Biasa (Contoh)
        $admin = User::firstOrCreate(
            ['email' => 'admin@visitgrogolkaloka.com'],
            [
                'name' => 'Admin Pengelola',
                'password' => Hash::make('VisitGrogol2026!'),
                'is_active' => true,
            ]
        );
        $admin->assignRole($adminRole);
    }
}
