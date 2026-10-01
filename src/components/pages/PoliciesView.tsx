import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Scale
} from 'lucide-react';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

export const PoliciesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prescription' | 'delivery' | 'returns' | 'privacy'>('prescription');

  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen space-y-12">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Compliance & Transparency
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            Pharmacy Policies & Legal Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Magnet operates strictly in accordance with Drugs & Cosmetics Act and pharmacy regulations to safeguard public health and medication safety.
          </p>
        </div>
      </div>

      {/* Policy Navigation Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('prescription')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'prescription'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Prescription & Dispensing Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'delivery'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Delivery & Store Pickup</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'returns'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Returns & Cancellations</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Patient Privacy & Confidentiality</span>
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-8">
          
          {/* PRESCRIPTION POLICY TAB */}
          {activeTab === 'prescription' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-700" />
                  Prescription Validation & Dispensing Standards
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Applicable to all prescription-only pharmaceuticals (Schedule H & H1 drugs).
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Mandatory Prescription Requirements
                  </h4>
                  <p className="text-emerald-900 text-xs">
                    In compliance with Indian pharmacy laws, all Schedule H and prescription medicines require a signed, dated prescription issued by a Registered Medical Practitioner (RMP).
                  </p>
                </div>

                <h4 className="font-bold text-slate-900 text-sm pt-2">What constitutes a valid prescription?</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Doctor's Name, Degree, Registration Number, and Clinic/Hospital Letterhead.</li>
                  <li>Patient's Full Name, Age, and Date of Consultation.</li>
                  <li>Clear Generic or Brand Medicine Name, Strength, Dosage, and Duration.</li>
                  <li>Doctor's Physical or Verified Digital Signature.</li>
                  <li>Prescription must be unexpired (typically valid for up to 6 months from issue for chronic maintenance drugs).</li>
                </ul>

                <h4 className="font-bold text-slate-900 text-sm pt-2">Enquiry vs. Sale Confirmation</h4>
                <p className="text-xs text-slate-600">
                  Submitting an enquiry via this web portal does NOT constitute an automated sale. All requests are preliminary enquiries that undergo pharmacist verification. You will be contacted to confirm details, dosage instructions, and valid prescription submission before dispensing.
                </p>
              </div>
            </div>
          )}

          {/* DELIVERY & PICKUP TAB */}
          {activeTab === 'delivery' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-700" />
                  Delivery & Store Pickup Guidelines
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How we fulfill verified medicine and healthcare requests.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <h4 className="font-bold text-slate-900">1. Store Pickup (Counter)</h4>
                    <p className="text-xs text-slate-600">
                      You can collect your prepared and verified order directly at our store during business hours (9:00 AM – 11:00 PM). Please present original prescription for stamping where applicable.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <h4 className="font-bold text-slate-900">2. Local Doorstep Delivery</h4>
                    <p className="text-xs text-slate-600">
                      Available across our local service zones in temperature-controlled packaging. Same-day delivery is arranged upon phone or WhatsApp confirmation.
                    </p>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-sm pt-2">Cold-Chain Items</h4>
                <p className="text-xs text-slate-600">
                  Insulin, biologics, vaccines, and eye drops requiring 2°C – 8°C cold storage are dispatched with specialized ice-pack thermal containers to ensure efficacy.
                </p>
              </div>
            </div>
          )}

          {/* RETURNS TAB */}
          {activeTab === 'returns' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-emerald-700" />
                  Returns, Exchanges & Cancellation Terms
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Medicine safety & return conditions.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="text-xs text-slate-600">
                  To protect public health and guarantee medication integrity, temperature-sensitive pharmaceuticals and opened products cannot be restocked once they leave the pharmacy's physical custody.
                </p>

                <h4 className="font-bold text-slate-900 text-sm">Eligible for Exchange / Refund:</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Damaged packaging or broken seals upon initial delivery inspection.</li>
                  <li>Dispensing discrepancy (different brand or strength delivered from what was confirmed).</li>
                  <li>Near-expiry stock (medicines with less than 6 months shelf life without prior customer consent).</li>
                </ul>

                <h4 className="font-bold text-slate-900 text-sm pt-2">Non-Returnable Items:</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Opened bottles, blister strips with punctured foils, or used personal care items.</li>
                  <li>Refrigerated / Cold-chain items (e.g. Insulins, probiotics).</li>
                  <li>Custom-ordered unlisted specialty drugs sourced specifically for the customer.</li>
                </ul>
              </div>
            </div>
          )}

          {/* PRIVACY TAB */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-700" />
                  Patient Privacy & Data Protection
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How we protect your confidential medical and contact information.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="text-xs text-slate-600">
                  Magnet maintains strict patient confidentiality. Prescriptions, uploaded health records, phone numbers, and delivery addresses are utilized solely by authorized registered pharmacy staff for enquiry processing and fulfillment.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">Data Security Commitments:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                    <li>We never sell, rent, or share customer contact lists with third-party advertisers.</li>
                    <li>Uploaded prescriptions are restricted to certified pharmacy verification workflows.</li>
                    <li>WhatsApp communications are end-to-end encrypted directly between you and Magnet's official business line.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="pt-8">
          <MedicalDisclaimer />
        </div>
      </div>

    </div>
  );
};
