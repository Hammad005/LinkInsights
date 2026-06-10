import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Store, Link2, AtSign, CalendarClock } from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { links } from "../utils/dummyData";
import toast from "react-hot-toast";

export default function Click() {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        customAlias: "",
    });

    const errorValidation = () => {
        const newErrors = {};

        if (!formData.customAlias) {
            newErrors.customAlias = "Please enter a custom alias";
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
            if (links.some((link) => link.shortCode === formData.customAlias)) {
                navigate(`/clicks/${formData.customAlias}`);
                setIsLoading(false);
                setErrors({});
                setFormData({
                    customAlias: "",
                })
            } else {
                toast.error("There is no link with this custom alias");
                setIsLoading(false);
                setErrors((prev) => ({
                    ...prev,
                    customAlias: "There is no link with this custom alias",
                }));
            }
            
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
            className="flex items-center justify-center h-full pb-25"
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
                                Custom Alias <span className={`${errors.customAlias ? "text-red-500" : ""} font-normal`}>*</span>
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
                            {errors.customAlias && (
                                <p className="text-red-500 text-sm mt-1">{errors.customAlias}</p>
                            )}
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
                                    Get Clicks
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
