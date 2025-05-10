import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DotsLoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import EventDetails from "./EventDetails";
import LoginShortcut from "./LoginShortcut";
import { useLikes } from "../context/LikesContext";
import { useStyle } from "../context/StyleContext";

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [eventId, setEventId] = useState("");
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;
    const navigate = useNavigate();
    const { updateSharedString, sharedString } = useStyle();
    const { likedEvents, fetchUserLikes, toggleLike } = useLikes();
    const userrole = localStorage.getItem("role");

    // Glassmorphism style variables
    const glassStyle = {
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(10px)",
        // border: "1px solid rgba(255, 255, 255, 0.18)",
        // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    };

    useEffect(() => {
        checkAuthStatus();
        fetchEvents();
    }, []);

    const checkAuthStatus = () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
            fetchUserLikes();
        }
    };

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {};
            if (token) headers["Authorization"] = `Bearer ${token}`;

            setLoading(true);
            const response = await fetch(
                "http://127.0.0.1:8000/api/allevents",
                { headers }
            );

            if (!response.ok) throw new Error("Failed to fetch events");

            const data = await response.json();
            setEvents(data.data || data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching events:", error);
            setLoading(false);
        }
    };

    const handleLike = async (eventId, e) => {
        e.stopPropagation();
        await toggleLike(eventId);
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        navigate("/");
    };

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || event.category === categoryFilter;
        return matchesSearch && matchesCategory;
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

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    const handleBackToEvents = (val) => {
        setShowEventDetails(val);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleClick = (e) => {
        console.log(sharedString);
        updateSharedString(e);
        console.log(sharedString);
    };

    return (
        <div className={`min-h-screen bg${sharedString}`}>
            <Navbar />

            {/* Floating background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Filters */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="p-4 rounded-xl" style={glassStyle}>
                            <div className="space-y-4">
                                {/* Search Section */}
                                <div>
                                    <h2
                                        className={`text-md font-medium mb-2 flex items-center ${
                                            sharedString != "0" &&
                                            sharedString != "7"
                                                ? "text_light"
                                                : "text_dark"
                                        }`}
                                    >
                                        {console.log(sharedString)}
                                        <svg
                                            className="w-4 h-4 mr-2 text-indigo-600"
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
                                        Search Events
                                    </h2>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full p-2 pl-8 text-sm bg-white/80 border border-white/30 rounded-lg focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 transition-all backdrop-blur-sm"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                            <svg
                                                className="h-4 w-4 text-gray-400"
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
                                </div>

                                {/* Filter Section */}
                                <div>
                                    <h2
                                        className={`text-md font-medium mb-2 flex items-center ${
                                            sharedString != "0" &&
                                            sharedString != "7"
                                                ? "text_light"
                                                : "text_dark"
                                        }`}
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2 text-indigo-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            ></path>
                                        </svg>
                                        Filter
                                    </h2>
                                    <select
                                        className="w-full p-2 text-sm bg-white/80 border border-white/30 rounded-lg focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 transition-all appearance-none backdrop-blur-sm"
                                        value={categoryFilter}
                                        onChange={(e) =>
                                            setCategoryFilter(e.target.value)
                                        }
                                    >
                                        <option value="all">
                                            All Categories
                                        </option>
                                        <option value="Conference">
                                            Conference
                                        </option>
                                        <option value="Workshop">
                                            Workshop
                                        </option>
                                        <option value="Concert">Concert</option>
                                        <option value="Exhibition">
                                            Exhibition
                                        </option>
                                        <option value="Sports">Sports</option>
                                    </select>
                                </div>

                                {/* User Section */}
                                <div className="pt-3 border-t border-white/20">
                                    {isAuthenticated ? (
                                        <div className="space-y-3">
                                            <div
                                                className="bg-white/30 p-3 rounded-lg"
                                                style={glassStyle}
                                            >
                                                <div className="flex items-center">
                                                   
                                                    <img   className="w-20 h-20 rounded-full mr-2"
                                                            src={
                                                                "http://127.0.0.1:8000/storage/" +
                                                                user.profile_image
                                                            }
                                                            alt="profileimg"
                                                        />
                                                    <div className="truncate">
                                                        <p className="font-medium text-sm text-gray-800 truncate">
                                                            {user?.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600 truncate">
                                                            {user?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="inline-block px-1.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full mt-1">
                                                    {userrole}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/${userrole}/dashboard`
                                                        )
                                                    }
                                                    className="px-3 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition flex items-center justify-center shadow-sm"
                                                >
                                                    <svg
                                                        className="w-3 h-3 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                                        ></path>
                                                    </svg>
                                                    Dashboard
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="px-3 py-1.5 text-sm bg-white/80 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-50 transition flex items-center justify-center shadow-sm"
                                                >
                                                    <svg
                                                        className="w-3 h-3 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        ></path>
                                                    </svg>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                to="/login"
                                                className="px-3 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition flex items-center justify-center shadow-sm"
                                            >
                                                <svg
                                                    className="w-3 h-3 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                    ></path>
                                                </svg>
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="px-3 py-1.5 text-sm bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg hover:opacity-90 transition flex items-center justify-center shadow-sm"
                                            >
                                                <svg
                                                    className="w-3 h-3 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                                    ></path>
                                                </svg>
                                                Register
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-5 gap-1 justify-between">
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <button
                                            key={i}
                                            className="transition-all duration-300 ease-in-out hover:scale-105"
                                            onClick={() => {
                                                handleClick(i);
                                            }}
                                        >
                                            <img
                                                className="w-10 h-10 rounded-full object-cover transition-all duration-300 ease-in-out hover:w-12 hover:h-12"
                                                src={`bg${i}.png`}
                                                alt={`Background ${i}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Events Listing */}
                    <div className="flex-1">
                        <div className="p-6 rounded-2xl" style={glassStyle}>
                            {showEventDetails ? (
                                <EventDetails
                                    eventId={eventId}
                                    onBack={() => handleBackToEvents(false)}
                                />
                            ) : (
                                <>
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
                                                Try adjusting your search or
                                                filters to find what you're
                                                looking for.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <h2
                                                    className={`text-2xl font-bold ${
                                                        sharedString != 0 &&
                                                        sharedString != 7
                                                            ? "text_light"
                                                            : "text_dark"
                                                    } `}
                                                >
                                                    Discover Events
                                                    <span className="ml-2 text-sm font-normal bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                                                        {filteredEvents.length}{" "}
                                                        {filteredEvents.length ===
                                                        1
                                                            ? "event"
                                                            : "events"}
                                                    </span>
                                                </h2>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {currentEvents.map((event) => (
                                                    <div
                                                        key={event.id}
                                                        className="bg-white/80 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative cursor-pointer backdrop-blur-sm"
                                                        onClick={() => {
                                                            setShowEventDetails(
                                                                true
                                                            );
                                                            setEventId(
                                                                event.id
                                                            );
                                                        }}
                                                    >
                                                        <div className="relative h-56 overflow-hidden">
                                                            <img
                                                                src={`http://127.0.0.1:8000/storage/${event.image}`}
                                                                alt={event.name}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                                            <div className="absolute top-3 right-3">
                                                                <span className="bg-white/90 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                                                                    {
                                                                        event.category
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="absolute bottom-3 left-3">
                                                                <span className="text-white font-medium">
                                                                    {event.price
                                                                        ? `$${event.price}`
                                                                        : "Free"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="p-5 flex-grow flex flex-col">
                                                            <div className="mb-2">
                                                                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                                                                    {event.name}
                                                                </h3>
                                                                <div className="flex items-center text-gray-500 mt-1 text-sm">
                                                                    <svg
                                                                        className="w-4 h-4 mr-1"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                        ></path>
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        ></path>
                                                                    </svg>
                                                                    <span>
                                                                        {
                                                                            event.address
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center text-gray-600 mb-3 text-sm">
                                                                <svg
                                                                    className="w-4 h-4 mr-1"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                    ></path>
                                                                </svg>
                                                                <span>
                                                                    {new Date(
                                                                        event.date
                                                                    ).toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            month: "short",
                                                                            day: "numeric",
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                        }
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                                                                {
                                                                    event.description
                                                                }
                                                            </p>

                                                            <div className="mt-auto flex justify-between items-center">
                                                                <button
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        setShowEventDetails(
                                                                            true
                                                                        );
                                                                        setEventId(
                                                                            event.id
                                                                        );
                                                                    }}
                                                                    className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors text-sm"
                                                                >
                                                                    View Details
                                                                    <svg
                                                                        className="w-4 h-4 ml-1"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M9 5l7 7-7 7"
                                                                        ></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Like Button */}
                                                        <div className="absolute top-3 left-3 flex items-center space-x-1">
                                                            <button
                                                                onClick={(e) =>
                                                                    handleLike(
                                                                        event.id,
                                                                        e
                                                                    )
                                                                }
                                                                className="p-2 rounded-full bg-white/90 shadow-sm hover:bg-gray-100 transition-colors"
                                                            >
                                                                <svg
                                                                    className={`w-5 h-5 ${
                                                                        likedEvents.includes(
                                                                            event.id
                                                                        )
                                                                            ? "text-red-500 fill-red-500"
                                                                            : "text-gray-400"
                                                                    }`}
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="1.5"
                                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <span className="text-sm text-gray-600 bg-white/90 px-2 py-1 rounded-full">
                                                                {event.likes_count ||
                                                                    0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Pagination */}
                                            {filteredEvents.length >
                                                eventsPerPage && (
                                                <div className="flex justify-center mt-8">
                                                    <nav className="inline-flex rounded-md shadow-sm">
                                                        <button
                                                            onClick={() =>
                                                                paginate(
                                                                    Math.max(
                                                                        1,
                                                                        currentPage -
                                                                            1
                                                                    )
                                                                )
                                                            }
                                                            disabled={
                                                                currentPage ===
                                                                1
                                                            }
                                                            className={`px-4 py-2 rounded-l-md border ${
                                                                currentPage ===
                                                                1
                                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            Previous
                                                        </button>

                                                        {Array.from(
                                                            {
                                                                length: totalPages,
                                                            },
                                                            (_, i) => i + 1
                                                        ).map((number) => (
                                                            <button
                                                                key={number}
                                                                onClick={() =>
                                                                    paginate(
                                                                        number
                                                                    )
                                                                }
                                                                className={`px-4 py-2 border-t border-b ${
                                                                    currentPage ===
                                                                    number
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
                                                                        currentPage +
                                                                            1
                                                                    )
                                                                )
                                                            }
                                                            disabled={
                                                                currentPage ===
                                                                totalPages
                                                            }
                                                            className={`px-4 py-2 rounded-r-md border ${
                                                                currentPage ===
                                                                totalPages
                                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            Next
                                                        </button>
                                                    </nav>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
