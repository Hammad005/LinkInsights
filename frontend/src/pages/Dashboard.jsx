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
} from 'lucide-react';
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
} from 'recharts';

export default function Dashboard() {
  // Mock data
  const stats = [
    {
      title: 'My Total Links',
      value: '10',
      icon: Link,
    },
    {
      title: 'Total Clicks on all links',
      value: '200',
      icon: MousePointerClick,
    },
    {
      title: 'Highest Clicks per link',
      value: '30',
      icon: ChartNoAxesCombined,
    },
  ];

  const chartData = [
    { day: 'Mon', clicks: 3, links: 2 },
    { day: 'Tue', clicks: 5, links: 3 },
    { day: 'Wed', clicks: 4, links: 2 },
    { day: 'Thu', clicks: 2, links: 1 },
    { day: 'Fri', clicks: 6, links: 4 },
    { day: 'Sat', clicks: 4, links: 2 },
    { day: 'Sun', clicks: 2, links: 1 },
  ];

  const insights = [
    "desktop users account for 100% of traffic.",
    "The most visited country is PK",
    "The most visited referrer is direct",
    "Peak traffic is between 6 PM and 9 PM."
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#052A5E]">Dashboard</h1>
        <p className="text-text-[#052A5E]/80 mt-1">Welcome back! Here's an overview of your links.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#dff9f881] rounded-2xl p-6 shadow-sm border border-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-[#052A5E] border-2 border-[#09C1F6]`}>
                  <Icon className={`w-6 h-6 text-[#09C1F6]`} />
                </div>
                
              <div className="flex flex-col">
                <p className="text-2xl font-bold text-[#052A5E]">{stat.value}</p>
                <p className="text-sm text-[#052A5E]/80 mt-1">{stat.title}</p>
              </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className=" bg-[#dff9f881] rounded-2xl p-6 shadow-sm border border-white">
          <div className="flex flex-col mb-6">
            <h2 className="text-lg font-semibold text-[#052A5E]">Clicks Overview</h2>
            <p className="text-sm text-[#052A5E]/80">Last 7 days</p>
          </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#09C1F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#09C1F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" stroke="#052A5E" fontSize={12} />
              <YAxis stroke="#052A5E" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#052A5E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="links"
                stroke="#09C1F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights */}
        <div className="bg-[#dff9f881] rounded-2xl p-6 shadow-sm border border-white">
          <h2 className="mb-2 text-lg font-semibold text-[#052A5E]">Insights</h2>
            {insights.map((product, index) => (
              <p key={index} className="text-sm font-medium text-gray-800 truncate">{product}</p>

            ))}
          
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#052a5e] to-[#09c3f652] rounded-2xl p-6 text-white flex">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
            <div>
              <h3 className="text-xl font-bold">Ready to get started?</h3>
              <p className="text-white/80 mt-1">Generate a unique link to share with your customers & analyze clicks.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2.5 bg-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 text-[#052A5E] hover:text-white transition-colors">
                Generate New Link
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
