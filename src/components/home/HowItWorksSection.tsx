import React from 'react';
import { Search, FileText, UserCheck, PackageCheck, ArrowRight, Shield } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenBooking: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '1',
      title: 'Search & Select Items',
      desc: 'Browse our catalog or simply enter your prescribed medicine and required quantities.',
      icon: Search
    },
    {
      num: '2',
      title: 'Submit & Attach Rx',
      desc: 'Provide your contact details and securely upload your doctor’s prescription if required.',
      icon: FileText
    },
    {
      num: '3',
      title: 'Pharmacist Verification',
      desc: 'Our registered pharmacist verifies stock, dosage, validity, and contacts you via WhatsApp or call.',
      icon: UserCheck
    },
    {
      num: '4',
      title: 'Confirmed & Collected',
      desc: 'Collect your verified medicines safely at our store counter or discuss local delivery options.',
      icon: PackageCheck
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-emerald-50/50 to-emerald-100/40 border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-full border border-emerald-300">
            Simple & Transparent Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            How Medicine Enquiry & Booking Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A responsible healthcare journey ensuring prescription safety, pharmacist verification, and direct customer support.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-emerald-200/80 shadow-xs relative flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-400 transition-all duration-200"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-display text-lg shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold text-emerald-200 font-display">
                    0{step.num}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-50 flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Subject to statutory verification</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/25 hover:shadow-xl transition-all text-sm inline-flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Start an Enquiry Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
