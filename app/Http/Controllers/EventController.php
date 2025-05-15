<?php

namespace App\Http\Controllers;
use App\Mail\RegistrationConfirmation;
use App\Notifications\EventApprovedNotification;
use App\Notifications\EventRejectedNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\Registration;
use App\Models\User;
use App\Notifications\EventCreatedNotification;
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


    public function myEvents(Request $request)
    {
        $events = Event::where('organizer_id', $request->user()->id)
            ->withCount('registrations')
            ->with('registrations') // Include registrations data
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
        $data['status'] = 'pending'; // Set default status

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event = Event::create($data);

        // Notify admins
        $adminUsers = User::role('admin')->get();
        Notification::send($adminUsers, new EventCreatedNotification($event, $request->user()));

        return response()->json([
            'message' => 'Event created successfully and pending admin approval',
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
            $events = Event::where('status', 'approved')
                ->withCount('likes')
                ->orderBy('date', 'desc')
                ->get();

            // Add is_liked flag if user is authenticated
            if (auth()->check()) {
                $events->each(function ($event) {
                    $event->is_liked = $event->likes()->where('user_id', auth()->id())->exists();
                });
            }

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
    $event->load('organizer');

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

            Log::info('Attempting to send email to: ' . $validated['payer_email']);
            Mail::to($validated['payer_email'])->send(new RegistrationConfirmation($registration));
            Log::info('Email sent successfully to: ' . $validated['payer_email']);
            return response()->json([
                'success' => true,
                'message' => 'Payment verified and registration completed',
                'registration_id' => $registration->id,
                'event' => [
                    'id' => $event->id,
                    'name' => $event->name
                ]
            ]);
            // logic pour enregistrer le document dans une table : confirmationdoc : id , id_user , id-event , path .....     (new endpoint)
        } catch (\Exception $e) {
            Log::error('Email sending failed: ' . $e->getMessage());
            Log::error('Email failed to send: ' . $e->getMessage());

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

    // In EventController.php

    public function toggleLike(Event $event)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
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
            \Log::error('Like error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle like',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // In EventController.php

    // Get pending events
    public function pendingEvents()
    {
        $events = Event::where('status', 'pending')
            ->with('organizer')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($events);
    }

    // Approve an event
    public function approveEvent(Event $event)
    {
        $event->update(['status' => 'approved']);

        // Notify the organizer
        $event->organizer->notify(new EventApprovedNotification($event));

        return response()->json([
            'message' => 'Event approved successfully',
            'event' => $event
        ]);
    }

    // Reject an event
    public function rejectEvent(Request $request, Event $event)
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:500'
        ]);

        $event->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['reason']
        ]);

        // Notify the organizer
        $event->organizer->notify(new EventRejectedNotification($event, $validated['reason']));

        return response()->json([
            'message' => 'Event rejected successfully',
            'event' => $event
        ]);
    }

    /**
     * Get all registered events for the current participant
     */
    public function registrations(Request $request)
    {
        try {
            $user = $request->user();

            // Get registrations with event details
            $registrations = Registration::where('user_id', $user->id)
                ->with([
                    'event' => function ($query) {
                        $query->select('id', 'name', 'date', 'address', 'duration_minutes', 'price', 'description', 'image');
                    }
                ])
                ->orderBy('created_at', 'desc')
                ->get();

            // Transform the data to include both registration and event details
            $response = $registrations->map(function ($registration) {
                return [
                    'registration_id' => $registration->id,
                    'registration_date' => $registration->created_at->format('Y-m-d H:i:s'),
                    'payment_status' => $registration->payment_status,
                    'payment_amount' => $registration->payment_amount,
                    'event' => $registration->event
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $response
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch participant registrations: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch your registrations'
            ], 500);
        }
    }
}