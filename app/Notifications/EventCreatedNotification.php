<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class EventCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $event;
    protected $organizer;

    public function __construct($event, $organizer)
    {
        $this->event = $event;
        $this->organizer = $organizer;
    }
    public function via($notifiable)
    {
        // dd($this->organizer);

        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'event_id' => $this->event->id,
            'event_name' => $this->event->name,
            'organizer_name' => $this->organizer->name,
            'message' => 'A new event has been created: ' . $this->event->name,
            'url' => route('events.show', $this->event->id)
        ];
    }
}