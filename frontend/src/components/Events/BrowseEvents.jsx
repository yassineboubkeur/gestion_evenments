// src/components/Events/BrowseEvents.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BrowseEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "2023-11-15",
      location: "Virtual",
      category: "technology",
      description: "Annual conference for tech enthusiasts and professionals.",
      registered: true
    },
    {
      id: 2,
      title: "Art Exhibition",
      date: "2023-12-01",
      location: "City Museum",
      category: "art",
      description: "Showcasing contemporary artists from around the world.",
      registered: false
    },
    {
      id: 3,
      title: "Business Networking",
      date: "2023-11-20",
      location: "Grand Hotel",
      category: "business",
      description: "Connect with industry leaders and entrepreneurs.",
      registered: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Events</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="art">Art</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
        </select>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {event.category}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{event.date} • {event.location}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              
              <div className="flex justify-between items-center">
                <Link 
                  to={`/participant/events/${event.id}`} 
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
                {event.registered ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Registered
                  </span>
                ) : (
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No events found matching your criteria.</p>
          <button 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}