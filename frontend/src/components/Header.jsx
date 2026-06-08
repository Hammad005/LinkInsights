import { Menu, Bell, Search, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';

export default function Header({ onMenuToggle, vendor }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'New Order Received', message: 'Order #1234 - 3 items', time: '5 min ago', unread: true },
    { id: 2, title: 'Product Approved', message: 'Your product "Wireless Headphones" is now live', time: '1 hour ago', unread: true },
    { id: 3, title: 'Low Stock Alert', message: 'iPhone Case is running low on stock', time: '2 hours ago', unread: false },
    { id: 4, title: 'Payout Processed', message: 'Your weekly payout of $1,234 has been processed', time: '1 day ago', unread: false },
  ];

  return (
    <header className="bg-[#dff9f881] border-b border-gray-200 px-4 md:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          {/* Search */}
          {/* <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2.5 w-80">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="ml-3 bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
            />
          </div> */}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            {/* <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-[#052A5E] to-[#09C1F6] rounded-full border-2 border-white" />
            </button> */}

            {/* Notifications Dropdown */}
            {/* {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <button className="text-sm text-red-600 hover:text-red-700">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                        notif.unread ? 'bg-red-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notif.unread && (
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className={notif.unread ? '' : 'ml-5'}>
                          <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="w-full py-2 text-sm text-red-600 hover:text-red-700 font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )} */}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors"
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
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-xl">
                    View Profile
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 rounded-xl">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
