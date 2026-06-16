# LinkInsights Frontend

A modern React + Vite web application for creating and managing shortened URLs with detailed analytics.

## 📋 Overview

The frontend is a responsive, feature-rich single-page application built with:
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Redux Toolkit** - Centralized state management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Beautiful data visualizations
- **GSAP** - Smooth animations
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14+ and **npm** or **yarn**
- **Backend server** running on `http://localhost:5000` (see [server README](../server/README.md))

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5173
```

### Development Server

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173` with:
- **Hot Module Replacement (HMR)** - Instant file refresh
- **Fast Refresh** - Preserve component state on edits
- **Source Maps** - Debug-friendly development experience

Press `o` in terminal to open browser automatically.

### Production Build

Build optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🔧 Environment Variables

Create a `.env.local` file in the `frontend` directory (never commit this file):

### Required Variables
```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5173
```

### Optional Firebase Variables
```env
# Firebase (for authentication)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Variable Explanation

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `VITE_API_BASE_URL` | Yes | Backend API URL | `http://localhost:5000/api` |
| `VITE_BASE_URL` | Yes | Frontend public URL | `http://localhost:5173` |
| `VITE_FIREBASE_API_KEY` | No | Firebase API key | Your Firebase config |

## 📁 Project Structure

```
frontend/
├── public/                          # Static assets (favicons, etc.)
├── src/
│   ├── assets/                      # Images, icons, fonts
│   ├── components/                  # Reusable React components
│   │   ├── DeleteModal.jsx         # Confirmation modal
│   │   ├── Header.jsx              # Top navigation
│   │   ├── ScrollToTop.jsx         # Back-to-top button
│   │   └── Sidebar.jsx             # Side navigation
│   ├── features/                    # Redux state slices
│   │   ├── auth/                   # Authentication
│   │   │   ├── authSlices.js       # Auth state
│   │   │   ├── authServices.js     # Auth API calls
│   │   │   └── authThunks.js       # Async auth actions
│   │   └── link/                   # Link management
│   │       ├── linkSlices.js       # Link state
│   │       ├── linkServices.js     # Link API calls
│   │       └── linkThunks.js       # Async link actions
│   ├── pages/                       # Page components (routes)
│   │   ├── AddLink.jsx             # Create link page
│   │   ├── Dashboard.jsx           # Analytics dashboard
│   │   ├── MyLinks.jsx             # Manage links page
│   │   ├── ClickInner.jsx          # Click details
│   │   ├── Login.jsx               # Login page
│   │   ├── ForgotPassword.jsx      # Password reset
│   │   └── Settings.jsx            # User settings
│   ├── services/                    # API & external services
│   │   ├── axios.js                # Axios configuration
│   │   └── firebase.js             # Firebase setup
│   ├── utils/                       # Utility functions
│   │   └── dummyData.js            # Mock data
│   ├── App.jsx                      # Main component
│   ├── App.css                      # Global styles
│   ├── index.css                    # Base styles
│   ├── main.jsx                     # Entry point
│   ├── store.js                     # Redux store config
│   └── assets/                      # Static files
├── .eslintrc.js                     # ESLint config
├── vite.config.js                   # Vite config
├── package.json                     # Dependencies
├── index.html                       # HTML entry
└── README.md                        # This file
```

## 🎨 Pages Overview

### 🔐 Authentication Pages
- **Login** - User login with email/password
- **Sign Up** - User registration
- **Forgot Password** - Password reset request
- **Reset Password** - Set new password

### 📊 Main Pages
- **Dashboard** - Analytics overview
  - Total links created
  - Total clicks on all links
  - Highest performing link
  - Weekly click trends
  - Insights and recommendations

- **Add Link** - Create new shortened URL
  - Enter original URL
  - Custom alias option
  - Expiration date setting
  - Link preview

- **My Links** - Manage created links
  - View all links in table
  - Pagination support
  - Delete links
  - View click details
  - Search/filter links

- **Click Details** - Analyze link performance
  - Click history
  - Device information
  - Geographic data
  - Referrer analysis

- **Settings** - User preferences
  - Profile management
  - Account settings
  - Preferences

## 🔌 Components

### DeleteModal
Confirmation dialog for destructive actions
- Props: `handleDelete`, `disableDelete`, `setShowDeleteModal`, `title`, `message`
- Shows loading spinner during deletion

### Header
Top navigation bar with user menu

### Sidebar
Left navigation with route links

### ScrollToTop
Floating button to scroll page to top

## 📊 State Management (Redux)

### Store Structure
```javascript
{
  auth: {
    isLoggedIn: boolean,
    user: Object,
    isLoading: boolean,
    error: string
  },
  link: {
    allLinks: {
      links: Array,
      currentPage: number,
      totalPages: number,
      totalLinks: number
    },
    analytics: Object,
    isDeletingLink: boolean,
    isGettingLinks: boolean,
    isGeneratingLink: boolean
  }
}
```

