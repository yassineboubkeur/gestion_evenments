import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation/LoadingAnimation';
import LoginForm from './Login';
import PaymentProcedure from './PaymentProcedure';

export default function EventDetails({ eventId, onBack }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {};
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}`, {
          headers
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        
        const data = await response.json();
        setEvent(data.data || data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      setShowPayment(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    navigate('/booking-confirmation');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingAnimation size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-20 h-20 text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Error loading event</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-20 h-20 text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Event not found</h3>
        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or may have been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {showPayment ? (
          <PaymentProcedure 
            event={event}
            onBack={() => setShowPayment(false)}
            onPaymentComplete={handlePaymentComplete}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            {/* Back button */}
            <div className="px-6 pt-6">
              <button 
                onClick={() => onBack(false)}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to events
              </button>
            </div>

            <div className="md:flex">
              {/* Event Image */}
              <div className="md:w-1/2 p-6">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-md">
                  <img 
                    src={`http://127.0.0.1:8000/storage/${event.image}`} 
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {event.price > 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      <span className="font-semibold text-blue-700">${event.price}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(event.date).toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">About this event</h2>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Event Details</h2>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-28">Organizer:</span>
                      <span>{event.organizer || 'Not specified'}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-28">Availability:</span>
                      <span>{event.available_seats ? `${event.available_seats} seats left` : 'Unlimited seats'}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-28">Duration:</span>
                      <span>{event.duration_minutes ? `${event.duration_minutes} minutes` : 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={handleBookNow}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
                  >
                    Book Now
                  </button>
                  <button 
                    className="py-3 px-6 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Login Modal */}
            {showLogin && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h3>
                    <p className="text-gray-600 mb-6">Please login to book this event.</p>
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                  </div>
                  <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end">
                    <button
                      onClick={() => setShowLogin(false)}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}