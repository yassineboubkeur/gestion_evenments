// src/components/Dashboard/OrganizerDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/AuthenticatedUser';

export default function OrganizerDashboard() {
  const user = getCurrentUser();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
      <p className="text-lg">Welcome back, {user?.name}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Your Events</h3>
          <p className="text-3xl font-bold text-blue-600">8</p>
          <Link to="/organizer/events" className="text-blue-500 hover:underline mt-2 block">
            View all events →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
          <Link to="/organizer/events?filter=upcoming" className="text-blue-500 hover:underline mt-2 block">
            See details →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Participants</h3>
          <p className="text-3xl font-bold text-purple-600">245</p>
          <Link to="/organizer/participants" className="text-blue-500 hover:underline mt-2 block">
            Manage participants →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/organizer/events/create" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create New Event
          </Link>
          <Link 
            to="/organizer/invitations" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Send Invitations
          </Link>
          <Link 
            to="/organizer/reports" 
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Generate Reports
          </Link>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Recent Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((event) => (
            <div key={event} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold">Event {event}</h4>
              <p className="text-sm text-gray-600 mt-1">Date: 2023-11-{10 + event}</p>
              <p className="text-sm text-gray-600">Participants: {20 + event * 5}</p>
              <Link 
                to={`/organizer/events/event-${event}`} 
                className="text-blue-500 text-sm hover:underline mt-2 block"
              >
                View details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}