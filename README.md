# RBAC-Powered Admin Dashboard

## Overview
A comprehensive admin dashboard web application that implements JWT authentication and role-based access control (RBAC). The application features automatic token expiry handling, role-based UI restrictions, and a modern responsive design.

## 🚀 Features

### Authentication & Security
- **JWT Token Authentication** with secure login/logout
- **Role-Based Access Control (RBAC)** for granular permissions
- **Automatic Token Expiry** with 2-minute warning notifications
- **Auto-logout** when tokens expire
- **Protected Routes** based on user roles

### User Roles & Permissions
| Role   | View | Edit | Delete | Settings Access |
|--------|------|------|--------|-----------------|
| Viewer | ✅   | ❌   | ❌     | ❌              |
| Editor | ✅   | ✅   | ❌     | ❌              |
| Admin  | ✅   | ✅   | ✅     | ✅              |

### Dashboard Features
- **Interactive Dashboard Cards** for Orders, Riders, Users, and Settings
- **Real-time Data Display** with expandable views
- **Role-based Action Buttons** (Edit/Delete/View)
- **Session Timer** showing remaining session time
- **Responsive Design** for mobile and desktop

### Advanced Features
- **Token Expiry Warnings** (alerts at 2 minutes remaining)
- **Developer Testing Tools** (quick role switching buttons)
- **Comprehensive Settings Panel** (Admin only)
- **Mock Data Management** with CRUD operations

## 🏗️ Project Structure
```
rbac-admin-dashboard/
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.jsx             # Interactive dashboard cards
│   │   │   └── ProtectedRoute.jsx   # Route protection component
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Main dashboard page
│   │   │   ├── Login.jsx            # Login page with test credentials
│   │   │   ├── Settings.jsx         # Admin settings page
│   │   │   └── NotAuthorized.jsx    # 403 error page
│   │   ├── hooks/
│   │   │   └── useAuth.js           # Authentication hook
│   │   ├── store/
│   │   │   └── auth.js              # Auth state management
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Comprehensive styling
│   │   └── index.js                 # App entry point
│   ├── package.json
│   └── README.md
├── server/                          # Node.js Backend
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   └── data.js                  # Data API routes with RBAC
│   ├── middleware/
│   │   └── auth.js                  # JWT verification & RBAC middleware
│   ├── server.js                    # Express server setup
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rbac-admin-dashboard
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../server
   npm start
   ```
   Server will run on `http://localhost:5001`

5. **Start the frontend client**
   ```bash
   cd ../client
   npm start
   ```
   Client will run on `http://localhost:3000`

## 🔐 Test Credentials

The application includes pre-configured test users for each role:

| Role   | Email              | Password   | Access Level          |
|--------|--------------------|-----------|-----------------------|
| Admin  | admin@site.com     | admin123  | Full access + Settings |
| Editor | editor@site.com    | editor123 | View + Edit (no Delete) |
| Viewer | viewer@site.com    | viewer123 | View only             |

### Quick Login Buttons
The login page includes convenient test buttons for immediate role switching during development and testing.

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login with email/password
- `GET /api/auth/profile` - Get user profile (requires JWT)

### Data Management (Protected Routes)
- `GET /api/data/orders` - View orders (All roles)
- `GET /api/data/riders` - View riders (All roles)
- `GET /api/data/users` - View users (Admin, Editor only)
- `GET /api/data/settings` - View settings (Admin only)
- `PUT /api/data/orders/:id` - Edit orders (Admin, Editor only)
- `DELETE /api/data/orders/:id` - Delete orders (Admin only)
- `PUT /api/data/settings` - Update settings (Admin only)

## 🎨 UI/UX Features

### Dashboard Cards
- **Orders Card**: View delivery orders with customer details
- **Riders Card**: Manage delivery personnel with ratings
- **Users Card**: User management (Admin/Editor access)
- **Settings Card**: System configuration (Admin only)

### Interactive Elements
- **Expandable Cards**: Click to view detailed data
- **Role-based Buttons**: Edit/Delete buttons appear based on permissions
- **Session Timer**: Live countdown of remaining session time
- **Responsive Design**: Optimized for all screen sizes

### Visual Feedback
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Success Notifications**: Confirmation for actions
- **Warning Alerts**: Token expiry notifications

## 🔧 Advanced Configuration

### JWT Token Settings
- **Expiry Time**: 10 minutes (configurable)
- **Warning Time**: 2 minutes before expiry
- **Auto-logout**: Automatic when expired

### Security Features
- **CORS Protection**: Configured for frontend domain
- **JWT Verification**: All protected routes require valid tokens
- **Role Validation**: Server-side permission checks

### Mock Data
The application includes realistic mock data for:
- **Orders**: Pizza delivery, grocery shopping, medicine delivery
- **Riders**: Active delivery personnel with ratings
- **Users**: System users with different roles
- **Settings**: System configuration options

## 🧪 Testing & Development

### Role Testing
1. Use the quick login buttons on the login page
2. Switch between different roles to test permissions
3. Verify that UI elements appear/disappear based on role
4. Test protected routes and API access

### Token Expiry Testing
1. Login and wait for the 2-minute warning
2. Verify automatic logout after token expires
3. Test manual logout functionality

## 🚀 Deployment Considerations

### Production Setup
- Replace `your_secret_key` with a strong, random secret
- Configure environment variables for different environments
- Set up proper CORS policies for production domains
- Implement proper session management and refresh tokens

### Security Enhancements
- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Set up proper logging and monitoring

## 📄 License
This project is licensed under the MIT License.

## 🤝 Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## 📞 Support
For questions or support, please open an issue in the repository.