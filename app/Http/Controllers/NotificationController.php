<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
            
        $unreadCount = $user->unreadNotifications()->count();
            
        return response()->json([
            'notifications' => $notifications,
            'unreadCount' => $unreadCount
        ]);
    }
    
    public function markAsRead()
    {
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();
            
        return response()->json(['success' => true]);
    }
}