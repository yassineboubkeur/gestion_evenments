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

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }
}