## 🌐 API Integration

### Axios Configuration
Pre-configured with:
- Base URL from environment variable
- Request/response interceptors
- Automatic JWT token attachment
- Error handling

### Common API Calls
```javascript
// Create link
POST /api/links/create

// Get my links
GET /api/links/getMyLinks?page=1&limit=10

// Delete link
DELETE /api/links/deleteLink/:id

// Get analytics
GET /api/links/analytics

// Get click details
GET /api/links/getMyClicks
```

## 📦 Available Scripts

```bash
# Development
npm run dev           # Start dev server with HMR
                      # Opens at http://localhost:5173

# Production Build
npm run build         # Create optimized production build
npm run preview       # Preview production build locally

# Code Quality
npm run lint          # Run ESLint to check code quality
                      # Helps maintain code standards
```

## 🎯 Key Features

### ✨ Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Works on all screen sizes

### 🎭 Modern UI
- Glassmorphism effects
- Smooth animations with GSAP
- Icon-rich interface

### 📈 Analytics
- Interactive charts with Recharts
- Real-time data updates
- Weekly trends visualization

### 🔒 Security
- JWT token-based auth
- Secure token storage
- CORS protected API calls

### ⚡ Performance
- Code splitting with Vite
- Lazy loading routes
- Optimized bundle size

## 🚨 Troubleshooting

### Port Conflicts
```bash
# If 5173 is occupied, Vite uses next available port
# Check terminal for actual URL
# Or configure in vite.config.js:
export default {
  server: {
    port: 3000
  }
}
```

### API Connection Fails
```bash
# Verify backend is running:
curl http://localhost:5000/api

# Check VITE_API_BASE_URL in .env.local
# Should match backend server URL
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Hot Reload Not Working
```bash
# Vite HMR in .env.local:
VITE_HMR_HOST=localhost
VITE_HMR_PORT=5173
```

### Redux State Issues
```bash
# Install Redux DevTools browser extension
# View state changes in browser console
# Check Redux thunks in network tab
```

## 🔑 Authentication Flow

1. User fills login/signup form
2. Frontend sends credentials to backend
3. Backend validates and returns JWT token
4. Frontend stores token in Redux & localStorage
5. Token automatically attached to API requests
6. Token refreshed on each request
7. Expired tokens redirect to login

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Configured in `tailwind.config.js`
- Custom colors for brand (dark blue, cyan)

### Custom Styles
- `App.css` - Main styles
- `index.css` - Base/global styles
- Component-scoped styles in JSX

### Color Palette
- Primary: `#052A5E` (Dark blue)
- Secondary: `#09C1F6` (Cyan)
- Gradients and overlays for glassmorphism effect

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router v6](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts Documentation](https://recharts.org)

## 🤝 Development Best Practices

1. **Keep files small** - Split large components
2. **Use Redux for global state** - Not component state
3. **Memoize expensive computations** - Use `useMemo`, `useCallback`
4. **Test API changes** - Before committing
5. **Follow naming conventions** - Consistent casing
6. **Comment complex logic** - Especially in selectors/thunks
7. **Avoid prop drilling** - Use Redux for shared state

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run dev
npm run lint

# Commit and push
git add .
git commit -m "Add feature description"
git push origin feature/your-feature

# Create pull request on GitHub
```

## 📝 Common Patterns

### Using Redux State
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { myThunk } from '../features/link/linkThunks';

function MyComponent() {
  const { allLinks, isLoading } = useSelector(state => state.link);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myThunk());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <Spinner /> : <Content data={allLinks} />}
    </div>
  );
}
```

### Making API Calls
```javascript
import axios from '../../services/axios';

export const myService = async (data) => {
  return axios.post('/endpoint', data);
};
```

## 🚀 Deployment

### Build for Production
```bash
npm run build   # Creates dist/ folder
```

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Deploy to Netlify
1. Build locally: `npm run build`
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

## 📋 Checklist Before Deployment

- [ ] `.env.local` is NOT committed (add to `.gitignore`)
- [ ] All environment variables are set in production
- [ ] Backend API URL is correct for production
- [ ] Build runs without errors: `npm run build`
- [ ] No console errors: `npm run preview`
- [ ] All pages load correctly
- [ ] Links work properly
- [ ] Mobile responsive on all pages

## 🐛 Known Issues & Solutions

### Local storage quota exceeded
- Clear localStorage in DevTools
- Clear application cache

### Images not loading
- Check Cloudinary configuration
- Verify image URLs in data

### Analytics data not updating
- Refresh page with Ctrl+Shift+R (hard refresh)
- Check backend is running
- Verify API responses in network tab

---

**Happy coding! 🎉**

For backend setup, see [Server README](../server/README.md)
For project overview, see [Main README](../README.md)
