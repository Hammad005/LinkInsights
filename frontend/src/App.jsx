import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';
import MyLinks from './pages/MyLinks';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddLink from './pages/AddLink';
import Click from './pages/Click';
import ClickInner from './pages/ClickInner';
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Mock vendor data
  const vendor = {
    storeName: 'FLM Vendor',
    ownerName: 'John Doe',
    email: 'john.doe@email.com',
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

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
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden "
    style={{
      background: "url('/dashboardBg.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
    >
      <ScrollToTop />
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        handleLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        <Header 
          onMenuToggle={() => setIsMobileSidebarOpen(true)} 
          vendor={vendor}
          handleLogout={handleLogout}
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
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
