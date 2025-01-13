// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../App';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated , loading } = useAppContext();
    
    if (loading) {
        // Show a loading spinner or placeholder while authentication status is being determined
        return <div>Loading...</div>;
      }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
