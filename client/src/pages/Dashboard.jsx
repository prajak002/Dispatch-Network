import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../contexts/SettingsContext';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Card from '../components/Card';
import axios from 'axios';
import dashboardData from '../data/dashboardData.json';
import {
    Container,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Chip,
    CircularProgress,
    IconButton,
    Paper,
    Avatar
} from '@material-ui/core';
import { ExitToApp, Settings, AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: theme.palette.type === 'dark' 
            ? 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 25%, #2d1b69 50%, #11998e 75%, #0c0c0c 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 25%, #e0c3fc 50%, #9bb5ff 75%, #f5f7fa 100%)',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.type === 'dark'
                ? 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)'
                : 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%)',
            animation: '$float 20s ease-in-out infinite',
        }
    },
    '@keyframes float': {
        '0%, 100%': { transform: 'translate(0px, 0px)' },
        '33%': { transform: 'translate(30px, -30px)' },
        '66%': { transform: 'translate(-20px, 20px)' },
    },
    appBar: {
        background: theme.palette.type === 'dark'
            ? 'rgba(30, 30, 30, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: theme.palette.type === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        marginBottom: theme.spacing(4),
    },
    toolbar: {
        padding: theme.spacing(0, 3),
    },
    title: {
        flexGrow: 1,
        fontWeight: 700,
        fontSize: '1.8rem',
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(135deg, #fff 0%, #a8a8a8 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    userChip: {
        margin: theme.spacing(0, 1),
        background: theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.05)',
        color: theme.palette.type === 'dark' ? '#fff' : '#333',
        fontWeight: 600,
    },
    tokenTimer: {
        margin: theme.spacing(0, 1),
        background: theme.palette.type === 'dark'
            ? 'rgba(76, 175, 80, 0.2)'
            : 'rgba(76, 175, 80, 0.1)',
        color: theme.palette.type === 'dark' ? '#4caf50' : '#2e7d32',
        fontWeight: 600,
        '&.warning': {
            background: theme.palette.type === 'dark'
                ? 'rgba(255, 152, 0, 0.2)'
                : 'rgba(255, 152, 0, 0.1)',
            color: theme.palette.type === 'dark' ? '#ff9800' : '#f57c00',
            animation: '$pulse 1s ease-in-out infinite',
        },
    },
    '@keyframes pulse': {
        '0%, 100%': { transform: 'scale(1)', opacity: 1 },
        '50%': { transform: 'scale(1.05)', opacity: 0.8 },
    },
    container: {
        position: 'relative',
        zIndex: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        maxWidth: '1600px',
        margin: '0 auto',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        background: theme.palette.type === 'dark'
            ? 'rgba(30, 30, 30, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: 20,
        margin: theme.spacing(4),
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: theme.spacing(3),
        padding: theme.spacing(2, 0),
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '320px',
        transition: 'all 0.3s ease',
    },
    actionButton: {
        borderRadius: 16,
        margin: theme.spacing(0, 0.5),
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(145deg, rgba(40, 40, 40, 0.9), rgba(20, 20, 20, 0.8))'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8))',
        backdropFilter: 'blur(20px)',
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: theme.palette.type === 'dark'
            ? 'inset 0 2px 4px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.4)'
            : 'inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 8px 24px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 10,
        cursor: 'pointer',
        pointerEvents: 'auto !important',
        width: 48,
        height: 48,
        '&:hover': {
            background: theme.palette.type === 'dark'
                ? 'linear-gradient(145deg, rgba(60, 60, 60, 0.95), rgba(30, 30, 30, 0.9))'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(230, 230, 230, 0.9))',
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: theme.palette.type === 'dark'
                ? 'inset 0 4px 8px rgba(255, 255, 255, 0.15), 0 12px 32px rgba(0, 0, 0, 0.5)'
                : 'inset 0 4px 8px rgba(255, 255, 255, 0.9), 0 12px 32px rgba(0, 0, 0, 0.2)',
        },
        '&:active': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: theme.palette.type === 'dark'
                ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 6px 16px rgba(0, 0, 0, 0.3)'
                : 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(0, 0, 0, 0.1)',
        },
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const { user, role, logout, tokenExpiry } = useAuth();
    const { settings } = useSettings();
    const [dashboardData, setDashboardData] = useState({
        orders: [],
        riders: [],
        users: [],
        settings: {}
    });
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        // Ensure component is ready after data is loaded and settings are available
        if (!loading && settings) {
            const timer = setTimeout(() => {
                setIsReady(true);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [loading, settings]);

    useEffect(() => {
        if (tokenExpiry) {
            const updateTimeLeft = () => {
                const now = Date.now() / 1000;
                const remaining = Math.max(0, tokenExpiry - now);
                setTimeLeft(Math.floor(remaining));
            };

            updateTimeLeft();
            const interval = setInterval(updateTimeLeft, 1000);
            return () => clearInterval(interval);
        }
    }, [tokenExpiry]);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const [ordersRes, ridersRes] = await Promise.all([
                axios.get('http://localhost:5001/api/data/orders', config),
                axios.get('http://localhost:5001/api/data/riders', config)
            ]);

            let usersRes, settingsRes;
            
            // Fetch users only if user has permission
            if (role === 'admin' || role === 'editor') {
                try {
                    usersRes = await axios.get('http://localhost:5001/api/data/users', config);
                } catch (err) {
                    console.log('User does not have permission to view users');
                }
            }

            // Fetch settings only if admin
            if (role === 'admin') {
                try {
                    settingsRes = await axios.get('http://localhost:5001/api/data/settings', config);
                } catch (err) {
                    console.log('User does not have permission to view settings');
                }
            }

            setDashboardData({
                orders: ordersRes.data,
                riders: ridersRes.data,
                users: usersRes?.data || [],
                settings: settingsRes?.data || {}
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const getPermissions = () => {
        switch(role) {
            case 'admin':
                return { view: true, edit: true, delete: true };
            case 'editor':
                return { view: true, edit: true, delete: false };
            case 'viewer':
                return { view: true, edit: false, delete: false };
            default:
                return { view: false, edit: false, delete: false };
        }
    };

    const permissions = getPermissions();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    if (loading) {
        return (
            <motion.div 
                className={classes.root}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <AppBar position="static" className={classes.appBar} elevation={0}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" className={classes.title}>
                            <Typewriter
                                options={{
                                    strings: ['RBAC Dashboard'],
                                    autoStart: true,
                                    loop: true,
                                    delay: 100,
                                }}
                            />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <motion.div 
                    className={classes.loadingContainer}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <CircularProgress 
                            size={60} 
                            thickness={4}
                            style={{
                                color: settings.darkMode ? '#64ffda' : '#1976d2',
                                filter: 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.3))'
                            }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Typography 
                            variant="h6" 
                            style={{ 
                                marginTop: 16, 
                                color: settings.darkMode ? '#fff' : '#333',
                                fontWeight: 600 
                            }}
                        >
                            <Typewriter
                                options={{
                                    strings: ['Loading your dashboard...'],
                                    autoStart: true,
                                    delay: 50,
                                }}
                            />
                        </Typography>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className={classes.root}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        <Typewriter
                            options={{
                                strings: ['RBAC Dashboard'],
                                autoStart: true,
                                loop: true,
                                delay: 100,
                            }}
                        />
                    </Typography>
                    <Chip
                        label={`${user?.userId} (${role})`}
                        className={classes.userChip}
                        size="small"
                        avatar={<Avatar style={{ 
                            backgroundColor: settings.darkMode ? '#64ffda' : '#1976d2',
                            fontSize: '0.75rem'
                        }}>
                            {user?.userId?.[0]?.toUpperCase()}
                        </Avatar>}
                    />
                    {timeLeft !== null && (
                        <Chip
                            label={`Session: ${formatTime(timeLeft)}`}
                            className={`${classes.tokenTimer} ${timeLeft < 120 ? 'warning' : ''}`}
                            size="small"
                            icon={<AccessTimeIcon />}
                        />
                    )}
                    <motion.div
                        whileHover={isReady ? { scale: 1.1 } : {}}
                        whileTap={isReady ? { scale: 0.95 } : {}}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <IconButton
                            onClick={() => history.push('/settings')}
                            className={classes.actionButton}
                            disabled={!isReady}
                            style={{ 
                                pointerEvents: 'auto',
                                opacity: isReady ? 1 : 0.7,
                                transition: 'opacity 0.3s ease',
                                color: '#000000'
                            }}
                        >
                            <Settings style={{ color: '#000000' }} />
                        </IconButton>
                    </motion.div>
                    <motion.div
                        whileHover={isReady ? { scale: 1.1 } : {}}
                        whileTap={isReady ? { scale: 0.95 } : {}}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <IconButton
                            onClick={handleLogout}
                            className={classes.actionButton}
                            disabled={!isReady}
                            style={{ 
                                pointerEvents: 'auto',
                                opacity: isReady ? 1 : 0.7,
                                transition: 'opacity 0.3s ease',
                                color: '#000000'
                            }}
                        >
                            <ExitToApp style={{ color: '#000000' }} />
                        </IconButton>
                    </motion.div>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" className={classes.container}>
                <motion.div variants={itemVariants}>
                    <Grid container spacing={4} className={classes.gridContainer}>
                        {/* Orders Card */}
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                            <motion.div
                                variants={itemVariants}
                                whileHover={isReady ? { y: -5, scale: 1.02 } : {}}
                                transition={{ duration: 0.3 }}
                                style={{ height: '100%', pointerEvents: 'auto' }}
                            >
                                <Card
                                    title="Orders"
                                    subtitle={`Total: ${dashboardData.orders.length}`}
                                    content={`Active: ${dashboardData.orders.filter(o => o.status === 'active').length}`}
                                    action={permissions.view ? "View Details" : null}
                                    color="primary"
                                    icon="📦"
                                    data={dashboardData.orders}
                                    actions={permissions}
                                    type="orders"
                                    onDataUpdate={fetchDashboardData}
                                    isReady={isReady}
                                    stats={{
                                        value: dashboardData.orders.length,
                                        trend: +12,
                                        period: "vs last month"
                                    }}
                                />
                            </motion.div>
                        </Grid>

                        {/* Riders Card */}
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                            <motion.div
                                variants={itemVariants}
                                whileHover={isReady ? { y: -5, scale: 1.02 } : {}}
                                transition={{ duration: 0.3 }}
                                style={{ height: '100%', pointerEvents: 'auto' }}
                            >
                                <Card
                                    title="Riders"
                                    subtitle={`Total: ${dashboardData.riders.length}`}
                                    content={`Online: ${dashboardData.riders.filter(r => r.status === 'online').length}`}
                                    action={permissions.view ? "View Details" : null}
                                    color="secondary"
                                    icon="🚴"
                                    data={dashboardData.riders}
                                    actions={permissions}
                                    type="riders"
                                    onDataUpdate={fetchDashboardData}
                                    isReady={isReady}
                                    stats={{
                                        value: dashboardData.riders.length,
                                        trend: +8,
                                        period: "vs last month"
                                    }}
                                />
                            </motion.div>
                        </Grid>

                        {/* Users Card - Only show if user has permission */}
                        {(role === 'admin' || role === 'editor') && (
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={isReady ? { y: -5, scale: 1.02 } : {}}
                                    transition={{ duration: 0.3 }}
                                    style={{ height: '100%', pointerEvents: 'auto' }}
                                >
                                    <Card
                                        title="Users"
                                        subtitle={`Total: ${dashboardData.users.length}`}
                                        content={`Active: ${dashboardData.users.filter(u => u.status === 'active').length}`}
                                        action={permissions.edit ? "Manage Users" : "View Users"}
                                        color="success"
                                        icon="👥"
                                        data={dashboardData.users}
                                        actions={role === 'admin' ? permissions : { view: true, edit: true, delete: false }}
                                        type="users"
                                        onDataUpdate={fetchDashboardData}
                                        isReady={isReady}
                                        stats={{
                                            value: dashboardData.users.length,
                                            trend: +5,
                                            period: "vs last month"
                                        }}
                                    />
                                </motion.div>
                            </Grid>
                        )}

                        {/* Settings Card - Only show for admin */}
                        {role === 'admin' && (
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={isReady ? { y: -5, scale: 1.02 } : {}}
                                    transition={{ duration: 0.3 }}
                                    style={{ height: '100%', pointerEvents: 'auto' }}
                                >
                                    <Card
                                        title="Settings"
                                        subtitle="System Configuration"
                                        content={`Dark Mode: ${settings.darkMode ? 'Enabled' : 'Disabled'}`}
                                        action="Configure"
                                        color="warning"
                                        icon="⚙️"
                                        onClick={() => history.push('/settings')}
                                        data={dashboardData.settings}
                                        actions={permissions}
                                        type="settings"
                                        isReady={isReady}
                                        stats={{
                                            value: Object.keys(dashboardData.settings).length,
                                            trend: 0,
                                            period: "configurations"
                                        }}
                                    />
                                </motion.div>
                            </Grid>
                        )}

                        {/* Analytics Card */}
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                            <motion.div
                                variants={itemVariants}
                                whileHover={isReady ? { y: -5, scale: 1.02 } : {}}
                                transition={{ duration: 0.3 }}
                                style={{ height: '100%', pointerEvents: 'auto' }}
                            >
                                <Card
                                    title="Analytics"
                                    subtitle="Performance Metrics"
                                    content="Real-time system analytics"
                                    action={permissions.view ? "View Reports" : null}
                                    color="info"
                                    icon="📊"
                                    isReady={isReady}
                                    type="analytics"
                                    data={[
                                        { metric: 'uptime', value: 98.5, trend: +2.1 },
                                        { metric: 'response_time', value: 1.2, trend: -0.3 },
                                        { metric: 'throughput', value: 1250, trend: +15 },
                                        { metric: 'error_rate', value: 0.02, trend: -0.01 }
                                    ]}
                                    stats={{
                                        value: "98.5%",
                                        trend: +2.1,
                                        period: "uptime"
                                    }}
                                />
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
        </motion.div>
    );
};

export default Dashboard;