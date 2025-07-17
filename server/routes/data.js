const express = require('express');
const { authorize } = require('../middleware/auth');
const router = express.Router();

// Mock data
const orders = [
    { id: 1, item: 'Pizza Delivery', customer: 'John Doe', status: 'Delivered', amount: '$25.99' },
    { id: 2, item: 'Grocery Shopping', customer: 'Jane Smith', status: 'Pending', amount: '$45.50' },
    { id: 3, item: 'Food Delivery', customer: 'Mike Johnson', status: 'In Progress', amount: '$18.75' },
    { id: 4, item: 'Medicine Delivery', customer: 'Sarah Wilson', status: 'Delivered', amount: '$12.30' },
];

const riders = [
    { id: 1, name: 'Alex Rodriguez', status: 'Active', orders: 15, rating: 4.8 },
    { id: 2, name: 'Emma Thompson', status: 'Active', orders: 23, rating: 4.9 },
    { id: 3, name: 'David Chen', status: 'Inactive', orders: 8, rating: 4.6 },
    { id: 4, name: 'Lisa Brown', status: 'Active', orders: 31, rating: 4.7 },
];

const users = [
    { id: 1, email: 'admin@site.com', role: 'admin', name: 'Admin User', lastLogin: '2025-01-15' },
    { id: 2, email: 'editor@site.com', role: 'editor', name: 'Editor User', lastLogin: '2025-01-14' },
    { id: 3, email: 'viewer@site.com', role: 'viewer', name: 'Viewer User', lastLogin: '2025-01-13' },
    { id: 4, email: 'john@site.com', role: 'viewer', name: 'John Customer', lastLogin: '2025-01-12' },
];

const settings = {
    theme: 'light',
    notifications: true,
    autoLogout: 600, // 10 minutes
    apiRateLimit: 1000,
    maintenanceMode: false,
};

// Endpoints with role-based access control
router.get('/orders', (req, res) => {
    res.json(orders);
});

router.get('/riders', (req, res) => {
    res.json(riders);
});

router.get('/users', authorize(['admin', 'editor']), (req, res) => {
    res.json(users);
});

router.get('/settings', authorize(['admin']), (req, res) => {
    res.json(settings);
});

// Update endpoints (require appropriate permissions)
router.put('/orders/:id', authorize(['admin', 'editor']), (req, res) => {
    const { id } = req.params;
    const orderIndex = orders.findIndex(o => o.id === parseInt(id));
    if (orderIndex !== -1) {
        orders[orderIndex] = { ...orders[orderIndex], ...req.body };
        res.json(orders[orderIndex]);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

router.delete('/orders/:id', authorize(['admin']), (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(o => o.id === parseInt(id));
    if (index !== -1) {
        orders.splice(index, 1);
        res.json({ message: 'Order deleted successfully' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

router.put('/riders/:id', authorize(['admin', 'editor']), (req, res) => {
    const { id } = req.params;
    const riderIndex = riders.findIndex(r => r.id === parseInt(id));
    if (riderIndex !== -1) {
        riders[riderIndex] = { ...riders[riderIndex], ...req.body };
        res.json(riders[riderIndex]);
    } else {
        res.status(404).json({ message: 'Rider not found' });
    }
});

router.delete('/riders/:id', authorize(['admin']), (req, res) => {
    const { id } = req.params;
    const index = riders.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
        riders.splice(index, 1);
        res.json({ message: 'Rider deleted successfully' });
    } else {
        res.status(404).json({ message: 'Rider not found' });
    }
});

router.put('/users/:id', authorize(['admin']), (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.delete('/users/:id', authorize(['admin']), (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.put('/settings', authorize(['admin']), (req, res) => {
    Object.assign(settings, req.body);
    res.json(settings);
});

module.exports = router;