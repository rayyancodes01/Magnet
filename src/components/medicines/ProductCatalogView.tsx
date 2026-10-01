import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Pill, 
  FileText, 
  HelpCircle, 
  SlidersHorizontal, 
  Check, 
  X,
  ArrowUpDown,
  Compass
} from 'lucide-react';
import { Category, Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogViewProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  onViewProductDetails: (product: Product) => void;
  onEnquireProduct: (product: Product) => void;
  onCustomEnquiry: (query?: string) => void;
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  products,
  categories,
  initialCategory,
  onViewProductDetails,
  onEnquireProduct,
  onCustomEnquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'rx_only' | 'otc_only'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name_asc' | 'price_low' | 'price_high'>('featured');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Prescription filter
    if (prescriptionFilter === 'rx_only') {
      list = list.filter(p => p.prescriptionRequired);
    } else if (prescriptionFilter === 'otc_only') {
      list = list.filter(p => !p.prescriptionRequired);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const name = p.name.toLowerCase().includes(q);
        const gen = p.genericName?.toLowerCase().includes(q) || false;
        const mfg = p.manufacturer.toLowerCase().includes(q);
        const tags = p.tags?.some(t => t.toLowerCase().includes(q)) || false;
        return name || gen || mfg || tags;
      });
    }

    // Sorting
    if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price_low') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_high') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return list;
  }, [products, selectedCategory, prescriptionFilter, searchQuery, sortBy]);

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Magnet Pharmaceutical Catalog
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Medicines & Healthcare Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Browse genuine medicines, OTC healthcare items, and personal care supplies with clear prescription indicators.
            </p>
          </div>

          <button
            onClick={() => onCustomEnquiry(searchQuery)}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start md:self-auto flex items-center gap-1.5"
          >
            <Pill className="w-4 h-4" />
            <span>Request Unlisted Medicine</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand, active salt, therapeutic use..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Prescription Filter */}
            <div className="md:col-span-3">
              <select
                value={prescriptionFilter}
                onChange={(e) => setPrescriptionFilter(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Medicine Types</option>
                <option value="rx_only">Prescription Only (Rx)</option>
                <option value="otc_only">OTC & General Care</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="name_asc">Sort: Name (A-Z)</option>
                <option value="price_low">Sort: Price (Low to High)</option>
                <option value="price_high">Sort: Price (High to Low)</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between pb-4 text-xs text-slate-500 font-medium">
              <span>Showing {filteredProducts.length} items in catalog</span>
              <span>Need help? Call pharmacy at 76200 59437</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProductDetails}
                  onEnquire={onEnquireProduct}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Custom Enquiry Fallback */
          <div className="bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-amber-50 text-amber-800 rounded-3xl flex items-center justify-center mx-auto border border-amber-200">
              <HelpCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Can't find "{searchQuery || selectedCategory}"?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We dispense thousands of brand and generic pharmaceutical medications. Send us your requirement and our registered pharmacist will verify availability and source it for you.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={() => onCustomEnquiry(searchQuery)}
                className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Pill className="w-4 h-4" />
                Submit Medicine Enquiry
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
