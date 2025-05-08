import React, { useEffect, useState } from "react";
import DotsLoadingAnimation from "./LoadingAnimation/LoadingAnimation";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete event");

      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Filter events based on search
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Glassmorphism style
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Search Input */}
        <div className="mb-8">
          <div className="rounded-2xl" style={glassStyle}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-10 bg-white/80 border border-white/30 rounded-xl text-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="p-6 rounded-2xl" style={glassStyle}>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <DotsLoadingAnimation size="lg" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col backdrop-blur-sm"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`http://127.0.0.1:8000/storage/${event.image}`}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-blue-600">
                        {event.category || "General"}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                        {event.name}
                      </h2>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold text-gray-700">Date:</span>{" "}
                          {new Date(event.date).toLocaleString()}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">Price:</span>{" "}
                          {event.price
                            ? `$${parseFloat(event.price).toFixed(2)}`
                            : "Free"}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredEvents.length > eventsPerPage && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 border-t border-b ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}