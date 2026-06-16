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
import { useDispatch, useSelector } from "react-redux";
import { getMyClicksThunk } from "../features/link/linkThunks";

export default function ClickInner() {
    const {allClicks, isGettingClicks} = useSelector((state) => state.link);
    const dispatch = useDispatch();
    const { code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if(code !== allClicks?.link?.shortCode) {
        navigate('/click')
      }
      
    }, [])
    

    

    const tableRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 3;

    const handlePageChange = async (page) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", page);
            params.set("limit", itemsPerPage);

            return params;
        });

        await dispatch(getMyClicksThunk({data: code, page: page, limit: 3}));
    };

    useEffect(() => {
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!page || !limit) {
    setSearchParams({
      page: "1",
      limit: String(itemsPerPage),
    });
  }
}, [searchParams, setSearchParams]);

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

    const shortedURL = import.meta.env.VITE_BASE_URL+"/"+allClicks?.link?.shortCode

    return (
        <>

            <div className="space-y-6">


                {/* Page Header */}
                <div className="flex flex-wrap justify-between gap-4">
                    <div>
                        
                    <h1 className="text-2xl md:text-3xl font-bold text-[#052A5E]">Clicks Overview of: {allClicks?.link?.shortCode}</h1>

                    <p className="text-[#052A5E]/80 mt-1 text-sm">
                        <span className="font-semibold">Original URL: </span> 
                        <Link to={allClicks?.link?.originalUrl} target="_blank" className="underline">{allClicks?.link?.originalUrl}</Link>
                    </p>
                    <p className="text-[#052A5E]/80 text-sm">
                        <span className="font-semibold">Short Code: </span> {allClicks?.link?.shortCode}
                    </p>
                    <p className="text-[#052A5E]/80 text-sm">
                        <span className="font-semibold">Shorted URL: </span> 
                        <Link to={shortedURL} target="_blank" className="underline">{shortedURL}</Link>
                    </p>
                    <p className="text-[#052A5E]/80 text-sm">
                        <span className="font-semibold">Created At: </span> {formatDate(allClicks?.link?.createdAt)}
                    </p>
                    <p className="text-[#052A5E]/80 text-sm">
                        <span className="font-semibold">Expires At: </span> {formatDate(allClicks?.link?.expiresAt)}
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
                    className={`bg-transparent backdrop-blur-md rounded-2xl shadow-lg border border-white/30 overflow-hidden ${isGettingClicks ? "animate-pulse" : ""}`}>
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
                                {allClicks?.clicks?.map((order) => {
                                    return (
                                        <tr
                                            key={order._id}
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
                            Showing {allClicks?.currentPage} - {allClicks?.totalPages} of {allClicks?.totalClicks} results
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!allClicks?.hasPrevPage}
                                className="px-3 py-1.5 text-sm text-white bg-[#09C1F6] rounded-lg hover:bg-[#09c3f6bd] transition-colors disabled:opacity-50">
                                Previous
                            </button>

                            {Array.from({ length: allClicks?.totalPages }, (_, index) => (
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
                                disabled={!allClicks?.hasNextPage}
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
