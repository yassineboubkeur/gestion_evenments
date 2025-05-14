<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'date',
        'address',
        'available_places',
        'image',
        'duration_minutes',
        'price',
        'category',
        'organizer_id',
        'status'

    ];

    protected $casts = [
        'date' => 'datetime',
        'price' => 'decimal:2',
         'status' => 'string'
    ];

    

    protected $appends = ['likes_count'];

    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    // Organizer relationship (one-to-many)
    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    // Likes relationship (many-to-many through event_likes table)
    public function likes()
    {
        return $this->belongsToMany(User::class, 'event_likes', 'event_id', 'user_id')
            ->withTimestamps();
    }
    

    // Registrations relationship (one-to-many)
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    // Participants through registrations (many-to-many with payment details)
    public function participants()
    {
        return $this->belongsToMany(User::class, 'registrations')
            ->using(Registration::class)
            ->withPivot([
                'id',
                'payment_id',
                'payment_amount',
                'payment_currency',
                'payment_status',
                'payment_date',
                'ticket_quantity',
                'notes',
                'created_at',
                'updated_at'
            ])
            ->withTimestamps();
    }
}