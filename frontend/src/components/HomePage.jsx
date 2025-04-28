import React, { useState, useEffect } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import DotsLoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import EventDetails from "./EventDetails";

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [eventId, setEventId] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const userrole = localStorage.getItem("role");
    // Check authentication status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    };

    // Fetch events from API
    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {};

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            setLoading(true);

            const response = await fetch(
                "http://127.0.0.1:8000/api/allevents",
                {
                    headers,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }

            const data = await response.json();
            setEvents(data.data || data);
            setLoading(false);
            console.log(userrole);
        } catch (error) {
            console.error("Error fetching events:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("permissions");
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

    const handleLoginClick = (e) => {
        e.preventDefault();
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setShowRegister(true);
        setShowLogin(false);
    };

    const closeForms = () => {
        setShowLogin(false);
        setShowRegister(false);
    };

    const handleBackToEvents = (val) => {
        setShowEventDetails(val);
        // Optionally refresh the events
        // fetchEvents();

        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {console.log(eventId)}
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar - Filters (350px width) */}
                    <div className="w-full md:w-[300px]   ">
                        <div className="h-fit bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                            <div className="space-y-6">
                                {/* Search Section */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-blue-500"
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
                                            placeholder="Search by name or description..."
                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg text-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
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
                                </div>

                                {/* Filter Section */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-blue-500"
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
                                        Filter by Category
                                    </h2>
                                    <select
                                        className="w-full p-3 border border-gray-200 rounded-lg text-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
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
                                <div className="pt-5 border-t border-gray-200">
                                    {isAuthenticated ? (
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl shadow-sm">
                                                <div className="flex items-center mb-2">
                                                    <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-semibold mr-3">
                                                        {user?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {user?.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {user?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                                    {localStorage.getItem(
                                                        "role"
                                                    )}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/${userrole}/dashboard`
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition flex items-center justify-center shadow-md hover:shadow-lg"
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
                                                            strokeWidth="2"
                                                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                                        ></path>
                                                    </svg>
                                                    Dashboard
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="px-4 py-2 bg-white border border-red-500 text-red-500 text-center rounded-lg hover:bg-red-50 transition flex items-center justify-center shadow-md hover:shadow-lg"
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
                                                            strokeWidth="2"
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        ></path>
                                                    </svg>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={handleLoginClick}
                                                    className="px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition flex items-center justify-center shadow-md hover:shadow-lg"
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
                                                            strokeWidth="2"
                                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                        ></path>
                                                    </svg>
                                                    Login
                                                </button>
                                                <button
                                                    onClick={
                                                        handleRegisterClick
                                                    }
                                                    className="px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition flex items-center justify-center shadow-md hover:shadow-lg"
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
                                                            strokeWidth="2"
                                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                                        ></path>
                                                    </svg>
                                                    Register
                                                </button>
                                            </div>

                                            {/* Forms Container */}
                                            <div className="mt-4">
                                                {showLogin && (
                                                    <div className="mb-4  border border-gray-200 rounded-xl bg-white shadow-sm">
                                                        <LoginForm
                                                            onLoginSuccess={
                                                                checkAuthStatus
                                                            }
                                                        />
                                                        <button
                                                            onClick={closeForms}
                                                            className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center"
                                                        >
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
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                ></path>
                                                            </svg>
                                                            Close
                                                        </button>
                                                    </div>
                                                )}

                                                {showRegister && (
                                                    <div className="mb-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                                                        <RegisterForm
                                                            onRegisterSuccess={
                                                                checkAuthStatus
                                                            }
                                                        />
                                                        <button
                                                            onClick={closeForms}
                                                            className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center"
                                                        >
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
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                ></path>
                                                            </svg>
                                                            Close
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Events Listing */}
                    {/* // Updated Right Content - Events Listing section */}
                    <div className="flex-1">
                        {/*  */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            {showEventDetails ? (
                                <EventDetails
                                    eventId={eventId}
                                    onBack={() => handleBackToEvents()}
                                />
                            ) : (
                                <>
                                    {loading ? (
                                        <div className="flex justify-center items-center py-16">
                                            <DotsLoadingAnimation size="lg" />
                                        </div>
                                    ) : filteredEvents.length === 0 ? (
                                        <div className="text-center py-16">
                                            <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
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
                                                We couldn't find any events
                                                matching your search. Try
                                                adjusting your filters.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-2xl font-bold text-gray-800">
                                                    Upcoming Events
                                                    <span className="ml-2 text-sm font-normal bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                                                        {filteredEvents.length}{" "}
                                                        {filteredEvents.length ===
                                                        1
                                                            ? "event"
                                                            : "events"}
                                                    </span>
                                                </h2>
                                                <div className="flex space-x-2">
                                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm flex items-center">
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
                                                                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                                            ></path>
                                                        </svg>
                                                        Sort
                                                    </button>
                                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm flex items-center">
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
                                                                d="M4 6h16M4 12h16M4 18h16"
                                                            ></path>
                                                        </svg>
                                                        Filter
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {filteredEvents.map((event) => (
                                                    <div
                                                        key={event.id}
                                                        className="border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                                                    >
                                                        <div className="relative h-64 overflow-hidden">
                                                            <img
                                                                src={`http://127.0.0.1:8000/storage/${event.image}`}
                                                                alt={event.name}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                            <div className="absolute top-3 right-3">
                                                                <span className="bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                                                                    {
                                                                        event.category
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="p-5 flex-grow flex flex-col">
                                                            <div className="mb-3">
                                                                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                                                                    {event.name}
                                                                </h3>
                                                                <div className="flex items-center text-gray-500 mt-1">
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
                                                                    <span className="text-sm">
                                                                        {
                                                                            event.location
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center text-gray-600 mb-4">
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
                                                                <span className="text-sm">
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

                                                            <p className="text-gray-700 mb-5 line-clamp-2">
                                                                {
                                                                    event.description
                                                                }
                                                            </p>

                                                            <div className="mt-auto flex justify-between items-center">
                                                                <span className="text-lg font-semibold text-blue-600">
                                                                    {event.price
                                                                        ? `$${event.price}`
                                                                        : "Free"}
                                                                </span>
                                                                <button
                                                                    onClick={() => {
                                                                        setShowEventDetails(
                                                                            true
                                                                        );
                                                                        setEventId(
                                                                            event.id
                                                                        );
                                                                        window.scrollTo(
                                                                            {
                                                                                top: 0,
                                                                                behavior:
                                                                                    "smooth",
                                                                            }
                                                                        );
                                                                    }}
                                                                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
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
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/*  */}
                    </div>
                </div>
            </div>
        </div>
    );
}
