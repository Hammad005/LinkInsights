import gsap from "gsap";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  X,
  HelpCircle,
  MessageSquare,
  Link,
  PlusCircle,
  MousePointerClick,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ isMobileOpen, onMobileClose, handleLogout }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
  if (window.innerWidth >= 1024) {
    gsap.fromTo(
      sidebarRef.current,
      {
        opacity: 0,
        x: "-100%",
      },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        ease: "power4.out",
      }
    );
  }
}, []);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "generate-link", label: "Generate Link", icon: PlusCircle },
    { id: "links", label: "My Links", icon: Link },
    { id: "clicks", label: "Clicks", icon: MousePointerClick },
    { id: "products", label: "My Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 3 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Store Settings", icon: Settings },
  ];

  const pathname = useLocation().pathname;

  const handleTabChange = () => {
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
        fixed lg:sticky top-0 left-0 z-50
        w-72 lg:m-5 lg:rounded-2xl lg:bg-[#09C1F6]/10 bg-white/50 backdrop-blur-md lg:border border-r border-white  flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out lg:transition-none lg:h-auto h-screen
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Store Header */}
        <div className="p-4  bg-transparent">
          <div className="flex items-center justify-between">
            <img
              src="/LinkInsights.svg"
              alt="LinkInsights Logo"
              className="object-contain h-13 w-40"
            />
            <button
              onClick={onMobileClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-[#052A5E]" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </p>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === "/"
                  ? item.id === "dashboard"
                  : pathname.startsWith(`/${item.id}`);

              return (
                <li key={item.id}>
                  <NavLink
                    to={item.id === "dashboard" ? "/" : `/${item.id}`}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full text-[#052A5E] flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                      isActive
                        ? "text-white bg-[#09C1F6]/30 backdrop-blur-md  font-semibold shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_-2px_-4px_10px_0_rgba(0,0,0,0.25)] border-white/20"
                        : "bg-transparent hover:text-white hover:bg-[#09C1F6]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] border-transparent"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-[#052A5E] text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white">
          <button
            onClick={() => handleLogout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer  text-white lg:bg-transparent bg-[#09C1F6]/30 backdrop-blur-md  font-semibold hover:shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_-2px_-4px_8px_0_rgba(0,0,0,0.25)] border-white/20"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
