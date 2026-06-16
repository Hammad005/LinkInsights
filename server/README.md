# LinkInsights Server

A Node.js + Express backend server for the LinkInsights URL shortening and analytics platform.

## 📋 Overview

The server is built with:
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Firebase Admin SDK** - User management and authentication
- **Nodemailer** - Email service
- **Cloudinary** - Image hosting
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14+ and **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Firebase** project with Admin SDK
- **Cloudinary** account
- **Nodemailer** configuration (Gmail or custom email service)

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```bash
cp .env.example .env  # if available
```

Then add all required environment variables (see [Environment Variables](#-environment-variables) section).

### Development

Start the development server with auto-restart on file changes:

```bash
npm run dev
```

The server will run on `http://localhost:5000` (or your configured `PORT`).

### Production

Start the server in production mode:

```bash
npm start
```

## 🔧 Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkinsights

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Email Service (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Vercel Configuration (optional, for deployment)
VERCEL_URL=your_vercel_url
```

### Required Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `my-project-123` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/              # Request handlers
│   │   ├── authController.js    # Auth endpoints
│   │   ├── linkController.js    # Link management endpoints
│   │   └── clickController.js   # Click tracking endpoints
│   ├── models/                   # MongoDB schemas
│   │   ├── User.js
│   │   ├── Link.js
│   │   └── Click.js
│   ├── routes/                   # API route definitions
│   │   ├── authRoutes.js
│   │   └── linksRoutes.js
│   ├── middleware/               # Custom middleware
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── multerUploadMiddleware.js
│   ├── lib/                      # External service configurations
│   │   ├── cloudinary.js        # Image hosting
│   │   ├── firebaseAdmin.js     # Firebase initialization
│   │   └── nodemailer.js        # Email service
│   ├── func/                     # Utility functions
│   │   ├── jwtSign.js           # JWT token generation
│   │   └── otpGenerator.js      # OTP generation
│   ├── utils/                    # Utility functions
│   │   ├── emailTemplates.js    # Email templates
│   │   └── linkinsights-56218-firebase-adminsdk-fbsvc-890a3d90ec.json
│   ├── database/
│   │   └── connectDB.js         # MongoDB connection
│   └── server.js                # Main server file
├── vercel.json                   # Vercel deployment config
├── package.json                  # Dependencies and scripts
├── .env                          # Environment variables (not in git)
└── README.md                     # This file
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/signup           - User registration
POST   /api/auth/login            - User login
POST   /api/auth/logout           - User logout
POST   /api/auth/forgot-password  - Request password reset
POST   /api/auth/reset-password   - Reset password with token
```

### Links Management

```
POST   /api/links/create          - Create shortened URL
GET    /api/links/getMyLinks      - Get user's links (paginated)
DELETE /api/links/deleteLink/:id  - Delete a link
GET    /api/links/analytics       - Get analytics data
GET    /api/links/getMyClicks     - Get click details for a link
```

### Click Tracking

```
GET    /:shortCode               - Redirect to original URL (track click)
```

## 📊 Database Models

### User Model
```javascript
{
  email: String,
  name: String,
  password: String (hashed),
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Link Model
```javascript
{
  shortCode: String (unique),
  originalUrl: String,
  createdBy: ObjectId (User),
  expiresAt: Date,
  clicks: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Click Model
```javascript
{
  linkId: String (shortCode),
  device: String,
  browser: String,
  country: String,
  city: String,
  referrer: String,
  createdAt: Date
}
```

## 🔐 Authentication

- JWT-based authentication
- Firebase Admin SDK for user verification
- Passwords hashed with bcrypt
- OTP-based password reset
- Token stored in HTTP-only cookies

## 📧 Email Service

Integrated with Nodemailer for:
- Welcome emails
- Password reset emails
- Email verification
- Custom email templates

## 🖼️ Image Hosting

Cloudinary integration for:
- Profile image uploads
- Image optimization and delivery

## 🌐 CORS Configuration

CORS is configured to allow requests from the frontend URL specified in `FRONTEND_URL` environment variable.

## 📦 Available Scripts

```bash
# Development
npm run dev      # Start server with nodemon (auto-restart on changes)

# Production
npm start        # Start server in production mode
```

## 🚨 Troubleshooting

### Database Connection Issues
```
Error: connect ECONNREFUSED
```
- Ensure MongoDB is running
- Check `MONGODB_URI` is correctly formatted
- Verify MongoDB credentials
- If using MongoDB Atlas, add your IP to the whitelist

### JWT Authentication Errors
```
Error: Invalid token
```
- Check `JWT_SECRET` is set in `.env`
- Ensure JWT tokens haven't expired
- Verify token format in Authorization header: `Bearer <token>`

### Firebase Configuration Issues
- Download Firebase Admin SDK private key from Firebase Console
- Ensure Firebase service account JSON is properly formatted
- Check `FIREBASE_PROJECT_ID` matches your Firebase project

### Email Service Issues
- For Gmail: Use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password
- Check `EMAIL_USER` and `EMAIL_PASS` are correct
- Verify email service configuration in `lib/nodemailer.js`

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

## 🔍 Common Workflows

### Create a New Link
```bash
POST /api/links/create
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "originalUrl": "https://example.com/very/long/url",
  "customAlias": "mylink",
  "expiresIn": 604800
}
```

### Get User's Links
```bash
GET /api/links/getMyLinks?page=1&limit=10
Authorization: Bearer <jwt_token>
```

### Track Link Click
```bash
GET /:shortCode
# Redirects to original URL and logs the click
```

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [JWT.io](https://jwt.io)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit and push: `git commit -am 'Add feature'` and `git push origin feature/your-feature`
5. Submit a pull request

## 📝 Notes

- Never commit `.env` files containing sensitive data
- Always use environment variables for configuration
- Test API endpoints with tools like Postman or curl before deployment
- Keep database backups regular in production
- Monitor server logs for errors and performance issues

## 🚀 Deployment

The server includes a `vercel.json` configuration for deployment on Vercel. To deploy:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

---

**Happy coding! 🎉**
