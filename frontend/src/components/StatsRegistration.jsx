import React, { useEffect, useState } from "react";
// import LoadingAnimationLitle from "../LoadingAnimation/LoadingAnimationLitle";
import { getToken } from "../utils/AuthenticatedUser";
import LoadingAnimationLitle from "./LoadingAnimation/LoadingAnimationLitle";

const StatsRegistration = ({ onClose }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxRegistrations, setMaxRegistrations] = useState(0);

  useEffect(() => {
    const fetchEventsWithRegistrations = async () => {
      try {
        const token = getToken();
        const response = await fetch(
          "http://127.0.0.1:8000/api/my-events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        
        // Calculate max registrations for scaling
        const max = Math.max(...data.map(event => 
          event.registrations ? event.registrations.length : 0
        ), 10); // Default to 10 if no registrations
        
        setEvents(data);
        setMaxRegistrations(max);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsWithRegistrations();
  }, []);

  // Function to calculate circle size based on registrations
  const getCircleSize = (registrationsCount) => {
    const minSize = 30;  // Minimum circle size in pixels
    const maxSize = 120; // Maximum circle size in pixels
    const scale = registrationsCount / maxRegistrations;
    return minSize + (maxSize - minSize) * scale;
  };

  // Function to get circle color based on registration percentage
  const getCircleColor = (registrationsCount, availablePlaces) => {
    if (availablePlaces === 0) return "bg-red-500";
    
    const percentage = (registrationsCount / availablePlaces) * 100;
    
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-blue-500";
    if (percentage >= 20) return "bg-yellow-500";
    return "bg-purple-500";
  };

  return (
    <div className="absolute inset-0 rounded-2xl flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl shadow-xl w-full h-full overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Event Registration Statistics
          </h2>
          <button
            onClick={onClose}
            className="font-bold text-purple-500 hover:text-purple-700"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingAnimationLitle />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Total Events</h3>
                <p className="text-2xl font-bold mt-1">{events.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Total Registrations</h3>
                <p className="text-2xl font-bold mt-1">
                  {events.reduce((sum, event) => sum + (event.registrations?.length || 0), 0)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Average Per Event</h3>
                <p className="text-2xl font-bold mt-1">
                  {events.length > 0 
                    ? Math.round(events.reduce((sum, event) => sum + (event.registrations?.length || 0), 0) / events.length)
                    : 0}
                </p>
              </div>
            </div>

            {/* Visualization */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Registrations by Event</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {events.map((event) => {
                  const registrationsCount = event.registrations?.length || 0;
                  const size = getCircleSize(registrationsCount);
                  const color = getCircleColor(registrationsCount, event.available_places);
                  
                  return (
                    <div key={event.id} className="flex flex-col items-center">
                      <div
                        className={`${color} rounded-full text-white flex items-center justify-center`}
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                        }}
                      >
                        <span className="font-bold">{registrationsCount}</span>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">
                          {event.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {registrationsCount}/{event.available_places} spots
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Color Key:</h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs">80-100% full</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs">50-79% full</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-xs">20-49% full</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-xs">0-19% full</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-xs">Event full</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsRegistration;