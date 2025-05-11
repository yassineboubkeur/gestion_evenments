import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import LoginForm from "./Login";
import PaymentProcedure from "./PaymentProcedure";
import { useLikes } from "../context/LikesContext";
import { useStyle } from "../context/StyleContext";
import LoadingComponent from "./LoadingAnimation/LoadingComponent";

export default function EventDetails({ eventId, onBack }) {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");
    const { likedEvents, toggleLike } = useLikes();
    const { sharedString } = useStyle();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = token
                    ? { Authorization: `Bearer ${token}` }
                    : {};
                const res = await fetch(
                    `http://127.0.0.1:8000/api/events/${eventId}`,
                    { headers }
                );

                if (!res.ok) throw new Error("Failed to fetch event details");
                const data = await res.json();
                setEvent(data.data || data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    const handleBookNow = () => {
        isAuthenticated ? setShowPayment(true) : setShowLogin(true);
    };

    const handleLike = async () => {
        const result = await toggleLike(event.id);
        if (result?.needsLogin) setShowLogin(true);
    };

    const handleLoginSuccess = () => setShowLogin(false);
    const handlePaymentComplete = () => {
        setShowPayment(false);
        navigate("/booking-confirmation");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                {/* <LoadingAnimation size="lg" /> */}
                <LoadingComponent/>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
                <p className="text-gray-600 mb-6">
                    {error || "Event not found."}
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go Home
                </button>
            </div>
        );
    }

    const isLiked = likedEvents.includes(event.id);

    return (
        <div className="min-h-screen ">
            <div className="max-w-6xl mx-auto   rounded-2xl overflow-hidden  ">
                {showPayment ? (
                    <PaymentProcedure
                        event={event}
                        onBack={() => setShowPayment(false)}
                        onPaymentComplete={handlePaymentComplete}
                    />
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between ">
                            <button
                                onClick={() => onBack(false)}
                                className={`${
                                    sharedString != 0 && sharedString != 7
                                        ? "text_dark"
                                        : "text_dark"
                                }  font-medium flex items-center`}
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
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                Back to Events
                            </button>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {event.category}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="grid md:grid-cols-2 gap-8  h-[540px]">
                            {/* Image */}
                            <div className="relative overflow-hidden rounded-xl shadow-md h-full">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${event.image}`}
                                    alt={event.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                {event.price > 0 && (
                                    <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full shadow">
                                        <span className="font-semibold text-blue-700">
                                            ${event.price}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="overflow-y-auto pr-2">
    <h1 className={`text-3xl font-bold ${sharedString != 0 && sharedString != 7 ? 'text_dark' : 'text_dark'} mb-2`}>
        {event.name}
    </h1>

    <div className={`flex items-center ${sharedString != 0 && sharedString != 7 ? 'text_dark' : 'text_dark'} mb-1`}>
        <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
        </svg>
        <span>{event.address}</span>
    </div>

    <div className={`flex items-center ${sharedString != 0 && sharedString != 7 ? 'text_dark' : 'text_dark'} mb-3`}>
        <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14"
            />
        </svg>
        <span>
            {new Date(event.date).toLocaleString(
                "en-US",
                {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }
            )}
        </span>
    </div>

    <div className="mb-3">
        <h2 className={`text-xl font-semibold ${sharedString != 0 && sharedString != 7 ? 'text_dark' : 'text_dark'} mb-1`}>
            About
        </h2>
        <p className={`${sharedString !== 0 && sharedString !== 7 ? 'text_dark' : 'text_dark'} leading-relaxed`}>
            {event.description}
        </p>
    </div>

    <div className={`mb-6 space-y-2 text-sm ${sharedString != 0 && sharedString != 7 ? 'text_dark' : 'text_dark'}`}>
        <div>
            <strong>Organizer:</strong>{" "}
            {event.organizer?.name || "N/A"}
        </div>
        <div>
            <strong>Seats:</strong>{" "}
            {event.available_places || "Unlimited"}
        </div>
        <div>
            <strong>Duration:</strong>{" "}
            {event.duration_minutes
                ? `${event.duration_minutes} mins`
                : "N/A"}
        </div>
    </div>

    <div className="flex gap-4 mt-3">
        <button
            onClick={handleBookNow}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow"
        >
            Book Now
        </button>
        <button
            onClick={handleLike}
            className={`p-3 rounded-lg transition ${
                isLiked
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
        >
            <svg
                className={`w-5 h-5 ${
                    isLiked ? "fill-current" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    </div>
</div>
                        </div>
                    </>
                )}
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Login Required
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Please log in to continue booking.
                        </p>
                        <LoginForm onLoginSuccess={handleLoginSuccess} miniLogin={true} />
                        <div className="text-right mt-4">
                            <button
                                onClick={() => setShowLogin(false)}
                                className="text-sm text-gray-500 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
