import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getCurrentUser } from '../../utils/AuthenticatedUser';
import axios from "axios";
import { getCurrentUser } from "../../utils/AuthenticatedUser";
import DotsLoadingAnimation from "../LoadingAnimation/LoadingAnimation";
// import { API_BASE_URL } from '../../config';

export default function ParticipantEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = getCurrentUser();

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/participant/registrations`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                const data = response.data;
                if (data.success && Array.isArray(data.data)) {
                    setEvents(data.data);
                } else {
                    throw new Error("Unexpected API response format");
                }

                // setEvents(response.data.data);
                // console.log(response.data.data);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch events"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRegisteredEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <DotsLoadingAnimation />{" "}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-5 w-5 text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const getEventStatus = (eventDate) => {
        const now = new Date();
        const eventDateTime = new Date(eventDate);
        return eventDateTime > now ? "Upcoming" : "Closed";
    };

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Your Registered Events
                    {events.length > 0 && (
                        <span className="ml-2 text-indigo-600">
                            ({events.length})
                        </span>
                    )}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Here are all the events you've registered for.
                </p>
            </div>

            {events.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                        No registered events
                    </h3>
                    <p className="mt-1 text-gray-500">
                        You haven't registered for any events yet.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/participant/events"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Browse Events
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event,idkey) => (
                        <div
                        key={idkey}
                            
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                        >
                            <div  className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div  className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {event.event.name}
                                    </h3>
                                    <div className="mt-2 flex flex-wrap gap-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>
                                                {new Date(
                                                    event.event.date
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <span>{event.event.address}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span>
                                                {event.event.duration_minutes}{" "}
                                                minutes
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-gray-600">
                                        {event.event.description}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                        Registered
                                    </span>
                                    <span
                                        className={`mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                                            getEventStatus(event.event.date) ===
                                            "Upcoming"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {getEventStatus(event.event.date)}
                                    </span>
                                    <span className="mt-2 text-lg font-semibold text-gray-900">
                                        ${event.event.price}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link
                                    to={`/events/${event.event.id}`}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
                                >
                                    View Event Details
                                </Link>
                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center">
                                    Download Ticket
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
