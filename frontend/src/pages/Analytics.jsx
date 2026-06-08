import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Eye,
  Users,
  ArrowUpRight,
  Calendar,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { useState } from 'react';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('week');

  // Mock data
  const revenueData = [
    { name: 'Mon', revenue: 1200, orders: 15 },
    { name: 'Tue', revenue: 1800, orders: 22 },
    { name: 'Wed', revenue: 1400, orders: 18 },
    { name: 'Thu', revenue: 2200, orders: 28 },
    { name: 'Fri', revenue: 1900, orders: 24 },
    { name: 'Sat', revenue: 2800, orders: 35 },
    { name: 'Sun', revenue: 2400, orders: 30 },
  ];

  const monthlyRevenue = [
    { name: 'Jan', revenue: 12500 },
    { name: 'Feb', revenue: 15200 },
    { name: 'Mar', revenue: 14800 },
    { name: 'Apr', revenue: 18500 },
    { name: 'May', revenue: 21000 },
    { name: 'Jun', revenue: 19500 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#ef4444' },
    { name: 'Accessories', value: 30, color: '#f97316' },
    { name: 'Clothing', value: 15, color: '#eab308' },
    { name: 'Others', value: 10, color: '#22c55e' },
  ];

  const trafficSources = [
    { name: 'Direct', visitors: 1250, percentage: 35 },
    { name: 'Social Media', visitors: 890, percentage: 25 },
    { name: 'Search', visitors: 720, percentage: 20 },
    { name: 'Referral', visitors: 540, percentage: 15 },
    { name: 'Email', visitors: 180, percentage: 5 },
  ];

  const topProducts = [
    { name: 'Wireless Bluetooth Headphones', sold: 145, revenue: 7250, growth: 12.5 },
    { name: 'Smart Watch Pro', sold: 98, revenue: 19600, growth: 8.2 },
    { name: 'Premium Phone Case', sold: 234, revenue: 5850, growth: -3.5 },
    { name: 'USB-C Charging Cable', sold: 312, revenue: 4680, growth: 15.8 },
    { name: 'Wireless Mouse', sold: 89, revenue: 2670, growth: 5.2 },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,678',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      subtext: 'vs last period',
    },
    {
      title: 'Total Orders',
      value: '856',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingCart,
      subtext: 'vs last period',
    },
    {
      title: 'Products Sold',
      value: '1,234',
      change: '+15.3%',
      isPositive: true,
      icon: Package,
      subtext: 'vs last period',
    },
    {
      title: 'Store Views',
      value: '12,456',
      change: '-3.2%',
      isPositive: false,
      icon: Eye,
      subtext: 'vs last period',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500 mt-1">Track your store performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="px-4 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
            Export
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-red-50 rounded-xl">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Revenue & Orders</h2>
              <p className="text-sm text-gray-500">Daily overview</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-gray-600">Orders</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Sales by Category</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-600">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue</h2>
              <p className="text-sm text-gray-500">6-month trend</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Traffic Sources</h2>
              <p className="text-sm text-gray-500">Where your visitors come from</p>
            </div>
          </div>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">{source.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-800">
                      {source.visitors.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">({source.percentage}%)</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Top Performing Products</h2>
          <p className="text-sm text-gray-500">Products with highest sales this period</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Product</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Units Sold</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Revenue</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-800">{index + 1}.</span>
                      <span className="text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{product.sold}</td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${
                        product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {product.growth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {product.growth >= 0 ? '+' : ''}
                      {product.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Conversion Insights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">12,456</p>
            <p className="text-red-100 text-sm mt-1">Store Visits</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">3,456</p>
            <p className="text-red-100 text-sm mt-1">Product Views</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-red-100 text-sm mt-1">Add to Cart</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">856</p>
            <p className="text-red-100 text-sm mt-1">Purchases</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between">
            <p className="text-red-100">Conversion Rate</p>
            <p className="text-2xl font-bold">6.87%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
