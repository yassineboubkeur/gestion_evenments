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
        'organizer_id'
    ];

    protected $casts = [
        'date' => 'datetime',
        'price' => 'decimal:2'
    ];

    // This is correct - keeps the belongsTo relationship
    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    // Add this if you have participants (many-to-many relationship)
    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_user', 'event_id', 'user_id')
                   ->withTimestamps();
    }
}