<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventNotification extends Model
{
    protected $fillable = ['user_id', 'type', 'data', 'read_at'];

    protected $casts = [
        'data' => 'array',
    ];

    protected $table = 'notifications'; // Keep using same table
}