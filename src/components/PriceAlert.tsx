import React, { useState } from 'react';
import { Bell, MessageCircle, Mail, Info, Sparkles } from 'lucide-react';

export const PriceAlert: React.FC = () => {
  const [category, setCategory] = useState<'MCX' | 'LME' | 'NALCO'>('MCX');
  const [alertType, setAlertType] = useState<'Price' | 'Percentage'>('Price');
  const [percentageType, setPercentageType] = useState<'above' | 'below'>('above');
  const [notificationMethods, setNotificationMethods] = useState({
    webApp: false,
    whatsApp: false,
    email: false
  });
  const [isSmartAlertEnabled, setIsSmartAlertEnabled] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  return (
    <div className="premium-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Price Alert</h2>
        </div>
        <button
          onClick={() => setIsSmartAlertEnabled(!isSmartAlertEnabled)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          AluminumGenie
        </button>
      </div>

      {isSmartAlertEnabled && (
        <div className="mb-6">
          <textarea
            placeholder="Ask me to create personalized alerts based on any market conditions..."
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-300"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-6">
        {/* Category Selection - No Dividers */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">Category</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {['MCX', 'LME', 'NALCO'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as 'MCX' | 'LME' | 'NALCO')}
                className={`flex-1 py-2 px-4 text-center transition-all duration-300 ${
                  category === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {category !== 'NALCO' && (
          <>
            {/* Alert Type */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">Alert Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Price', 'Percentage'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setAlertType(type as 'Price' | 'Percentage')}
                    className={`py-2 px-4 rounded-lg text-center transition-colors ${
                      alertType === type
                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Percentage Type Options */}
            {alertType === 'Percentage' && (
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
                  Percentage Change
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['above', 'below'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPercentageType(type as 'above' | 'below')}
                      className={`py-2 px-4 rounded-lg text-center transition-colors ${
                        percentageType === type
                          ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Target Price/Percentage */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
                Target {alertType === 'Price' ? (category === 'LME' ? 'Price (USD)' : 'Price (₹)') : 'Percentage (%)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {alertType === 'Price' ? (category === 'LME' ? '$' : '₹') : '%'}
                </span>
                <input
                  type="text"
                  placeholder={`Enter target ${alertType.toLowerCase()}`}
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-300"
                />
              </div>
            </div>
          </>
        )}

        {/* Notification Method */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
            Notification Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setNotificationMethods(prev => ({ ...prev, webApp: !prev.webApp }))}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                notificationMethods.webApp
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Web App</span>
            </button>
            <button
              onClick={() => setNotificationMethods(prev => ({ ...prev, whatsApp: !prev.whatsApp }))}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                notificationMethods.whatsApp
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => setNotificationMethods(prev => ({ ...prev, email: !prev.email }))}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                notificationMethods.email
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
          </div>
        </div>

        {/* Custom Message */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
            Custom Message (Optional)
          </label>
          <textarea
            placeholder="Add a custom message for your alert"
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-300"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Available variables: {'{price}'}, {'{change}'}, {'{percentage}'}
          </p>
        </div>

        {/* Set Alert Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
          <Bell className="w-5 h-5" />
          Set Alert
        </button>
      </div>
    </div>
  );
};