<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */


     protected $appends = ['role_names', 'permission_names'];

    /**
     * Get all role names for the user.
     */
    public function getRoleNamesAttribute()
    {
        return $this->getRoleNames();
    }

    /**
     * Get all permission names for the user.
     */
    public function getPermissionNamesAttribute()
    {
        return $this->getAllPermissions()->pluck('name');
    }
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get all permissions for the user, both directly assigned and via roles.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    // public function getAllPermissions()
    // {
    //     return $this->getAllPermissions();
    // }

    /**
     * Get all role names for the user.
     *
     * @return \Illuminate\Support\Collection
     */
    // public function getRoleNames()
    // {
    //     return $this->getRoleNames();
    // }

    /**
     * Check if user has any of the given permissions.
     *
     * @param string|array $permissions
     * @return bool
     */
    // public function hasAnyPermission($permissions)
    // {
    //     return $this->hasAnyPermission($permissions);
    // }

    /**
     * Check if user has all of the given permissions.
     *
     * @param string|array $permissions
     * @return bool
     */
    // public function hasAllPermissions($permissions)
    // {
    //     return $this->hasAllPermissions($permissions);
    // }

    /**
     * Relationship with personal access tokens.
     */
    public function tokens()
    {
        return $this->morphMany(\Laravel\Sanctum\PersonalAccessToken::class, 'tokenable');
    }
}




// <?php

// namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
// use Spatie\Permission\Traits\HasRoles;

// class User extends Authenticatable implements MustVerifyEmail
// {
//     use HasFactory, Notifiable, HasRoles, HasApiTokens;

//     // ... other model code ...

//     /**
//      * The accessors to append to the model's array form.
//      *
//      * @var array
//      */
//     protected $appends = ['role_names', 'permission_names'];

//     /**
//      * Get all role names for the user.
//      */
//     public function getRoleNamesAttribute()
//     {
//         return $this->getRoleNames();
//     }

//     /**
//      * Get all permission names for the user.
//      */
//     public function getPermissionNamesAttribute()
//     {
//         return $this->getAllPermissions()->pluck('name');
//     }
// }