import { useState } from 'react';
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
} from 'lucide-react';

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2024-1234',
      customer: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001',
      },
      items: [
        { name: 'Wireless Bluetooth Headphones', quantity: 1, price: 49.99, image: '🎧' },
        { name: 'USB-C Fast Charging Cable', quantity: 2, price: 14.99, image: '🔌' },
      ],
      total: 79.97,
      status: 'pending',
      paymentStatus: 'paid',
      date: '2024-01-15T10:30:00',
    },
    {
      id: 'ORD-2024-1233',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 345 678 9012',
        address: '456 Oak Ave, Los Angeles, CA 90001',
      },
      items: [
        { name: 'Smart Watch Pro', quantity: 1, price: 199.99, image: '⌚' },
      ],
      total: 199.99,
      status: 'processing',
      paymentStatus: 'paid',
      date: '2024-01-15T09:15:00',
    },
    {
      id: 'ORD-2024-1232',
      customer: {
        name: 'Mike Brown',
        email: 'mike.b@email.com',
        phone: '+1 456 789 0123',
        address: '789 Pine Rd, Chicago, IL 60601',
      },
      items: [
        { name: 'Premium Phone Case', quantity: 3, price: 24.99, image: '📱' },
        { name: 'Wireless Mouse', quantity: 1, price: 29.99, image: '🖱️' },
      ],
      total: 104.96,
      status: 'shipped',
      paymentStatus: 'paid',
      trackingNumber: 'TRK123456789',
      date: '2024-01-14T16:45:00',
    },
    {
      id: 'ORD-2024-1231',
      customer: {
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        phone: '+1 567 890 1234',
        address: '321 Elm St, Houston, TX 77001',
      },
      items: [
        { name: 'Mechanical Keyboard RGB', quantity: 1, price: 89.99, image: '⌨️' },
      ],
      total: 89.99,
      status: 'delivered',
      paymentStatus: 'paid',
      trackingNumber: 'TRK987654321',
      date: '2024-01-13T11:20:00',
    },
    {
      id: 'ORD-2024-1230',
      customer: {
        name: 'Chris Wilson',
        email: 'chris.w@email.com',
        phone: '+1 678 901 2345',
        address: '654 Maple Dr, Phoenix, AZ 85001',
      },
      items: [
        { name: 'Portable Power Bank 20000mAh', quantity: 2, price: 39.99, image: '🔋' },
      ],
      total: 79.98,
      status: 'cancelled',
      paymentStatus: 'refunded',
      cancelReason: 'Customer requested cancellation',
      date: '2024-01-12T14:00:00',
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
      processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Processing' },
      shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Shipped' },
      delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' },
      cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Cancelled' },
    };
    return configs[status] || configs.pending;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const orderCounts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500 mt-1">Manage and track your orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-700">{orderCounts.pending}</p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{orderCounts.processing}</p>
              <p className="text-sm text-blue-600">Processing</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-700">{orderCounts.shipped}</p>
              <p className="text-sm text-purple-600">Shipped</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">{orderCounts.delivered}</p>
              <p className="text-sm text-green-600">Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Order ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Items</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Total</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Date</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-800">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-800">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-white"
                            >
                              {item.image}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-800">${order.total.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">{formatDate(order.date)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
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
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">1-{filteredOrders.length}</span> of{' '}
            <span className="font-medium">{filteredOrders.length}</span> orders
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Order Cards */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;
          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              onClick={() => handleViewOrder(order)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-800">{order.id}</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                  {statusConfig.label}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-white text-lg"
                    >
                      {item.image}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{order.customer.name}</p>
                  <p className="text-xs text-gray-500">{order.items.length} items</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-semibold text-gray-800">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                <p className="text-sm text-gray-500">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getStatusConfig(selectedOrder.status);
                    const Icon = config.icon;
                    return (
                      <>
                        <div className={`p-2 rounded-lg ${config.bg}`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{config.label}</p>
                          <p className="text-sm text-gray-500">Order status</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 bg-white">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-semibold">
                        {selectedOrder.customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{selectedOrder.customer.name}</p>
                      <p className="text-sm text-gray-500">Customer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{selectedOrder.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-600">{selectedOrder.customer.address}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl border border-gray-100">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-800">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800">Total</span>
                      <span className="font-bold text-gray-800">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Info */}
              {selectedOrder.trackingNumber && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-800">Tracking Number</p>
                      <p className="text-sm text-purple-600">{selectedOrder.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
                Invoice
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button
                onClick={() => setShowOrderModal(false)}
                className="ml-auto px-6 py-2.5 text-white bg-red-600 rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
