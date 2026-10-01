import React from 'react';
import { 
  Pill, 
  FileText, 
  HeartPulse, 
  Sparkles, 
  Smile, 
  Baby, 
  ShoppingBag, 
  Activity, 
  Compass, 
  Cross,
  ArrowRight
} from 'lucide-react';
import { Category } from '../../types';

interface PopularCategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  categories,
  onSelectCategory
}) => {
  const getCategoryIcon = (iconName: string, name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('pilgrim') || lower.includes('travel')) return Compass;
    if (lower.includes('prescrip')) return FileText;
    if (lower.includes('first aid') || lower.includes('device')) return Cross;
    if (lower.includes('otc') || lower.includes('health')) return HeartPulse;
    if (lower.includes('beauty') || lower.includes('skin')) return Smile;
    if (lower.includes('baby')) return Baby;
    if (lower.includes('general') || lower.includes('store')) return ShoppingBag;
    if (lower.includes('personal')) return Sparkles;
    return Pill;
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#f2fbf6] via-white to-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Explore Our Healthcare Catalog</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Popular Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Browse genuine pharmaceutical medicines, daily health essentials, personal care, and specialized travel supplies.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/60 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200 transition-all cursor-pointer group shadow-2xs"
          >
            <span>View All Categories & Medicines</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-700" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName, cat.name);
            const isPilgrimage = cat.name.toLowerCase().includes('pilgrim') || cat.slug === 'pilgrimage-care';

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 backdrop-blur-md ${
                  isPilgrimage 
                    ? 'bg-gradient-to-br from-emerald-100/80 to-teal-50/90 border-emerald-300 shadow-sm hover:border-emerald-500 hover:shadow-md' 
                    : 'bg-white/80 hover:bg-white border-emerald-100/80 hover:border-emerald-400 shadow-2xs hover:shadow-lg hover:shadow-emerald-900/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs ${
                      isPilgrimage 
                        ? 'bg-emerald-700 text-white shadow-xs' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {isPilgrimage ? (
                    <span className="text-[10px] font-bold text-emerald-900 bg-emerald-200/90 px-2.5 py-0.5 rounded-full uppercase border border-emerald-300">
                      Specialized
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-50">
                  <span className="text-emerald-800/70 font-medium">
                    {cat.productCount ? `${cat.productCount} items listed` : 'View items'}
                  </span>
                  <span className="font-bold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
