<?php
namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventApprovedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your Event Has Been Approved!')
            ->line('Your event "'.$this->event->name.'" has been approved by the admin team.')
            ->action('View Event', url('/events/'.$this->event->id))
            ->line('Thank you for using our platform!');
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Your event "'.$this->event->name.'" has been approved',
            'event_id' => $this->event->id,
            'link' => '/events/'.$this->event->id
        ];
    }
}