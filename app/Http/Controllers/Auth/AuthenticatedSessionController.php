<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
{
    $request->authenticate();

    $user = $request->user();

    return response()->json([
        'message' => 'Login successful',
        'user' => $user,
        'token' => $user->createToken('auth-token')->plainTextToken
    ]);
}

    

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        try {
            // Check if user is authenticated
            if ($request->user()) {
                // Revoke the current access token
                $request->user()->currentAccessToken()->delete();
            }
    
            return response()->json([
                'message' => 'Successfully logged out',
                'success' => true
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Logout completed',
                'success' => true
            ]);
        }
    }
}
