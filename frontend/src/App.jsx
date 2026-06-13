import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import './App.css';
import MyLinks from './pages/MyLinks';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddLink from './pages/AddLink';
import Click from './pages/Click';
import ClickInner from './pages/ClickInner';
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from './features/auth/authThunks';
import { Loader2 } from 'lucide-react';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  const { isAuthenticated, isCheckingAuth } = useSelector((state) => state.auth);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const disptach = useDispatch();

  useEffect(() => {
    disptach(getMe());
  }, [])
  
if (isCheckingAuth) {
    return (
      <div
      style={{
        backgroundImage: "url('/dashboardBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      >
        <div className="flex flex-col items-center justify-center h-screen gap-2">
        <img
        src="/LinkInsights.svg"
        alt="LinkInsights"
        draggable={false}
        fetchPriority="high"
        className="w-46 h-auto"
      />

      <Loader2 className="animate-spin size-10 text-[#052A5E] animate-pulse" />
        </div>
      </div>
      
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
   return (
    <>
    <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0f1e5a",
                color: "#ffffff",
                border: "1px solid #1674bb",
                boxShadow: "0 12px 30px rgba(22, 116, 187, 0.25)",
                fontSize: "0.9rem",
              },
              success: {
                iconTheme: { primary: "#40bfff", secondary: "#0f1e5a" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#0f1e5a" },
              },
            }}
          />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
    );
  }

  return (
    <div
    style={{
      backgroundImage: "url('/dashboardBg.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
    >
      <div className="flex h-screen overflow-hidden ">
      <ScrollToTop />
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        <Header 
          onMenuToggle={() => setIsMobileSidebarOpen(true)} 

        />
        <main className="flex-1 p-4  overflow-y-auto pt-25"
        
        >
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0f1e5a",
                color: "#ffffff",
                border: "1px solid #1674bb",
                boxShadow: "0 12px 30px rgba(22, 116, 187, 0.25)",
                fontSize: "0.9rem",
              },
              success: {
                iconTheme: { primary: "#40bfff", secondary: "#0f1e5a" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#0f1e5a" },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/generate-link" element={<AddLink />} />
            <Route path="/links" element={<MyLinks />} />
            <Route path="/clicks" element={<Click />} />
            <Route path="/clicks/:code" element={<ClickInner />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
      </div>
    </div>
  );
}

export default App;
