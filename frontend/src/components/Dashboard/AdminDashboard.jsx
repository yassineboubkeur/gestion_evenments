// src/components/Dashboard/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/AuthenticatedUser';

export default function AdminDashboard() {
  const user = getCurrentUser();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-lg">Welcome back, {user?.name}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,024</p>
          <Link to="/admin/users" className="text-blue-500 hover:underline mt-2 block">
            View all users →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Active Events</h3>
          <p className="text-3xl font-bold text-green-600">56</p>
          <Link to="/admin/events" className="text-blue-500 hover:underline mt-2 block">
            Manage events →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold text-yellow-600">12</p>
          <Link to="/admin/approvals" className="text-blue-500 hover:underline mt-2 block">
            Review requests →
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="border-b pb-2">
            <p>New organizer registered: John Doe</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </li>
          <li className="border-b pb-2">
            <p>Event "Tech Conference 2023" was created</p>
            <p className="text-sm text-gray-500">5 hours ago</p>
          </li>
          <li className="border-b pb-2">
            <p>User Sarah Smith updated their profile</p>
            <p className="text-sm text-gray-500">Yesterday</p>
          </li>
        </ul>
      </div>
    </div>
  );
}