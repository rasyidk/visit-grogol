<?php

namespace App\Mail;

use App\Models\Reservasi;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Reservasi $reservation)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reservasi baru dari ' . $this->reservation->name,
            replyTo: [
                new Address($this->reservation->email, $this->reservation->name),
            ],
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.reservation-received');
    }
}
