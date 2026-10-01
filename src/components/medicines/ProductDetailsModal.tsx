import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Package, 
  ShieldCheck, 
  Pill, 
  Info, 
  Thermometer, 
  Tag, 
  MessageCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Product } from '../../types';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onEnquire
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              {product.category}
            </span>
            {product.sku && (
              <span className="text-xs text-slate-400">
                SKU: {product.sku}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top visual & basic specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {product.prescriptionRequired && (
                <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Prescription Required
                </div>
              )}
            </div>

            {/* Core Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight font-display">
                  {product.name}
                </h2>
                {product.genericName && (
                  <p className="text-xs font-semibold text-emerald-700 mt-1">
                    Generic: {product.genericName}
                  </p>
                )}
              </div>

              {/* Price & Availability */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium">Estimated Price</span>
                  <p className="text-lg font-bold text-slate-900">
                    {product.price ? `₹${product.price.toFixed(2)}` : 'Enquire for Price'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 font-medium">Availability</span>
                  <p className="text-xs font-semibold text-emerald-700 capitalize">
                    {product.availability.replace('_', ' ')}
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> Manufacturer
                  </span>
                  <span className="font-semibold text-slate-800 text-right">{product.manufacturer}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-slate-400" /> Pack Presentation
                  </span>
                  <span className="font-semibold text-slate-800">{product.packSize}</span>
                </div>

                {product.dosageForm && (
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Pill className="w-3.5 h-3.5 text-slate-400" /> Dosage Form
                    </span>
                    <span className="font-semibold text-slate-800">{product.dosageForm}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description & Usage */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Product Description & Indications
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                {product.description}
              </p>
            </div>

            {product.usageInstructions && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-emerald-600" /> Usage Guidelines
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
                  {product.usageInstructions}
                </p>
              </div>
            )}

            {product.storageCondition && (
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                <Thermometer className="w-4 h-4 text-slate-400 shrink-0" />
                <span><span className="font-medium text-slate-700">Storage:</span> {product.storageCondition}</span>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Medical Disclaimer */}
            <MedicalDisclaimer compact={true} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <WhatsAppButton 
            productName={product.name}
            variant="secondary"
            size="md"
            label="Enquire via WhatsApp"
            className="w-full sm:w-auto"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/3 sm:w-auto px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquire(product);
              }}
              className="w-2/3 sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Pill className="w-4 h-4" />
              {product.prescriptionRequired ? 'Book with Prescription' : 'Book Medicine Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
