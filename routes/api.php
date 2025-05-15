<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminEventController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ContactController;

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
Route::get('allevents', [EventController::class, 'allEvents']);
Route::get('events/{event}', [EventController::class, 'showPublic']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/payments/verify', [EventController::class, 'verifyPayment']);
    
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

       
        Route::get('/participant/registrations', [EventController::class, 'registrations']);
    });

    // Organizer routes
    Route::middleware(['role:organizer'])->group(function () {
        Route::post('/events', [EventController::class, 'store']);
        Route::put('/events/{event}', [EventController::class, 'update']);
        Route::patch('/events/{event}', [EventController::class, 'update']);
        Route::delete('/events/{event}', [EventController::class, 'destroy']);
        Route::get('/my-events', [EventController::class, 'myEvents']);
        Route::get('/organizer/stats', [EventController::class, 'stats']);
    });

    // Admin routes
    Route::middleware(['role:admin'])->group(function () {
        Route::apiResource('users', UserController::class);
        Route::post('/users/{user}/assign-role', [UserController::class, 'assignRole']);
        Route::get('/system-metrics', [AdminController::class, 'metrics']);
        Route::apiResource('admin/events', AdminEventController::class);
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead']);

        Route::get('/pending-events', [EventController::class, 'pendingEvents']);
        Route::post('/events/{event}/approve', [EventController::class, 'approveEvent']);
        Route::post('/events/{event}/reject', [EventController::class, 'rejectEvent']);
        

    });
    Route::middleware(['auth:sanctum', 'role:participant|organizer|admin'])->group(function () {
        Route::get('/events', [EventController::class, 'index']);
    });
    // Likes routes (accessible to all authenticated users)
    Route::prefix('events/{event}/likes')->group(function () {
        Route::post('/', [LikeController::class, 'like']);
        Route::delete('/', [LikeController::class, 'unlike']);
        Route::get('/check', [LikeController::class, 'checkLike']);
        Route::get('/count', [LikeController::class, 'likesCount']);
    });
    
    Route::get('/user/likes', [LikeController::class, 'userLikes']);

    // Route::post('/events/{event}/toggle-like', [EventController::class, 'toggleLike']);
    Route::post('/events/{event}/toggle-like', [EventController::class, 'toggleLike']);
});

Route::post('/contact', [ContactController::class, 'store']);


