# 🔐 RBAC Admin Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-14+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt=## 📞 Support

- 🐛 **Bug Reports**: [Issues](https://github.com/prajak002/Dispatch-Network/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/prajak002/Dispatch-Network/discussions)
- 📧 **Contact**: prajak002@gmail.com.js"/>
  <img src="https://img.shields.io/badge/Material--UI-4.12.4-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material-UI"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</div>

<div align="center">
  <h3>🚀 A Modern, Secure Admin Dashboard with Role-Based Access Control</h3>
  <p><em>Stunning glassmorphism UI • JWT Authentication • Real-time Role Management • Responsive Design</em></p>
</div>

---

## ✨ Features

### 🔒 **Advanced Security**
- **JWT Token Authentication** with secure login/logout
- **Role-Based Access Control (RBAC)** for granular permissions
- **Automatic Token Expiry** with 2-minute warning notifications
- **Auto-logout** when tokens expire
- **Protected Routes** based on user roles
- **Secure API endpoints** with middleware validation

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** with blur effects and transparency
- **Animated Components** using Framer Motion
- **Typewriter Effects** for dynamic text
- **Responsive Layout** that works on all devices
- **Dark/Light Theme** support with smooth transitions
- **Interactive Hover Effects** and micro-animations

### 👥 **Role Management**
| Role   | Dashboard Access | Data Modification | User Management | Settings | Administrative |
|--------|------------------|-------------------|-----------------|----------|----------------|
| 👁️ **Viewer** | ✅ Read Only | ❌ | ❌ | ❌ | ❌ |
| ✏️ **Editor** | ✅ Full Access | ✅ Edit Data | ❌ | ❌ | ❌ |
| 🔑 **Admin** | ✅ Full Access | ✅ All Operations | ✅ User Control | ✅ System Config | ✅ Complete Access |


## 🚀 Quick Demo

### 🎯 **Test Credentials (One-Click Login)**
```bash
# 🔑 Admin Account (Full Access)
Email: admin@site.com
Password: admin123
Features: All dashboard cards, Settings access, Full CRUD operations

# ✏️ Editor Account (Modify Data)
Email: editor@site.com  
Password: editor123
Features: Dashboard access, Edit/View operations (No Delete/Settings)

# 👁️ Viewer Account (Read Only)
Email: viewer@site.com
Password: viewer123
Features: Dashboard view only (No modifications)
```

---

## 🗂️ **Mock Data & Sample Content**

### **📋 Sample Orders Data**
```json
{
  "orders": [
    {
      "id": 1,
      "item": "Premium Laptop",
      "customer": "John Doe",
      "amount": "$1,299",
      "status": "Delivered",
      "date": "2025-01-15",
      "priority": "high"
    },
    {
      "id": 2,
      "item": "Wireless Headphones",
      "customer": "Jane Smith",
      "amount": "$199",
      "status": "In Progress",
      "date": "2025-01-16",
      "priority": "medium"
    }
  ]
}
```

### **🚴 Sample Riders Data**
```json
{
  "riders": [
    {
      "id": 1,
      "name": "Alex Rodriguez",
      "status": "Active",
      "orders": 45,
      "rating": 4.8,
      "location": "Downtown",
      "vehicle": "Motorcycle"
    },
    {
      "id": 2,
      "name": "Maria Garcia",
      "status": "Active",
      "orders": 38,
      "rating": 4.9,
      "location": "Uptown",
      "vehicle": "Bicycle"
    }
  ]
}
```

### **👥 Sample Users Data**
```json
{
  "users": [
    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@site.com",
      "role": "admin",
      "lastLogin": "2025-01-17 09:30",
      "status": "Active",
      "permissions": ["read", "write", "delete"]
    },
    {
      "id": 2,
      "name": "Editor User",
      "email": "editor@site.com",
      "role": "editor",
      "lastLogin": "2025-01-17 08:15",
      "status": "Active",
      "permissions": ["read", "write"]
    }
  ]
}
```

### **⚙️ Sample Settings Data**
```json
{
  "settings": {
    "theme": "light",
    "notifications": true,
    "autoLogout": 600,
    "apiRateLimit": 1000,
    "maintenanceMode": false,
    "language": "en",
    "timezone": "UTC",
    "emailNotifications": true,
    "smsNotifications": false
  }
}
```

### **📊 Sample Analytics Data**
```json
{
  "analytics": {
    "totalOrders": 156,
    "totalRevenue": "$45,678",
    "activeRiders": 12,
    "completionRate": 94.2,
    "avgDeliveryTime": "28 mins",
    "customerSatisfaction": 4.6
  }
}
```

**📁 Complete sample data available in:** `client/src/data/dashboardData.json`

---

## 🛠️ Tech Stack

### **Frontend**
- **React 17.0.2** - Modern UI library
- **Material-UI 4.12.4** - Component library
- **Framer Motion 4.1.17** - Animation library
- **React Router 5.2.0** - Client-side routing
- **Axios 0.21.1** - HTTP client
- **Typewriter Effect** - Dynamic text animations

### **Backend**
- **Node.js** - Runtime environment
- **Express.js 4.17.1** - Web framework
- **JWT 8.5.1** - Token authentication
- **CORS 2.8.5** - Cross-origin requests
- **Body Parser** - Request parsing

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   React Client  │◄──►│  Express API    │◄──►│  JWT Service    │
│                 │    │                 │    │                 │
│  • Login UI     │    │  • Auth Routes  │    │  • Token Gen    │
│  • Dashboard    │    │  • Data Routes  │    │  • Validation   │
│  • RBAC Logic   │    │  • RBAC Middle  │    │  • Expiry       │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📋 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn package manager

### **🚀 Quick Start**

1. **Clone the repository**
   ```bash
   git clone https://github.com/prajak002/Dispatch-Network.git
   cd Dispatch-Network/rbac-dashboard/dashboard/rbac-admin-dashboard
   ```

2. **Setup Backend Server**
   ```bash
   cd server
   npm install
   npm start
   # Server runs on http://localhost:5001
   ```

3. **Setup Frontend Client**
   ```bash
   cd client
   npm install
   npm start
   # Client runs on http://localhost:3000
   ```

4. **Access the Application**
   - Open http://localhost:3000
   - Use demo credentials from above
   - Explore different role permissions!

---

## 🎮 Usage Guide

### **🔐 Authentication Flow**
1. **Login** - Use demo credentials or create new accounts
2. **Token Generation** - JWT token created with role information
3. **Dashboard Access** - Role-based UI rendering
4. **Session Management** - Auto-logout with expiry warnings

### **📊 Dashboard Features**
- **Orders Card** - View/Edit order data (role-dependent)
- **Riders Card** - Manage delivery personnel
- **Users Card** - User management (Admin only)
- **Settings Card** - System configuration (Admin only)

### **⚡ Real-time Features**
- Session timer countdown
- Token expiry warnings (2-minute alert)
- Automatic logout on expiry
- Role-based button visibility

---

## 🔧 Configuration

### **Environment Variables**
```env
# Client (.env)
REACT_APP_API_URL=http://localhost:5001/api

# Server
PORT=5001
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=5m
```

### **JWT Token Structure**
```json
{
  "id": "user_id",
  "email": "user@example.com", 
  "role": "admin|editor|viewer",
  "iat": 1641234567,
  "exp": 1641234867
}
```

---

## 🎨 UI Components

### **Glassmorphism Design**
- Backdrop blur effects
- Semi-transparent backgrounds
- Smooth gradients and shadows
- Hover animations and transitions

### **Responsive Layout**
- Mobile-first design approach
- Flexible grid system
- Touch-friendly interactions
- Cross-browser compatibility

---

## 🔒 Security Features

### **Authentication Security**
- JWT token-based authentication
- Secure password handling
- Token expiry management
- Protected route validation

### **Authorization (RBAC)**
- Role-based UI rendering
- API endpoint protection
- Middleware validation
- Granular permission control

---

## 🧪 Testing

### **Manual Testing**
```bash
# Test different roles
1. Login as Admin → Access all features
2. Login as Editor → Limited access (no Settings)
3. Login as Viewer → Read-only access
4. Wait for token expiry → Auto-logout test
```

### **API Testing**
```bash
# Test protected endpoints
curl -H "Authorization: Bearer <token>" http://localhost:5001/api/data
```

---

## 🚀 Deployment

### **Frontend (Netlify/Vercel)**
```bash
cd client
npm run build
# Deploy dist/build folder
```

### **Backend (Heroku/Railway)**
```bash
cd server  
# Set environment variables
# Deploy to cloud platform
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Future Enhancements

- [ ] **Database Integration** (MongoDB/PostgreSQL)
- [ ] **Real User Management** with registration
- [ ] **Advanced Analytics** dashboard
- [ ] **Email Notifications** for security events
- [ ] **Two-Factor Authentication** (2FA)
- [ ] **Audit Logs** for user actions
- [ ] **API Rate Limiting** and throttling
- [ ] **Docker Containerization**
- [ ] **Unit Testing** suite
- [ ] **Admin Panel** for role management

---

## 📞 Support

- � **Bug Reports**: [Issues](https://github.com/your-repo/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/your-repo/discussions)
- 📧 **Contact**: your.email@example.com

---

<div align="center">
  <h3>⭐ Star this repository if you found it helpful!</h3>
  <p>Built with ❤️ using React, Node.js, and modern web technologies</p>
</div>