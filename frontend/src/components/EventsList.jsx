import React, { useEffect, useState } from "react";
import DotsLoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import { useNotification } from "../context/NotificationContext";

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const eventsPerPage = 6;
    const { addNotification } = useNotification();
    const [statusFilter, setStatusFilter] = useState("all");
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/events", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch events");

            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?"))
            return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/api/admin/events/${eventId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to delete event");

            setEvents(events.filter((event) => event.id !== eventId));
            setModalOpen(false); // Close modal after deletion
            addNotification("Event deleted successfully", "warning");
        } catch (error) {
            console.error("Error deleting event:", error);
            addNotification(error.message || "Failed to delete event", "error");
        }
    };

    const handleApprove = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/api/events/${eventId}/approve`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to approve event");

            // Update the event status in the local state
            setEvents(
                events.map((event) =>
                    event.id === eventId
                        ? { ...event, status: "approved" }
                        : event
                )
            );
            setModalOpen(false); // Close modal after approval
            addNotification("Event approved successfully", "success");
        } catch (error) {
            console.error("Error approving event:", error);
            addNotification(
                error.message || "Failed to approve event",
                "error"
            );
        }
    };

    // Filter events based on search
    // const filteredEvents = events.filter(event =>
    //   event.name.toLowerCase().includes(search.toLowerCase())
    // );
    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.name
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || event.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(
        indexOfFirstEvent,
        indexOfLastEvent
    );
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // Open modal with event details
    const openEventModal = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    // Glassmorphism style
    const glassStyle = {
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    };

    return (
        <div className="min-h-screen rounded-2xl  p-6">
            {/* Floating background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
            </div>

            <div className="container mx-auto z-10">
                {/* Search Input */}
                <div className="mb-8">
                    <h1 className="text-lg font-semibold mb-2 text-gray-800">
                        Manage events
                    </h1>
                    <div className="rounded-2xl" style={glassStyle}>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full p-3 pl-10 bg-white/80 border border-white/30 rounded-xl text-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all backdrop-blur-sm"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center space-x-4 bg-white/80 p-2 rounded-xl border border-white/30">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="filter-all"
                                        name="status-filter"
                                        value="all"
                                        checked={statusFilter === "all"}
                                        onChange={() => setStatusFilter("all")}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor="filter-all"
                                        className="ml-2 text-sm font-medium text-gray-700"
                                    >
                                        All
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="filter-approved"
                                        name="status-filter"
                                        value="approved"
                                        checked={statusFilter === "approved"}
                                        onChange={() =>
                                            setStatusFilter("approved")
                                        }
                                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                                    />
                                    <label
                                        htmlFor="filter-approved"
                                        className="ml-2 text-sm font-medium text-gray-700"
                                    >
                                        Approved
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="filter-pending"
                                        name="status-filter"
                                        value="pending"
                                        checked={statusFilter === "pending"}
                                        onChange={() =>
                                            setStatusFilter("pending")
                                        }
                                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                                    />
                                    <label
                                        htmlFor="filter-pending"
                                        className="ml-2 text-sm font-medium text-gray-700"
                                    >
                                        Pending
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="filter-rejected"
                                        name="status-filter"
                                        value="rejected"
                                        checked={statusFilter === "rejected"}
                                        onChange={() =>
                                            setStatusFilter("rejected")
                                        }
                                        className="h-4 w-4  text-red-600 focus:ring-red-500"
                                    />
                                    <label
                                        htmlFor="filter-rejected"
                                        className="ml-2 text-sm font-medium text-gray-700"
                                    >
                                        Rejected
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="p-6 rounded-2xl" style={glassStyle}>
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <DotsLoadingAnimation size="lg" />
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">
                                No events found
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Try adjusting your search to find what you're
                                looking for.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        onClick={() => openEventModal(event)}
                                        className="bg-white/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col backdrop-blur-sm cursor-pointer"
                                    >
                                        {/* Event Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${event.image}`}
                                                alt={event.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-blue-600">
                                                {event.category || "General"}
                                            </div>
                                            {event.status === "pending" && (
                                                <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    Pending Approval
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                                                {event.name}
                                            </h2>

                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p>
                                                    <span className="font-semibold text-gray-700">
                                                        Date:
                                                    </span>{" "}
                                                    {new Date(
                                                        event.date
                                                    ).toLocaleString()}
                                                </p>
                                                <p>
                                                    <span className="font-semibold text-gray-700">
                                                        Price:
                                                    </span>{" "}
                                                    {event.price
                                                        ? `$${parseFloat(
                                                              event.price
                                                          ).toFixed(2)}`
                                                        : "Free"}
                                                </p>
                                                <p>
                                                    <span className="font-semibold text-gray-700">
                                                        Status:
                                                    </span>{" "}
                                                    <span
                                                        className={`font-medium ${
                                                            event.status ===
                                                            "approved"
                                                                ? "text-green-600"
                                                                : event.status ===
                                                                  "rejected"
                                                                ? "text-red-600"
                                                                : "text-yellow-600"
                                                        }`}
                                                    >
                                                        {event.status ||
                                                            "pending"}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {filteredEvents.length > eventsPerPage && (
                                <div className="flex justify-center mt-8">
                                    <nav className="inline-flex rounded-md shadow-sm">
                                        <button
                                            onClick={() =>
                                                paginate(
                                                    Math.max(1, currentPage - 1)
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className={`px-4 py-2 rounded-l-md border ${
                                                currentPage === 1
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                        >
                                            Previous
                                        </button>

                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((number) => (
                                            <button
                                                key={number}
                                                onClick={() => paginate(number)}
                                                className={`px-4 py-2 border-t border-b ${
                                                    currentPage === number
                                                        ? "bg-indigo-600 text-white"
                                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                {number}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() =>
                                                paginate(
                                                    Math.min(
                                                        totalPages,
                                                        currentPage + 1
                                                    )
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className={`px-4 py-2 rounded-r-md border ${
                                                currentPage === totalPages
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Event Details Modal */}
            {modalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {selectedEvent.name}
                                </h2>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-6">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${selectedEvent.image}`}
                                    alt={selectedEvent.name}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-700 mb-2">
                                            Event Details
                                        </h3>
                                        <div className="space-y-2">
                                            <p>
                                                <span className="font-medium">
                                                    Date:
                                                </span>{" "}
                                                {new Date(
                                                    selectedEvent.date
                                                ).toLocaleString()}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Location:
                                                </span>{" "}
                                                {selectedEvent.address}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Duration:
                                                </span>{" "}
                                                {selectedEvent.duration_minutes}{" "}
                                                minutes
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Available Places:
                                                </span>{" "}
                                                {selectedEvent.available_places}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-700 mb-2">
                                            Pricing & Category
                                        </h3>
                                        <div className="space-y-2">
                                            <p>
                                                <span className="font-medium">
                                                    Price:
                                                </span>{" "}
                                                {selectedEvent.price
                                                    ? `$${parseFloat(
                                                          selectedEvent.price
                                                      ).toFixed(2)}`
                                                    : "Free"}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Category:
                                                </span>{" "}
                                                {selectedEvent.category}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Status:
                                                </span>{" "}
                                                <span
                                                    className={`font-medium ${
                                                        selectedEvent.status ===
                                                        "approved"
                                                            ? "text-green-600"
                                                            : selectedEvent.status ===
                                                              "rejected"
                                                            ? "text-red-600"
                                                            : "text-yellow-600"
                                                    }`}
                                                >
                                                    {selectedEvent.status ||
                                                        "pending"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-700 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-600 whitespace-pre-line">
                                        {selectedEvent.description}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                                    {selectedEvent.status !== "approved" && (
                                        <button
                                            onClick={() =>
                                                handleApprove(selectedEvent.id)
                                            }
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>Approve Event</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            handleDelete(selectedEvent.id)
                                        }
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        <span>Delete Event</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
