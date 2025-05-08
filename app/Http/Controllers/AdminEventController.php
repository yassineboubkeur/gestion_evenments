<?php
namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminEventController extends Controller
{
    public function destroy(Event $event)
    {
        $user = request()->user();

        // Ensure only admin can delete via this controller
        if (!$user->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete associated image if exists
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully by admin']);
    }
}
