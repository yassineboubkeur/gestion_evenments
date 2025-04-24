// src/components/Dashboard/ParticipantDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/AuthenticatedUser';

export default function ParticipantDashboard() {
  const user = getCurrentUser();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Participant Dashboard</h1>
      <p className="text-lg">Welcome back, {user?.name}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Registered Events</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
          <Link to="/participant/my-events" className="text-blue-500 hover:underline mt-2 block">
            View your events →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
          <Link to="/participant/events?filter=upcoming" className="text-blue-500 hover:underline mt-2 block">
            Browse upcoming →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
          <p className="text-3xl font-bold text-purple-600">7</p>
          <Link to="/participant/recommendations" className="text-blue-500 hover:underline mt-2 block">
            See recommendations →
          </Link>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Upcoming Events</h3>
          <Link to="/participant/events" className="text-blue-500 hover:underline">
            View all events →
          </Link>
        </div>
        
        <div className="space-y-4">
          {[1, 2].map((event) => (
            <div key={event} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Tech Conference 2023-{event}</h4>
                  <p className="text-sm text-gray-600 mt-1">November {15 + event}, 2023</p>
                  <p className="text-sm text-gray-600">Location: Virtual</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Registered
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <Link 
                  to={`/participant/events/event-${event}`} 
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  View Details
                </Link>
                <Link 
                  to={`/participant/events/event-${event}/resources`} 
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                >
                  Event Resources
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((event) => (
            <div key={event} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold">Recommended Event {event}</h4>
              <p className="text-sm text-gray-600 mt-1">Based on your interests</p>
              <p className="text-sm text-gray-600">December {5 + event}, 2023</p>
              <div className="flex justify-between items-center mt-3">
                <Link 
                  to={`/participant/events/recommended-${event}`} 
                  className="text-blue-500 text-sm hover:underline"
                >
                  Learn more →
                </Link>
                <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}