import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  Category, 
  Enquiry, 
  PilgrimageEnquiry, 
  Product, 
  UserAccount 
} from './types';
import { storageService } from './services/storageService';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MedicalDisclaimer } from './components/common/MedicalDisclaimer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Home Views
import { Hero } from './components/home/Hero';
import { PopularCategories } from './components/home/PopularCategories';
import { SearchMedicineSection } from './components/home/SearchMedicineSection';
import { PilgrimageHeroBanner } from './components/home/PilgrimageHeroBanner';
import { HowItWorksSection } from './components/home/HowItWorksSection';

// Page Views
import { ProductCatalogView } from './components/medicines/ProductCatalogView';
import { PilgrimageCareView } from './components/pilgrimage/PilgrimageCareView';
import { MyEnquiriesView } from './components/enquiries/MyEnquiriesView';
import { HowItWorksView } from './components/pages/HowItWorksView';
import { AboutContactView } from './components/pages/AboutContactView';
import { PoliciesView } from './components/pages/PoliciesView';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { ProductDetailsModal } from './components/medicines/ProductDetailsModal';
import { SearchModal } from './components/medicines/SearchModal';
import { MedicineBookingModal } from './components/booking/MedicineBookingModal';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialProduct, setBookingInitialProduct] = useState<Product | null>(null);
  const [bookingInitialQuery, setBookingInitialQuery] = useState<string>('');

  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Success Notification Banner
  const [notification, setNotification] = useState<{
    message: string;
    refNumber?: string;
    type: 'success' | 'info';
  } | null>(null);

  const refreshData = () => {
    setProducts(storageService.getProducts());
    setCategories(storageService.getCategories());
    setCurrentUser(storageService.getCurrentUser());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handlers
  const handleOpenBooking = (product?: Product | null, customQuery?: string) => {
    setBookingInitialProduct(product || null);
    setBookingInitialQuery(customQuery || '');
    setIsBookingOpen(true);
  };

  const handleSelectCategoryFromHome = (catName: string) => {
    if (catName.toLowerCase().includes('pilgrim') || catName.toLowerCase().includes('travel')) {
      setActiveTab('pilgrimage-care');
    } else {
      setSelectedCategoryFilter(catName);
      setActiveTab('medicines');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquiryCreated = (enquiry: Enquiry) => {
    refreshData();
    setNotification({
      message: `Enquiry reference ${enquiry.refNumber} generated successfully. Our pharmacy team will verify availability.`,
      refNumber: enquiry.refNumber,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 8000);
  };

  const handlePilgrimageEnquiryCreated = (enquiry: PilgrimageEnquiry) => {
    refreshData();
    setNotification({
      message: `Pilgrimage enquiry reference ${enquiry.refNumber} submitted. We will prepare your travel healthcare pack.`,
      refNumber: enquiry.refNumber,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 8000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#ebfcf3] via-[#f4fbf7] to-white text-slate-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Banner Alert (if notification exists) */}
      {notification && (
        <div className="bg-emerald-800 text-white px-4 py-2.5 text-xs sm:text-sm font-medium shadow-md flex items-center justify-between sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{notification.message}</span>
            {notification.refNumber && (
              <button
                onClick={() => {
                  setActiveTab('my-enquiries');
                  setNotification(null);
                }}
                className="underline font-bold text-emerald-200 hover:text-white ml-2 cursor-pointer"
              >
                Track Enquiry →
              </button>
            )}
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-emerald-300 hover:text-white font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-0">
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenSearch={(query) => {
                if (query) {
                  setBookingInitialQuery(query);
                }
                setIsSearchModalOpen(true);
              }}
              onGoToPilgrimage={() => {
                setActiveTab('pilgrimage-care');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToMedicines={() => {
                setActiveTab('medicines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <PopularCategories
              categories={categories}
              onSelectCategory={handleSelectCategoryFromHome}
            />

            <SearchMedicineSection
              products={products}
              onViewProductDetails={(p) => setSelectedProductForDetails(p)}
              onEnquireProduct={(p) => handleOpenBooking(p)}
              onCustomEnquiry={(q) => handleOpenBooking(null, q)}
            />

            <PilgrimageHeroBanner
              onOpenPilgrimageEnquiry={() => {
                setActiveTab('pilgrimage-care');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <HowItWorksSection
              onOpenBooking={() => handleOpenBooking()}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <MedicalDisclaimer />
            </div>
          </div>
        )}

        {/* MEDICINES / CATALOG VIEW */}
        {(activeTab === 'medicines' || activeTab === 'categories') && (
          <ProductCatalogView
            products={products}
            categories={categories}
            initialCategory={selectedCategoryFilter}
            onViewProductDetails={(p) => setSelectedProductForDetails(p)}
            onEnquireProduct={(p) => handleOpenBooking(p)}
            onCustomEnquiry={(q) => handleOpenBooking(null, q)}
          />
        )}

        {/* PILGRIMAGE CARE (UMRAH & HAJJ) VIEW */}
        {activeTab === 'pilgrimage-care' && (
          <PilgrimageCareView
            currentUser={currentUser}
            onEnquirySuccess={handlePilgrimageEnquiryCreated}
          />
        )}

        {/* MY ENQUIRIES / TRACKING VIEW */}
        {activeTab === 'my-enquiries' && (
          <MyEnquiriesView
            currentUser={currentUser}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* HOW IT WORKS VIEW */}
        {activeTab === 'how-it-works' && (
          <HowItWorksView
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* ABOUT & CONTACT VIEW */}
        {(activeTab === 'about' || activeTab === 'contact') && (
          <AboutContactView />
        )}

        {/* POLICIES & TERMS VIEW */}
        {activeTab === 'policies' && (
          <PoliciesView />
        )}

        {/* ADMIN MANAGEMENT CONSOLE */}
        {activeTab === 'admin' && (
          <AdminDashboard
            onProductUpdated={refreshData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* MODALS */}

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProductForDetails}
        isOpen={!!selectedProductForDetails}
        onClose={() => setSelectedProductForDetails(null)}
        onEnquire={(p) => {
          setSelectedProductForDetails(null);
          handleOpenBooking(p);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProductForDetails(p)}
        onCustomEnquiry={(q) => {
          setIsSearchModalOpen(false);
          handleOpenBooking(null, q);
        }}
      />

      {/* Booking / Medicine Enquiry Multi-step Modal */}
      <MedicineBookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingInitialProduct(null);
          setBookingInitialQuery('');
        }}
        initialProduct={bookingInitialProduct}
        initialCustomQuery={bookingInitialQuery}
        currentUser={currentUser}
        products={products}
        onSuccess={handleEnquiryCreated}
      />

      {/* Auth / Account Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          refreshData();
        }}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton variant="floating" />

    </div>
  );
}
