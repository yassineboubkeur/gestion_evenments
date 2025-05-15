import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, getToken } from "../../utils/AuthenticatedUser";
import LoadingAnimationLitle from "../LoadingAnimation/LoadingAnimationLitle";
import StatsRegistration from "../StatsRegistration";

export default function OrganizerDashboard() {
    const user = getCurrentUser();
    const [stats, setStats] = useState({
        totalEvents: 0,
        upcomingEvents: 0,
        totalParticipants: 0,
        recentEvents: [],
    });
    const [loading, setLoading] = useState(true);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/organizer/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            Accept: "application/json",
                        },
                    }
                );

                if (!response.ok)
                    throw new Error("Failed to fetch dashboard stats");

                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/my-events",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok)
                    throw new Error("Failed to fetch user events");

                const data = await response.json();
                setUserEvents(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserEvents();
    }, []);

    return (
        <div className="space-y-8 md:relative">
            {/* Header Section */}
            <div className="flex flex-col  md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Organizer Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 mt-1">
                        Welcome back,{" "}
                        <span className="text-blue-600 font-medium">
                            {user?.name}
                        </span>
                        !
                    </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <Link
                        to="/organizer/events/create"
                        className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Create Event
                    </Link>
                    <button
                        onClick={() => setShowStats(true)}
                        className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        View Stats
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Your Events"
                    count={stats.totalEvents}
                    link="/organizer/events"
                    icon={
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    }
                    loading={loading}
                    color="blue"
                />

                <StatsCard
                    title="Upcoming Events"
                    count={stats.upcomingEvents}
                    link="/organizer/events?filter=upcoming"
                    icon={
                        <svg
                            className="w-6 h-6"
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
                    }
                    loading={loading}
                    color="green"
                />

                <StatsCard
                    title="Total Participants"
                    count={stats.totalParticipants}
                    link="/organizer/participants"
                    icon={
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    }
                    loading={loading}
                    color="purple"
                />
            </div>

            {/* Recent Events */}
            <div className="bg-white bg-opacity-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Your Recent Events
                    </h3>
                    <Link
                        to="/organizer/events"
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                        View all events
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <LoadingAnimationLitle />
                    </div>
                ) : stats.recentEvents && stats.recentEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.recentEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <svg
                            className="w-16 h-16 mx-auto text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="mt-4 text-gray-500">
                            No recent events found
                        </p>
                        <Link
                            to="/organizer/events/create"
                            className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Create your first event
                        </Link>
                    </div>
                )}
            </div>

            {/* Stats Registration Modal */}
            {showStats && (
                <StatsRegistration onClose={() => setShowStats(false)} />
            )}
        </div>
    );
}

function StatsCard({ title, count, link, icon, color, loading }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-800",
        green: "bg-green-50 text-green-800",
        purple: "bg-purple-50 text-purple-800",
    };

    return (
        <div
            className={`p-6 rounded-xl ${colorClasses[color]} border border-${color}-100`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium text-gray-700">
                        {title}
                    </h3>

                    {loading ? (
                        <LoadingAnimationLitle />
                    ) : (
                        <div className="text-3xl font-bold mt-2">{count}</div>
                    )}
                </div>
                <div className={`p-2 rounded-lg bg-${color}-100 bg-opacity-50`}>
                    {icon}
                </div>
            </div>
            <Link
                to={link}
                className={`mt-4 inline-flex items-center text-${color}-600 hover:text-${color}-800 font-medium`}
            >
                View details
                <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </Link>
        </div>
    );
}

function QuickAction({ to, label, icon, color }) {
    const iconPaths = {
        plus: "M12 6v6m0 0v6m0-6h6m-6 0H6",
        mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        "document-report":
            "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        cog: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    };

    const colorClasses = {
        blue: "bg-blue-600 hover:bg-blue-700",
        green: "bg-green-600 hover:bg-green-700",
        purple: "bg-purple-600 hover:bg-purple-700",
        gray: "bg-gray-600 hover:bg-gray-700",
    };

    return (
        <Link
            to={to}
            className={`px-4 py-2 ${colorClasses[color]} text-white rounded-lg transition-colors flex items-center`}
        >
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
                    d={iconPaths[icon]}
                />
            </svg>
            {label}
        </Link>
    );
}

function EventCard({ event }) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden relative hover:shadow-md transition-shadow">
            {event.image && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={`http://127.0.0.1:8000/storage/${event.image}`}
                        alt={event.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg text-gray-800">
                        {event.name}
                    </h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {event.category}
                    </span>
                </div>

                <div className="mt-3 space-y-2">
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
                        {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
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
                        {event.location || "Virtual Event"}
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
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        {event.available_places} available spots
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <Link
                        to={`/organizer/events/${event.id}/edit`}
                        // events/211/edit
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                    >
                        Manage event
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>

                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                            new Date(event.date) > new Date()
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {new Date(event.date) > new Date()
                            ? "Upcoming"
                            : "Completed"}
                    </span>
                    <span
                        className={`px-2 absolute top-2 py-1  text-md font-medium rounded-full ${
                            event.status === "approved"
                                ? "bg-green-500"
                                : "bg-red-400"
                        }`}
                        title={
                            event.status === "pending"
                                ? "waiting for admin approval"
                                : ""
                        }
                    >
                        {event.status}
                    </span>
                </div>
            </div>
        </div>
    );
}
