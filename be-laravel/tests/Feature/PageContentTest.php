<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_reservation_page_returns_default_content(): void
    {
        $response = $this->getJson('/api/page-content/reservasi');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'content' => [
                        'packages',
                        'map' => ['image', 'url'],
                        'transport',
                    ],
                ],
            ])
            ->assertJsonPath('data.content.packages.0.label.id', 'Paket Full Day Budaya');
    }
}
