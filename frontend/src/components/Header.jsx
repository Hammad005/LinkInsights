import gsap from 'gsap';
import { Menu, Bell, Search, ChevronDown, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuToggle, vendor, handleLogout }) {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
  if (window.innerWidth >= 1024) {
    gsap.fromTo(
      headerRef.current,
      {
        opacity: 0,
        y: "-100%",
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power4.out",
      }
    );
  }
}, []);

  return (
    <div
     className="relative lg:my-5 lg:me-5">
    <header 
    ref={headerRef}
    className="bg-[#09C1F6]/10 backdrop-blur-md px-4 md:px-6 py-4 absolute top-0 z-30 w-full lg:rounded-2xl">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-white transition-colors text-white bg-[#09C1F6]/10 backdrop-blur-md  font-semibold shadow-[2px_4px_8px_0_rgba(0,0,0,0.3)] border-white/20 cursor-pointer"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
              }}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors text-white bg-[#09C1F6]/10 backdrop-blur-md  font-semibold shadow-[2px_4px_8px_0_rgba(0,0,0,0.3)] border-white/20 cursor-pointer"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-[#052A5E] to-[#09C1F6] rounded-lg flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-800">{vendor?.ownerName || 'John Doe'}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden md:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">{vendor?.ownerName || 'John Doe'}</p>
                  <p className="text-sm text-gray-500">{vendor?.email || 'vendor@example.com'}</p>
                </div>
                <div className="p-2">
                  <button 
                  onClick={() => {
                    navigate('/settings')
                    setShowProfile(false)
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-xl">
                    View Profile
                  </button>
                  <button 
                  onClick={() => handleLogout()}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 rounded-xl">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}
