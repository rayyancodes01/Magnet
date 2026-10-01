import React, { useState, useEffect } from 'react';
import { 
  X, 
  Pill, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  ShieldCheck, 
  Building, 
  MessageSquare, 
  Package,
  Plus,
  Trash2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Enquiry, EnquiryItem, Product, UserAccount } from '../../types';
import { storageService, getWhatsAppUrl } from '../../services/storageService';
import { PrescriptionUploader } from '../common/PrescriptionUploader';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface MedicineBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
  initialCustomQuery?: string;
  currentUser: UserAccount | null;
  onSuccess: (enquiry: Enquiry) => void;
  products: Product[];
}

export const MedicineBookingModal: React.FC<MedicineBookingModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  initialCustomQuery,
  currentUser,
  onSuccess,
  products
}) => {
  // Multi-step states
  const [step, setStep] = useState<number>(1);
  const [isCustomMedicine, setIsCustomMedicine] = useState<boolean>(false);

  // Form Fields
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [customMedName, setCustomMedName] = useState<string>('');
  const [customQuantity, setCustomQuantity] = useState<number>(1);
  const [customNotes, setCustomNotes] = useState<string>('');

  // Customer Details
  const [customerName, setCustomerName] = useState<string>(currentUser?.name || '');
  const [phone, setPhone] = useState<string>(currentUser?.phone || '');
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery' | 'discuss'>('pickup');
  const [address, setAddress] = useState<string>(currentUser?.address || '');
  const [city, setCity] = useState<string>('Nagpur');
  const [pincode, setPincode] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [additionalMessage, setAdditionalMessage] = useState<string>('');

  // Prescription Upload
  const [prescriptionDoc, setPrescriptionDoc] = useState<{
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileType: string;
  } | null>(null);

  // Errors & UI states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);

  // Initialize or reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmittedEnquiry(null);
      setErrors({});

      if (initialProduct) {
        setIsCustomMedicine(false);
        setItems([
          {
            productId: initialProduct.id,
            productName: initialProduct.name,
            genericName: initialProduct.genericName,
            quantity: 1,
            packSize: initialProduct.packSize,
            estimatedPrice: initialProduct.price,
            notes: ''
          }
        ]);
      } else if (initialCustomQuery) {
        setIsCustomMedicine(true);
        setCustomMedName(initialCustomQuery);
        setItems([]);
      } else {
        setIsCustomMedicine(false);
        // Default empty state where customer can pick or type
        setItems([]);
      }

      if (currentUser) {
        setCustomerName(currentUser.name);
        setPhone(currentUser.phone);
        setEmail(currentUser.email);
        if (currentUser.address) setAddress(currentUser.address);
      }
    }
  }, [isOpen, initialProduct, initialCustomQuery, currentUser]);

  if (!isOpen) return null;

  // Has any item requiring prescription
  const hasPrescriptionItem = items.some(item => {
    if (item.productId) {
      const prod = products.find(p => p.id === item.productId);
      return prod?.prescriptionRequired;
    }
    return false;
  });

  const handleAddCatalogProduct = (prodId: string) => {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;

    const existingIndex = items.findIndex(i => i.productId === prodId);
    if (existingIndex >= 0) {
      const copy = [...items];
      copy[existingIndex].quantity += 1;
      setItems(copy);
    } else {
      setItems([
        ...items,
        {
          productId: prod.id,
          productName: prod.name,
          genericName: prod.genericName,
          quantity: 1,
          packSize: prod.packSize,
          estimatedPrice: prod.price,
          notes: ''
        }
      ]);
    }
  };

  const handleAddCustomMedicine = () => {
    if (!customMedName.trim()) {
      setErrors({ customMed: 'Please enter the medicine or product name' });
      return;
    }

    setItems([
      ...items,
      {
        productName: customMedName.trim(),
        quantity: customQuantity || 1,
        notes: customNotes.trim()
      }
    ]);

    setCustomMedName('');
    setCustomQuantity(1);
    setCustomNotes('');
    setErrors({});
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return;
    const copy = [...items];
    copy[index].quantity = newQty;
    setItems(copy);
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (items.length === 0 && !customMedName.trim()) {
        errs.items = 'Please select at least one medicine or enter a custom medicine request';
      }
    } else if (currentStep === 2) {
      if (!customerName.trim()) errs.name = 'Full name is required';
      
      const cleanPhone = phone.replace(/\D/g, '');
      if (!cleanPhone || cleanPhone.length < 10) {
        errs.phone = 'Please enter a valid 10-digit mobile number';
      }

      if (deliveryMethod === 'delivery' && !address.trim()) {
        errs.address = 'Please provide your delivery address';
      }
    } else if (currentStep === 3) {
      if (hasPrescriptionItem && !prescriptionDoc) {
        errs.prescription = 'This order contains prescription medications. A valid doctor prescription is legally required.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    // If on step 1 and user typed custom medicine without clicking Add, auto-add it
    if (step === 1 && customMedName.trim() && items.length === 0) {
      handleAddCustomMedicine();
    }

    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const estimatedTotal = items.reduce((acc, item) => {
        return acc + ((item.estimatedPrice || 0) * (item.quantity || 1));
      }, 0);

      const created = storageService.createEnquiry({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        deliveryMethod,
        address: address.trim(),
        city: city.trim(),
        pincode: pincode.trim(),
        preferredContact,
        items,
        prescriptionFileName: prescriptionDoc?.fileName,
        prescriptionUrl: prescriptionDoc?.fileUrl,
        message: additionalMessage.trim(),
        estimatedAmount: estimatedTotal > 0 ? estimatedTotal : undefined,
        userId: currentUser?.id
      });

      // If user also attached prescription, record it in prescriptions repository
      if (prescriptionDoc) {
        storageService.savePrescription({
          refNumber: created.refNumber,
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          fileName: prescriptionDoc.fileName,
          fileSize: prescriptionDoc.fileSize,
          fileType: prescriptionDoc.fileType,
          fileUrl: prescriptionDoc.fileUrl,
          linkedEnquiryId: created.id
        });
      }

      setSubmittedEnquiry(created);
      onSuccess(created);
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Something went wrong while submitting your enquiry. Please check your details and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                {submittedEnquiry ? 'Enquiry Submitted' : 'Book Medicine / Medicine Enquiry'}
              </h3>
              {!submittedEnquiry && (
                <p className="text-xs text-slate-500">
                  Step {step} of 4 — {step === 1 ? 'Select Medicines' : step === 2 ? 'Customer Details' : step === 3 ? 'Prescription & Notes' : 'Review & Submit'}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (if not submitted) */}
        {!submittedEnquiry && (
          <div className="w-full bg-slate-100 h-1">
            <div 
              className="bg-emerald-600 h-1 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* SUCCESS SCREEN */}
          {submittedEnquiry ? (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Enquiry Reference Assigned
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Enquiry Submitted Successfully
                </h2>
                <div className="py-2">
                  <span className="inline-block text-xl font-mono font-bold text-emerald-800 bg-emerald-50/80 px-4 py-2 rounded-xl border border-emerald-200">
                    {submittedEnquiry.refNumber}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  We have received your enquiry. Our pharmacy team will verify stock availability, review prescription requirements (if applicable), and contact you on <strong>{submittedEnquiry.phone}</strong> before confirming the request.
                </p>
              </div>

              {/* Summary breakdown */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between text-slate-600 pb-1 border-b border-slate-200">
                  <span>Customer Name:</span>
                  <span className="font-semibold text-slate-900">{submittedEnquiry.customerName}</span>
                </div>
                <div className="flex justify-between text-slate-600 pb-1 border-b border-slate-200">
                  <span>Items Requested:</span>
                  <span className="font-semibold text-slate-900">{submittedEnquiry.items.length} item(s)</span>
                </div>
                <div className="flex justify-between text-slate-600 pb-1 border-b border-slate-200">
                  <span>Preference:</span>
                  <span className="font-semibold text-slate-900 capitalize">{submittedEnquiry.deliveryMethod}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Status:</span>
                  <span className="font-semibold text-emerald-700">Under Pharmacist Review</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <a
                  href={getWhatsAppUrl(
                    `Hello Magnet, I just submitted medicine enquiry reference: ${submittedEnquiry.refNumber} for ${submittedEnquiry.customerName}. Please check availability.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Notify Pharmacy on WhatsApp
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            /* STEP 1: SELECT MEDICINES */
            step === 1 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    Medicine / Healthcare Items
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCustomMedicine(!isCustomMedicine)}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                  >
                    {isCustomMedicine ? '← Pick from Catalog' : '+ Request Unlisted Medicine'}
                  </button>
                </div>

                {/* Selected Items List */}
                {items.length > 0 && (
                  <div className="space-y-2 border border-slate-200/80 rounded-2xl p-3.5 bg-slate-50/50">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Items in this Enquiry ({items.length})
                    </span>
                    <div className="divide-y divide-slate-100">
                      {items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">
                              {item.productName}
                            </p>
                            {item.genericName && (
                              <p className="text-[11px] text-slate-500 truncate font-medium">
                                {item.genericName}
                              </p>
                            )}
                            {item.packSize && (
                              <p className="text-[10px] text-slate-400">
                                {item.packSize}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(idx, item.quantity - 1)}
                                className="px-2 py-1 text-slate-600 hover:bg-slate-100 rounded-l-lg cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                                className="px-2 py-1 text-slate-600 hover:bg-slate-100 rounded-r-lg cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Custom Medicine Form */}
                {isCustomMedicine || items.length === 0 ? (
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
                    <p className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-emerald-700" />
                      Add Medicine or Prescription Item
                    </p>

                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Medicine Name & Dosage / Strength
                      </label>
                      <input
                        type="text"
                        value={customMedName}
                        onChange={(e) => setCustomMedName(e.target.value)}
                        placeholder="e.g. Paracetamol 650mg or Amoxicillin 500mg"
                        className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      {errors.customMed && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.customMed}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-700">
                          Quantity / Strip Count
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={customQuantity}
                          onChange={(e) => setCustomQuantity(parseInt(e.target.value) || 1)}
                          className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-700">
                          Brand / Manufacturer Preference
                        </label>
                        <input
                          type="text"
                          value={customNotes}
                          onChange={(e) => setCustomNotes(e.target.value)}
                          placeholder="e.g. Micro Labs or Any Generic"
                          className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="text-right pt-1">
                      <button
                        type="button"
                        onClick={handleAddCustomMedicine}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                      >
                        Add to Enquiry List
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Quick Catalog Picker */
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600">
                      Add More from Popular Catalog:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border rounded-2xl">
                      {products.slice(0, 8).map((p) => {
                        const isAdded = items.some(i => i.productId === p.id);
                        return (
                          <div
                            key={p.id}
                            onClick={() => handleAddCatalogProduct(p.id)}
                            className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer border transition-colors ${
                              isAdded ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'hover:bg-slate-50 border-slate-100'
                            }`}
                          >
                            <div className="truncate mr-2">
                              <p className="font-semibold truncate">{p.name}</p>
                              <p className="text-[10px] text-slate-400">{p.packSize}</p>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                              {isAdded ? 'Added' : '+ Add'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {errors.items && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    {errors.items}
                  </p>
                )}
              </div>
            )
          )}

          {/* STEP 2: CUSTOMER INFORMATION */}
          {!submittedEnquiry && step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-700" />
                Customer Contact Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Mohammed Rayyan"
                    className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 7620059437"
                    className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Email Address <span className="text-slate-400 font-normal">(Optional for enquiry confirmation)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rayyanansari7666@gmail.com"
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Delivery or Store Pickup */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Fulfillment Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      deliveryMethod === 'pickup'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Store Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      deliveryMethod === 'delivery'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Local Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('discuss')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      deliveryMethod === 'discuss'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Discuss on Call
                  </button>
                </div>
              </div>

              {deliveryMethod === 'delivery' && (
                <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <label className="text-xs font-medium text-slate-700">
                      Address / Locality <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Building, Flat No., Street, Landmark"
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">Pincode</label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 440001"
                        className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preferred Contact Method */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Preferred Channel for Updates
                </label>
                <div className="flex gap-4 text-xs text-slate-700">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactPref"
                      checked={preferredContact === 'whatsapp'}
                      onChange={() => setPreferredContact('whatsapp')}
                      className="text-emerald-600"
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactPref"
                      checked={preferredContact === 'call'}
                      onChange={() => setPreferredContact('call')}
                      className="text-emerald-600"
                    />
                    <span>Phone Call</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactPref"
                      checked={preferredContact === 'email'}
                      onChange={() => setPreferredContact('email')}
                      className="text-emerald-600"
                    />
                    <span>Email</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PRESCRIPTION UPLOAD & NOTES */}
          {!submittedEnquiry && step === 3 && (
            <div className="space-y-5">
              <PrescriptionUploader
                required={hasPrescriptionItem}
                selectedFile={prescriptionDoc}
                onFileSelect={(file) => {
                  setPrescriptionDoc(file);
                  setErrors({});
                }}
                onFileRemove={() => setPrescriptionDoc(null)}
              />

              {errors.prescription && (
                <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  {errors.prescription}
                </p>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Additional Notes or Instructions <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder="e.g. Travel dates, specific dosage form, generic preference, or delivery timing..."
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <MedicalDisclaimer compact={true} />
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {!submittedEnquiry && step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Review Your Enquiry Before Submission
              </h4>

              {/* Items Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  Requested Items ({items.length})
                </span>
                <div className="divide-y divide-slate-200">
                  {items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{item.productName}</p>
                        {item.genericName && (
                          <p className="text-[11px] text-slate-500">{item.genericName}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-slate-800">Qty: {item.quantity}</span>
                        {item.estimatedPrice && (
                          <p className="text-[11px] text-slate-500">
                            Est. ₹{(item.estimatedPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer & Delivery Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  Contact & Fulfillment
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block">Customer:</span>
                    <span className="font-semibold">{customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone:</span>
                    <span className="font-semibold">{phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Fulfillment:</span>
                    <span className="font-semibold capitalize">{deliveryMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Updates Via:</span>
                    <span className="font-semibold capitalize">{preferredContact}</span>
                  </div>
                </div>

                {deliveryMethod === 'delivery' && address && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-400 block">Address:</span>
                    <p className="font-medium text-slate-800">{address}, {city} {pincode}</p>
                  </div>
                )}

                {prescriptionDoc && (
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-emerald-800">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Prescription Attached: {prescriptionDoc.fileName}</span>
                  </div>
                )}
              </div>

              {errors.submit && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 rounded-xl">
                  {errors.submit}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        {!submittedEnquiry && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Enquiry...' : 'Confirm & Submit Enquiry'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
