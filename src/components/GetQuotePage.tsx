import React, { useState } from 'react';
import { Plus, Send, X } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
}

type PricingBase = 'MCX' | 'LME';

export default function GetQuotePage() {
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [pricingBase, setPricingBase] = useState<PricingBase>('MCX');
  const [premium, setPremium] = useState<number>(0);

  // Mock data - In real app, these would come from an API
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: '1', name: 'Supplier A', phone: '+91 9876543210', email: 'suppliera@example.com' },
    { id: '2', name: 'Supplier B', phone: '+91 9876543211', email: 'supplierb@example.com' },
  ]);

  const products: Product[] = [
    { id: '1', name: 'Aluminium Ingots' },
    { id: '2', name: 'Aluminium Wire Rods' },
    { id: '3', name: 'Aluminium Billets' },
  ];

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier: Supplier = {
      id: Date.now().toString(),
      ...newSupplier,
    };
    setSuppliers([...suppliers, supplier]);
    setNewSupplier({ name: '', phone: '', email: '' });
    setShowAddSupplier(false);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle quote submission
    console.log({
      supplier: selectedSupplier,
      product: selectedProduct,
      pricingBase,
      premium,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Request for Quotation</h2>

        <form onSubmit={handleSubmitQuote} className="space-y-6">
          {/* Supplier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Supplier
            </label>
            <div className="flex gap-2">
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddSupplier(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Supplier
              </button>
            </div>
          </div>

          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Product
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing Base */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pricing Base
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPricingBase('MCX')}
                className={`px-4 py-2.5 rounded-lg text-center transition-colors ${
                  pricingBase === 'MCX'
                    ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                MCX Based
              </button>
              <button
                type="button"
                onClick={() => setPricingBase('LME')}
                className={`px-4 py-2.5 rounded-lg text-center transition-colors ${
                  pricingBase === 'LME'
                    ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                LME Based
              </button>
            </div>
          </div>

          {/* Premium Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {pricingBase} Premium (₹/kg)
            </label>
            <div className="relative">
              <input
                type="number"
                value={premium}
                onChange={(e) => setPremium(Number(e.target.value))}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter premium amount"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5" />
            Send RFQ
          </button>
        </form>
      </div>

      {/* Add Supplier Modal */}
      {showAddSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add New Supplier</h3>
              <button
                onClick={() => setShowAddSupplier(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier Name
                </label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddSupplier(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700"
                >
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}