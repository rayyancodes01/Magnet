import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  Pill, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  User, 
  MapPin, 
  AlertCircle,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { Enquiry, UserAccount } from '../../types';
import { storageService, getWhatsAppUrl } from '../../services/storageService';
import { StatusBadge } from '../common/StatusBadge';
import { TimelineTracker } from '../common/TimelineTracker';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface MyEnquiriesViewProps {
  currentUser: UserAccount | null;
  onOpenBooking: () => void;
}

export const MyEnquiriesView: React.FC<MyEnquiriesViewProps> = ({
  currentUser,
  onOpenBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allEnquiries, setAllEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const loadEnquiries = () => {
    const list = storageService.getEnquiries();
    setAllEnquiries(list);

    if (list.length > 0 && !selectedEnquiry) {
      // Pick either the first matching user enquiry or first overall
      if (currentUser) {
        const userFirst = list.find(e => e.userId === currentUser.id || e.phone === currentUser.phone);
        setSelectedEnquiry(userFirst || list[0]);
      } else {
        setSelectedEnquiry(list[0]);
      }
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [currentUser]);

  // Filter enquiries by search query (ref number or phone)
  const filteredEnquiries = allEnquiries.filter((enq) => {
    if (!searchQuery.trim()) {
      if (currentUser) {
        return enq.userId === currentUser.id || enq.phone === currentUser.phone;
      }
      return true;
    }
    const q = searchQuery.toLowerCase().trim();
    return (
      enq.refNumber.toLowerCase().includes(q) ||
      enq.phone.includes(q) ||
      enq.customerName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-8 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Customer Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Track Medicine Enquiries
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Check the live status, pharmacist verification updates, and timeline for your medicine bookings.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
          >
            <Pill className="w-4 h-4" />
            <span>New Medicine Booking</span>
          </button>
        </div>

        {/* Search by Reference or Phone */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="relative">
            <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Enquiry Reference Number (e.g. MAG-2026-000101) or 10-digit Phone..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Main 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Enquiry List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Recent Enquiries ({filteredEnquiries.length})
              </span>
              <button
                onClick={loadEnquiries}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {filteredEnquiries.length > 0 ? (
              <div className="space-y-3">
                {filteredEnquiries.map((enquiry) => {
                  const isSelected = selectedEnquiry?.id === enquiry.id;
                  return (
                    <div
                      key={enquiry.id}
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500'
                          : 'bg-white border-slate-200/90 hover:border-emerald-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                          {enquiry.refNumber}
                        </span>
                        <StatusBadge status={enquiry.status} size="sm" />
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-800">{enquiry.customerName}</span>
                          <span className="text-slate-400">{enquiry.phone}</span>
                        </div>
                        <p className="text-slate-500 truncate">
                          {enquiry.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{new Date(enquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          View details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">No Enquiries Found</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  We couldn't find an enquiry matching "{searchQuery}". Please check the reference number or submit a new enquiry.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl"
                >
                  Make a Medicine Booking
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Selected Enquiry Details & Timeline Tracker */}
          <div className="lg:col-span-7">
            {selectedEnquiry ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden space-y-6">
                
                {/* Status Bar Banner */}
                <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Enquiry Reference ID
                    </span>
                    <h2 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900">
                      {selectedEnquiry.refNumber}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <StatusBadge status={selectedEnquiry.status} size="md" />
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  
                  {/* Timeline Tracker */}
                  <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80">
                    <TimelineTracker history={selectedEnquiry.timeline} currentStatus={selectedEnquiry.status} />
                  </div>

                  {/* Pharmacist Note / Fulfillment Remarks */}
                  {selectedEnquiry.notes && (
                    <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>Pharmacist Review Notes:</span>
                      </div>
                      <p className="text-emerald-950 leading-relaxed pl-5">
                        {selectedEnquiry.notes}
                      </p>
                    </div>
                  )}

                  {/* Items List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Requested Medicines & Health Items
                    </h4>
                    <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
                      {selectedEnquiry.items.map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{item.productName}</p>
                            {item.genericName && (
                              <p className="text-slate-500 font-medium">{item.genericName}</p>
                            )}
                            {item.notes && (
                              <p className="text-slate-400 italic mt-0.5">Note: {item.notes}</p>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                              Qty: {item.quantity}
                            </span>
                            {item.estimatedPrice && (
                              <p className="text-slate-500 text-[11px] mt-1">
                                Est. ₹{(item.estimatedPrice * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Information & Delivery Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <h5 className="font-bold text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" /> Customer Contact
                      </h5>
                      <div className="space-y-1 text-slate-600">
                        <p><span className="text-slate-400">Name:</span> {selectedEnquiry.customerName}</p>
                        <p><span className="text-slate-400">Phone:</span> {selectedEnquiry.phone}</p>
                        {selectedEnquiry.email && (
                          <p><span className="text-slate-400">Email:</span> {selectedEnquiry.email}</p>
                        )}
                        <p><span className="text-slate-400">Updates Via:</span> {selectedEnquiry.preferredContact}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <h5 className="font-bold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> Fulfillment Option
                      </h5>
                      <div className="space-y-1 text-slate-600">
                        <p><span className="text-slate-400">Method:</span> <span className="font-semibold capitalize">{selectedEnquiry.deliveryMethod}</span></p>
                        {selectedEnquiry.deliveryMethod === 'delivery' && (
                          <p className="text-slate-700 font-medium">
                            {selectedEnquiry.address}, {selectedEnquiry.city} {selectedEnquiry.pincode}
                          </p>
                        )}
                        {selectedEnquiry.prescriptionFileName && (
                          <p className="text-emerald-700 font-medium flex items-center gap-1 pt-1">
                            <FileText className="w-3.5 h-3.5" /> Prescription Attached
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a
                      href={getWhatsAppUrl(
                        `Hello Magnet, I am checking the status of enquiry reference: ${selectedEnquiry.refNumber} for ${selectedEnquiry.customerName}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat with Pharmacist on WhatsApp
                    </a>

                    <a
                      href={`tel:7620059437`}
                      className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-emerald-700" />
                      Call Helpline: 76200 59437
                    </a>
                  </div>

                  {/* Statutory disclaimer */}
                  <MedicalDisclaimer compact={true} />

                </div>
              </div>
            ) : (
              <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-base">Select an Enquiry to View Progress</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click any enquiry on the left or search by your mobile number or reference code.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
