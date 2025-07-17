import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
    Card as MuiCard,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
    Collapse,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Box,
    CircularProgress,
    Avatar,
    Badge,
    Divider,
    LinearProgress
} from '@material-ui/core';
import {
    ExpandMore,
    ExpandLess,
    Edit,
    Delete,
    Visibility,
    Settings,
    TrendingUp,
    Assessment,
    Speed,
    Star,
    BarChart,
    ShowChart,
    PieChart
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.type === 'dark' 
            ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(50, 50, 50, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: 20,
        boxShadow: theme.palette.type === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        padding: theme.spacing(2),
        minHeight: '320px',
        pointerEvents: 'auto',
        userSelect: 'none',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            borderRadius: '20px 20px 0 0',
        },
        '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: theme.palette.type === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                : '0 20px 60px rgba(0, 0, 0, 0.15)',
        },
        '&:disabled': {
            opacity: 0.7,
            cursor: 'not-allowed',
        },
    },
    cardHeader: {
        padding: theme.spacing(3, 3, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardIcon: {
        width: 60,
        height: 60,
        borderRadius: 16,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(1, 3, 3),
    },
    cardTitle: {
        fontWeight: 700,
        fontSize: '1.5rem',
        marginBottom: theme.spacing(1),
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(135deg, #fff 0%, #a8a8a8 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    statsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(145deg, rgba(40, 40, 40, 0.8), rgba(20, 20, 20, 0.6))'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.6))',
        borderRadius: 16,
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: theme.palette.type === 'dark'
            ? 'inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.3)'
            : 'inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    statsRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing(1),
    },
    miniChart: {
        height: 40,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.5),
        marginTop: theme.spacing(1),
    },
    chartBar: {
        width: 4,
        borderRadius: 2,
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(to top, #667eea, #764ba2)'
            : 'linear-gradient(to top, #667eea, #764ba2)',
        transition: 'all 0.3s ease',
    },
    statItem: {
        textAlign: 'center',
        flex: 1,
        padding: theme.spacing(1),
        borderRadius: 8,
        background: theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.02)',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-2px)',
        },
    },
    statValue: {
        fontWeight: 700,
        fontSize: '1.4rem',
        background: theme.palette.type === 'dark'
            ? 'linear-gradient(135deg, #64ffda 0%, #1de9b6 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: theme.spacing(0.5),
    },
    statLabel: {
        fontSize: '0.85rem',
        color: theme.palette.text.secondary,
        fontWeight: 500,
    },
    trendIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
        fontSize: '0.75rem',
        fontWeight: 600,
    },
    cardActions: {
        padding: theme.spacing(1, 3, 3),
        justifyContent: 'space-between',
    },
    listItem: {
        backgroundColor: theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.02)',
        marginBottom: theme.spacing(1),
        borderRadius: 12,
        border: theme.palette.type === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.05)'
            : '1px solid rgba(0, 0, 0, 0.03)',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            transform: 'translateX(4px)',
        },
    },
    actionButton: {
        margin: theme.spacing(0, 0.5),
        borderRadius: 8,
        position: 'relative',
        zIndex: 10,
        cursor: 'pointer',
        pointerEvents: 'auto !important',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
    },
    statusChip: {
        fontWeight: 600,
        borderRadius: 8,
        backdropFilter: 'blur(10px)',
    },
    priorityChip: {
        borderRadius: 6,
        fontSize: '0.75rem',
        height: 24,
    },
    formControl: {
        marginBottom: theme.spacing(2),
        minWidth: 120,
        '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.02)',
        },
    },
    expandButton: {
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 600,
        background: theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.03)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 10,
        cursor: 'pointer',
        pointerEvents: 'auto !important',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
        },
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
    },
    pulseAnimation: {
        animation: '$pulse 2s ease-in-out infinite',
    },
    '@keyframes pulse': {
        '0%': { transform: 'scale(1)', opacity: 1 },
        '50%': { transform: 'scale(1.05)', opacity: 0.8 },
        '100%': { transform: 'scale(1)', opacity: 1 },
    },
}));

