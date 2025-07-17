import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tokenExpiry, setTokenExpiry] = useState(null);

    useEffect(() => {
        checkToken();
        // Check token expiry every minute
        const interval = setInterval(checkToken, 60000);
        return () => clearInterval(interval);
    }, []);

    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Date.now() / 1000;
                const timeUntilExpiry = decodedToken.exp - currentTime;
                
                if (timeUntilExpiry > 0) {
                    setUser({
                        userId: decodedToken.userId,
                        role: decodedToken.role,
                        token: token
                    });
                    setTokenExpiry(decodedToken.exp);
                    
                    // Show warning when 2 minutes left
                    if (timeUntilExpiry <= 120 && timeUntilExpiry > 60) {
                        showExpiryWarning();
                    }
                } else {
                    // Token expired
                    autoLogout();
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                autoLogout();
            }
        }
        setIsLoading(false);
    };

    const showExpiryWarning = () => {
        if (window.confirm('Your session will expire in 2 minutes. Do you want to continue?')) {
            // In a real app, you might refresh the token here
        }
    };

    const autoLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setTokenExpiry(null);
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    };

    const logout = () => {
        autoLogout();
    };

    const login = (token) => {
        localStorage.setItem('token', token);
        checkToken();
    };

    const isAuthenticated = !!user;
    const userRole = user?.role;

    return { 
        user, 
        isLoading, 
        logout, 
        login, 
        isAuthenticated, 
        userRole,
        tokenExpiry,
        role: userRole // alias for backward compatibility
    };
};

export { useAuth };
export default useAuth;