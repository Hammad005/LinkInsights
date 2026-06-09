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
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
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
        <main className="flex-1 p-4  overflow-y-auto pt-25">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/generate-link" element={<AddLink />} />
            <Route path="/links" element={<MyLinks />} />
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
