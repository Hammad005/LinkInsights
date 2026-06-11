import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Store } from "lucide-react";
import gsap from "gsap";

export default function Login() {
  const cardRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);


  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        // Login success
      } else {
        // Registration success - switch to login
        setIsLogin(true);
        setFormData({ ...formData, password: "", confirmPassword: "" });
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
  gsap.fromTo(
    cardRef.current,
    {
      opacity: 0,
      y: 100,
      scale: 0.9,
      rotateX: 15,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 1,
      ease: "power4.out",
    }
  );
}, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/dashboardBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0" /> */}

      <div className="w-full max-w-md z-10">

        {/* Card */}
        <div 
        ref={cardRef}
        className="bg-transparent backdrop-blur-md rounded-2xl shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.25)] border border-white/20 p-8">
          {/* Logo */}
          <img
            src="/LinkInsights.svg"
            alt="LinkInsights Logo"
            className="object-contain h-auto w-40 mx-auto mb-6"
          />
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${isLogin
                ? "bg-white text-[#09C1F6] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${!isLogin
                ? "bg-white text-[#09C1F6] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                  />
                  <button
                  type="button"
                  onClick={() => setShowCPassword(!showCPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                </div>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-[#052A5E] hover:text-[#09C1F6] font-medium cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-linear-to-r from-[#052A5E] to-[#09C1F6] text-white py-3 rounded-xl font-semibold hover:from-[#09C1F6] hover:to-[#052A5E] transition-colors duration-500 ease-in-out flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent backdrop-blur-md px-2 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-full">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-600">Google</span>
          </button>
        </div>

        <p className="text-center text-white text-sm mt-6">
          © {new Date().getFullYear()} LinkInsights. All rights reserved.
        </p>
      </div>
    </div>
  );
}
