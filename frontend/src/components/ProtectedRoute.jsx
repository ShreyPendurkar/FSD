import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const currentTime = Date.now() / 1000; // in seconds
      if (user.exp && user.exp < currentTime) {
        // Token expired
        logout();
      }
    }
  }, [user, logout]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
