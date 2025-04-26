
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getToken } from '../../utils/AuthenticatedUser';
import DotsLoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import LoadingAnimationLitle from '../LoadingAnimation/LoadingAnimationLitle';

export default function OrganizerDashboard() {
  const user = getCurrentUser();
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalParticipants: 0,
    recentEvents: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/organizer/stats', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch dashboard stats');

        const data = await response.json();
        setStats(data);
        console.log(data)
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
      <p className="text-lg">Welcome back, {user?.name}!</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Your Events" count={stats.totalEvents} link="/organizer/events" color="blue" loading={loading} />
        
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <QuickAction to="/organizer/events/create" label="Create New Event" color="blue" />
          <QuickAction to="/organizer/invitations" label="Send Invitations" color="green" />
          <QuickAction to="/organizer/reports" label="Generate Reports" color="purple" />
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
<div className="bg-white p-6 rounded-lg shadow-md mt-8">
  <h3 className="text-xl font-semibold mb-4">Your Recent Events</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {loading ? (
      <LoadingAnimationLitle/>
    ) : stats.recentEvents && stats.recentEvents.length > 0 ? (
      stats.recentEvents.map((event) => (
        <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          {/* Event Image */}
          {event.image && (
            <div className="h-48 overflow-hidden">
              <img 
                src={`http://127.0.0.1:8000/storage/${event.image}`} 
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {/* Event Details */}
          <div className="p-4">
            <h4 className="font-semibold text-lg">{event.name}</h4>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Date: </span>
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Category: </span>
              {event.category}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Available Places: </span>
              {event.available_places}
            </p>
            <Link
              to={`/organizer/events/${event.id}`}
              className="mt-3 inline-block text-blue-500 hover:underline"
            >
              View details →
            </Link>
          </div>
        </div>
      ))
    ) : (
      <p>No recent events found</p>
    )}
  </div>
</div>
      </div>
    </div>
  );
}

function StatsCard({ title, count, link, color, loading }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>{loading ? <LoadingAnimationLitle/> : count}</p>
      <Link to={link} className="text-blue-500 hover:underline mt-2 block">
        View →
      </Link>
    </div>
  );
}

function QuickAction({ to, label, color }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 bg-${color}-500 text-white rounded hover:bg-${color}-600 transition`}
    >
      {label}
    </Link>
  );
}
