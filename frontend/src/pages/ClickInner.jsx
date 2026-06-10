import { useEffect, useRef } from "react";
import {
    Search,
    Filter,
    ChevronDown,
    Eye,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Truck,
    MapPin,
    Phone,
    Mail,
    X,
    Printer,
    Download,
    MessageSquare,
    ShieldCheck,
    ShieldX,
    Trash2,
} from "lucide-react";

import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { links } from "../utils/dummyData";

export default function ClickInner() {
    const { code } = useParams();
    const navigate = useNavigate();

    const clicksData = links.find((link) => link.shortCode === code);
    const clicks = clicksData?.clicks || [];

    const tableRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 3;
    const totalPages = Math.ceil(clicks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentLinks = clicks.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (page === 1) {
                params.delete("page");
            } else {
                params.set("page", page);
            }

            return params;
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        gsap.fromTo(
            tableRef.current,
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

    const shortedURL = import.meta.env.VITE_BASE_URL+clicksData.shortCode

    return (
        <>

            <div className="space-y-6">


                {/* Page Header */}
                <div className="flex flex-wrap justify-between gap-4">
                    <div>
                        
                    <h1 className="text-2xl md:text-3xl font-bold text-[#052A5E]">Clicks Overview of: {clicksData?.shortCode}</h1>

                    <p className="text-[#052A5E]/80 mt-1 text-sm">
                        <span className="font-semibold">Original URL: </span> 
                        <Link to={clicksData?.originalUrl} target="_blank" className="underline">{clicksData?.originalUrl}</Link>
                    </p>
                    <p className="text-[#052A5E]/80 text-sm">
                        <span className="font-semibold">Short Code: </span> {clicksData?.shortCode}
                    </p>
                    <p className="text-[#052A5E]/80 text-sm">
                        <span className="font-semibold">Shorted URL: </span> 
                        <Link to={shortedURL} target="_blank" className="underline">{shortedURL}</Link>
                    </p>
                    <p className="text-[#052A5E]/80 text-sm">
                        <span className="font-semibold">Expires At: </span> {formatDate(clicksData?.expiresAt)}
                    </p>
                    </div>
                    <button 
                    onClick={() => navigate("/clicks")}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#052A5E] rounded-lg hover:bg-[#09C1F6] transition-colors inline-flex items-center gap-2 cursor-pointer self-end justify-end"
                    >
                        Get New Click Overview
                    </button>
                </div>

                {/* Orders Table */}
                <div
                    ref={tableRef}
                    className="bg-transparent backdrop-blur-md rounded-2xl shadow-lg border border-white/30 overflow-hidden ">
                    <div className="overflow-x-auto "
                        style={{
                            scrollBehavior: "smooth",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#09C1F6 transparent",
                        }}
                    >
                        <table className="w-full ">

                            <thead className="bg-[#09C1F6]/30 backdrop-blur-md border-b border-white shadow">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                                        Ip Address
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                                        Country
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                                        Device
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                                        Browser
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                                        Referrer
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                                        Click At
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentLinks.map((order) => {
                                    return (
                                        <tr
                                            key={order.shortCode}
                                            className="border-b border-white shadow hover:bg-white/50"
                                        >
                                            <td className="py-4 px-6">
                                                <span className=" font-medium text-gray-800">
                                                    {order.ipAddress}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-medium text-gray-800">
                                                    {order.country}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className=" font-medium text-gray-800">
                                                    {order.device}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className=" font-medium text-gray-800">
                                                    {order.browser}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {order.referrer == "direct" ? (<span className="font-medium text-gray-800">
                                                    {order.referrer}
                                                </span>) : (<Link to={order.referrer} className="underline font-medium text-gray-800">
                                                    {order.referrer.length > 38 ? `${order.referrer.slice(0, 38)}...` : order.referrer}
                                                </Link>)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-semibold truncate text-gray-800">
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 bg-[#052A5E]/20 backdrop-blur-md border-t border-white shadow flex flex-wrap items-center sm:justify-between justify-center gap-3">
                        <p className="text-sm text-white">
                            Showing {startIndex + 1} - {startIndex + currentLinks.length} of {clicks.length} results
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 text-sm text-white bg-[#09C1F6] rounded-lg hover:bg-[#09c3f6bd] transition-colors disabled:opacity-50">
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1.5 text-sm hover:text-white  rounded-lg hover:bg-[#183763] transition-colors ${currentPage === index + 1 ? "bg-[#183763] text-white" : "bg-gray-300 text-black"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 text-sm text-white bg-[#09C1F6] rounded-lg hover:bg-[#09c3f6bd] transition-colors disabled:opacity-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
