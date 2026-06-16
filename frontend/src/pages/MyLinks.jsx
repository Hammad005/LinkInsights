import { useEffect, useRef, useState } from "react";
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
  Loader2,
} from "lucide-react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import gsap from "gsap";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteLinkThunk,
  getMyClicksThunk,
  getMyLinksThunk,
} from "../features/link/linkThunks";

export default function MyLinks() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { isGettingLinks, allLinks, isDeletingLink, isGettingClicks } =
    useSelector((state) => state.link);
  const dispatch = useDispatch();
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [linkIdForDelete, setLinkIdForDelete] = useState(null);
  const [shortCodeForViewClicks, setShortCodeForViewClicks] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 5;

  const getData = async (page, limit) => {
    await dispatch(getMyLinksThunk({ page, limit }));
  };

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page);
      params.set("limit", itemsPerPage);

      return params;
    });

    getData(page, itemsPerPage);
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

  useEffect(() => {
    getData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        icon: ShieldCheck,
        color: "text-green-600",
        bg: "bg-green-100",
        label: "Active",
      },
      expired: {
        icon: ShieldX,
        color: "text-red-600",
        bg: "bg-red-100",
        label: "Expired",
      },
    };
    return configs[status] || configs.active;
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
      },
    );
  }, []);

  const handleDelete = async () => {
    await dispatch(deleteLinkThunk(linkIdForDelete)).unwrap();
    setShowDeleteModal(false);
    setLinkIdForDelete(null);
  };

  const handleViewClicks = async (shortCode) => {
    await dispatch(
      getMyClicksThunk({ data: shortCode, page: 1, limit: 3 }),
    ).unwrap();
    navigate(`/clicks/${shortCode}`);
  };

  return (
    <>
      {ShowDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          disableDelete={isDeletingLink}
          setShowDeleteModal={setShowDeleteModal}
          title="Delete Link"
          message="Are you sure you want to delete this link?"
        />
      )}

      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#052A5E]">
            Links
          </h1>
          <p className="text-[#052A5E]/80 mt-1">Manage and track your links</p>
        </div>

        {/* Orders Table */}
        {allLinks?.links?.length > 0 ? (
          <div
            ref={tableRef}
            className={`bg-transparent backdrop-blur-md rounded-2xl shadow-lg border border-white/30 overflow-hidden ${isGettingLinks && "animate-pulse pointer-events-none"}`}
          >
            <div
              className="overflow-x-auto "
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
                      Original URL
                    </th>
                    <th className="text-left truncate py-4 px-6 font-semibold text-[#052A5E] text-sm">
                      Short Code
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                      Shorted URL
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                      Expires At
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                      Created At
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-[#052A5E] text-sm">
                      Clicks
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-[#052A5E] text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allLinks?.links?.map((order) => {
                    const isActive = new Date(order.expiresAt) > new Date();
                    const statusConfig = getStatusConfig(
                      isActive ? "active" : "expired",
                    );
                    const StatusIcon = statusConfig.icon;
                    const sortedUrl =
                      import.meta.env.VITE_BASE_URL + "/" + order.shortCode;
                    return (
                      <tr
                        key={order.shortCode}
                        className="border-b border-white shadow hover:bg-white/50"
                      >
                        <td className="py-4 px-6">
                          <Link
                            to={order.originalUrl}
                            target="_blank"
                            className="underline font-medium text-gray-800"
                          >
                            {order.originalUrl.length > 38
                              ? `${order.originalUrl.slice(0, 38)}...`
                              : order.originalUrl}
                          </Link>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-800">
                            {order.shortCode}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            to={sortedUrl}
                            target="_blank"
                            className="underline font-medium text-gray-800"
                          >
                            {sortedUrl.length > 38
                              ? `${sortedUrl.slice(0, 38)}...`
                              : sortedUrl}
                          </Link>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold truncate text-gray-800">
                            {formatDate(order.expiresAt)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold truncate text-gray-800">
                            {formatDate(order.createdAt)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-800">
                            {order.clicks}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              disabled={isGettingClicks}
                              onClick={() => {
                                setShortCodeForViewClicks(order.shortCode);
                                handleViewClicks(order.shortCode);
                              }}
                              className="p-2 text-gray-500 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                              {isGettingClicks &&
                              order.shortCode === shortCodeForViewClicks ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setShowDeleteModal(true);
                                setLinkIdForDelete(order._id);
                              }}
                              className="p-2 text-red-500 hover:bg-red-200 bg-red-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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
                Showing {allLinks?.currentPage} - {allLinks?.totalPages} of{" "}
                {allLinks?.totalLinks} results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!allLinks?.hasPrevPage}
                  className="px-3 py-1.5 text-sm text-white bg-[#09C1F6] rounded-lg hover:bg-[#09c3f6bd] transition-colors disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: allLinks?.totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1.5 text-sm hover:text-white  rounded-lg hover:bg-[#183763] transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#183763] text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!allLinks?.hasNextPage}
                  className="px-3 py-1.5 text-sm text-white bg-[#09C1F6] rounded-lg hover:bg-[#09c3f6bd] transition-colors disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-600">No links found</p>
          </div>
        )}
      </div>
    </>
  );
}
