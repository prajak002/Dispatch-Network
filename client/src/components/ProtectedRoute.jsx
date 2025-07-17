import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ component: Component, roles = [], ...rest }) => {
    const { isAuthenticated, userRole, isLoading } = useAuth();

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuthenticated) {
                    return <Redirect to="/login" />;
                }

                if (roles.length > 0 && !roles.includes(userRole)) {
                    return <Redirect to="/not-authorized" />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;