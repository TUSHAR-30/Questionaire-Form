// components/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../App';

const PublicRoute = ({ children }) => {
    const { isAuthenticated , loading } = useAppContext();

    if (loading) {
        // Show a loading spinner or placeholder while authentication status is being determined
        return <div>Loading...</div>;
      }

    return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
