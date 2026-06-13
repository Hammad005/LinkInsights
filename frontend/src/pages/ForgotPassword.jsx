import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Store } from "lucide-react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { forgotMyPassword, resendForgotPasswordOTP, sendForgotPasswordOTP, verifyForgotPasswordOTP } from "../features/auth/authThunks";

export default function ForgotPassword() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState("sendOTP");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [count, setCount] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);
  const hasStartedRef = useRef(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "") // keep only digits
      .slice(0, 5);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5) - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  const { isSendingOTP, isVerifyingOTP, isResendingOTP, isForgatingPassword } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startCountdown = () => {
    setCanResend(false);
    setCount(60);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (activeState !== "verifyOTP") {
      hasStartedRef.current = false;
      clearInterval(timerRef.current);
      return;
    }

    // prevent double execution in StrictMode
    if (hasStartedRef.current) return;

    hasStartedRef.current = true;
    startCountdown();

    return () => {
      clearInterval(timerRef.current);
    };
  }, [activeState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendOtpData = {
      email: formData.email,
    };

    const verifyOtpData = {
      email: formData.email,
      otp: otp.join(""),
    };
    const resetPasswordData = {
      email: formData.email,
      newPassword: formData.newPassword,
    };

    // Simulate API call
    if (activeState === "sendOTP") {
      // Send OTP API call here
      await dispatch(sendForgotPasswordOTP(sendOtpData)).unwrap()
      // On success:
      setActiveState("verifyOTP");
    } else if (activeState === "verifyOTP") {
      // Verify OTP API call here
      await dispatch(verifyForgotPasswordOTP(verifyOtpData)).unwrap();
        // On success:
        setActiveState("resetPassword");
    } else if (activeState === "resetPassword") {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
      // Reset Password API call here
      await dispatch(forgotMyPassword(resetPasswordData)).unwrap();
      // On success:
      setActiveState("sendOTP");
        navigate("/login"); // Redirect to login page after successful password reset
    }
  };

  const handleResendOTP = async () => {
    // Resend OTP API call here
    await dispatch(resendForgotPasswordOTP({ email: formData.email })).unwrap();
    //  On success:
    startCountdown();
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
      },
    );
  }, []);

  const renderContent = () => {
    switch (activeState) {
      case "sendOTP":
        return (
          <div>
            <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                />
              </div>
            </div>
          </div>
        );
      case "verifyOTP":
        return (
          <>
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold bg-white rounded-xl border border-gray-200 outline-none focus:border-[#09C1F6] focus:ring-2 focus:ring-[#09C1F6]/20"
                />
              ))}
            </div>
            <div className="flex items-center justify-center mt-2 gap-2">
              <span className="block text-sm text-center text-gray-600">
                Didn't receive OTP?{" "}
              </span>

              <button
                type="button"
                disabled={isResendingOTP || !canResend}
                className="text-sm text-[#052A5E] disabled:cursor-not-allowed hover:text-[#09C1F6] font-medium cursor-pointer disabled:opacity-50"
                onClick={handleResendOTP}
              >
                {canResend ? "Resend OTP" : `${count}s`}
              </button>
            </div>
          </>
        );
      case "resetPassword":
        return (
        <>

        <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  required
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

        <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
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
        </>
        );
      default:
        return null;
    }
  };

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
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Overlay */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0" /> */}

        <div className="w-full max-w-md z-10">
          {/* Card */}
          <div
            ref={cardRef}
            className="bg-transparent backdrop-blur-md rounded-2xl shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.25)] border border-white/20 p-8"
          >
            {/* Logo */}
            <img
              src="/LinkInsights.svg"
              alt="LinkInsights Logo"
              className="object-contain h-auto w-40 mx-auto"
            />
            <h1 className="text-2xl font-bold text-center text-[#052A5E] mb-1">
              Forgot Password
            </h1>
            <label className="block text-sm font-medium text-center text-gray-700 mb-6">
              {activeState === "sendOTP" && "Enter your email to receive OTP"}
              {activeState === "verifyOTP" &&
                "Enter the OTP sent to your email"}
              {activeState === "resetPassword" && "Enter your new password"}
            </label>

            <form onSubmit={handleSubmit} className="space-y-4">
              {renderContent()}

              <button
                type="submit"
                disabled={
                  isSendingOTP ||
                  isVerifyingOTP ||
                  isForgatingPassword
                }
                className="cursor-pointer w-full bg-linear-to-r from-[#052A5E] to-[#09C1F6] text-white py-3 rounded-xl font-semibold hover:from-[#09C1F6] hover:to-[#052A5E] transition-colors duration-500 ease-in-out flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSendingOTP ||
                isVerifyingOTP ||
                isForgatingPassword ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {activeState === "sendOTP" && "Send OTP"}
                    {activeState === "verifyOTP" && "Verify OTP"}
                    {activeState === "resetPassword" && "Reset Password"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center">
                <Link
                  to="/login"
                  className="text-sm text-[#052A5E] hover:text-[#09C1F6] font-medium cursor-pointer"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>

          <p className="text-center text-white text-sm mt-6">
            © {new Date().getFullYear()} LinkInsights. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
