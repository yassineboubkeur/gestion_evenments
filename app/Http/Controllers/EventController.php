<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    // Get all events for the current organizer
    public function myEvents(Request $request)
    {
        $events = Event::where('organizer_id', $request->user()->id)
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($events);
    }

    // Create a new event
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'address' => 'required|string|max:255',
            'available_places' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'duration_minutes' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();
        $data['organizer_id'] = $request->user()->id;

        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event = Event::create($data);

        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event
        ], 201);
    }

    // Get a specific event
    public function show(Event $event)
    {
        // Ensure the organizer can only access their own events
        if ($event->organizer_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($event);
    }

    // Update an event
    public function update(Request $request, Event $event)
{
    // Verify ownership
    if ($event->organizer_id !== $request->user()->id) {
        return response()->json(['message' => 'Unauthorized - You are not the organizer of this event'], 403);
    }

    $validator = Validator::make($request->all(), [
        'name' => 'sometimes|string|max:255',
        'description' => 'nullable|string',
        'date' => 'sometimes|date',
        'address' => 'sometimes|string|max:255',
        'available_places' => 'sometimes|integer|min:1',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:7048',
        'duration_minutes' => 'sometimes|integer|min:1',
        'price' => 'sometimes|numeric|min:0',
        'category' => 'sometimes|string|max:255',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $validator->validated();

    try {
        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event->update($data);

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event->fresh() // Get fresh instance from database
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to update event',
            'error' => $e->getMessage()
        ], 500);
    }
}

    // Delete an event
    public function destroy(Event $event)
    {
        // Verify ownership
        if ($event->organizer_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete associated image if exists
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}