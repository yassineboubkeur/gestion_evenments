// src/components/Dashboard/ParticipantDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/AuthenticatedUser';

export default function ParticipantDashboard() {
  const user = getCurrentUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Participant Dashboard</h1>
        <p className="mt-2 text-xl text-gray-600">Welcome back, <span className="text-indigo-600 font-medium">{user?.name}</span>!</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Registered Events</h3>
            <div className="p-2 rounded-lg bg-blue-200 bg-opacity-50">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-4xl font-bold text-blue-800">5</p>
          <Link 
            to="/participant/my-events" 
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View your events
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Upcoming Events</h3>
            <div className="p-2 rounded-lg bg-green-200 bg-opacity-50">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-4xl font-bold text-green-800">3</p>
          <Link 
            to="/participant/events?filter=upcoming" 
            className="mt-4 inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
          >
            Browse upcoming
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Recommendations</h3>
            <div className="p-2 rounded-lg bg-purple-200 bg-opacity-50">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-4xl font-bold text-purple-800">7</p>
          <Link 
            to="/participant/recommendations" 
            className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            See recommendations
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Your Upcoming Events</h3>
          <Link 
            to="/participant/events" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            View all events
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="space-y-4">
          {[1, 2].map((event) => (
            <div key={event} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-indigo-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-800">Tech Conference 2023-{event}</h4>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>November {15 + event}, 2023</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Virtual Event</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full inline-flex items-center self-start sm:self-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Registered
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link 
                  to={`/participant/events/event-${event}`} 
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
                <Link 
                  to={`/participant/events/event-${event}/resources`} 
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
                >
                  Event Resources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((event) => (
            <div key={event} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-indigo-100 group">
              <div className="relative h-40 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              <h4 className="font-semibold text-lg text-gray-800">Recommended Event {event}</h4>
              <p className="text-sm text-gray-500 mt-1">Based on your interests</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>December {5 + event}, 2023</span>
              </div>
              <div className="flex justify-between items-center mt-5">
                <Link 
                  to={`/participant/events/recommended-${event}`} 
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors inline-flex items-center">
                  Register
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}