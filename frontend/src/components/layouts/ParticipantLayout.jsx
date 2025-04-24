// src/components/layouts/ParticipantLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function ParticipantLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-green-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Participant Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li><Link to="/participant/dashboard" className="block px-4 py-2 hover:bg-green-700 rounded">Dashboard</Link></li>
            <li><Link to="/participant/events" className="block px-4 py-2 hover:bg-green-700 rounded">Browse Events</Link></li>
            <li><Link to="/participant/my-events" className="block px-4 py-2 hover:bg-green-700 rounded">My Events</Link></li>
            <li><Link to="/logout" className="block px-4 py-2 hover:bg-green-700 rounded">Logout</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}