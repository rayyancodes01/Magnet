import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, storageService } from '../../services/storageService';

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'floating' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  productName?: string;
  enquiryRef?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  label = 'Chat on WhatsApp',
  variant = 'primary',
  size = 'md',
  productName,
  enquiryRef,
  className = ''
}) => {
  const settings = storageService.getBusinessSettings();

  // Generate appropriate message
  let finalMessage = message;
  if (!finalMessage) {
    if (productName) {
      finalMessage = `Hello Magnet, I would like to enquire about ${productName}. Please let me know the availability and details.`;
    } else if (enquiryRef) {
      finalMessage = `Hello Magnet, I am checking the status of my medicine enquiry reference: ${enquiryRef}.`;
    } else {
      finalMessage = `Hello Magnet, I would like to enquire about a medicine / healthcare product.`;
    }
  }

  const url = getWhatsAppUrl(finalMessage, settings.whatsappNumber);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Open in new tab securely
    window.open(url, '_blank', 'noopener,noreferrer');
    e.preventDefault();
  };

  if (variant === 'floating') {
    return (
      <a
        href={url}
        onClick={handleClick}
        id="floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Chat on WhatsApp with Magnet Pharmacy (76200 59437)"
        aria-label="Chat on WhatsApp with Magnet Pharmacy"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-sm font-semibold hidden sm:inline-block">
          Chat with Pharmacy
        </span>
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
        </span>
      </a>
    );
  }

  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-5 py-3 gap-2.5 font-semibold"
  };

  const variantStyles = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500",
    secondary: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 focus:ring-emerald-400",
    outline: "bg-transparent hover:bg-emerald-50 text-emerald-700 border border-emerald-600 focus:ring-emerald-500",
    compact: "p-2 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 rounded-lg",
    floating: ""
  };

  return (
    <a
      href={url}
      onClick={handleClick}
      id="whatsapp-cta-link"
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      aria-label={`${label} - Magnet Pharmacy`}
    >
      <MessageCircle className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} fill-current shrink-0`} />
      {variant !== 'compact' && <span>{label}</span>}
    </a>
  );
};
