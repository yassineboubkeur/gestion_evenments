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
const [eventId,setEventId]= useState("");
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


    const handleBackToEvents = () => {
      setShowEventDetails(false);
      // Optionally refresh the events
      fetchEvents();
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {console.log(eventId)}
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar - Filters (350px width) */}
                    <div className="w-full md:w-[300px] bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-3">
                                    Search Events
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Search by name or description..."
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-3">
                                    Filter by Category
                                </h2>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={categoryFilter}
                                    onChange={(e) =>
                                        setCategoryFilter(e.target.value)
                                    }
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Conference">
                                        Conference
                                    </option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Concert">Concert</option>
                                    <option value="Exhibition">
                                        Exhibition
                                    </option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                {isAuthenticated ? (
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium">
                                                Welcome, {user?.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {user?.email}
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1">
                                                Role:{" "}
                                                {localStorage.getItem("role")}
                                            </p>
                                        </div>

                                        <div className="flex flex-col space-y-3">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/${userrole}/dashboard`
                                                    )
                                                }
                                                className="px-4 py-2 bg-indigo-600 text-white text-center rounded hover:bg-indigo-700 transition"
                                            >
                                                Go to Dashboard
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="px-4 py-2 bg-red-500 text-white text-center rounded hover:bg-red-600 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col space-y-3">
                                            <button
                                                onClick={handleLoginClick}
                                                className="px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition"
                                            >
                                                Login
                                            </button>
                                            <button
                                                onClick={handleRegisterClick}
                                                className="px-4 py-2 bg-green-500 text-white text-center rounded hover:bg-green-600 transition"
                                            >
                                                Register
                                            </button>
                                        </div>

                                        {/* Forms Container */}
                                        <div className="mt-4">
                                            {showLogin && (
                                                <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                                                    <LoginForm
                                                        onLoginSuccess={
                                                            checkAuthStatus
                                                        }
                                                    />
                                                    <button
                                                        onClick={closeForms}
                                                        className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            )}

                                            {showRegister && (
                                                <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                                                    <RegisterForm
                                                        onRegisterSuccess={
                                                            checkAuthStatus
                                                        }
                                                    />
                                                    <button
                                                        onClick={closeForms}
                                                        className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                                                    >
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

                    {/* Right Content - Events Listing */}
                    {/* // Updated Right Content - Events Listing section */}
                    <div className="flex-1">
{/*  */}
<div className="bg-white p-6 rounded-lg shadow-md">

{showEventDetails ? <EventDetails eventId={eventId} onBack={() => handleBackToEvents()} />:<h2 className="text-2xl font-bold mb-6">
                                Upcoming Events
                            </h2>
}
                            

                            {loading ? (
                                <div className="flex justify-center items-center ">
                                    <DotsLoadingAnimation />
                                </div>
                            ) : filteredEvents.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">
                                        No events found matching your criteria
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                                        >
                                            <div className="h-48 bg-gray-200 overflow-hidden">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${event.image}`}
                                                    alt={event.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4 flex-grow flex flex-col">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-semibold">
                                                        {event.name}
                                                    </h3>
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                        {event.category}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-3">
                                                    {new Date(
                                                        event.date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            weekday: "short",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </p>
                                                <p className="text-gray-700 mb-4 flex-grow">
                                                    {event.description}
                                                </p>
                                                <button
                                                    onClick={()=>{setShowEventDetails(true),setEventId(event.id)}}
                                                    className="text-blue-500 hover:underline self-start"
                                                >
                                                    View Details →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        
{/*  */}
                    </div>
                </div>
            </div>
        </div>
    );
}
