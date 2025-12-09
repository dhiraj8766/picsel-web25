// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    // If not logged in, kick them back to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, let them see the page
  return children;
};

export default ProtectedRoute;