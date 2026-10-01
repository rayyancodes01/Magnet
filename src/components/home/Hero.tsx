import React, { useState } from 'react';
import { 
  Search, 
  Pill, 
  FileText, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Truck,
  Sparkles,
  Upload,
  PhoneCall,
  HeartHandshake
} from 'lucide-react';
import { storageService, getWhatsAppUrl } from '../../services/storageService';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenSearch: (initialQuery?: string) => void;
  onGoToPilgrimage: () => void;
  onGoToMedicines: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenSearch,
  onGoToPilgrimage,
  onGoToMedicines
}) => {
  const [searchInput, setSearchInput] = useState('');
  const settings = storageService.getBusinessSettings();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onOpenSearch(searchInput.trim());
    } else {
      onOpenSearch();
    }
  };

  // 3 Primary Trust Badges explicitly requested: 24/7 Available, Genuine Medicines, Fast Delivery
  const primaryTrustBadges = [
    {
      id: 'badge-24-7',
      icon: Clock,
      title: '9 AM – 11 PM Store',
      desc: 'Open daily in Erandol with round-the-clock digital enquiry support',
      tag: '9 AM – 11 PM'
    },
    {
      id: 'badge-genuine',
      icon: ShieldCheck,
      title: 'Genuine Medicines',
      desc: '100% authentic, sourced directly from licensed pharma companies',
      tag: 'Certified Authentic'
    },
    {
      id: 'badge-fast-delivery',
      icon: Truck,
      title: 'Fast Delivery & Pickup',
      desc: 'Prompt doorstep delivery in Erandol & express in-store counter pickup',
      tag: 'Erandol, MH'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-100/90 via-emerald-50/60 to-white pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-emerald-100">
      
      {/* Decorative ambient medical green glows */}
      <div className="absolute -top-28 -left-28 w-[420px] h-[420px] rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 -right-28 w-[420px] h-[420px] rounded-full bg-teal-400/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-emerald-300/25 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Hero Header & CTA Area */}
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Trust pill eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-300/80 shadow-xs text-xs font-semibold text-emerald-900 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold tracking-wide">MAGNET Pharmacy & Healthcare Store</span>
            <span className="text-emerald-300">•</span>
            <span className="text-emerald-800 font-medium">Erandol, Maharashtra (9 AM – 11 PM)</span>
          </div>

          {/* Big Hero Headline Requested */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.12]">
            Your Health, Our Priority -{' '}
            <span className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent underline decoration-emerald-400 decoration-wavy decoration-2 underline-offset-8">
              MAGNET Pharmacy
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            {settings.heroSubtext || 'Order 100% genuine prescription medicines, OTC essentials, and specialized Umrah & Hajj health kits with fast local delivery and counter pickup in Erandol, Maharashtra.'}
          </p>

          {/* 1mg / Apollo Style Medicine Quick Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="pt-2 max-w-2xl mx-auto"
          >
            <div className="relative flex items-center bg-white p-2 rounded-2xl sm:rounded-3xl shadow-xl shadow-emerald-950/10 border-2 border-emerald-300 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-100 transition-all">
              <Search className="w-5 h-5 text-emerald-600 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search medicines, salts, OTC products or health essentials..."
                className="w-full px-3 py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium bg-transparent"
              />
              <button
                type="submit"
                id="hero-search-btn"
                className="px-5 sm:px-7 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl transition-all shrink-0 shadow-md shadow-emerald-700/25 cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </div>
            
            {/* Quick searches pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3.5 text-xs text-slate-600">
              <span className="font-semibold text-emerald-950">Popular:</span>
              {['Dolo 650', 'Augmentin', 'Electral ORS', 'Pan-D', 'Blister Pads', 'Unscented Ihram Kit'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onOpenSearch(item)}
                  className="px-3 py-1 rounded-full bg-white/90 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/90 transition-all text-[11px] font-medium cursor-pointer shadow-2xs hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>
          </form>

          {/* Primary CTA Buttons (Big "Book Medicine" + secondary actions) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onOpenBooking}
              id="hero-primary-cta-book"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-700/30 hover:shadow-2xl hover:shadow-emerald-700/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base active:scale-95"
            >
              <Pill className="w-5 h-5 fill-emerald-200 text-emerald-700" />
              <span>Book Medicine</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-4 bg-white/95 hover:bg-white text-emerald-950 border-2 border-emerald-300 font-bold rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base active:scale-95"
            >
              <Upload className="w-5 h-5 text-emerald-700" />
              <span>Upload Prescription</span>
            </button>

            <a
              href={getWhatsAppUrl('Hello Magnet Pharmacy, I would like to enquire about medicine availability and fast delivery.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-md shadow-emerald-600/25 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp 76200 59437</span>
            </a>
          </div>

          {/* 1mg / Apollo style Quick Feature Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div 
              onClick={onOpenBooking}
              className="p-3 bg-white/85 backdrop-blur-md rounded-2xl border border-emerald-200/80 shadow-2xs hover:border-emerald-400 hover:bg-white transition-all cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Order with Rx</p>
                <p className="text-[10px] text-emerald-800 font-medium">Quick upload</p>
              </div>
            </div>

            <div 
              onClick={onGoToMedicines}
              className="p-3 bg-white/85 backdrop-blur-md rounded-2xl border border-emerald-200/80 shadow-2xs hover:border-emerald-400 hover:bg-white transition-all cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">All Medicines</p>
                <p className="text-[10px] text-teal-800 font-medium">Browse catalog</p>
              </div>
            </div>

            <div 
              onClick={onGoToPilgrimage}
              className="p-3 bg-white/85 backdrop-blur-md rounded-2xl border border-emerald-200/80 shadow-2xs hover:border-emerald-400 hover:bg-white transition-all cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Pilgrimage Care</p>
                <p className="text-[10px] text-emerald-800 font-medium">Umrah & Hajj kit</p>
              </div>
            </div>

            <a 
              href="tel:+917620059437"
              className="p-3 bg-white/85 backdrop-blur-md rounded-2xl border border-emerald-200/80 shadow-2xs hover:border-emerald-400 hover:bg-white transition-all cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Call Pharmacist</p>
                <p className="text-[10px] text-emerald-800 font-medium">76200 59437</p>
              </div>
            </a>
          </div>

        </div>

        {/* 3 Prominent Trust Badges Below Hero (24/7 Available, Genuine Medicines, Fast Delivery) */}
        <div className="mt-14 pt-10 border-t border-emerald-200/70">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-full border border-emerald-300">
              Why Choose Magnet Pharmacy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 max-w-5xl mx-auto">
            {primaryTrustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={badge.id}
                  id={badge.id}
                  className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border-2 border-emerald-200/80 shadow-lg shadow-emerald-950/5 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Subtle decorative background glow on hover */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-emerald-100/60 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

                  <div className="flex items-start justify-between mb-4 relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      {badge.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5 relative">
                    <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-emerald-800 transition-colors">
                      {badge.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {badge.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-100/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 relative">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Magnet Assurance</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
