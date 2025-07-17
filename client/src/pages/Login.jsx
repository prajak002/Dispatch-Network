import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../contexts/SettingsContext';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Fade,
    Zoom
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { LockOutlined, Person, VpnKey, Security, Dashboard as DashboardIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.type === 'dark' 
            ? 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 25%, #2d1b69 50%, #11998e 75%, #0c0c0c 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.type === 'dark'
                ? 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.3) 0%, transparent 50%)'
                : 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.2) 0%, transparent 50%)',
            animation: '$float 20s ease-in-out infinite',
        }
    },
    '@keyframes float': {
        '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
        '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
        '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
    },
    glassContainer: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 600,
        width: '100%',
    },
    glassPaper: {
        padding: theme.spacing(4),
        background: theme.palette.type === 'dark' 
            ? 'rgba(30, 30, 30, 0.25)'
            : 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(20px)',
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 24,
        boxShadow: theme.palette.type === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(31, 38, 135, 0.37)',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.palette.type === 'dark'
                ? '0 16px 64px rgba(0, 0, 0, 0.5)'
                : '0 16px 64px rgba(31, 38, 135, 0.5)',
        },
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
        animation: '$pulse 2s ease-in-out infinite',
    },
    '@keyframes pulse': {
        '0%, 100%': { transform: 'scale(1)', boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)' },
        '50%': { transform: 'scale(1.05)', boxShadow: '0 12px 48px rgba(102, 126, 234, 0.6)' },
    },
    title: {
        fontWeight: 700,
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(135deg, #fff 0%, #a8a8a8 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: theme.spacing(1),
        textAlign: 'center',
    },
    typewriterContainer: {
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            background: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: theme.palette.type === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
                background: theme.palette.type === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            },
            '&.Mui-focused': {
                background: theme.palette.type === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            },
        },
    },
    submitButton: {
        borderRadius: 12,
        padding: theme.spacing(1.2),
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
        transition: 'all 0.3s ease',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1.1rem',
        '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            boxShadow: '0 12px 48px rgba(102, 126, 234, 0.6)',
            transform: 'translateY(-2px)',
        },
        '&:active': {
            transform: 'translateY(0px)',
        },
    },
    testSection: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        background: theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.05)'
            : '1px solid rgba(255, 255, 255, 0.2)',
    },
    testButton: {
        borderRadius: 8,
        textTransform: 'none',
        marginBottom: theme.spacing(1),
        transition: 'all 0.3s ease',
        background: theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 10,
        cursor: 'pointer',
        pointerEvents: 'auto !important',
        userSelect: 'none',
        '&:hover': {
            background: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        },
        '&:active': {
            transform: 'translateY(0px)',
        },
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
    },
    errorAlert: {
        marginBottom: theme.spacing(2),
        borderRadius: 12,
        background: theme.palette.type === 'dark'
            ? 'rgba(244, 67, 54, 0.1)'
            : 'rgba(244, 67, 54, 0.05)',
        backdropFilter: 'blur(10px)',
    },
    floatingElements: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    floatingIcon: {
        position: 'absolute',
        opacity: 0.1,
        animation: '$floatIcon 15s ease-in-out infinite',
    },
    '@keyframes floatIcon': {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-20px) rotate(180deg)' },
    },
}));

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();
    const { login } = useAuth();
    const { settings } = useSettings();

    useEffect(() => {
        // Ensure the component is ready after settings are loaded
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, [settings]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', { 
                email, 
                password 
            });
            
            login(response.data.token);
            history.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleTestLogin = (testEmail, testPassword) => {
        if (!isReady) return; // Prevent clicks before component is ready
        setEmail(testEmail);
        setPassword(testPassword);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <Box className={classes.root}>
            {/* Floating Background Elements */}
            <Box className={classes.floatingElements}>
                <Security className={classes.floatingIcon} style={{ top: '10%', left: '10%', fontSize: 40 }} />
                <DashboardIcon className={classes.floatingIcon} style={{ top: '20%', right: '15%', fontSize: 50 }} />
                <LockOutlined className={classes.floatingIcon} style={{ bottom: '20%', left: '20%', fontSize: 45 }} />
                <VpnKey className={classes.floatingIcon} style={{ bottom: '15%', right: '10%', fontSize: 35 }} />
            </Box>

            <Container component="main" className={classes.glassContainer}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Paper elevation={0} className={classes.glassPaper}>
                        <motion.div variants={itemVariants}>
                            <Box className={classes.iconContainer}>
                                <LockOutlined style={{ fontSize: 32, color: 'white' }} />
                            </Box>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography component="h1" variant="h3" className={classes.title}>
                                Admin Portal
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants} className={classes.typewriterContainer}>
                            <Typography variant="h6" style={{ color: settings.theme === 'dark' ? '#fff' : '#666' }}>
                                <Typewriter
                                    options={{
                                        strings: [
                                            'Role-Based Access Control',
                                            'Secure Authentication',
                                            'Professional Dashboard',
                                            'Advanced Analytics'
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        delay: 75,
                                        deleteSpeed: 50,
                                    }}
                                />
                            </Typography>
                        </motion.div>
                        
                        {error && (
                            <Zoom in={!!error}>
                                <Alert severity="error" className={classes.errorAlert}>
                                    {error}
                                </Alert>
                            </Zoom>
                        )}
                        
                        <motion.form variants={itemVariants} className={classes.form} onSubmit={handleLogin}>
                            <motion.div variants={itemVariants}>
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submitButton}
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockOutlined />}
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </motion.div>
                        </motion.form>

                        <motion.div variants={itemVariants}>
                            <Box className={classes.testSection}>
                                <Typography variant="h6" style={{ 
                                    color: settings.theme === 'dark' ? '#fff' : '#333',
                                    marginBottom: 16,
                                    textAlign: 'center',
                                    fontWeight: 600
                                }}>
                                    🚀 Demo Credentials
                                </Typography>
                                <Typography variant="body2" style={{ 
                                    color: settings.theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                                    marginBottom: 16,
                                    textAlign: 'center'
                                }}>
                                    Test different role permissions instantly
                                </Typography>
                                
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <motion.div 
                                            whileHover={isReady ? { scale: 1.02 } : {}} 
                                            whileTap={isReady ? { scale: 0.98 } : {}}
                                            style={{ 
                                                position: 'relative', 
                                                zIndex: 10,
                                                pointerEvents: 'auto'
                                            }}
                                        >
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                className={classes.testButton}
                                                onClick={() => handleTestLogin('admin@site.com', 'admin123')}
                                                startIcon={<VpnKey />}
                                                disabled={!isReady}
                                                style={{ 
                                                    pointerEvents: 'auto',
                                                    opacity: isReady ? 1 : 0.7,
                                                    transition: 'opacity 0.3s ease'
                                                }}
                                            >
                                                🔑 Admin - Full Control
                                            </Button>
                                        </motion.div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <motion.div 
                                            whileHover={isReady ? { scale: 1.02 } : {}} 
                                            whileTap={isReady ? { scale: 0.98 } : {}}
                                            style={{ 
                                                position: 'relative', 
                                                zIndex: 10,
                                                pointerEvents: 'auto'
                                            }}
                                        >
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                className={classes.testButton}
                                                onClick={() => handleTestLogin('editor@site.com', 'editor123')}
                                                startIcon={<Person />}
                                                disabled={!isReady}
                                                style={{ 
                                                    pointerEvents: 'auto',
                                                    opacity: isReady ? 1 : 0.7,
                                                    transition: 'opacity 0.3s ease'
                                                }}
                                            >
                                                ✏️ Editor - Modify Data
                                            </Button>
                                        </motion.div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <motion.div 
                                            whileHover={isReady ? { scale: 1.02 } : {}} 
                                            whileTap={isReady ? { scale: 0.98 } : {}}
                                            style={{ 
                                                position: 'relative', 
                                                zIndex: 10,
                                                pointerEvents: 'auto'
                                            }}
                                        >
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                className={classes.testButton}
                                                onClick={() => handleTestLogin('viewer@site.com', 'viewer123')}
                                                startIcon={<Person />}
                                                disabled={!isReady}
                                                style={{ 
                                                    pointerEvents: 'auto',
                                                    opacity: isReady ? 1 : 0.7,
                                                    transition: 'opacity 0.3s ease'
                                                }}
                                            >
                                                👁️ Viewer - Read Only
                                            </Button>
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </motion.div>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Login;