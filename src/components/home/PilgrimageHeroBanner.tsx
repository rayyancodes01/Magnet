import React from 'react';
import { Compass, MessageCircle, ShieldCheck, HeartPulse, ArrowRight, Check } from 'lucide-react';
import { getWhatsAppUrl } from '../../services/storageService';

interface PilgrimageHeroBannerProps {
  onOpenPilgrimageEnquiry: () => void;
}

export const PilgrimageHeroBanner: React.FC<PilgrimageHeroBannerProps> = ({
  onOpenPilgrimageEnquiry
}) => {
  const whatsappUrl = getWhatsAppUrl(
    'Hello Magnet, I am preparing for Umrah / Hajj pilgrimage travel and would like to enquire about travel medicines and healthcare essentials.'
  );

  const perks = [
    'Ihram-Safe Unscented Soaps & Lotions',
    'Hydrocolloid Blister & Foot Pads',
    'Electrolytes & Travel Hydration Packs',
    'Prescribed Regular Medicines Preparation'
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white overflow-hidden p-8 sm:p-12 lg:p-16 shadow-xl border border-teal-800/40">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text & Pitch */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-800/60 border border-teal-600/40 text-teal-300 text-xs font-semibold backdrop-blur-xs">
                <Compass className="w-4 h-4 text-teal-300" />
                <span>Specialized Pilgrimage Healthcare Support</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                Going for Umrah or Hajj?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Speak with Magnet about your pharmacy and healthcare-essentials enquiries before your journey to Makkah & Madina. 
                Ensure you carry the right supplies for intense walking, climate adaptation, and personal prescription continuity.
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  onClick={onOpenPilgrimageEnquiry}
                  className="w-full sm:w-auto px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-slate-950" />
                  <span>Pilgrimage Enquiry</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-2xl backdrop-blur-xs transition-all text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Visual badge card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto border border-teal-400/30">
                  <HeartPulse className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">
                    Makkah & Madina Travel Ready
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Custom healthcare packs assembled for individuals, families, and travel groups.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] text-teal-200">
                  <span>Helpline: <strong>76200 59437</strong></span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
