import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Package, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  Phone, 
  MessageCircle, 
  Search, 
  Compass, 
  Save, 
  Lock, 
  LogOut,
  RefreshCw,
  Eye,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { Product, Enquiry, PilgrimageEnquiry, PrescriptionDoc, BusinessSettings, EnquiryStatus } from '../../types';
import { storageService, getWhatsAppUrl } from '../../services/storageService';
import { StatusBadge } from '../common/StatusBadge';

interface AdminDashboardProps {
  onProductUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onProductUpdated }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab in Admin (Defaults directly to Product Management)
  const [adminTab, setAdminTab] = useState<'products' | 'enquiries' | 'pilgrimage' | 'prescriptions' | 'settings'>('products');

  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [pilgrimageEnquiries, setPilgrimageEnquiries] = useState<PilgrimageEnquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [prescriptions, setPrescriptions] = useState<PrescriptionDoc[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(storageService.getBusinessSettings());

  // Search & Filter
  const [enquirySearch, setEnquirySearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');

  // Product Edit / Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Settings Feedback
  const [settingsSaved, setSettingsSaved] = useState(false);

  const loadAllData = () => {
    setEnquiries(storageService.getEnquiries());
    setPilgrimageEnquiries(storageService.getPilgrimageEnquiries());
    setProducts(storageService.getProducts());
    setPrescriptions(storageService.getPrescriptions());
    setSettings(storageService.getBusinessSettings());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN is 1234 or magnet123
    if (adminPin === '1234' || adminPin === 'magnet123' || adminPin === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Key. (Hint: Use 1234 or magnet123)');
    }
  };

  const handleUpdateEnquiryStatus = (enquiryId: string, newStatus: EnquiryStatus) => {
    storageService.updateEnquiryStatus(
      enquiryId,
      newStatus,
      statusUpdateNote.trim() || `Status updated to ${newStatus.replace('_', ' ')} by Pharmacist`,
      'Registered Pharmacist'
    );
    setStatusUpdateNote('');
    loadAllData();
    const updated = storageService.getEnquiries().find(e => e.id === enquiryId);
    if (updated) setSelectedEnquiry(updated);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.category) return;

    const prodToSave: Product = {
      id: editingProduct.id || 'prod-' + Date.now(),
      name: editingProduct.name,
      genericName: editingProduct.genericName || undefined,
      category: editingProduct.category,
      description: editingProduct.description || '',
      manufacturer: editingProduct.manufacturer || 'Magnet Pharmacy',
      packSize: editingProduct.packSize || '1 Unit',
      price: editingProduct.price,
      availability: editingProduct.availability || 'in_stock',
      prescriptionRequired: editingProduct.prescriptionRequired || false,
      imageUrl: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      sku: editingProduct.sku || `MAG-${Math.floor(1000 + Math.random() * 9000)}`,
      dosageForm: editingProduct.dosageForm || 'Formulation',
      tags: editingProduct.tags || ['Healthcare', editingProduct.category]
    };

    storageService.saveProduct(prodToSave);

    setIsProductModalOpen(false);
    setEditingProduct(null);
    loadAllData();
    onProductUpdated();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      storageService.deleteProduct(id);
      loadAllData();
      onProductUpdated();
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.updateBusinessSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // If not logged in, render Pharmacist Login screen
  if (!isAuthenticated) {
    return (
      <div className="py-16 sm:py-24 bg-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Pharmacist Portal Login
            </h2>
            <p className="text-xs text-slate-500">
              Authorized access for Magnet Pharmacy management, prescription verification, and catalog control.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700">
                Enter Pharmacist Security PIN / Password
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter PIN (e.g. 1234 or magnet123)"
                className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {authError && <p className="text-xs text-rose-600 mt-1.5">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-sm transition-all cursor-pointer"
            >
              Authenticate & Open Dashboard
            </button>
          </form>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 text-center">
            Default Demo PIN: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">1234</code>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Layout
  const pendingCount = enquiries.filter(e => e.status === 'submitted' || e.status === 'under_review').length;
  const verifiedCount = enquiries.filter(e => e.status === 'rx_verified' || e.status === 'stock_confirmed').length;

  return (
    <div className="py-8 sm:py-12 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Pharmacist Control Center
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                Magnet Management Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
              title="Refresh all data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total Medicine Enquiries</span>
            <p className="text-2xl font-extrabold text-slate-900">{enquiries.length}</p>
            <span className="text-[11px] text-emerald-700 font-semibold">{pendingCount} pending review</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Pilgrimage Travel Kits</span>
            <p className="text-2xl font-extrabold text-teal-800">{pilgrimageEnquiries.length}</p>
            <span className="text-[11px] text-teal-600 font-semibold">Umrah & Hajj requests</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Catalog Inventory</span>
            <p className="text-2xl font-extrabold text-slate-900">{products.length}</p>
            <span className="text-[11px] text-slate-500">{products.filter(p => p.prescriptionRequired).length} Rx products</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Prescriptions Vault</span>
            <p className="text-2xl font-extrabold text-slate-900">{prescriptions.length}</p>
            <span className="text-[11px] text-emerald-700 font-semibold">Secure client uploads</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'products'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Medicines ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('enquiries')}
            className={`px-4 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'enquiries'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Medicine Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('pilgrimage')}
            className={`px-4 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'pilgrimage'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Pilgrimage Requests ({pilgrimageEnquiries.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('prescriptions')}
            className={`px-4 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'prescriptions'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Prescription Vault ({prescriptions.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`px-4 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'settings'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings</span>
          </button>
        </div>

        {/* TAB 1: MEDICINE ENQUIRIES */}
        {adminTab === 'enquiries' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* List */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  placeholder="Filter by ref, name, phone..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
                {enquiries
                  .filter(e => 
                    !enquirySearch || 
                    e.refNumber.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                    e.customerName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                    e.phone.includes(enquirySearch)
                  )
                  .map((enq) => {
                    const isSelected = selectedEnquiry?.id === enq.id;
                    return (
                      <div
                        key={enq.id}
                        onClick={() => setSelectedEnquiry(enq)}
                        className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all space-y-1.5 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                            : 'bg-slate-50 hover:bg-white border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-900">{enq.refNumber}</span>
                          <StatusBadge status={enq.status} size="sm" />
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="font-semibold">{enq.customerName}</span>
                          <span>{enq.phone}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {enq.items.map(i => i.productName).join(', ')}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Selected Enquiry Details & Status Update Form */}
            <div className="lg:col-span-7">
              {selectedEnquiry ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <span className="font-mono text-xs text-slate-400">Reference Number</span>
                      <h3 className="text-xl font-mono font-extrabold text-slate-900">
                        {selectedEnquiry.refNumber}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Customer: <strong>{selectedEnquiry.customerName}</strong> ({selectedEnquiry.phone})
                      </p>
                    </div>
                    <StatusBadge status={selectedEnquiry.status} size="md" />
                  </div>

                  {/* Items Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500">Requested Items</h4>
                    <div className="border rounded-2xl divide-y text-xs">
                      {selectedEnquiry.items.map((item, idx) => (
                        <div key={idx} className="p-3 flex justify-between">
                          <div>
                            <span className="font-bold text-slate-900">{item.productName}</span>
                            {item.genericName && <p className="text-[11px] text-slate-500">{item.genericName}</p>}
                          </div>
                          <span className="font-bold text-slate-800">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attached prescription preview if present */}
                  {selectedEnquiry.prescriptionFileName && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                        <FileText className="w-4 h-4 text-emerald-700" />
                        <span>Attached Rx: {selectedEnquiry.prescriptionFileName}</span>
                      </div>
                      {selectedEnquiry.prescriptionUrl && (
                        <a
                          href={selectedEnquiry.prescriptionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800"
                        >
                          View Rx Document
                        </a>
                      )}
                    </div>
                  )}

                  {/* Pharmacist Action / Update Status */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold uppercase text-slate-700">
                      Update Pharmacy Status & Add Timeline Note
                    </h4>

                    <div>
                      <label className="text-xs text-slate-600 block mb-1 font-medium">
                        Pharmacist Note for Customer:
                      </label>
                      <input
                        type="text"
                        value={statusUpdateNote}
                        onChange={(e) => setStatusUpdateNote(e.target.value)}
                        placeholder="e.g. Prescriptions verified; pack prepared and ready for store counter pickup."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'under_review')}
                        className="px-3 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg text-xs font-semibold border border-amber-200 cursor-pointer"
                      >
                        Set Under Review
                      </button>

                      <button
                        onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'prescription_verification')}
                        className="px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-lg text-xs font-semibold border border-blue-200 cursor-pointer"
                      >
                        Verify Prescription (Rx OK)
                      </button>

                      <button
                        onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'confirmed')}
                        className="px-3 py-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 rounded-lg text-xs font-semibold border border-teal-200 cursor-pointer"
                      >
                        Confirm Stock Ready
                      </button>

                      <button
                        onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'ready_for_pickup')}
                        className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                      >
                        Mark Ready for Pickup
                      </button>

                      <button
                        onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'completed')}
                        className="px-3 py-1.5 bg-slate-900 text-white hover:bg-black rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Complete Order
                      </button>
                    </div>
                  </div>

                  {/* Direct WhatsApp Contact Button */}
                  <div className="pt-2">
                    <a
                      href={getWhatsAppUrl(
                        `Hello ${selectedEnquiry.customerName}, regarding your Magnet pharmacy enquiry (${selectedEnquiry.refNumber}): our pharmacist has updated your order status.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Notify Customer on WhatsApp ({selectedEnquiry.phone})
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border p-12 text-center text-slate-400 text-sm">
                  Select an enquiry on the left to manage status.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PILGRIMAGE REQUESTS */}
        {adminTab === 'pilgrimage' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base font-display">
              Pilgrimage Care Enquiries (Umrah & Hajj)
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {pilgrimageEnquiries.map((pEnq) => (
                <div key={pEnq.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-slate-900 mr-2">{pEnq.refNumber}</span>
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-semibold">{pEnq.travelType}</span>
                    </div>
                    <span className="text-slate-400">{new Date(pEnq.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
                    <p><span className="text-slate-400">Name:</span> {pEnq.customerName}</p>
                    <p><span className="text-slate-400">Phone:</span> {pEnq.phone}</p>
                    <p><span className="text-slate-400">Duration:</span> {pEnq.durationDays} days ({pEnq.travelMonthYear})</p>
                  </div>

                  {pEnq.selectedChecklistItems && pEnq.selectedChecklistItems.length > 0 && (
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="font-bold text-slate-700">Selected Checklist Items:</span>
                      <ul className="list-disc pl-4 text-slate-600 space-y-0.5 mt-1">
                        {pEnq.selectedChecklistItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pEnq.customMessage && (
                    <p className="text-slate-500 italic">" {pEnq.customMessage} "</p>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={getWhatsAppUrl(
                        `Hello ${pEnq.customerName}, regarding your Umrah/Hajj healthcare preparation enquiry (${pEnq.refNumber}): Magnet pharmacy is ready to assemble your custom travel pack.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold"
                    >
                      WhatsApp Customer ({pEnq.phone})
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT CATALOG MANAGEMENT */}
        {adminTab === 'products' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-display flex items-center gap-2">
                  <span>Product & Medicine Inventory</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {products.length} Total
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Easily add new medicines, edit prices, update formulations, or delete products anytime.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    name: '',
                    genericName: '',
                    category: 'Medicines',
                    manufacturer: 'Magnet Healthcare',
                    packSize: '10 Tablets',
                    price: 100,
                    availability: 'in_stock',
                    prescriptionRequired: false,
                    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
                    description: ''
                  });
                  setIsProductModalOpen(true);
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" /> Add New Medicine
              </button>
            </div>

            {/* Product Search & Category Filter */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search medicines by brand, generic name, or manufacturer..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="w-full sm:w-56">
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-700"
                >
                  <option value="All">All Categories</option>
                  <option value="Medicines">Medicines</option>
                  <option value="Healthcare Essentials">Healthcare Essentials</option>
                  <option value="Personal Care & Hygiene">Personal Care & Hygiene</option>
                  <option value="Beauty & Skincare">Beauty & Skincare</option>
                  <option value="Baby Care">Baby Care</option>
                  <option value="First Aid & Devices">First Aid & Devices</option>
                  <option value="General Store">General Store</option>
                  <option value="Pilgrimage Care">Pilgrimage Care</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            {(() => {
              const filteredProducts = products.filter(p => {
                const matchesSearch = 
                  p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                  (p.genericName && p.genericName.toLowerCase().includes(productSearch.toLowerCase())) ||
                  p.manufacturer.toLowerCase().includes(productSearch.toLowerCase());
                const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
                return matchesSearch && matchesCat;
              });

              if (filteredProducts.length === 0) {
                return (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <Package className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700">No medicines found</p>
                    <p className="text-xs text-slate-500">Try changing your search keywords or category filter.</p>
                  </div>
                );
              }

              return (
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider">
                        <tr>
                          <th className="p-3.5">Medicine / Item</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Pack Size</th>
                          <th className="p-3.5">Price</th>
                          <th className="p-3.5">Type</th>
                          <th className="p-3.5">Availability</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.imageUrl}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <div>
                                  <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                                  <p className="text-[11px] text-slate-500 font-medium">
                                    {p.genericName ? p.genericName : p.manufacturer}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                                {p.category}
                              </span>
                            </td>
                            <td className="p-3.5 font-medium text-slate-600">{p.packSize || '1 Unit'}</td>
                            <td className="p-3.5 font-bold text-slate-900 text-sm">
                              {p.price ? `₹${p.price.toFixed(2)}` : 'On Enquiry'}
                            </td>
                            <td className="p-3.5">
                              {p.prescriptionRequired ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                                  Rx Required
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  OTC Item
                                </span>
                              )}
                            </td>
                            <td className="p-3.5">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.availability === 'in_stock' 
                                  ? 'bg-emerald-50 text-emerald-700' 
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {p.availability.replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsProductModalOpen(true);
                                }}
                                className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Medicine"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete Medicine"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 4: PRESCRIPTION VAULT */}
        {adminTab === 'prescriptions' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base font-display">
              Prescription Vault & Secure Uploads
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {prescriptions.map((rec) => (
                <div key={rec.id} className="p-4 bg-slate-50 rounded-2xl border space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900">{rec.customerName}</p>
                      <p className="text-slate-500">{rec.phone}</p>
                    </div>
                    <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">
                      {rec.refNumber}
                    </span>
                  </div>

                  <p className="text-slate-600 truncate">Doc: {rec.fileName}</p>

                  <div className="pt-2 flex gap-2">
                    <a
                      href={rec.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BUSINESS SETTINGS */}
        {adminTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm max-w-2xl">
            <h3 className="font-bold text-slate-900 text-lg font-display">
              Pharmacy & Store Settings
            </h3>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
                ✓ Business settings updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Business Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">WhatsApp</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Store Timings</label>
                <input
                  type="text"
                  value={settings.storeTimings}
                  onChange={(e) => setSettings({ ...settings, storeTimings: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Store Address</label>
                <textarea
                  rows={2}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Product Edit / Add Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base">
              {editingProduct.id ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700">Product Name *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700">Generic / Salt Name</label>
                <input
                  type="text"
                  value={editingProduct.genericName || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, genericName: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700">Category *</label>
                  <select
                    value={editingProduct.category || 'Medicines'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl"
                  >
                    <option value="Medicines">Medicines</option>
                    <option value="Healthcare Essentials">Healthcare Essentials</option>
                    <option value="Personal Care & Hygiene">Personal Care & Hygiene</option>
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Baby Care">Baby Care</option>
                    <option value="First Aid & Devices">First Aid & Devices</option>
                    <option value="General Store">General Store</option>
                    <option value="Pilgrimage Care">Pilgrimage Care</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-700">Price (INR)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700">Manufacturer</label>
                  <input
                    type="text"
                    value={editingProduct.manufacturer || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, manufacturer: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700">Pack Presentation</label>
                  <input
                    type="text"
                    value={editingProduct.packSize || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, packSize: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.imageUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rxReq"
                  checked={editingProduct.prescriptionRequired || false}
                  onChange={(e) => setEditingProduct({ ...editingProduct, prescriptionRequired: e.target.checked })}
                  className="rounded text-emerald-700"
                />
                <label htmlFor="rxReq" className="font-semibold text-rose-700">
                  Prescription Required (Schedule H / Rx)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
