import gsap from "gsap";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Eye,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Link,
  MousePointerClick,
  ChartNoAxesCombined,
  RotateCcw,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getLinkAnalyticsThunk } from "../features/link/linkThunks";

export default function Dashboard() {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const statsRef = useRef([]);
  const chartRef = useRef(null);
  const bottomRef = useRef(null);
  const { analytics, isGettingAnalytics } = useSelector((state) => state.link);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch analytics data when the component mounts
    dispatch(getLinkAnalyticsThunk());
  }, []);

  // Mock data
  const stats = [
    {
      title: "My Total Links",
      value: analytics?.totalLinks || 0,
      icon: Link,
    },
    {
      title: "Total Clicks on all links",
      value: analytics?.totalClicksOnLinks || 0,
      icon: MousePointerClick,
    },
    {
      title: "Highest Clicks per link",
      value: analytics?.highestClick || 0,
      icon: ChartNoAxesCombined,
    },
  ];

  const chartData = [
    { name: "Mon", totalClicks: 0, links: 0 },
    { name: "Tue", totalClicks: 0, links: 0 },
    { name: "Wed", totalClicks: 0, links: 0 },
    { name: "Thu", totalClicks: 0, links: 0 },
    { name: "Fri", totalClicks: 0, links: 0 },
    { name: "Sat", totalClicks: 0, links: 0 },
    { name: "Sun", totalClicks: 0, links: 0 },
  ];

  const formattedChartData =
  analytics?.linksData?.map((item) => ({
    ...item,
    links: item.links?.length || 0,
  })) || chartData;
  

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          statsRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "-=0.3",
        )
        .from(
          chartRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          bottomRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6",
        );
    });

    return () => ctx.revert();
  }, []);

  const handleGetAnalytics = async () => {
    await dispatch(getLinkAnalyticsThunk());
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div ref={headerRef} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#052A5E]">
            Dashboard
          </h1>
          <p className="text-text-[#052A5E]/80 mt-1">
            Welcome back! Here's an overview of your links.
          </p>
        </div>

        <button
          disabled={isGettingAnalytics}
          onClick={handleGetAnalytics}
          className="px-4 py-2.5 bg-[#09C1F6] border border-[#09C1F6] rounded-xl font-semibold hover:bg-[#09C1F6]/90 text-white transition-colors flex items-center disabled:cursor-not-allowed disabled:opacity-30"
        >
          <RotateCcw
            className={`w-6 h-6 ${isGettingAnalytics ? "custom-spin" : ""} `}
          />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              ref={(el) => {
                if (el) statsRef.current[index] = el;
              }}
              className="bg-[#09C1F6]/5 backdrop-blur-md rounded-2xl p-6 shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.2)] border border-white/20"
            >
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`p-3 rounded-xl bg-[#052a5e] border-2 border-[#09C1F6]`}
                >
                  <Icon className={`w-10 h-10 text-[#09C1F6]`} />
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-6xl font-bold text-[#052A5E]">
                    {stat.value}
                  </p>
                  <p className="text-lg text-[#052A5E]/80 mt-1">{stat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div
        ref={chartRef}
        className="rounded-2xl p-6 bg-transparent backdrop-blur-md shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.2)] border border-white/20"
      >
        <div className="flex flex-col mb-6">
          <h2 className="text-lg font-semibold text-[#052A5E]">
            Clicks Overview
          </h2>
          <p className="text-sm text-[#052A5E]/80">Last 7 days</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedChartData || chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#09C1F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#09C1F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey={'name'} stroke="#052A5E" fontSize={12} />
              <YAxis stroke="#052A5E" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="totalClicks"
                stroke="#052A5E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              {/* <Area
                type="monotone"
                dataKey="links"
                stroke="#09C1F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              /> */}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div ref={bottomRef} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Insights */}
        {analytics?.insights && <div className="rounded-2xl p-6 bg-[#09C1F6]/10 backdrop-blur-md shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.2)] border border-white/20">
          <h2 className="mb-2 text-lg font-semibold text-[#052A5E]">
            Insights
          </h2>
          {isGettingAnalytics ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="capitalize text-sm font-medium text-gray-800 bg-white my-2 h-4 w-50 animate-pulse"
              />
            ))
          ): (
            analytics?.insights?.map((product, index) => (
              <p
                key={index}
                className="capitalize text-sm font-medium text-gray-800 bg-white my-2 px-2 w-fit"
              >
                {product}
              </p>
            ))
          )
          }
        </div>}

        {/* Quick Actions */}
        <div className={`${analytics?.insights ? "xl:col-span-2" : "xl:col-span-3"} bg-gradient-to-r from-[#052a5e] to-[#09c3f652] rounded-2xl p-6 text-white flex backdrop-blur-md shadow-[2px_4px_8px_0_rgba(0,0,0,0.3),inset_2px_4px_8px_0_rgba(0,0,0,0.5)] border border-white/20`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
            <div>
              <h3 className="text-xl font-bold">Ready to get started?</h3>
              <p className="text-white/80 mt-1">
                Generate a unique link to share with your customers & analyze
                clicks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/generate-link")}
                className="px-4 py-2.5 bg-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 text-[#052A5E] hover:text-white transition-colors"
              >
                Generate New Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
