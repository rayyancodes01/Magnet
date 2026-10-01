import React, { useState } from 'react';
import { 
  Compass, 
  CheckSquare, 
  Square, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  FileText, 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  MessageCircle, 
  HeartHandshake,
  Sparkles,
  Droplets,
  Footprints,
  Wind
} from 'lucide-react';
import { PILGRIMAGE_CHECKLIST_ITEMS } from '../../data/initialData';
import { storageService, getWhatsAppUrl } from '../../services/storageService';
import { PrescriptionUploader } from '../common/PrescriptionUploader';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';
import { PilgrimageEnquiry, UserAccount } from '../../types';

interface PilgrimageCareViewProps {
  currentUser: UserAccount | null;
  onEnquirySuccess?: (enquiry: PilgrimageEnquiry) => void;
}

export const PilgrimageCareView: React.FC<PilgrimageCareViewProps> = ({
  currentUser,
  onEnquirySuccess
}) => {
  // Checklist selection
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Hydrocolloid blister pads and heel cushions for prolonged walking barefoot on marble',
    'Anti-chafing fragrance-free soothing cream / thigh protectant for state of Ihram',
    'WHO Formula ORS / Electrolyte sachets (5-10 sachets per person)',
    '100% Fragrance-free, non-scented pure soap bar'
  ]);

  // Form Fields
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [travelType, setTravelType] = useState<'Umrah' | 'Hajj' | 'Ziyarat' | 'Other Pilgrimage'>('Umrah');
  const [travelMonthYear, setTravelMonthYear] = useState('');
  const [durationDays, setDurationDays] = useState<number>(15);
  const [customMessage, setCustomMessage] = useState('');
  const [prescriptionDoc, setPrescriptionDoc] = useState<{
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileType: string;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<PilgrimageEnquiry | null>(null);

  const toggleChecklistItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!customerName.trim()) errs.name = 'Please provide your full name';
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) errs.phone = 'Valid 10-digit mobile number required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const created = storageService.createPilgrimageEnquiry({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        travelType,
        travelMonthYear: travelMonthYear.trim() || 'Upcoming season',
        durationDays: durationDays || 15,
        specificNeeds: selectedItems.slice(0, 5),
        selectedChecklistItems: selectedItems,
        customMessage: customMessage.trim() || undefined,
        prescriptionFileName: prescriptionDoc?.fileName,
        prescriptionUrl: prescriptionDoc?.fileUrl,
        userId: currentUser?.id
      });

      setSubmittedRef(created);
      if (onEnquirySuccess) onEnquirySuccess(created);
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Could not submit enquiry. Please try again or WhatsApp us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pilgrimagePillars = [
    {
      icon: Footprints,
      title: 'Walking & Blister Care',
      desc: 'Tawaf, Sa’i, and transit require extensive barefoot walking. We provide high-cushion hydrocolloid blister pads, friction guard lotions, and arch-support accessories.'
    },
    {
      icon: Droplets,
      title: 'Hydration & Heat Protection',
      desc: 'Desert climate causes rapid fluid loss. Stock up on WHO-formula electrolyte sachets, instant glucose energy powders, and non-greasy moisturizing skin barriers.'
    },
    {
      icon: Sparkles,
      title: 'Ihram-Safe Hygiene',
      desc: '100% fragrance-free, alcohol-free soaps, cleansers, and soothing lotions compliant with the sacred state of Ihram.'
    },
    {
      icon: Wind,
      title: 'Respiratory Protection',
      desc: 'Breathable 3-ply high-filtration masks and soothing herbal throat lozenges for crowded gatherings and air-conditioned hotel air.'
    }
  ];

  return (
    <div className="py-10 sm:py-16 bg-white min-h-screen space-y-16">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl border border-teal-800/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-800/80 text-teal-300 text-xs font-semibold rounded-full border border-teal-600/40">
              <Compass className="w-4 h-4 text-teal-300" />
              <span>Dedicated Umrah & Hajj Support</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Prepare for Your Pilgrimage with the Right Healthcare Essentials
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Magnet pharmacy assists pilgrims travelling for <strong>Umrah and Hajj (Makkah & Madina)</strong> with personalized medicine reviews, travel first-aid packaging, Ihram-compliant hygiene supplies, and chronic medication continuity.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Makkah & Madina Ready
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Ihram-Safe (Fragrance-Free)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pharmacist Packaged
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Health Focus Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Before Your Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Key Travel Healthcare Considerations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Ensure physical readiness and travel health comfort across all stages of your holy journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilgrimagePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-teal-800">
                  <span>Available at Magnet</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Checklist & Travel Enquiry Split Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Comprehensive Guide
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                  Pilgrimage Care Checklist
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select the items you would like Magnet to help you arrange in your custom travel kit:
                </p>
              </div>

              <div className="space-y-5">
                {PILGRIMAGE_CHECKLIST_ITEMS.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      {section.category}
                    </h4>
                    <div className="space-y-2">
                      {section.items.map((item, iIdx) => {
                        const isChecked = selectedItems.includes(item);
                        return (
                          <div
                            key={iIdx}
                            onClick={() => toggleChecklistItem(item)}
                            className={`p-3 rounded-2xl border text-xs flex items-start gap-3 cursor-pointer transition-all ${
                              isChecked 
                                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium' 
                                : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-100/50'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0 text-emerald-700">
                              {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                            </div>
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-900 flex items-center justify-between">
                <span>{selectedItems.length} essential items selected for your kit</span>
                <span className="font-bold text-teal-800">Included in Enquiry →</span>
              </div>
            </div>
          </div>

          {/* Right: Travel Medicine Enquiry Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Custom Travel Preparation
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                  Submit Travel Medicine Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tell us your pilgrimage schedule and specific medication requirements.
                </p>
              </div>

              {submittedRef ? (
                /* Success Card */
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900">
                      Pilgrimage Enquiry Received!
                    </h4>
                    <p className="text-xs font-mono font-bold text-emerald-800 bg-white/80 py-1.5 px-3 rounded-lg inline-block border border-emerald-200">
                      Ref: {submittedRef.refNumber}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2">
                      May your journey be blessed and comfortable. Our team will review your {submittedRef.travelType} travel kit and contact you on <strong>{submittedRef.phone}</strong>.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={getWhatsAppUrl(
                        `Hello Magnet, I submitted pilgrimage enquiry reference ${submittedRef.refNumber} for ${submittedRef.travelType}. Please advise on the travel kit.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp (76200 59437)
                    </a>
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Submit Another Travel Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Enquiry Form */
                <form onSubmit={handleFormSubmit} className="space-y-4">
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
                        className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700">
                        Mobile / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 7620059437"
                        className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700">
                        Pilgrimage / Journey Type
                      </label>
                      <select
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value as any)}
                        className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="Umrah">Umrah (Makkah & Madina)</option>
                        <option value="Hajj">Hajj Holy Pilgrimage</option>
                        <option value="Ziyarat">Ziyarat / Holy Places</option>
                        <option value="Other Pilgrimage">Other International Travel</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700">
                        Estimated Travel Month / Year
                      </label>
                      <input
                        type="text"
                        value={travelMonthYear}
                        onChange={(e) => setTravelMonthYear(e.target.value)}
                        placeholder="e.g. October 2026 or Ramadan"
                        className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Estimated Duration (Days)
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="90"
                      value={durationDays}
                      onChange={(e) => setDurationDays(parseInt(e.target.value) || 15)}
                      className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Prescription Upload for Regular Meds */}
                  <div className="pt-2">
                    <PrescriptionUploader
                      required={false}
                      selectedFile={prescriptionDoc}
                      onFileSelect={(file) => setPrescriptionDoc(file)}
                      onFileRemove={() => setPrescriptionDoc(null)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Specific Medical Needs / Special Notes
                    </label>
                    <textarea
                      rows={3}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="e.g. Travelling with senior citizens with diabetes / hypertension; need extra blister pads; cold storage insulin advice..."
                      className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {errors.submit && (
                    <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                      {errors.submit}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Travel Enquiry...' : 'Submit Pilgrimage Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Statutory Disclaimer Box */}
            <MedicalDisclaimer 
              variant="card" 
              className="bg-emerald-50/40 border-emerald-200/80" 
            />
          </div>

        </div>
      </div>

    </div>
  );
};
