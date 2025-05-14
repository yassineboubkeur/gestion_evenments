// src/components/Events/OrganizerEvents.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrganizerEvents() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample events data
  const events = {
    upcoming: [
      {
        id: 1,
        title: "Tech Conference 2023",
        date: "2023-11-15",
        registered: 150,
        capacity: 200,
        status: "published"
      },
      {
        id: 2,
        title: "Workshop Series",
        date: "2023-12-01",
        registered: 45,
        capacity: 50,
        status: "published"
      }
    ],
    past: [
      {
        id: 3,
        title: "Summer Networking",
        date: "2023-08-20",
        registered: 80,
        capacity: 100,
        status: "completed"
      }
    ],
    draft: [
      {
        id: 4,
        title: "Winter Symposium",
        date: "2024-01-15",
        registered: 0,
        capacity: 100,
        status: "draft"
      }
    ]
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Link 
          to="/organizer/create-event"
          className="px-4 py-2 rounded-full bg-blue-500 text-white  hover:bg-blue-600"
        >
          Create New Event
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${activeTab === 'upcoming' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'past' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'draft' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('draft')}
        >
          Drafts
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events[activeTab].map(event => (
          <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600 mt-1">{event.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                event.status === 'published' ? 'bg-green-100 text-green-800' :
                event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {event.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {event.registered} registered of {event.capacity} capacity
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
            
              <Link 
                to={`/organizer/events/${event.id}/participants`}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Participants
              </Link>
              {event.status === 'draft' && (
                <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">
                  Publish
                </button>
              )}
              <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {events[activeTab].length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            {activeTab === 'upcoming' && "You don't have any upcoming events."}
            {activeTab === 'past' && "You don't have any past events."}
            {activeTab === 'draft' && "You don't have any draft events."}
          </p>
        </div>
      )}
    </div>
  );
}