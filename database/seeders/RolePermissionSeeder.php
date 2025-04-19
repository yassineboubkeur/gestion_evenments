<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    
        // Create permissions
        $permissions = [
            'create events',
            'edit events',
            'delete events',
            'view events',
            'manage users',
            'manage all events'
        ];
    
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    
        // Create roles and assign permissions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());
    
        $organizer = Role::create(['name' => 'organizer']);
        $organizer->givePermissionTo([
            'create events',
            'edit events',
            'delete events',
            'view events'
        ]);
    
        $participant = Role::create(['name' => 'participant']);
        $participant->givePermissionTo('view events');
    }
}
