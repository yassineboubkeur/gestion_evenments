// src/components/Events/ManageEvents.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ManageEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2023",
      organizer: "Tech Org Inc.",
      date: "2023-11-15",
      status: "approved",
      participants: 150
    },
    {
      id: 2,
      title: "Art Exhibition",
      organizer: "City Arts Foundation",
      date: "2023-12-01",
      status: "pending",
      participants: 0
    },
    {
      id: 3,
      title: "Business Networking",
      organizer: "Chamber of Commerce",
      date: "2023-11-20",
      status: "approved",
      participants: 75
    }
  ]);

  const handleStatusChange = (eventId, newStatus) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border text-left">Event Title</th>
              <th className="py-3 px-4 border text-left">Organizer</th>
              <th className="py-3 px-4 border text-left">Date</th>
              <th className="py-3 px-4 border text-left">Participants</th>
              <th className="py-3 px-4 border text-left">Status</th>
              <th className="py-3 px-4 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border">
                  <Link to={`/admin/events/${event.id}`} className="text-blue-500 hover:underline">
                    {event.title}
                  </Link>
                </td>
                <td className="py-3 px-4 border">{event.organizer}</td>
                <td className="py-3 px-4 border">{event.date}</td>
                <td className="py-3 px-4 border">{event.participants}</td>
                <td className="py-3 px-4 border">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === 'approved' ? 'bg-green-100 text-green-800' :
                    event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="py-3 px-4 border">
                  <div className="flex gap-2">
                    {event.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(event.id, 'approved')}
                          className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(event.id, 'rejected')}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <Link 
                      to={`/admin/events/edit/${event.id}`}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            Showing {events.length} of {events.length} events
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Previous
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}