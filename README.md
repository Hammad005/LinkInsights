# LinkInsights

![Demo App](/frontend/public/LinkInsights_post.png)

LinkInsights is a full-stack URL shortening and analytics platform that allows users to create shortened links, track clicks, and analyze link performance with detailed insights.

## 🌟 Features

- **User Authentication** - Secure signup/login with Firebase
- **URL Shortening** - Generate shortened URLs with custom aliases
- **Click Analytics** - Track and analyze link performance
- **Dashboard** - Comprehensive analytics and insights
- **Link Management** - View, edit, and delete your shortened links
- **Click Details** - Detailed information about each click (device, location, referrer)
- **Responsive Design** - Works seamlessly on desktop and mobile

## 📋 Project Structure

```
LinkInsights/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   ├── package.json
│   └── README.md            # Frontend setup guide
├── server/                   # Node.js + Express backend server
│   ├── src/
│   ├── package.json
│   └── README.md            # Server setup guide
└── README.md                # This file (overview)
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js** v14+ installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Firebase** project ([Setup Guide](https://firebase.google.com/docs/web/setup))
- **Cloudinary** account for image uploads ([Sign up](https://cloudinary.com/users/register/free))

### Installation Steps

#### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd LinkInsights
```

#### Step 2: Setup Backend Server

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with required variables:
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkinsights
JWT_SECRET=your_secret_key_here
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

📖 [Full Server Setup Guide →](./server/README.md)

#### Step 3: Setup Frontend Application

1. Open a new terminal and navigate to frontend:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_BASE_URL=http://localhost:5173
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_MEASUREMENT_ID=your_firebase_measurement_id
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

📖 [Full Frontend Setup Guide →](./frontend/README.md)

#### Step 4: Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📚 Detailed Documentation

- **[Frontend Setup & Development](./frontend/README.md)** - React + Vite configuration, environment variables, project structure
- **[Backend Setup & API](./server/README.md)** - Express server, MongoDB, API endpoints, environment variables

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit
- Tailwind CSS
- React Router
- Recharts (Charts)
- GSAP (Animations)
- Lucide React (Icons)
- Axios (HTTP)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Firebase Admin SDK
- Nodemailer
- Cloudinary

## 📦 Available Commands

### Frontend

```bash
cd frontend

# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Quality
npm run lint         # Check code with ESLint
```

### Server

```bash
cd server

# Development
npm run dev          # Start with auto-restart (nodemon)

# Production
npm start            # Start server in production mode
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for passwords
- **CORS Protection** - Configured CORS for secure API access
- **Environment Variables** - Sensitive data stored in `.env` files
- **Firebase Security** - Firebase Admin SDK for secure operations

## 🌐 API Overview

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password

### Link Management Endpoints
- `POST /api/links/create` - Create shortened URL
- `GET /api/links/getMyLinks` - Get user's links
- `DELETE /api/links/deleteLink/:id` - Delete a link
- `GET /api/links/analytics` - Get analytics data

### Click Tracking
- `GET /:shortCode` - Redirect and track click

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Change port in server/.env or frontend vite.config.js
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `server/.env`
- Verify database user credentials

### CORS Error
- Verify `FRONTEND_URL` in server `.env` matches your frontend URL
- Check API base URL in frontend `.env.local`

### Firebase Issues
- Ensure Firebase project is created
- Check service account credentials
- Verify Firebase config keys in frontend `.env.local`

## 📝 Environment Variables Setup

### Gmail App Password (for Nodemailer)
1. Enable 2-factor authentication on Gmail
2. Generate [App Password](https://support.google.com/accounts/answer/185833)
3. Use generated password as `EMAIL_PASS` in `.env`

### MongoDB Atlas Connection String
1. Create MongoDB Atlas cluster
2. Create database user with strong password
3. Copy connection string from Atlas dashboard
4. Replace `<username>`, `<password>`, and `<dbname>` in the string

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication methods
4. Download service account key for backend
5. Copy Firebase config for frontend

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature/your-feature`
6. Submit a pull request

## 📧 Support & Issues

If you encounter any issues:
1. Check the relevant README ([Frontend](./frontend/README.md) or [Server](./server/README.md))
2. Review the Troubleshooting section above
3. Create an issue on GitHub with detailed description
4. Include error messages and environment setup details

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## ✨ Tips for Success

- Keep both frontend and server running during development
- Use `.env` and `.env.local` files for configuration (never commit them)
- Check browser console and server logs for errors
- Test API endpoints with Postman before troubleshooting frontend
- Keep dependencies updated: `npm update`

---

**Happy coding! 🎉 Build something amazing with LinkInsights.**
