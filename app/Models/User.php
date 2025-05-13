<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens,Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'birthday',
        'gender',
        'phone',
        'city',
        'profile_image',

    ];

    protected $appends = ['role_names', 'permission_names'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function getProfileImageUrlAttribute()
    {
        return $this->profile_image 
            ? Storage::url($this->profile_image)
            : asset('images/default-profile.jpg'); // Default image if none is set
    }
    // Add this relationship
    public function events()
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    public function getRoleNamesAttribute()
    {
        return $this->getRoleNames();
    }

    public function getPermissionNamesAttribute()
    {
        return $this->getAllPermissions()->pluck('name');
    }

    public function likedEvents()
{
    return $this->belongsToMany(Event::class, 'event_likes', 'user_id', 'event_id')
               ->withTimestamps();
}


}