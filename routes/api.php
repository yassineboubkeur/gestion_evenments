<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Authenticated routes (Sanctum)
Route::middleware(['auth:sanctum'])->group(function () {
    // Common authenticated user routes
    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
            'roles' => $request->user()->getRoleNames(),
            'permissions' => $request->user()->getAllPermissions()->pluck('name')
        ]);
    });
    
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    // Participant routes
    Route::middleware(['role:participant'])->group(function () {
        Route::get('/events', [EventController::class, 'index']);
        Route::post('/events/{event}/register', [EventController::class, 'register']);
    });

    // Organizer routes
    Route::middleware(['role:organizer'])->group(function () {
        Route::apiResource('events', EventController::class)->except(['index']);
        Route::get('/my-events', [EventController::class, 'myEvents']);
    });

    // Admin routes
    Route::middleware(['role:admin'])->group(function () {
        Route::apiResource('users', UserController::class);
        Route::post('/users/{user}/assign-role', [UserController::class, 'assignRole']);
        Route::get('/system-metrics', [AdminController::class, 'metrics']);
    });
});