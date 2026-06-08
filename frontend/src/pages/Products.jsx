import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Package,
  ChevronDown,
  X,
  Upload,
  Image,
  Grid,
  List,
} from 'lucide-react';

export default function Products() {
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock products data
  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 49.99,
      stock: 150,
      status: 'active',
      image: '🎧',
      sales: 45,
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      category: 'Electronics',
      price: 199.99,
      stock: 75,
      status: 'active',
      image: '⌚',
      sales: 38,
    },
    {
      id: 3,
      name: 'Premium Phone Case',
      category: 'Accessories',
      price: 24.99,
      stock: 5,
      status: 'low_stock',
      image: '📱',
      sales: 32,
    },
    {
      id: 4,
      name: 'USB-C Fast Charging Cable',
      category: 'Accessories',
      price: 14.99,
      stock: 200,
      status: 'active',
      image: '🔌',
      sales: 28,
    },
    {
      id: 5,
      name: 'Portable Power Bank 20000mAh',
      category: 'Electronics',
      price: 39.99,
      stock: 0,
      status: 'out_of_stock',
      image: '🔋',
      sales: 24,
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      category: 'Accessories',
      price: 29.99,
      stock: 120,
      status: 'active',
      image: '🖱️',
      sales: 20,
    },
    {
      id: 7,
      name: 'Laptop Stand Aluminum',
      category: 'Accessories',
      price: 59.99,
      stock: 45,
      status: 'draft',
      image: '💻',
      sales: 0,
    },
    {
      id: 8,
      name: 'Mechanical Keyboard RGB',
      category: 'Electronics',
      price: 89.99,
      stock: 60,
      status: 'active',
      image: '⌨️',
      sales: 15,
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    images: [],
    variants: [],
  });

  const getStatusBadge = (status) => {
    const configs = {
      active: { label: 'Active', bg: 'bg-green-100', text: 'text-green-700' },
      draft: { label: 'Draft', bg: 'bg-gray-100', text: 'text-gray-700' },
      low_stock: { label: 'Low Stock', bg: 'bg-yellow-100', text: 'text-yellow-700' },
      out_of_stock: { label: 'Out of Stock', bg: 'bg-red-100', text: 'text-red-700' },
    };
    const config = configs[status] || configs.draft;
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: '',
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      images: [],
      variants: [],
    });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Products</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setFormData({
              name: '',
              description: '',
              category: '',
              price: '',
              stock: '',
              images: [],
              variants: [],
            });
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600">Active: {products.filter((p) => p.status === 'active').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span className="text-sm text-gray-600">Low Stock: {products.filter((p) => p.status === 'low_stock').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-sm text-gray-600">Out of Stock: {products.filter((p) => p.status === 'out_of_stock').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <span className="text-sm text-gray-600">Drafts: {products.filter((p) => p.status === 'draft').length}</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="h-40 bg-gray-100 flex items-center justify-center text-5xl relative">
                {product.image}
                <div className="absolute top-3 right-3">{getStatusBadge(product.status)}</div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-lg font-bold text-red-600">${product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{product.stock} in stock</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{product.sales}</p>
                    <p className="text-xs text-gray-500">sales</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="flex-1 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="py-2 px-3 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="py-2 px-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Products List View */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Product</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Sales</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{product.category}</td>
                    <td className="py-4 px-6 font-semibold text-gray-800">${product.price.toFixed(2)}</td>
                    <td className="py-4 px-6 text-gray-600">{product.stock}</td>
                    <td className="py-4 px-6">{getStatusBadge(product.status)}</td>
                    <td className="py-4 px-6 text-gray-600">{product.sales}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Product Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Drag & drop images here, or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB (800 x 800px recommended)</p>
                  <button className="mt-4 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your product..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home & Garden">Home & Garden</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="Enter stock quantity"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Variants Section */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Product Variants</h3>
                    <p className="text-sm text-gray-500">Add different sizes, colors, etc.</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Variant
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No variants added yet</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <button className="px-6 py-2.5 text-white bg-red-600 rounded-xl font-medium hover:bg-red-700 transition-colors">
                {selectedProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Delete Product</h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 text-white bg-red-600 rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
