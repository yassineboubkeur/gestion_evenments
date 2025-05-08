<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'string', 'in:participant,organizer'],
            'birthday' => ['required', 'date', 'before:-13 years'], // Must be at least 13 years old
            'gender' => ['required', 'string', 'in:male,female,other'],
            'phone' => ['required', 'string', 'max:20'],
            'city' => ['required', 'string', 'max:100'], // Added city field
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birthday' => $request->birthday,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'city' => $request->city, // Added city field
        ]);

        // Assign role
        $role = Role::where('name', $request->role)->firstOrFail();
        $user->assignRole($role);

        event(new Registered($user));

        Auth::login($user);

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $user->createToken('auth-token')->plainTextToken
        ], 201);
    }
}