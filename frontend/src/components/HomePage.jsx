import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import EventDetails from "./EventDetails";
import { useStyle } from "../context/StyleContext";
import ThemeBg from "./ThemeBg";
import { useRefresh } from "../context/RefreshContext";
import LikesOption from "./LikesOption";
import DotsLoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import AllEvents from "./AllEvents";

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
    const userrole = localStorage.getItem("role");
    const { refreshKey } = useRefresh();

    const glassStyle = {
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(10px)",
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

            // Ensure is_liked is properly set (default to false if not present)
            const eventsWithLikes = (data.data || data).map((event) => ({
                ...event,
                is_liked: event.is_liked || false,
            }));

            setEvents(eventsWithLikes);
            setLoading(false);
            // console.log("Fetched events with likes:", eventsWithLikes);
        } catch (error) {
            console.error("Error fetching events:", error);
            setLoading(false);
        }
    };

    const handleLike = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `http://127.0.0.1:8000/api/events/${eventId}/toggle-like`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update like");
            }
            // console.log(data);
            // Update both likes_count and is_liked
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === eventId
                        ? {
                              ...event,
                              likes_count: data.likes_count,
                              is_liked: data.liked, // Make sure your backend returns this
                          }
                        : event
                )
            );
        } catch (error) {
            console.error("Error toggling like:", error);
            alert(error.message || "Failed to update like");
        }
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    const handleBackToEvents = (val) => {
        setShowEventDetails(val);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        fetchEvents();
    }, [refreshKey]);

    return (
        <div
            className={`min-h-screen  ${
                sharedString ? `bg${sharedString}` : "bg0"
            }`}
        >
            <Navbar />

            {/* Floating background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 py-8 z-10">
                <div className="flex flex-col lg:flex-row gap-8 z-10">
                    {/* Left Sidebar - Filters */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="p-4 rounded-xl" style={glassStyle}>
                            <div className="pb-3 border-b border-white/20">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <div
                                            className="bg-white/30 p-3 rounded-lg"
                                            style={glassStyle}
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    className="w-20 h-20 rounded-full mr-2"
                                                    src={`http://127.0.0.1:8000/storage/${user.profile_image}`}
                                                    alt="profileimg"
                                                />
                                                <div className="truncate">
                                                    <p className="font-medium text-md text-gray-800 truncate">
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
                                                className="px-3 py-1.5 text-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full hover:opacity-90 transition font-semibold flex items-center justify-center shadow-sm"
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
                                                className="px-3 py-1.5 text-md bg-white/80 border border-red-500/30 text-red-500 rounded-full font-semibold hover:bg-red-50 transition flex items-center justify-center shadow-sm"
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
                                            className="px-3 py-1.5 text-md bg-gradient-to-r from-indigo-600 font-semibold to-blue-600 text-white rounded-full hover:opacity-90 transition flex items-center justify-center shadow-sm"
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
                                            className="px-3 py-1.5 text-md bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center shadow-sm"
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
                            <div className="space-y-4">
                                {/* Search Section */}
                                <div>
                                    <h2 className="text-md font-medium mb-2 flex items-center text-gray-800">
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
                                            className="w-full p-2 pl-8 text-md bg-white/80 border border-white/30 rounded-full outline-0 focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 transition-all backdrop-blur-sm"
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
                                    <h2 className="text-md font-medium mb-2 flex items-center text-gray-800">
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
                                        className="w-full p-2 text-md bg-white/80 border border-white/30 outline-0 rounded-full focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 transition-all appearance-none backdrop-blur-sm"
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
                                <div className="p-6">
                                    <ThemeBg />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Events Listing */}
                    <div className="flex-1">
                        <div
                            className="p-2 rounded-2xl  z-20"
                            style={glassStyle}
                        >
                            {showEventDetails ? (
                                <EventDetails
                                    eventId={eventId}
                                    onBack={() => handleBackToEvents(false)}
                                />
                            ) : (
                                <AllEvents
                                    loading={loading}
                                    filteredEvents={filteredEvents}
                                    currentEvents={currentEvents}
                                    eventsPerPage={eventsPerPage}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    paginate={paginate}
                                    setShowEventDetails={setShowEventDetails}
                                    setEventId={setEventId}
                                    handleLike={handleLike}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
