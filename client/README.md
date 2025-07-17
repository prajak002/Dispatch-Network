# RBAC-Powered Admin Dashboard

## Overview
This project is a lightweight admin dashboard web application that implements login authentication and role-based access control (RBAC) using JWT tokens. The application allows users to log in and access different parts of the dashboard based on their assigned roles.

## Features
- **Role-Based Access Control**: Users can have different roles (Admin, Editor, Viewer) with specific permissions.
- **JWT Authentication**: Secure login using JWT tokens.
- **Interactive Dashboard**: Displays various cards with relevant information and actions based on user roles.
- **Protected Routes**: Certain routes are accessible only to users with the appropriate roles.

## Project Structure
```
rbac-admin-dashboard
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── store
│   │   ├── hooks
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
├── server
│   ├── routes
│   ├── middleware
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rbac-admin-dashboard
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm start
   ```

2. **Start the client**
   ```bash
   cd client
   npm start
   ```

The client application will typically run on `http://localhost:3000` and the server on `http://localhost:5001`.

### Mock Credentials
- Admin: 
  - Email: admin@site.com
  - Password: admin123
- Editor: 
  - Email: editor@site.com
  - Password: editor123
- Viewer: 
  - Email: viewer@site.com
  - Password: viewer123

### Usage
- Navigate to the login page and enter the credentials for one of the mock users.
- Based on the role, you will have different access levels to the dashboard features.

## Advanced Features
- **Token Expiry and Auto-Logout**: JWT tokens have a short expiry time, and the application will automatically log out users when the token expires.
- **Role Switching for Testing**: A developer-only toggle is available to simulate different user roles for testing purposes.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.