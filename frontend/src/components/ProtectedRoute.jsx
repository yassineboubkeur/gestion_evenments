// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [], requiredPermissions = [] }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')?.toLowerCase();
  const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role (case-insensitive)
  if (allowedRoles.length > 0 && !allowedRoles.map(r => r.toLowerCase()).includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if user has all required permissions
  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every(perm => permissions.includes(perm))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

