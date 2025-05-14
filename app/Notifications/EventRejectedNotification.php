<?php


namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventRejectedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $event;
    public $reason;

    /**
     * Create a new notification instance.
     *
     * @param Event $event
     * @param string $reason
     */
    public function __construct(Event $event, string $reason)
    {
        $this->event = $event;
        $this->reason = $reason;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your Event Submission Requires Changes')
            ->line('We regret to inform you that your event "'.$this->event->name.'" has not been approved.')
            ->line('Reason: '.$this->reason)
            ->line('You may edit your event and resubmit it for approval:')
            ->action('Edit Event', route('events.edit', $this->event->id))
            ->line('If you have any questions, please contact our support team.')
            ->line('Thank you for using our platform!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'message' => 'Your event "'.$this->event->name.'" was rejected',
            'reason' => $this->reason,
            'event_id' => $this->event->id,
            'link' => route('events.edit', $this->event->id),
            'type' => 'event_rejected'
        ];
    }
}