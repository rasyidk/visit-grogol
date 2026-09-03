<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Setup role
        Role::firstOrCreate(['name' => 'admin']);
    }

    public function test_user_can_login_with_correct_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@visitgrogol.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole('admin');

        $response = $this->postJson('/api/login', [
            'email' => 'admin@visitgrogol.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
                'user' => ['id', 'name', 'email'],
                'roles',
            ]);
            
        $this->assertAuthenticatedAs($user, 'api');
    }

    public function test_user_cannot_login_with_incorrect_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@visitgrogol.com',
            'password' => Hash::make('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@visitgrogol.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
            
        $this->assertGuest('api');
    }

    public function test_user_can_get_their_profile(): void
    {
        $user = User::factory()->create();
        $user->assignRole('admin');
        
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->getJson('/api/user');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'email' => $user->email,
            ]);
    }

    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();
        
        $token = JWTAuth::fromUser($user);
        
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Berhasil logout'
            ]);

        $this->assertGuest('api');
    }
}
