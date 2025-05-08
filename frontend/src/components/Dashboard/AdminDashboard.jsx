import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/AuthenticatedUser';
import LoadingAnimationLitle from '../LoadingAnimation/LoadingAnimationLitle';

export default function AdminDashboard() {
  const user = getCurrentUser();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEvents: 0,
    pendingApprovals: 0
  });
  const [loading, setLoading] = useState(true);

  // Glassmorphism style variables
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/system-metrics', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats({
          totalUsers: data.totalUsers || 0,
          activeEvents: data.activeEvents || 0,
          pendingApprovals: data.pendingApprovals || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="p-6 rounded-2xl" style={glassStyle}>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-lg text-gray-600 mt-2">
              Welcome back, <span className="font-semibold text-indigo-600">{user?.name}</span>!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Total Users</h3>
              {loading ? (
                <LoadingAnimationLitle/>              ) : (
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {stats.totalUsers.toLocaleString()}
                </p>
              )}
              <Link 
                to="/admin/users" 
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View all users
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Active Events</h3>
              {loading ? (
                <LoadingAnimationLitle/>
              ) : (
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                  {stats.activeEvents.toLocaleString()}
                </p>
              )}
              <Link 
                to="/admin/events" 
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Manage events
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            {/* <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pending Approvals</h3>
              {loading ? (
                <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
              ) : (
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  {stats.pendingApprovals.toLocaleString()}
                </p>
              )}
              <Link 
                to="/admin/approvals" 
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Review requests
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div> */}
          </div>

          {/* Recent Activity Section remains the same */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}