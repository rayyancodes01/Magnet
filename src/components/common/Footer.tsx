import React from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Heart,
  ChevronRight,
  FileText,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { ActiveTab } from '../../types';
import { Logo } from './Logo';
import { storageService } from '../../services/storageService';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking }) => {
  const settings = storageService.getBusinessSettings();
  const mapsUrl = settings.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=MAGNET+Pharmacy+Main+Road+Erandol+Maharashtra+425109';

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Logo size="md" variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted community pharmacy and healthcare partner for authentic medicines, 
              prescription verification, general wellness, and specialized pilgrimage health support for Makkah & Madina journeys.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/40">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>100% Genuine Medicines & Verified Pharmacist Support</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('medicines')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Browse Medicines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('categories')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Product Categories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('pilgrimage-care')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-teal-300 font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-teal-400" /> Pilgrimage Care (Umrah & Hajj)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('how-it-works')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> How Enquiry Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> About Magnet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('admin')} 
                  className="hover:text-amber-300 text-emerald-300 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> Admin / Medicine Manager
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Services & Policies */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Customer Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={onOpenBooking} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium text-emerald-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Book Medicine / Enquiry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('my-enquiries')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Track Previous Enquiries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('policies')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-500" /> Prescription & Medicine Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('policies')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-500" /> Delivery & Pickup Terms
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('policies')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-500" /> Privacy & Security Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Store Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Contact Pharmacy
            </h4>
            <div className="space-y-3 text-sm">
              <a 
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-emerald-600 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone Helpline</p>
                  <p className="font-semibold text-white">{settings.phone}</p>
                </div>
              </a>

              <a 
                href={`https://wa.me/91${settings.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-emerald-900/60 rounded-lg group-hover:bg-emerald-600 transition-colors">
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">WhatsApp Support</p>
                  <p className="font-semibold text-emerald-300">{settings.phone}</p>
                </div>
              </a>

              <a 
                href={`mailto:${settings.email}`}
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-emerald-600 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-slate-400">Email Address</p>
                  <p className="font-semibold text-white truncate max-w-[180px]">{settings.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-3 pt-1">
                <div className="p-2 bg-slate-800 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Store Hours</p>
                  <p className="text-xs text-slate-200 font-semibold">{settings.storeTimings || '9:00 AM – 11:00 PM (Daily)'}</p>
                  <p className="text-[11px] text-emerald-400 font-medium">Open 7 Days (9 AM – 11 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <div className="p-2 bg-slate-800 rounded-lg shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Store Address</p>
                  <p className="text-xs text-slate-300 leading-snug">
                    {settings.address || 'Main Road, Erandol, Jalgaon District, Maharashtra - 425109'}
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors pt-0.5"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400 space-y-1 leading-relaxed">
          <p className="font-semibold text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Statutory Healthcare Notice:
          </p>
          <p>
            {settings.disclaimerText} All prescription medications are dispensed strictly under the supervision of registered pharmacists upon presentation of a valid medical prescription.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Rights */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <p className="text-slate-400">© 2026 MAGNET Pharmacy & Medical Store. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <p className="text-emerald-400 font-semibold tracking-wide">
              Owned & Managed by Ansari Rayyan, Erandol, Maharashtra
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={() => handleNav('policies')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => handleNav('policies')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-300 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
