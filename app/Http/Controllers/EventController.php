<?php

namespace App\Http\Controllers;
use App\Mail\RegistrationConfirmation;
use App\Models\Registration;
use Illuminate\Support\Facades\Log;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{

    public function index(Request $request)
    {
        $events = Event::all();

        return response()->json($events);
    }
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:7048',
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
        Log::info('Full request input:', $request->all());

        Log::info('Incoming event update request:', $request->all());
    
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
            Log::warning('Validation failed for event update:', $validator->errors()->toArray());
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
    
        $data = $validator->validated();
        Log::info('Validated data for update:', $data);
    
        try {
            // Handle image update
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($event->image) {
                    Storage::disk('public')->delete($event->image);
                }
                $data['image'] = $request->file('image')->store('events', 'public');
                Log::info('New image stored at:', ['path' => $data['image']]);
            }
    
            if (empty($data)) {
                Log::info('No data provided for update.');
                return response()->json(['message' => 'No changes provided'], 400);
            }
    
            $event->update($data);
            Log::info('Event updated successfully', ['id' => $event->id]);
    
            return response()->json([
                'message' => 'Event updated successfully',
                'event' => $event->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Event update failed:', ['error' => $e->getMessage()]);
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

    public function allEvents()
    {
        try {
            $events = Event::orderBy('date', 'asc')->get();

    
            return response()->json([
                'success' => true,
                'data' => $events
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch events: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch events'
            ], 500);
        }
    }

    public function showPublic(Event $event)
{
    return response()->json([
        'data' => $event
    ]);
}
    public function stats(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'totalEvents' => $user->events()->count(),
            'upcomingEvents' => $user->events()
                                   ->where('date', '>=', now())
                                   ->count(),
            // 'totalParticipants' => $user->events()
            //                           ->withCount('participants')
            //                           ->get()
            //                           ->sum('participants_count'),
            
            'recentEvents' => $user->events()
                                //  ->withCount('participants')
                                 ->latest()
                                 ->take(3)
                                 ->get()
                                //  ->map(function ($event) {
                                //      return [
                                //          'id' => $event->id,
                                //          'name' => $event->name,
                                //          'date' => $event->date->format('Y-m-d'), // Changed from start_date to date
                                //          'participants_count' => $event->participants_count
                                //      ];
                                //  })
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'payment_id' => 'required|string',
            'payer_email' => 'required|email',
            'payer_name' => 'required|string',
            'amount' => 'required|numeric',
            'status' => 'required|string|in:COMPLETED,FAILED,PENDING',
            'payment_date' => 'nullable|date'
        ]);
    
        $event = Event::findOrFail($validated['event_id']);
        $user = $request->user();
    
        // Create registration record
        $registrationData = [
            'user_id' => $user->id,
            'event_id' => $event->id,
            'payment_id' => $validated['payment_id'],
            'payment_amount' => $validated['amount'],
            'payment_currency' => 'USD',
            'payment_status' => strtolower($validated['status']),
            'payment_date' => $validated['payment_date'] ?? now(),
            'payer_email' => $validated['payer_email'],
            'payer_name' => $validated['payer_name'],
            'ticket_quantity' => 1
        ];
    
        $registration = Registration::create($registrationData);
        $registration->load('event');
    
        try {
            // Send confirmation email
            Mail::to($validated['payer_email'])->send(new RegistrationConfirmation($registration));
            
            Log::info('Attempting to send email to: '.$validated['payer_email']);
            Mail::to($validated['payer_email'])->send(new RegistrationConfirmation($registration));
            Log::info('Email sent successfully to: '.$validated['payer_email']);
            return response()->json([
                'success' => true,
                'message' => 'Payment verified and registration completed',
                'registration_id' => $registration->id,
                'event' => [
                    'id' => $event->id,
                    'name' => $event->name
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Email sending failed: ' . $e->getMessage());
            Log::error('Email failed to send: '.$e->getMessage());

            return response()->json([
                'success' => true,
                'message' => 'Registration completed but email could not be sent',
                'registration_id' => $registration->id,
                'event' => [
                    'id' => $event->id,
                    'name' => $event->name
                ],
                'warning' => 'Confirmation email could not be sent'
            ]);
        }

     
    }
}