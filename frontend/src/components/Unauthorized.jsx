// src/components/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
      <p className="mb-8">You don't have permission to access this page.</p>
      <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Home
      </Link>
    </div>
  );
}