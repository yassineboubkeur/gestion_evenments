<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'payment_id',
        'payment_amount',
        'payment_currency',
        'payment_status',
        'payment_date',
        'payer_email',
        'payer_name',
        'ticket_quantity',
        'notes'
    ];

    protected $casts = [
        'payment_date' => 'datetime',
        'payment_amount' => 'decimal:2',
    ];

    /**
     * Get the user that made the registration
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the event for this registration
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function registrations()
{
    return $this->hasMany(Registration::class);
}

public function registeredEvents()
{
    return $this->belongsToMany(Event::class, 'registrations')
                ->withPivot([
                    'payment_id',
                    'payment_amount',
                    'payment_status',
                    'payment_date'
                ])
                ->withTimestamps();
}
}