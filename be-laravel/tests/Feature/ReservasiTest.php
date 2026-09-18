<?php

namespace Tests\Feature;

use App\Mail\ReservationReceived;
use App\Models\Reservasi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ReservasiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_reservation_is_saved_and_emailed(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/reservasi', [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'arrivalDate' => '2026-10-20',
            'guests' => 2,
            'packageType' => 'Paket Full Day Budaya',
            'note' => 'Mohon info ketersediaan.',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.name', 'Budi Santoso')
            ->assertJsonPath('data.status', 'PENDING');

        $reservation = Reservasi::firstOrFail();
        $this->assertSame('budi@example.com', $reservation->email);

        Mail::assertSent(ReservationReceived::class, function (ReservationReceived $mail) use ($reservation) {
            return $mail->hasTo('grogolkaloka@gmail.com')
                && $mail->reservation->is($reservation);
        });
    }
}
