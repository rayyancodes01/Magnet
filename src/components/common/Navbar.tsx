import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ClipboardList, 
  ShieldAlert, 
  User, 
  Phone, 
  Compass, 
  HeartHandshake, 
  Pill,
  ChevronRight,
  LogOut,
  Store,
  Crown,
  MapPin,
  Clock
} from 'lucide-react';
import { ActiveTab, UserAccount } from '../../types';
import { Logo } from './Logo';
import { WhatsAppButton } from './WhatsAppButton';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
  onOpenAuth: () => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
  enquiriesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenBooking,
  onOpenAuth,
  currentUser,
  onLogout,
  enquiriesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string; icon?: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home' },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'categories', label: 'Categories' },
    { id: 'pilgrimage-care', label: 'Pilgrimage Care', icon: Compass },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'policies', label: 'Policies' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'admin', label: 'Admin (Owner)', icon: ShieldAlert },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Bar / Helpline */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 xl:gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3 h-3 text-emerald-400" />
              Direct Helpline / WhatsApp: <span className="text-white font-semibold">76200 59437</span>
            </span>
            <span className="text-emerald-400/40">|</span>
            <span className="flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Erandol, Maharashtra</span>
            </span>
            <span className="text-emerald-400/40">|</span>
            <span className="flex items-center gap-1.5 text-emerald-200">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>9:00 AM – 11:00 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick('my-enquiries')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ClipboardList className="w-3 h-3" />
              Track Enquiry Status
            </button>
            <span className="text-emerald-400/40">|</span>
            <button 
              onClick={() => handleNavClick('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Store Location & Directions
            </button>
          </div>
        </div>
      </div>

      {/* Main Header with prominent medical green accent border */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-emerald-500 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Brand Logo & Owner Signature Badge */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div 
                onClick={() => handleNavClick('home')}
                className="cursor-pointer focus:outline-none flex items-center"
                tabIndex={0}
                role="button"
                aria-label="Go to MAGNET Home"
              >
                <Logo size="md" />
              </div>

              {/* "By Rayyan Ansari" Badge next to Logo */}
              <div 
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/90 text-emerald-950 border border-emerald-300 text-xs font-bold tracking-tight shadow-2xs"
                title="Founded & Managed by Ansari Rayyan, Erandol, Maharashtra"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span className="font-semibold text-emerald-900">By Rayyan Ansari</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const isPilgrimage = link.id === 'pilgrimage-care';

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all relative flex items-center gap-1.5 cursor-pointer ${
                      isActive 
                        ? 'text-emerald-800 bg-emerald-100/90 font-bold border border-emerald-200' 
                        : isPilgrimage 
                        ? 'text-teal-800 hover:text-emerald-900 hover:bg-emerald-50/80 font-semibold' 
                        : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/60'
                    }`}
                  >
                    {isPilgrimage && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Live Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-2.5 text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer border border-emerald-100 hover:border-emerald-300"
                title="Search Medicines"
                aria-label="Search Medicines"
              >
                <Search className="w-5 h-5 text-emerald-700" />
              </button>

              {/* My Enquiries Button */}
              <button
                onClick={() => handleNavClick('my-enquiries')}
                className={`relative hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeTab === 'my-enquiries'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-emerald-50/80 text-emerald-900 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                }`}
                title="My Medicine Enquiries"
              >
                <ClipboardList className="w-4 h-4 text-emerald-700" />
                <span>My Enquiries</span>
                {enquiriesCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded-full">
                    {enquiriesCount}
                  </span>
                )}
              </button>

              {/* WhatsApp Quick CTA */}
              <div className="hidden md:block">
                <WhatsAppButton 
                  size="sm" 
                  variant="secondary" 
                  label="WhatsApp" 
                />
              </div>

              {/* Primary "Book Medicine" CTA */}
              <button
                onClick={onOpenBooking}
                id="navbar-book-medicine-btn"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
              >
                Book Medicine
              </button>


              {/* Owner Badge near Login: Rayyan Ansari - Owner with crown and premium green background */}
              <button
                onClick={() => handleNavClick('admin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-600/90 text-xs font-bold tracking-tight shadow-sm shadow-emerald-900/20 transition-all cursor-pointer select-none active:scale-95"
                title="Store Owner: Ansari Rayyan (Erandol, Maharashtra) - Click to open Admin Panel"
              >
                <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
                <span>Rayyan Ansari - Owner</span>
              </button>

              {/* User Account / Admin Action */}
              {currentUser ? (
                <div className="flex items-center gap-1.5 pl-1">
                  <button
                    onClick={() => {
                      if (currentUser.role === 'admin') {
                        handleNavClick('admin');
                      } else {
                        handleNavClick('my-enquiries');
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      currentUser.role === 'admin'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200 hover:bg-purple-200'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                    title={currentUser.name}
                  >
                    <User className="w-3.5 h-3.5 text-slate-600" />
                    <span className="max-w-[70px] truncate">{currentUser.name.split(' ')[0]}</span>
                    {currentUser.role === 'admin' && (
                      <span className="text-[9px] bg-purple-700 text-white px-1 py-0.2 rounded font-bold uppercase">
                        Admin
                      </span>
                    )}
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  title="Account or Admin Login"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="hidden md:inline">Login</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[85vh] overflow-y-auto px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between px-3 py-2 bg-emerald-700 text-white rounded-xl border border-emerald-600 text-xs font-bold mb-2 shadow-sm">
              <span className="flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
                <span>Rayyan Ansari - Owner</span>
              </span>
              <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded-full font-bold border border-emerald-600/60">Erandol, MH</span>
            </div>
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const isPilgrimage = link.id === 'pilgrimage-care';

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                        : isPilgrimage 
                        ? 'bg-teal-50/50 text-teal-800 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.icon && <link.icon className="w-4 h-4 text-emerald-600" />}
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}

              <button
                onClick={() => handleNavClick('my-enquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'my-enquiries'
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                  My Enquiries History
                </span>
                {enquiriesCount > 0 && (
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">
                    {enquiriesCount}
                  </span>
                )}
              </button>

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-purple-50 text-purple-900 border border-purple-200 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-purple-700" />
                    Admin Control Panel
                  </span>
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                </button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-emerald-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Pill className="w-4 h-4" />
                Book Medicine / Submit Enquiry
              </button>

              <WhatsAppButton 
                variant="secondary" 
                size="md" 
                className="w-full justify-center" 
                label="Chat with Pharmacist (76200 59437)"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Navigation for swift access */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-4 flex items-center justify-around md:hidden shadow-lg">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Logo size="sm" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavClick('medicines')}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            activeTab === 'medicines' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Pill className="w-5 h-5 text-emerald-600" />
          <span>Medicines</span>
        </button>

        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center -mt-5 bg-emerald-700 text-white p-3 rounded-full shadow-lg border-2 border-white ring-2 ring-emerald-100"
          title="Book Medicine"
        >
          <Pill className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleNavClick('pilgrimage-care')}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            activeTab === 'pilgrimage-care' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Compass className="w-5 h-5 text-teal-600" />
          <span>Pilgrimage</span>
        </button>

        <button
          onClick={() => handleNavClick('my-enquiries')}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium relative ${
            activeTab === 'my-enquiries' ? 'text-emerald-700 font-bold' : 'text-slate-600'
          }`}
        >
          <ClipboardList className="w-5 h-5 text-slate-600" />
          <span>Enquiries</span>
          {enquiriesCount > 0 && (
            <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
          )}
        </button>
      </div>
    </>
  );
};
