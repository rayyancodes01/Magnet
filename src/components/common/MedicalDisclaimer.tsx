import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface MedicalDisclaimerProps {
  compact?: boolean;
  className?: string;
  variant?: 'banner' | 'card' | 'subtle';
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({ 
  compact = false, 
  className = '',
  variant = 'card'
}) => {
  if (variant === 'subtle') {
    return (
      <div className={`flex items-start gap-2 text-xs text-slate-500 leading-relaxed ${className}`}>
        <AlertCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
        <p>
          Information is for general guidance only and is not a substitute for professional medical advice. 
          Prescriptions are verified by licensed pharmacists before dispensing.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 ${className}`}>
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          <span className="font-semibold">Medical Note:</span> Product availability & prescription requirements are verified by our pharmacist before final confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-5 bg-slate-50 border border-slate-200/90 rounded-2xl ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-100/80 text-emerald-800 rounded-xl shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            Important Medical & Prescription Disclaimer
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Information provided on Magnet is for general knowledge and is not a substitute for professional clinical advice or diagnosis. 
            All prescription medicines strictly require a valid doctor’s prescription and pharmacist review. Final order confirmation and stock availability are subject to legal verification.
          </p>
        </div>
      </div>
    </div>
  );
};
