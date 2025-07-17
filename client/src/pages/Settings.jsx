import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../contexts/SettingsContext';
import {
    Container,
    Paper,
    Typography,
    AppBar,
    Toolbar,
    Button,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Switch,
    FormControlLabel,
    Divider,
    Card,
    CardContent,
    CircularProgress,
    Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack, ExitToApp, Save, Refresh } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        marginBottom: theme.spacing(3),
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
    },
    section: {
        marginBottom: theme.spacing(3),
    },
    sectionTitle: {
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.main,
        fontWeight: 600,
    },
    formControl: {
        marginBottom: theme.spacing(2),
        minWidth: 200,
    },
    actionsContainer: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[50],
        borderRadius: theme.shape.borderRadius,
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    },
}));

const Settings = () => {
    const classes = useStyles();
    const { logout } = useAuth();
    const { settings, updateSettings } = useSettings();
    const history = useHistory();
    const [localSettings, setLocalSettings] = useState({
        theme: 'light',
        notifications: true,
        autoLogout: 600,
        apiRateLimit: 1000,
        maintenanceMode: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
            setLoading(false);
        }
    }, [settings]);

    const handleSaveSettings = async () => {
        setSaving(true);
        try {
            await updateSettings(localSettings);
            setSnackbar({
                open: true,
                message: 'Settings saved successfully!',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error saving settings:', error);
            setSnackbar({
                open: true,
                message: 'Error saving settings',
                severity: 'error'
            });
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (key, value) => {
        setLocalSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleReset = () => {
        setLocalSettings(settings);
    };

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <Box className={classes.loadingContainer}>
                <CircularProgress size={60} />
                <Typography variant="h6" style={{ marginLeft: 16 }}>
                    Loading settings...
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        System Settings
                    </Typography>
                    <Button 
                        color="inherit" 
                        onClick={() => history.push('/dashboard')}
                        startIcon={<ArrowBack />}
                    >
                        Dashboard
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={handleLogout}
                        startIcon={<ExitToApp />}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Appearance Settings */}
                    <Grid item xs={12} md={6}>
                        <Card className={classes.section}>
                            <CardContent>
                                <Typography variant="h6" className={classes.sectionTitle}>
                                    Appearance
                                </Typography>
                                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                    <InputLabel>Theme</InputLabel>
                                    <Select
                                        value={localSettings.theme}
                                        onChange={(e) => handleInputChange('theme', e.target.value)}
                                        label="Theme"
                                    >
                                        <MenuItem value="light">Light</MenuItem>
                                        <MenuItem value="dark">Dark</MenuItem>
                                    </Select>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Notification Settings */}
                    <Grid item xs={12} md={6}>
                        <Card className={classes.section}>
                            <CardContent>
                                <Typography variant="h6" className={classes.sectionTitle}>
                                    Notifications
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={localSettings.notifications}
                                            onChange={(e) => handleInputChange('notifications', e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Enable notifications"
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Security Settings */}
                    <Grid item xs={12} md={6}>
                        <Card className={classes.section}>
                            <CardContent>
                                <Typography variant="h6" className={classes.sectionTitle}>
                                    Security
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Auto logout timeout (seconds)"
                                    type="number"
                                    value={localSettings.autoLogout}
                                    onChange={(e) => handleInputChange('autoLogout', parseInt(e.target.value))}
                                    inputProps={{ min: 60, max: 3600 }}
                                    className={classes.formControl}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* API Settings */}
                    <Grid item xs={12} md={6}>
                        <Card className={classes.section}>
                            <CardContent>
                                <Typography variant="h6" className={classes.sectionTitle}>
                                    API Settings
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="API Rate Limit (requests per hour)"
                                    type="number"
                                    value={localSettings.apiRateLimit}
                                    onChange={(e) => handleInputChange('apiRateLimit', parseInt(e.target.value))}
                                    inputProps={{ min: 100, max: 10000 }}
                                    className={classes.formControl}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* System Settings */}
                    <Grid item xs={12}>
                        <Card className={classes.section}>
                            <CardContent>
                                <Typography variant="h6" className={classes.sectionTitle}>
                                    System
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={localSettings.maintenanceMode}
                                            onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Maintenance Mode"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Paper className={classes.actionsContainer}>
                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSaveSettings}
                            disabled={saving}
                            startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                        >
                            {saving ? 'Saving...' : 'Save Settings'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={handleReset}
                            startIcon={<Refresh />}
                        >
                            Reset to Saved
                        </Button>
                    </Box>
                </Paper>
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Settings;