<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    // Like an event
    public function like(Event $event)
    {
        $user = Auth::user();
        
        if ($user->likedEvents()->where('event_id', $event->id)->exists()) {
            return response()->json(['message' => 'You already liked this event'], 409);
        }

        $user->likedEvents()->attach($event->id);

        return response()->json([
            'message' => 'Event liked successfully',
            'likes_count' => $event->likes()->count()
        ]);
    }

    // Unlike an event
    public function unlike(Event $event)
    {
        $user = Auth::user();
        
        if (!$user->likedEvents()->where('event_id', $event->id)->exists()) {
            return response()->json(['message' => 'You have not liked this event'], 409);
        }

        $user->likedEvents()->detach($event->id);

        return response()->json([
            'message' => 'Event unliked successfully',
            'likes_count' => $event->likes()->count()
        ]);
    }

    // Check if user liked an event
    public function checkLike(Event $event)
    {
        $user = Auth::user();
        
        return response()->json([
            'liked' => $user->likedEvents()->where('event_id', $event->id)->exists()
        ]);
    }

    // Get likes count for an event
    public function likesCount(Event $event)
    {
        return response()->json([
            'likes_count' => $event->likes()->count()
        ]);
    }

    // Get user's liked events
    public function userLikes()
    {
        $user = Auth::user();
        
        return response()->json([
            'liked_events' => $user->likedEvents()->with('organizer')->get()
        ]);
    }

    public function toggleLike(Event $event)
{
    $user = auth()->user();
    
    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    try {
        // Check if user already liked the event
        $alreadyLiked = $user->likedEvents()
                           ->where('event_id', $event->id)
                           ->exists();
        
        if ($alreadyLiked) {
            $user->likedEvents()->detach($event->id);
            $liked = false;
        } else {
            $user->likedEvents()->attach($event->id);
            $liked = true;
        }

        // Get updated likes count
        $likesCount = $event->likes()->count();

        return response()->json([
            'success' => true,
            'liked' => $liked,
            'likes_count' => $likesCount
        ]);

    } catch (\Exception $e) {
        \Log::error('Like error: '.$e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Failed to toggle like',
            'error' => $e->getMessage()
        ], 500);
    }
}
}