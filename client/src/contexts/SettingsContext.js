import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    // Initialize settings with theme from localStorage to persist across sessions
    const [settings, setSettings] = useState(() => {
        const savedTheme = localStorage.getItem('app-theme');
        return {
            theme: savedTheme || 'light',
            notifications: true,
            autoLogout: 600,
            apiRateLimit: 1000,
            maintenanceMode: false
        };
    });
    const [loading, setLoading] = useState(false); // Start with false since we have default values

    // Create Material-UI theme based on settings
    const muiTheme = createTheme({
        palette: {
            type: settings.theme,
            primary: {
                main: settings.theme === 'dark' ? '#90caf9' : '#1976d2',
                light: settings.theme === 'dark' ? '#bbdefb' : '#42a5f5',
                dark: settings.theme === 'dark' ? '#1565c0' : '#0d47a1',
            },
            secondary: {
                main: settings.theme === 'dark' ? '#f48fb1' : '#dc004e',
            },
            background: {
                default: settings.theme === 'dark' ? '#121212' : '#fafafa',
                paper: settings.theme === 'dark' ? '#1e1e1e' : '#ffffff',
            },
            text: {
                primary: settings.theme === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
                secondary: settings.theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h4: {
                fontWeight: 600,
            },
            h5: {
                fontWeight: 500,
            },
            h6: {
                fontWeight: 500,
            },
        },
        shape: {
            borderRadius: 8,
        },
        overrides: {
            MuiCard: {
                root: {
                    borderRadius: 12,
                    boxShadow: settings.theme === 'dark' 
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: settings.theme === 'dark' 
                            ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
                            : '0 8px 24px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
            MuiButton: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
            MuiAppBar: {
                root: {
                    backgroundColor: settings.theme === 'dark' ? '#1f1f1f' : '#1976d2',
                    boxShadow: settings.theme === 'dark' 
                        ? '0 2px 4px rgba(0, 0, 0, 0.5)' 
                        : '0 2px 4px rgba(0, 0, 0, 0.2)',
                },
            },
            MuiPaper: {
                root: {
                    backgroundColor: settings.theme === 'dark' ? '#1e1e1e' : '#ffffff',
                },
                elevation1: {
                    boxShadow: settings.theme === 'dark' 
                        ? '0 1px 3px rgba(0, 0, 0, 0.3)' 
                        : '0 1px 3px rgba(0, 0, 0, 0.12)',
                },
            },
            MuiListItem: {
                root: {
                    '&:hover': {
                        backgroundColor: settings.theme === 'dark' 
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : 'rgba(0, 0, 0, 0.04)',
                    },
                },
            },
            MuiChip: {
                root: {
                    backgroundColor: settings.theme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(0, 0, 0, 0.08)',
                },
            },
        },
    });

    // Fetch settings from backend
    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('http://localhost:5001/api/data/settings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const serverSettings = response.data;
                
                // Update settings but preserve theme from localStorage if it exists
                setSettings(prevSettings => ({
                    ...serverSettings,
                    theme: localStorage.getItem('app-theme') || serverSettings.theme
                }));
                
                // Save theme to localStorage for persistence
                localStorage.setItem('app-theme', serverSettings.theme);
            } else {
                // No token, but load theme from localStorage anyway
                const savedTheme = localStorage.getItem('app-theme');
                if (savedTheme) {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        theme: savedTheme
                    }));
                }
            }
        } catch (error) {
            console.log('Could not fetch settings, using defaults with persisted theme');
            // Even if backend fails, use saved theme
            const savedTheme = localStorage.getItem('app-theme');
            if (savedTheme) {
                setSettings(prevSettings => ({
                    ...prevSettings,
                    theme: savedTheme
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    // Update settings
    const updateSettings = async (newSettings) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.put('http://localhost:5001/api/data/settings', newSettings, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            
            // Always update local state and localStorage, even without token
            setSettings(newSettings);
            
            // Persist theme to localStorage for cross-session persistence
            localStorage.setItem('app-theme', newSettings.theme);
            
            return true;
        } catch (error) {
            console.error('Error updating settings on server, but saving locally:', error);
            
            // Even if server update fails, save locally
            setSettings(newSettings);
            localStorage.setItem('app-theme', newSettings.theme);
            
            return true; // Return true since local update succeeded
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    // Save theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('app-theme', settings.theme);
    }, [settings.theme]);

    const value = {
        settings,
        updateSettings,
        fetchSettings,
        loading,
        theme: muiTheme
    };

    if (loading) {
        return <div>Loading settings...</div>;
    }

    return (
        <SettingsContext.Provider value={value}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </SettingsContext.Provider>
    );
};