const Card = ({ title, content, data, actions, type, onClick, onDataUpdate, isReady = true }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCardClick = () => {
        if (!isReady) return; // Prevent clicks before component is ready
        if (onClick) {
            onClick();
        } else {
            setExpanded(!expanded);
        }
    };

    const handleEdit = async (e, item) => {
        e.stopPropagation();
        if (!isReady) return;
        setEditingItem(item);
        setShowModal(true);
    };

    const handleDelete = async (e, item) => {
        e.stopPropagation();
        if (!isReady) return;
        if (window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5001/api/data/${type}/${item.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (onDataUpdate) onDataUpdate();
            } catch (error) {
                console.error('Delete error:', error);
                alert(`Error deleting ${type.slice(0, -1)}: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSaveEdit = async (updatedItem) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5001/api/data/${type}/${updatedItem.id}`, updatedItem, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setShowModal(false);
            setEditingItem(null);
            if (onDataUpdate) onDataUpdate();
        } catch (error) {
            console.error('Update error:', error);
            alert(`Error updating ${type.slice(0, -1)}: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'delivered':
                return 'primary';
            case 'pending':
                return 'secondary';
            case 'inactive':
            case 'in progress':
                return 'default';
            default:
                return 'default';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return '#f44336';
            case 'medium':
                return '#ff9800';
            case 'low':
                return '#4caf50';
            default:
                return '#9e9e9e';
        }
    };

    const getCardIcon = () => {
        switch (type) {
            case 'orders':
                return <Assessment style={{ fontSize: 30, color: 'white' }} />;
            case 'riders':
                return <Speed style={{ fontSize: 30, color: 'white' }} />;
            case 'users':
                return <TrendingUp style={{ fontSize: 30, color: 'white' }} />;
            case 'settings':
                return <Settings style={{ fontSize: 30, color: 'white' }} />;
            default:
                return <Visibility style={{ fontSize: 30, color: 'white' }} />;
        }
    };

    const getCardStats = () => {
        if (!data || !Array.isArray(data)) return null;
        
        switch (type) {
            case 'orders':
                const delivered = data.filter(item => item.status?.toLowerCase() === 'delivered').length;
                const pending = data.filter(item => item.status?.toLowerCase() === 'pending').length;
                const inProgress = data.filter(item => item.status?.toLowerCase() === 'in progress').length;
                const successRate = Math.round((delivered / data.length) * 100);
                return {
                    stat1: { value: delivered, label: 'Delivered', trend: +12 },
                    stat2: { value: pending, label: 'Pending', trend: -5 },
                    stat3: { value: `${successRate}%`, label: 'Success Rate', trend: +8 },
                    chartData: [delivered, pending, inProgress, data.length - delivered - pending - inProgress]
                };
            case 'riders':
                const active = data.filter(item => item.status?.toLowerCase() === 'active').length;
                const avgRating = data.reduce((sum, item) => sum + (item.rating || 0), 0) / data.length;
                const topRiders = data.filter(item => item.rating >= 4.5).length;
                return {
                    stat1: { value: active, label: 'Active', trend: +6 },
                    stat2: { value: data.length - active, label: 'Inactive', trend: -3 },
                    stat3: { value: avgRating.toFixed(1), label: 'Avg Rating', trend: +0.2 },
                    chartData: [active, data.length - active, topRiders, data.length - topRiders]
                };
            case 'users':
                const admins = data.filter(item => item.role === 'admin').length;
                const editors = data.filter(item => item.role === 'editor').length;
                const viewers = data.length - admins - editors;
                const activeUsers = data.filter(item => item.status === 'active').length;
                return {
                    stat1: { value: admins, label: 'Admins', trend: +1 },
                    stat2: { value: editors, label: 'Editors', trend: +2 },
                    stat3: { value: viewers, label: 'Viewers', trend: +5 },
                    chartData: [admins, editors, viewers, activeUsers]
                };
            case 'analytics':
                return {
                    stat1: { value: '98.5%', label: 'Uptime', trend: +2.1 },
                    stat2: { value: '1.2ms', label: 'Response', trend: -0.3 },
                    stat3: { value: '1.25K', label: 'Requests/min', trend: +15 },
                    chartData: [985, 12, 1250, 2]
                };
            default:
                return null;
        }
    };

    const renderDataList = () => {
        if (!data || !Array.isArray(data)) return null;

        return (
            <List>
                {data.slice(0, expanded ? data.length : 3).map((item, index) => (
                    <ListItem key={item.id || index} className={classes.listItem}>
                        <ListItemText
                            primary={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="subtitle1" component="span">
                                        {type === 'orders' && item.item}
                                        {type === 'riders' && item.name}
                                        {type === 'users' && item.name}
                                    </Typography>
                                    {(type === 'orders' || type === 'riders') && (
                                        <Chip
                                            label={item.status}
                                            color={getStatusColor(item.status)}
                                            size="small"
                                            className={classes.statusChip}
                                        />
                                    )}
                                </Box>
                            }
                            secondary={
                                <Box>
                                    {type === 'orders' && (
                                        <>
                                            <Typography variant="body2">Customer: {item.customer}</Typography>
                                            <Typography variant="body2">Amount: {item.amount}</Typography>
                                        </>
                                    )}
                                    {type === 'riders' && (
                                        <>
                                            <Typography variant="body2">Orders: {item.orders}</Typography>
                                            <Typography variant="body2">Rating: {item.rating}/5 ⭐</Typography>
                                        </>
                                    )}
                                    {type === 'users' && (
                                        <>
                                            <Typography variant="body2">Email: {item.email}</Typography>
                                            <Typography variant="body2">Role: {item.role}</Typography>
                                            <Typography variant="body2">Last Login: {item.lastLogin}</Typography>
                                        </>
                                    )}
                                </Box>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Box>
                                {actions?.edit && (
                                    <IconButton
                                        edge="end"
                                        onClick={(e) => handleEdit(e, item)}
                                        disabled={loading || !isReady}
                                        className={classes.actionButton}
                                        color="primary"
                                        style={{ 
                                            pointerEvents: 'auto',
                                            opacity: isReady ? 1 : 0.6
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                )}
                                {actions?.delete && (
                                    <IconButton
                                        edge="end"
                                        onClick={(e) => handleDelete(e, item)}
                                        disabled={loading || !isReady}
                                        className={classes.actionButton}
                                        color="secondary"
                                        style={{ 
                                            pointerEvents: 'auto',
                                            opacity: isReady ? 1 : 0.6
                                        }}
                                    >
                                        {loading ? <CircularProgress size={20} /> : <Delete />}
                                    </IconButton>
                                )}
                            </Box>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    };

    const renderSettingsData = () => {
        if (type !== 'settings' || !data) return null;

        return (
            <div className="settings-preview">
                <div className="setting-item">
                    <span>Theme: {data.theme}</span>
                </div>
                <div className="setting-item">
                    <span>Notifications: {data.notifications ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div className="setting-item">
                    <span>Auto Logout: {data.autoLogout}s</span>
                </div>
            </div>
        );
    };

    const cardStats = getCardStats();

    // Mini Chart Component
    const MiniChart = ({ data, type }) => {
        if (!data) return null;
        
        const maxValue = Math.max(...data);
        const chartColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
        
        return (
            <Box className={classes.miniChart}>
                {data.map((value, index) => (
                    <Box
                        key={index}
                        className={classes.chartBar}
                        style={{
                            height: `${(value / maxValue) * 32}px`,
                            background: chartColors[index % chartColors.length],
                        }}
                    />
                ))}
                <Box ml={1} display="flex" alignItems="center">
                    {type === 'analytics' ? (
                        <ShowChart style={{ fontSize: 16, color: '#667eea' }} />
                    ) : (
                        <BarChart style={{ fontSize: 16, color: '#667eea' }} />
                    )}
                </Box>
            </Box>
        );
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={isReady ? "hover" : {}}
            style={{ 
                height: '100%',
                pointerEvents: 'auto',
                opacity: isReady ? 1 : 0.8,
                transition: 'opacity 0.3s ease'
            }}
        >
            <MuiCard 
                className={classes.card} 
                onClick={type !== 'settings' ? handleCardClick : onClick}
                style={{
                    pointerEvents: 'auto',
                    cursor: isReady ? 'pointer' : 'wait'
                }}
            >
                <Box className={classes.cardHeader}>
                    <Box className={classes.cardIcon}>
                        {getCardIcon()}
                    </Box>
                    {actions?.view && (
                        <Badge badgeContent="View" color="primary">
                            <Visibility color="action" />
                        </Badge>
                    )}
                </Box>

                <CardContent className={classes.cardContent}>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h5" className={classes.cardTitle}>
                            {title}
                        </Typography>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            {content}
                        </Typography>
                    </motion.div>

                    {cardStats && (
                        <motion.div variants={itemVariants}>
                            <Box className={classes.statsContainer}>
                                <Box className={classes.statsRow}>
                                    <Box className={classes.statItem}>
                                        <Typography className={classes.statValue}>
                                            {cardStats.stat1.value}
                                        </Typography>
                                        <Typography className={classes.statLabel}>
                                            {cardStats.stat1.label}
                                        </Typography>
                                        <Box className={classes.trendIndicator}>
                                            <TrendingUp 
                                                style={{ 
                                                    fontSize: 14, 
                                                    color: cardStats.stat1.trend > 0 ? '#4caf50' : '#f44336' 
                                                }} 
                                            />
                                            <Typography 
                                                style={{ 
                                                    color: cardStats.stat1.trend > 0 ? '#4caf50' : '#f44336',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {cardStats.stat1.trend > 0 ? '+' : ''}{cardStats.stat1.trend}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box className={classes.statItem}>
                                        <Typography className={classes.statValue}>
                                            {cardStats.stat2.value}
                                        </Typography>
                                        <Typography className={classes.statLabel}>
                                            {cardStats.stat2.label}
                                        </Typography>
                                        <Box className={classes.trendIndicator}>
                                            <TrendingUp 
                                                style={{ 
                                                    fontSize: 14, 
                                                    color: cardStats.stat2.trend > 0 ? '#4caf50' : '#f44336',
                                                    transform: cardStats.stat2.trend < 0 ? 'rotate(180deg)' : 'none'
                                                }} 
                                            />
                                            <Typography 
                                                style={{ 
                                                    color: cardStats.stat2.trend > 0 ? '#4caf50' : '#f44336',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {cardStats.stat2.trend > 0 ? '+' : ''}{cardStats.stat2.trend}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box className={classes.statItem}>
                                        <Typography className={classes.statValue}>
                                            {cardStats.stat3.value}
                                        </Typography>
                                        <Typography className={classes.statLabel}>
                                            {cardStats.stat3.label}
                                        </Typography>
                                        <Box className={classes.trendIndicator}>
                                            <TrendingUp 
                                                style={{ 
                                                    fontSize: 14, 
                                                    color: cardStats.stat3.trend > 0 ? '#4caf50' : '#f44336',
                                                    transform: cardStats.stat3.trend < 0 ? 'rotate(180deg)' : 'none'
                                                }} 
                                            />
                                            <Typography 
                                                style={{ 
                                                    color: cardStats.stat3.trend > 0 ? '#4caf50' : '#f44336',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {cardStats.stat3.trend > 0 ? '+' : ''}{cardStats.stat3.trend}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                
                                {cardStats.chartData && (
                                    <Box>
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Typography variant="caption" style={{ 
                                                color: 'inherit', 
                                                opacity: 0.7,
                                                fontWeight: 600
                                            }}>
                                                📊 Analytics Overview
                                            </Typography>
                                            <MiniChart data={cardStats.chartData} type={type} />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </motion.div>
                    )}

                    {type === 'settings' && (
                        <motion.div variants={itemVariants}>
                            <Box mt={2}>
                                <Typography variant="body2" style={{ 
                                    color: 'inherit', 
                                    opacity: 0.8 
                                }}>
                                    Theme: {data?.theme}
                                </Typography>
                                <Typography variant="body2" style={{ 
                                    color: 'inherit', 
                                    opacity: 0.8 
                                }}>
                                    Notifications: {data?.notifications ? 'Enabled' : 'Disabled'}
                                </Typography>
                                <Typography variant="body2" style={{ 
                                    color: 'inherit', 
                                    opacity: 0.8 
                                }}>
                                    Auto Logout: {data?.autoLogout}s
                                </Typography>
                            </Box>
                        </motion.div>
                    )}

                    {expanded && type !== 'settings' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                        >
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                {renderDataList()}
                            </Collapse>
                        </motion.div>
                    )}
                </CardContent>

                <CardActions className={classes.cardActions}>
                    {type !== 'settings' && data && data.length > 3 && (
                        <motion.div 
                            whileHover={isReady ? { scale: 1.05 } : {}} 
                            whileTap={isReady ? { scale: 0.95 } : {}}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isReady) setExpanded(!expanded);
                                }}
                                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                                size="small"
                                className={classes.expandButton}
                                disabled={!isReady}
                                style={{ 
                                    pointerEvents: 'auto',
                                    opacity: isReady ? 1 : 0.6
                                }}
                            >
                                {expanded ? 'Show Less' : `Show All (${data.length})`}
                            </Button>
                        </motion.div>
                    )}
                    
                    {type === 'settings' && actions?.edit && (
                        <motion.div 
                            whileHover={isReady ? { scale: 1.05 } : {}} 
                            whileTap={isReady ? { scale: 0.95 } : {}}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <Button
                                size="small"
                                color="primary"
                                startIcon={<Settings />}
                                onClick={onClick}
                                className={classes.expandButton}
                                disabled={!isReady}
                                style={{ 
                                    pointerEvents: 'auto',
                                    opacity: isReady ? 1 : 0.6
                                }}
                            >
                                Configure
                            </Button>
                        </motion.div>
                    )}
                </CardActions>

                {/* Edit Modal */}
                {showModal && editingItem && (
                    <EditModal
                        item={editingItem}
                        type={type}
                        onSave={handleSaveEdit}
                        onCancel={() => {
                            setShowModal(false);
                            setEditingItem(null);
                        }}
                        loading={loading}
                    />
                )}
            </MuiCard>
        </motion.div>
    );
};

// Edit Modal Component
const EditModal = ({ item, type, onSave, onCancel, loading }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({ ...item });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const renderFormFields = () => {
        switch (type) {
            case 'orders':
                return (
                    <Box>
                        <TextField
                            fullWidth
                            label="Item"
                            value={formData.item || ''}
                            onChange={(e) => handleInputChange('item', e.target.value)}
                            className={classes.formControl}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Customer"
                            value={formData.customer || ''}
                            onChange={(e) => handleInputChange('customer', e.target.value)}
                            className={classes.formControl}
                            variant="outlined"
                        />
                        <FormControl fullWidth className={classes.formControl} variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={formData.status || ''}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                label="Status"
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Amount"
                            value={formData.amount || ''}
                            onChange={(e) => handleInputChange('amount', e.target.value)}
                            className={classes.formControl}
                            variant="outlined"
                        />
                    </Box>
                );
            case 'riders':
                return (
                    <Box>
                        <TextField
                            fullWidth
                            label="Name"
                            value={formData.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={classes.formControl}
                            variant="outlined"
                        />
                        <FormControl fullWidth className={classes.formControl} variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={formData.status || ''}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                label="Status"
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            type="number"
                            label="Orders"
                            value={formData.orders || ''}
                            onChange={(e) => handleInputChange('orders', parseInt(e.target.value))}
                            className={classes.formControl}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Rating"
                            value={formData.rating || ''}
                            onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                            className={classes.formControl}
                            variant="outlined"
                            inputProps={{ min: 1, max: 5, step: 0.1 }}
                        />
                    </Box>
                );
            case 'users':
                return (
                    <Box>
                        <TextField
                            fullWidth
                            label="Name"
                            value={formData.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={classes.formControl}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            value={formData.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={classes.formControl}
                            variant="outlined"
                        />
                        <FormControl fullWidth className={classes.formControl} variant="outlined">
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={formData.role || ''}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                                label="Role"
                            >
                                <MenuItem value="viewer">Viewer</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Edit {type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {renderFormFields()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Card;