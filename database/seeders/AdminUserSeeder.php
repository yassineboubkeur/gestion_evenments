<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Create admin role if it doesn't exist
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        
        // Create permissions if needed (optional)
        Permission::firstOrCreate(['name' => 'manage users']);
        Permission::firstOrCreate(['name' => 'manage events']);
        // Add more permissions as needed
        
        // Assign all permissions to admin role
        $adminRole->givePermissionTo(Permission::all());

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin@example.com'), // Change this password in production!
            'email_verified_at' => now(),
        ]);

        // Assign admin role to the user
        $admin->assignRole('admin');

        $this->command->info('Admin user created successfully!');
        $this->command->warn('Email: admin@example.com');
        $this->command->warn('Password: password');
    }
}