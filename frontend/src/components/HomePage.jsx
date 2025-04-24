// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to PPP Project</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </Link>
        <Link to="/register" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
          Register
        </Link>
      </div>
    </div>
  );
}