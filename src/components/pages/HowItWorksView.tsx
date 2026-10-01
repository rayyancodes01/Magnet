import React from 'react';
import { 
  Search, 
  FileText, 
  UserCheck, 
  PackageCheck, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  Pill,
  Clock,
  Lock,
  ArrowRight
} from 'lucide-react';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface HowItWorksViewProps {
  onOpenBooking: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Find or Specify Your Medicine',
      desc: 'Browse our catalog or type the exact name, brand, or active composition prescribed by your doctor. You can request both listed and special unlisted medicines.',
      icon: Search,
      tips: 'You can add multiple items in a single booking session.'
    },
    {
      num: '02',
      title: 'Submit Customer Info & Prescription',
      desc: 'Provide your name, phone number, delivery/pickup preference, and securely attach your doctor’s prescription if your order contains Schedule H or prescription drugs.',
      icon: FileText,
      tips: 'Clear photos or PDF prescriptions are reviewed confidentially.'
    },
    {
      num: '03',
      title: 'Registered Pharmacist Verification',
      desc: 'Our licensed pharmacist inspects the validity of the prescription, verifies dosage and quantities, checks stock readiness, and contacts you via WhatsApp or phone.',
      icon: UserCheck,
      tips: 'We confirm total cost, batch availability, and delivery timings.'
    },
    {
      num: '04',
      title: 'Order Confirmation & Fulfillment',
      desc: 'Pick up your verified medicines directly at Magnet Pharmacy counter or receive authorized local doorstep delivery according to statutory guidelines.',
      icon: PackageCheck,
      tips: 'Genuine invoice and statutory receipts provided with every order.'
    }
  ];

  const safetyGuarantees = [
    {
      title: 'Strict Prescription Verification',
      desc: 'No prescription medications are ever released without registered pharmacist review.'
    },
    {
      title: '100% Authentic Pharmaceutical Supplies',
      desc: 'All medicines sourced exclusively from licensed pharmaceutical distributors.'
    },
    {
      title: 'Patient Privacy & Confidentiality',
      desc: 'Your medical records, contact data, and prescriptions are stored securely and never shared.'
    },
    {
      title: 'Transparent Pricing & No Hidden Fees',
      desc: 'Clear MRP, estimated totals, and transparent communication before order confirmation.'
    }
  ];

  return (
    <div className="py-10 sm:py-16 bg-white min-h-screen space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Transparent Healthcare Operations
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            How Medicine Enquiry & Ordering Works
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            At Magnet, we bridge modern digital convenience with strict pharmaceutical compliance to ensure you receive verified, authentic medications safely.
          </p>
        </div>
      </div>

      {/* 4 Detailed Flow Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="p-8 bg-slate-50 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-display">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs text-emerald-800 font-medium flex items-center gap-1.5 bg-emerald-50/60 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{step.tips}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety & Compliance Guarantees */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Our Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Pharmaceutical Integrity & Safety Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyGuarantees.map((item, idx) => (
              <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <h4 className="font-bold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Answers to common customer queries regarding orders, prescriptions, and fulfillment.
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900">Do I always need a prescription?</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Prescriptions are legally mandatory for all Schedule H, H1, and X medications. Over-The-Counter (OTC) items, wellness supplements, hydration packs, and first-aid supplies do not require a prescription.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900">How quickly will someone contact me after I submit an enquiry?</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our pharmacist team operates daily between 9:00 AM and 11:00 PM. Most enquiries are acknowledged within 15 to 30 minutes via WhatsApp or phone.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900">Can I request medicines for elderly relatives or travel groups?</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Yes. You can specify the patient details, attach their valid prescription, and note any specific pack or travel duration requirements in the booking form.
            </p>
          </div>
        </div>

        <div className="pt-6 text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md transition-all text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Pill className="w-5 h-5" />
            <span>Submit a Medicine Enquiry Now</span>
          </button>
        </div>

        <MedicalDisclaimer />
      </div>

    </div>
  );
};
