import React, { useState, useMemo } from 'react';
import { Search, Pill, HelpCircle, ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../medicines/ProductCard';

interface SearchMedicineSectionProps {
  products: Product[];
  onViewProductDetails: (product: Product) => void;
  onEnquireProduct: (product: Product) => void;
  onCustomEnquiry: (query?: string) => void;
}

export const SearchMedicineSection: React.FC<SearchMedicineSectionProps> = ({
  products,
  onViewProductDetails,
  onEnquireProduct,
  onCustomEnquiry
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.category)));
    return ['All', ...list];
  }, [products]);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return products.filter(p => {
      const matchCat = selectedCat === 'All' || p.category === selectedCat;
      if (!matchCat) return false;

      if (!term) return true;

      const matchName = p.name.toLowerCase().includes(term);
      const matchGeneric = p.genericName?.toLowerCase().includes(term) || false;
      const matchManufacturer = p.manufacturer.toLowerCase().includes(term);
      const matchTags = p.tags?.some(t => t.toLowerCase().includes(term)) || false;

      return matchName || matchGeneric || matchManufacturer || matchTags;
    });
  }, [products, searchTerm, selectedCat]);

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-emerald-50/40 via-[#f2fbf6] to-white border-y border-emerald-100" id="search-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-full border border-emerald-300">
            Real-Time Pharmacy Inventory Search
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Search Medicines & Health Essentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Search by medicine brand, active salt, therapeutic category or manufacturer.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. Paracetamol, Augmentin, ORS, Pan-D, Blister Pads..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-emerald-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 shadow-sm transition-all"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                    : 'bg-white text-emerald-900 hover:bg-emerald-100/70 border border-emerald-200/80 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div>
            <div className="flex items-center justify-between pb-4 text-xs text-emerald-800/80">
              <span className="font-semibold">Showing {filtered.length} products</span>
              <span className="font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-emerald-900">All items subject to pharmacist verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProductDetails}
                  onEnquire={onEnquireProduct}
                />
              ))}
            </div>

            {filtered.length > 8 && (
              <div className="text-center pt-8">
                <button
                  onClick={() => onCustomEnquiry(searchTerm)}
                  className="px-6 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-xl border border-emerald-200 shadow-xs cursor-pointer transition-colors"
                >
                  View More in Catalog
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State as explicitly specified in prompt */
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
              <HelpCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Can't find what you're looking for?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send us a medicine enquiry and our pharmacy team can check availability directly with licensed pharmaceutical suppliers.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onCustomEnquiry(searchTerm)}
                className="px-7 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-700/20 transition-all text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Pill className="w-4 h-4" />
                Make an Enquiry
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
