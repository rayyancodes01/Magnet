import React, { useState, useMemo } from 'react';
import { Search, X, Pill, ArrowRight, FileText, CheckCircle2, HelpCircle } from 'lucide-react';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onCustomEnquiry: (initialQuery?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onCustomEnquiry
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!query.trim() && selectedCategory === 'all') {
      // Show featured products as initial suggestions
      return products.filter(p => p.isFeatured).slice(0, 6);
    }

    const q = query.toLowerCase().trim();
    return products.filter(p => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      if (!matchCategory) return false;

      if (!q) return true;

      const matchName = p.name.toLowerCase().includes(q);
      const matchGeneric = p.genericName?.toLowerCase().includes(q) || false;
      const matchManufacturer = p.manufacturer.toLowerCase().includes(q);
      const matchTags = p.tags?.some(tag => tag.toLowerCase().includes(q)) || false;

      return matchName || matchGeneric || matchManufacturer || matchTags;
    });
  }, [products, query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-12 sm:pt-20 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-emerald-600 absolute left-4 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by medicine name, generic salt, brand or health issue..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200/80'
                }`}
              >
                {cat === 'all' ? 'All Medicines' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100">
          {filteredProducts.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {query ? `Search Results (${filteredProducts.length})` : 'Popular & Essential Medicines'}
                </span>
                <span className="text-[11px] text-slate-400">
                  Click to view details or book
                </span>
              </div>

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="p-3.5 hover:bg-emerald-50/50 rounded-2xl transition-all flex items-center justify-between gap-4 cursor-pointer group border border-transparent hover:border-emerald-100"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200/60 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                          {product.name}
                        </h4>
                        {product.prescriptionRequired && (
                          <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 shrink-0">
                            Rx
                          </span>
                        )}
                      </div>
                      {product.genericName && (
                        <p className="text-xs text-slate-500 truncate font-medium">
                          {product.genericName}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400">
                        {product.manufacturer} • {product.packSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {product.price && (
                      <span className="text-sm font-bold text-slate-900 hidden sm:inline-block">
                        ₹{product.price.toFixed(2)}
                      </span>
                    )}
                    <div className="p-2 bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 rounded-xl transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State when no medicine is found */
            <div className="py-8 px-4 text-center space-y-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <HelpCircle className="w-7 h-7" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base font-bold text-slate-900">
                  Can't find what you're looking for?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Don't worry! We stock thousands of medicines and can arrange unlisted or specific prescribed formulations quickly.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onCustomEnquiry(query);
                  }}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Pill className="w-4 h-4" />
                  Make a Custom Medicine Enquiry
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Need immediate assistance?</span>
          <button
            onClick={() => {
              onClose();
              onCustomEnquiry(query);
            }}
            className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
          >
            Submit Enquiry Form →
          </button>
        </div>
      </div>
    </div>
  );
};
