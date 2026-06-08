import { useState } from 'react';
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Bell,
  Lock,
  CreditCard,
  Palette,
  Save,
  AlertCircle,
  Check,
  ChevronRight,
  Shield,
  Truck,
  Percent,
} from 'lucide-react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('store');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Tech Accessories Store',
    tagline: 'Quality electronics at affordable prices',
    description: 'We offer a wide range of high-quality tech accessories including headphones, chargers, cases, and more.',
    email: 'contact@techstore.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street, New York, NY 10001',
    website: 'www.techstore.com',
    logo: '',
    banner: '',
  });

  const [ownerSettings, setOwnerSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 234 567 8901',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    promotions: false,
    weeklyReport: true,
    monthlyReport: false,
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '50',
    standardShipping: '5.99',
    expressShipping: '12.99',
    processingTime: '1-2',
  });

  const sections = [
    { id: 'store', label: 'Store Profile', icon: Store },
    { id: 'owner', label: 'Owner Details', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'store':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Store Profile</h2>
              <p className="text-sm text-gray-500">Manage your store's public information</p>
            </div>

            {/* Store Logo & Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Store className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">200 x 200px recommended</p>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Upload Logo
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Banner</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <Palette className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">1200 x 400px recommended</p>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Upload Banner
                  </button>
                </div>
              </div>
            </div>

            {/* Store Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={storeSettings.tagline}
                  onChange={(e) => setStoreSettings({ ...storeSettings, tagline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={storeSettings.description}
                onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={storeSettings.website}
                  onChange={(e) => setStoreSettings({ ...storeSettings, website: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'owner':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Owner Details</h2>
              <p className="text-sm text-gray-500">Update your personal information</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center">
                <User className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Profile Photo</h3>
                <p className="text-sm text-gray-500 mb-2">JPG or PNG, max 2MB</p>
                <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  Upload Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={ownerSettings.firstName}
                  onChange={(e) => setOwnerSettings({ ...ownerSettings, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={ownerSettings.lastName}
                  onChange={(e) => setOwnerSettings({ ...ownerSettings, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={ownerSettings.email}
                  onChange={(e) => setOwnerSettings({ ...ownerSettings, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={ownerSettings.phone}
                  onChange={(e) => setOwnerSettings({ ...ownerSettings, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Notifications</h2>
              <p className="text-sm text-gray-500">Manage your notification preferences</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'newOrders', label: 'New Orders', description: 'Get notified when you receive a new order' },
                { key: 'orderUpdates', label: 'Order Updates', description: 'Receive updates on order status changes' },
                { key: 'lowStock', label: 'Low Stock Alerts', description: 'Get alerts when products are running low' },
                { key: 'promotions', label: 'Promotions', description: 'Receive marketing tips and promotion suggestions' },
                { key: 'weeklyReport', label: 'Weekly Report', description: 'Get a weekly summary of your store performance' },
                { key: 'monthlyReport', label: 'Monthly Report', description: 'Receive a detailed monthly analytics report' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings[item.key]}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Shipping Settings</h2>
              <p className="text-sm text-gray-500">Configure your shipping options</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Shipping Configuration</p>
                <p className="text-sm text-blue-600">These settings apply to all your products unless overridden individually.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Shipping Threshold ($)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, freeShippingThreshold: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Orders above this amount get free shipping</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Time
                </label>
                <select
                  value={shippingSettings.processingTime}
                  onChange={(e) =>
                    setShippingSettings({ ...shippingSettings, processingTime: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                >
                  <option value="1">1 business day</option>
                  <option value="1-2">1-2 business days</option>
                  <option value="2-3">2-3 business days</option>
                  <option value="3-5">3-5 business days</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Shipping Rate ($)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={shippingSettings.standardShipping}
                  onChange={(e) =>
                    setShippingSettings({ ...shippingSettings, standardShipping: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Express Shipping Rate ($)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={shippingSettings.expressShipping}
                  onChange={(e) =>
                    setShippingSettings({ ...shippingSettings, expressShipping: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Payment Settings</h2>
              <p className="text-sm text-gray-500">Manage your payout preferences</p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Payment Account Connected</p>
                  <p className="text-sm text-green-600">Your bank account is verified and active</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Bank Account Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Name</span>
                  <span className="font-medium text-gray-800">Chase Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Holder</span>
                  <span className="font-medium text-gray-800">John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number</span>
                  <span className="font-medium text-gray-800">****4567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Routing Number</span>
                  <span className="font-medium text-gray-800">****1234</span>
                </div>
              </div>
              <button className="mt-4 w-full py-2.5 text-red-600 bg-red-50 rounded-xl font-medium hover:bg-red-100 transition-colors">
                Update Bank Details
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Payout Schedule</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
                  <input type="radio" name="payout" defaultChecked className="text-red-600 focus:ring-red-500" />
                  <div>
                    <p className="font-medium text-gray-800">Weekly</p>
                    <p className="text-sm text-gray-500">Receive payouts every Monday</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
                  <input type="radio" name="payout" className="text-red-600 focus:ring-red-500" />
                  <div>
                    <p className="font-medium text-gray-800">Bi-weekly</p>
                    <p className="text-sm text-gray-500">Receive payouts every other Monday</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
                  <input type="radio" name="payout" className="text-red-600 focus:ring-red-500" />
                  <div>
                    <p className="font-medium text-gray-800">Monthly</p>
                    <p className="text-sm text-gray-500">Receive payouts on the 1st of each month</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Security</h2>
              <p className="text-sm text-gray-500">Keep your account secure</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-200 rounded-xl">
                    <Lock className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Change Password</h3>
                    <p className="text-sm text-gray-500 mt-1">Update your password regularly to keep your account secure</p>
                    <button className="mt-3 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-200 rounded-xl">
                    <Shield className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Not Enabled
                      </span>
                    </div>
                    <button className="mt-3 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">MacBook Pro - Chrome</p>
                        <p className="text-xs text-gray-500">New York, USA • Current session</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">iPhone 14 - Safari</p>
                        <p className="text-xs text-gray-500">New York, USA • 2 days ago</p>
                      </div>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Store Settings</h1>
        <p className="text-gray-500 mt-1">Manage your store preferences and account</p>
      </div>

      {/* Success Toast */}
      {showSaveSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
          <Check className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                    isActive ? 'bg-red-50 text-red-600 border-l-4 border-red-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                  <ChevronRight className={`w-4 h-4 ml-auto ${isActive ? 'text-red-600' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {renderSection()}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
