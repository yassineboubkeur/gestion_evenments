// src/components/Events/MyEvents.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function MyEvents() {
  // Sample registered events data
  const registeredEvents = [
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "2023-11-15",
      location: "Virtual",
      status: "confirmed",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: "2023-11-25",
      location: "Tech Hub",
      status: "confirmed",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "Annual Meetup",
      date: "2023-12-10",
      location: "Conference Center",
      status: "waiting",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>
      {console.log(registeredEvents)}
      <div className="space-y-6">
        {registeredEvents.map(event => (
          <div key={event.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="md:w-1/4">
            {console.log(event.image)}
              <img 
                src={`http://127.0.0.1:8000/storage/${event.image}`} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 md:w-3/4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-gray-600 mt-1">{event.date} • {event.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.status === 'confirmed' ? 'Confirmed' : 'Waiting List'}
                </span>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Link 
                  to={`/participant/events/${event.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Event Details
                </Link>
                <Link 
                  to={`/participant/events/${event.id}/resources`}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Resources
                </Link>
                <button className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">
                  Cancel Registration
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {registeredEvents.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
          <Link 
            to="/participant/events"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
}