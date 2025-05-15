import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingAnimationLitle from "../LoadingAnimation/LoadingAnimationLitle";
import { useNotification } from "../context/NotificationContext";

export default function EventApprovals() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const { addNotification } = useNotification();

    useEffect(() => {
        const fetchPendingEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/admin/pending-events",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch pending events");
                }

                const data = await response.json();
                setEvents(data);
                // addNotification('Pending events loaded successfully', 'success');
            } catch (error) {
                console.error("Error:", error);
                // addNotification(error.message || 'Failed to load pending events', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingEvents();
    }, [addNotification]);

    const handleApprove = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/api/admin/events/${eventId}/approve`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to approve event");
            }

            // Remove from list
            setEvents(events.filter((event) => event.id !== eventId));
            // addNotification('Event approved successfully!', 'success');
        } catch (error) {
            console.error("Error:", error);
            // addNotification(error.message || 'Failed to approve event', 'error');
        }
    };

    const handleReject = async () => {
        if (!selectedEvent || !rejectionReason) {
            // addNotification('Please provide a rejection reason', 'warning');
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/api/admin/events/${selectedEvent.id}/reject`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ reason: rejectionReason }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to reject event");
            }

            // Remove from list
            setEvents(events.filter((event) => event.id !== selectedEvent.id));
            setSelectedEvent(null);
            setRejectionReason("");
            // addNotification('Event rejected successfully', 'success');
        } catch (error) {
            console.error("Error:", error);
            // addNotification(error.message || 'Failed to reject event', 'error');
        }
    };

    if (loading) return <LoadingAnimationLitle />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Pending Event Approvals</h2>

            {events.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">
                        No pending events for approval
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            {event.image && (
                                <img
                                    src={`/storage/${event.image}`}
                                    alt={event.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">
                                    {event.name}
                                </h3>
                                <p className="text-gray-600 mb-2 line-clamp-2">
                                    {event.description}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Organized by: {event.organizer.name}
                                </p>

                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleApprove(event.id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => setSelectedEvent(event)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Rejection Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="font-bold text-lg mb-4">
                            Reject Event: {selectedEvent.name}
                        </h3>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Please provide a reason for rejection..."
                            className="w-full border rounded p-2 mb-4 h-32 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setSelectedEvent(null);
                                    setRejectionReason("");
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className={`px-4 py-2 rounded text-white transition-colors ${
                                    rejectionReason
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-red-300 cursor-not-allowed"
                                }`}
                                disabled={!rejectionReason}
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
