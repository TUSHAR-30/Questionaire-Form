import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../App';

const ProtectedRoute = ({ isPrivate }) => {
    const { isAuthenticated, loading } = useAppContext();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (isPrivate && !isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    if (!isPrivate && isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    return <Outlet />; // Renders the matching child route
  };

  export default ProtectedRoute
  