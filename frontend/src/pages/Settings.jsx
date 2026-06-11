import { useEffect, useRef, useState } from 'react';
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Bell,
  Lock,
  CreditCard,
  Palette,
  Save,
  AlertCircle,
  Check,
  ChevronRight,
  Shield,
  Truck,
  Percent,
  EyeOff,
  Eye,
} from 'lucide-react';
import gsap from 'gsap';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Profile');
  const [ownerSettings, setOwnerSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 234 567 8901',
  });
  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordVisiblities, setPasswordVisiblities] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })
  const [animate, setAnimate] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);


  const sections = [
    { id: 'Profile', label: 'Profile', icon: User },
    { id: 'Change Password', label: 'Change Password', icon: Lock },
  ];

  useEffect(() => {
    gsap.set([headerRef.current, navRef.current, contentRef.current], { opacity: 0 });

    const tl = gsap.timeline();

    tl.fromTo(headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(navRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  useEffect(() => {
    if (!animate) return;
    if (!contentRef.current) return;

    gsap.killTweensOf(contentRef.current);

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => setAnimate(false), // reset
      }
    );
  }, [animate]);

  const renderSection = () => {
    switch (activeSection) {

      case 'Profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[#052A5E] mb-1">Personal Information</h2>
              <p className="text-sm text-[#052A5E]/80">Update your personal information</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-linear-to-r from-[#052A5E] to-[#09C1F6] w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Profile Photo</h3>
                <p className="text-sm text-gray-500 mb-2">JPG or PNG, max 2MB</p>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#052A5E] rounded-lg hover:bg-[#09C1F6] disabled:bg-[#052A5E]/60 transition-colors cursor-pointer">
                  Upload Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                  <input
                    type="text"
                    required
                    value={ownerSettings.firstName}
                    onChange={(e) => setOwnerSettings({ ...ownerSettings, firstName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                  <input
                    type="text"
                    value={ownerSettings.lastName}
                    onChange={(e) => setOwnerSettings({ ...ownerSettings, lastName: e.target.value })}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                  <input
                    type="email"
                    required
                    value={ownerSettings.email}
                    onChange={(e) => setOwnerSettings({ ...ownerSettings, email: e.target.value })}
                    placeholder="johndoe@email.com"
                    className="w-full px-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none"
                  />
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                  <input
                    type="tel"
                    value={ownerSettings.phone}
                    onChange={(e) => setOwnerSettings({ ...ownerSettings, phone: e.target.value })}
                    placeholder="johndoe@email.com"
                    className="w-full px-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none"
                  />
                </div>
              </div>

            </div>
          </div>
        );

      case 'Change Password':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[#052A5E] mb-1">Change Password</h2>
              <p className="text-sm text-[#052A5E]/80">Update your password to keep your account secure</p>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={passwordVisiblities.currentPassword ? "text" : "password"}
                    name="password"
                    value={passwordSettings.currentPassword}
                    onChange={(e) => setPasswordSettings({ ...passwordSettings, currentPassword: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisiblities({ ...passwordVisiblities, currentPassword: !passwordVisiblities.currentPassword })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {passwordVisiblities.currentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={passwordVisiblities.newPassword ? "text" : "password"}
                    name="password"
                    value={passwordSettings.newPassword}
                    onChange={(e) => setPasswordSettings({ ...passwordSettings, newPassword: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisiblities({ ...passwordVisiblities, newPassword: !passwordVisiblities.newPassword })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {passwordVisiblities.newPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={passwordVisiblities.confirmPassword ? "text" : "password"}
                    name="password"
                    value={passwordSettings.confirmPassword}
                    onChange={(e) => setPasswordSettings({ ...passwordSettings, confirmPassword: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisiblities({ ...passwordVisiblities, confirmPassword: !passwordVisiblities.confirmPassword })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {passwordVisiblities.confirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div ref={headerRef}>
        <h1 className="text-2xl md:text-3xl font-bold text-[#052A5E]">Settings</h1>
        <p className="text-[#052A5E]/80 mt-1">Manage your account settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div ref={navRef} className="lg:w-80 flex-shrink-0">
          <div className="bg-transparent backdrop-blur-md rounded shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.25)] border border-white/20 overflow-hidden">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id)
                    setAnimate(true)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isActive ? 'bg-[#09C1F6]/30 backdrop-blur-md  font-semibold border-white text-white border-l-4' : 'text-[#052A5E] hover:bg-[#09C1F6]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] border-transparent hover:text-white'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                  <ChevronRight className={`w-4 h-4 ml-auto `} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div ref={contentRef} className="flex-1">
          <div className="bg-transparent backdrop-blur-md rounded shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.25)] border border-white/20 p-6">
            {renderSection()}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-white flex justify-end">
              <button
                className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-[#052A5E] to-[#09C1F6] text-white rounded-xl font-semibold hover:from-[#09C1F6] hover:to-[#052A5E] transition-colors duration-300 ease-in-out cursor-pointer"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
