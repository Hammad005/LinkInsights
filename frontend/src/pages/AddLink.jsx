import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Store, Link2, AtSign, CalendarClock } from "lucide-react";
import gsap from "gsap";

export default function AddLink() {
    const cardRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        originalUrl: "",
        customAlias: "",
        expiresIn: "",
    });

    const errorValidation = () => {
        const newErrors = {};

        let url = formData.originalUrl.trim();

        if (!url) {
            newErrors.originalUrl = "Original URL is required";
        } else {
            // add protocol if missing
            if (!/^https?:\/\//i.test(url)) {
                url = "https://" + url;
            }

            // simple format check (fast fail)
            const simpleUrlPattern =
                /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

            if (!simpleUrlPattern.test(url)) {
                newErrors.originalUrl = "Invalid URL format";
            } else {
                try {
                    new URL(url);
                } catch {
                    newErrors.originalUrl = "Invalid URL format";
                }
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!errorValidation()) {
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setErrors({});
            setFormData({
                originalUrl: "",
                customAlias: "",
                expiresIn: "",
            })
        }, 1000);
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
            className="flex items-center justify-center min-h-screen h-full pb-25"
        >
            <div className="w-full max-w-md ">

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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Original URL <span className={`${errors.originalUrl ? "text-red-500" : ""} font-normal`}>*</span>
                            </label>
                            <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                                <div className="relative">
                                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="originalUrl"
                                        value={formData.originalUrl}
                                        onChange={handleChange}
                                        placeholder="https://example.com"
                                        className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                                    />
                                </div>
                            </div>
                            {errors.originalUrl && (
                                <p className="text-red-500 text-sm mt-1">{errors.originalUrl}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Custom Alias <span className="text-xs font-normal">(Optional)</span>
                            </label>
                            <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                                <div className="relative">
                                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="customAlias"
                                        value={formData.customAlias}
                                        onChange={handleChange}
                                        placeholder="custom-alias"
                                        className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expires In <span className="text-xs font-normal">(Optional) - by default 7 days</span>
                            </label>
                            <div className="relative rounded-xl p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-[#052A5E] focus-within:to-[#09C1F6] transition-all">
                                <div className="relative">
                                    <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="datetime-local"
                                        name="expiresIn"
                                        value={formData.expiresIn}
                                        onChange={handleChange}
                                        placeholder="Expiration Date and Time"
                                        className="w-full pl-10 pr-4 py-3 bg-white rounded-[10px] border border-gray-200 focus:border-transparent outline-none "
                                    />
                                </div>
                            </div>
                        </div>



                        <button
                            type="submit"
                            disabled={isLoading}
                            className="cursor-pointer w-full bg-gradient-to-r from-[#052A5E] to-[#09C1F6] text-white py-3 rounded-xl font-semibold hover:from-[#09C1F6] hover:to-[#052A5E] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Generate Link
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                <p className="text-center text-[#052A5E] text-sm mt-6 font-semibold">
                    <span className="font-normal text-xs">Your generated link should look like this:</span>
                    <br />
                    {import.meta.env.VITE_BASE_URL}/{formData.customAlias || "custom-alias"}
                </p>
            </div>

        </div>
    );
}
