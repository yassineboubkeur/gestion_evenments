<?php

namespace App\Mail;

use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RegistrationConfirmation extends Mailable
{
    use Queueable, SerializesModels;
    public $registration;
    public $qrCode;
    // public $registration;

    // In RegistrationConfirmation.php
    public function __construct(Registration $registration)
    {
        $this->registration = $registration;

        // Generate QR code as embeddable string
        $qrImage = QrCode::format('png')
            ->size(300)
            ->margin(1)
            ->generate(url("/events/{$registration->event_id}"));


        // Generate a unique filename
        $filename = 'qr_' . uniqid() . '.png';

        // Store the QR code in the public disk (storage/app/public)
        \Storage::disk('public')->put($filename, $qrImage);

        // Set the public URL to the QR code image
        $this->qrCode = asset('storage/' . $filename);
    }

    public function build()
    {
        return $this->view('emails.registration-confirmation')
            ->with(['qrCode' => $this->qrCode]);
    }

    public function envelope()
    {
        return new Envelope(
            subject: 'Confirmation d\'inscription à l\'événementtttttttt',
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.registration-confirmation',
            with: [
                'qrCode' => $this->qrCode,
            ],
        );
    }

    public function attachments()
    {
        return [];
    }
}