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
} from "lucide-react";

export default function Sidebar({
  activeTab,
  onTabChange,
  isMobileOpen,
  onMobileClose,
  vendor,
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "myLinks", label: "My Links", icon: Link },
    { id: "products", label: "My Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 3 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Store Settings", icon: Settings },
  ];

  const handleTabChange = (tab) => {
    onTabChange(tab);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-50
        w-72 bg-[#dff9f881] border-r border-gray-200 h-screen flex flex-col flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Store Header */}
        <div className="p-4  bg-[#dff9f881]">
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

        {/* Store Status */}
        {/* <div className="p-4 border-b border-gray-100">
          <div className="bg-green-50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div>
              <p className="text-sm font-medium text-green-800">Store Active</p>
              <p className="text-xs text-green-600">Your products are live</p>
            </div>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                      ? "bg-[#09C1F6] text-white font-semibold shadow-sm"
                      : "text-[#052A5E] hover:bg-white"
                      }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-[#052A5E] text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* <div className="mt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Support
            </p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
              <HelpCircle size={20} />
              <span>Help Center</span>
            </button>
          </div> */}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#052A5E] hover:bg-white transition-all cursor-pointer">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
