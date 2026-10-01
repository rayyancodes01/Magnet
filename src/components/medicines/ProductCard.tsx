import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Eye, 
  Building2, 
  Package, 
  Clock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onEnquire: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onEnquire
}) => {
  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Stock
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" /> Low Stock
          </span>
        );
      case 'on_request':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-100/90 px-2.5 py-0.5 rounded-full border border-teal-300">
            <Clock className="w-3 h-3 text-teal-600" /> On Request
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
            Check Availability
          </span>
        );
    }
  };

  return (
    <div 
      className="group bg-white rounded-3xl border border-emerald-100/90 hover:border-emerald-400 shadow-md shadow-emerald-950/5 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden h-full relative"
    >
      {/* Product Image Area with smooth zoom */}
      <div className="relative aspect-4/3 bg-gradient-to-b from-emerald-50/60 to-slate-50 overflow-hidden border-b border-emerald-100/60 flex items-center justify-center p-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Prescription Badge */}
        {product.prescriptionRequired ? (
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1 backdrop-blur-xs">
            <FileText className="w-3 h-3" />
            <span>Rx Required</span>
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-emerald-800/80 text-white text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-lg backdrop-blur-md">
            <span>OTC Medicine</span>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-emerald-600 text-slate-700 hover:text-white rounded-xl shadow-md transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
          title="Quick View Details"
          aria-label="View Product Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Category tag */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-900 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-emerald-200/80 shadow-2xs">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            {getAvailabilityBadge()}
            {product.dosageForm && (
              <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                {product.dosageForm}
              </span>
            )}
          </div>

          <h3 
            onClick={() => onViewDetails(product)}
            className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2 cursor-pointer font-display"
          >
            {product.name}
          </h3>

          {product.genericName && (
            <p className="text-xs text-emerald-900/80 line-clamp-1 font-medium bg-emerald-50/70 px-2 py-0.5 rounded border border-emerald-100">
              Salt: {product.genericName}
            </p>
          )}

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-0.5">
            {product.description}
          </p>
        </div>

        {/* Metadata info */}
        <div className="pt-2 border-t border-emerald-50 space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 truncate max-w-[150px]">
              <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate text-slate-700 font-medium">{product.manufacturer}</span>
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Package className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{product.packSize}</span>
            </span>
          </div>

          {/* Price or Request Info */}
          <div className="flex items-center justify-between pt-1">
            {product.price ? (
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Estimated MRP</span>
                <p className="text-base sm:text-lg font-extrabold text-emerald-950 font-display">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Pricing</span>
                <p className="text-xs font-bold text-emerald-800">
                  On Pharmacist Enquiry
                </p>
              </div>
            )}

            {product.prescriptionRequired ? (
              <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Rx Verified
              </span>
            ) : (
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Genuine
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: View Details & Book / Enquire */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="w-full py-2.5 px-3 text-xs font-bold text-slate-700 hover:text-emerald-900 bg-slate-100 hover:bg-emerald-50 rounded-2xl transition-colors cursor-pointer text-center border border-slate-200/80"
          >
            Details
          </button>

          <button
            onClick={() => onEnquire(product)}
            className="w-full py-2.5 px-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 rounded-2xl shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.prescriptionRequired ? 'Book with Rx' : 'Book Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

