import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";

export default function ParticipantLayout() {
  const location = useLocation();

  // Check if current route matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-green-700 to-green-800 text-white shadow-xl min-h-[calc(100vh-5rem)] sticky top-20">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <svg 
                className="w-6 h-6 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Participant Panel
            </h2>
            <p className="text-green-200 text-sm mb-6">Manage your event participation</p>
            
            <nav className="space-y-1">
              <Link
                to="/participant/dashboard"
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  isActive('/participant/dashboard') 
                    ? 'bg-white text-green-800 shadow-md' 
                    : 'hover:bg-green-600 hover:bg-opacity-50'
                }`}
              >
                <svg 
                  className="w-5 h-5 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Dashboard
              </Link>

              <Link
                to="/participant/events"
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  isActive('/participant/events') 
                    ? 'bg-white text-green-800 shadow-md' 
                    : 'hover:bg-green-600 hover:bg-opacity-50'
                }`}
              >
                <svg 
                  className="w-5 h-5 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Browse Events
              </Link>

              <Link
                to="/participant/my-events"
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  isActive('/participant/my-events') 
                    ? 'bg-white text-green-800 shadow-md' 
                    : 'hover:bg-green-600 hover:bg-opacity-50'
                }`}
              >
                <svg 
                  className="w-5 h-5 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                My Events
              </Link>

              <Link
                to="/logout"
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  isActive('/logout') 
                    ? 'bg-white text-green-800 shadow-md' 
                    : 'hover:bg-green-600 hover:bg-opacity-50'
                }`}
              >
                <svg 
                  className="w-5 h-5 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-10rem)]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}