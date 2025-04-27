import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation/LoadingAnimation';

export default function EventDetails({eventId,onBack }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Event not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="  ">
      <div className="container mx-auto   py-4">
     
        <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex px-2  ">
            <div className="md:w-1/2 my-auto ">
              <img 
                src={`http://127.0.0.1:8000/storage/${event.image}`} 
                alt={event.name}
                className="w-full  object-cover h-96"
              />
            </div>
            
            <div className="py-2 ml-4 md:w-1/2">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{event.name}</h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {event.category}
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 text-lg mb-2">
                  <span className="font-semibold">Date & Time:</span> {new Date(event.date).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{event.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Organizer:</span> {event.organizer || 'Not specified'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Price:</span> {event.price ? `$${event.price}` : 'Free'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Available Seats:</span> {event.available_seats || 'Unlimited'}
                </p>
              </div>
              
              <button className="px-4 py-1 bg-blue-600  font-semibold text-white rounded-lg hover:bg-indigo-700 transition">
                Book Now
              </button>
              <button className="px-4 py-1 bg-green-600 ml-2 font-semibold text-white rounded-lg hover:bg-green-700 transition">
                Add to Cart
              </button>
              <button onClick={() => onBack()} className="px-4 py-1 bg-green-600 ml-2 font-semibold text-white rounded-lg hover:bg-green-700 transition">
                Continue exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}