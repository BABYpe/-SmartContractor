import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Star, 
  MapPin, 
  DollarSign,
  BarChart3,
  Zap,
  Save,
  History,
  Settings,
  RefreshCw
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { enhancedPricingEngine, type PricingContext } from '../utils/enhancedPricingEngine';
import type { ConstructionItem } from '../types';
import toast from 'react-hot-toast';

interface EnhancedPricingSearchProps {
  onItemSelect?: (item: ConstructionItem) => void;
  lang: 'ar' | 'en';
}

export default function EnhancedPricingSearch({ onItemSelect, lang }: EnhancedPricingSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ConstructionItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [autoSavedProjects, setAutoSavedProjects] = useState<any[]>([]);
  
  const [pricingContext, setPricingContext] = useState<PricingContext>({
    region: 'riyadh',
    quality: 'standard',
    season: 'spring',
    projectSize: 'medium',
    urgency: 'normal'
  });

  const isArabic = lang === 'ar';

  // تحميل البيانات المحفوظة عند بدء التشغيل
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      // تحميل تاريخ البحث
      const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      setSearchHistory(savedHistory.slice(0, 10)); // آخر 10 عمليات بحث

      // تحميل المشاريع المحفوظة تلقائياً
      const projects = await enhancedPricingEngine.getAutoSavedProjects('current-user');
      setAutoSavedProjects(projects);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  // البحث الذكي
  const handleSearch = useCallback(async (query: string = searchQuery) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const results = await enhancedPricingEngine.smartSearch(
        query,
        pricingContext,
        'current-user'
      );
      
      setSearchResults(results);
      
      // حفظ في تاريخ البحث
      const updatedHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      
      toast.success(`تم العثور على ${results.length} نتيجة`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('حدث خطأ أثناء البحث');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, pricingContext, searchHistory]);

  // حفظ المشروع تلقائياً
  const autoSaveCurrentSearch = useCallback(async () => {
    if (searchResults.length === 0) return;

    const projectData = {
      name: `بحث: ${searchQuery}`,
      searchQuery,
      results: searchResults,
      context: pricingContext,
      estimatedCost: searchResults.reduce((sum, item) => sum + item.basePrice, 0),
      timestamp: new Date().toISOString()
    };

    try {
      await enhancedPricingEngine.autoSaveProject(projectData, 'current-user', 'manual');
      toast.success('تم حفظ البحث تلقائياً');
      loadSavedData(); // إعادة تحميل البيانات
    } catch (error) {
      console.error('Auto-save error:', error);
      toast.error('فشل في الحفظ التلقائي');
    }
  }, [searchQuery, searchResults, pricingContext]);

  // تحديث الأسعار
  const updatePrices = async () => {
    try {
      await enhancedPricingEngine.updatePricesPeriodically();
      if (searchResults.length > 0) {
        await handleSearch(); // إعادة البحث بالأسعار المحدثة
      }
      toast.success('تم تحديث الأسعار بنجاح');
    } catch (error) {
      console.error('Price update error:', error);
      toast.error('فشل في تحديث الأسعار');
    }
  };

  return (
    <div className="space-y-6">
      {/* شريط البحث المتقدم */}
      <GlassCard className="p-6">
        <div className="space-y-4">
          {/* البحث الرئيسي */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={isArabic ? 'ابحث عن البنود والمواد...' : 'Search for items and materials...'}
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              dir={isArabic ? 'rtl' : 'ltr'}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <AnimatedButton
                onClick={() => handleSearch()}
                loading={isSearching}
                variant="primary"
                size="sm"
              >
                <Search className="w-4 h-4" />
              </AnimatedButton>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-wrap gap-2">
            <AnimatedButton
              onClick={() => setShowFilters(!showFilters)}
              variant="secondary"
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              {isArabic ? 'فلاتر متقدمة' : 'Advanced Filters'}
            </AnimatedButton>

            <AnimatedButton
              onClick={autoSaveCurrentSearch}
              variant="secondary"
              size="sm"
              disabled={searchResults.length === 0}
            >
              <Save className="w-4 h-4 mr-2" />
              {isArabic ? 'حفظ البحث' : 'Save Search'}
            </AnimatedButton>

            <AnimatedButton
              onClick={updatePrices}
              variant="secondary"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {isArabic ? 'تحديث الأسعار' : 'Update Prices'}
            </AnimatedButton>
          </div>

          {/* الفلاتر المتقدمة */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-white/20"
              >
                <select
                  value={pricingContext.region}
                  onChange={(e) => setPricingContext(prev => ({ ...prev, region: e.target.value }))}
                  className="p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <option value="riyadh">{isArabic ? 'الرياض' : 'Riyadh'}</option>
                  <option value="jeddah">{isArabic ? 'جدة' : 'Jeddah'}</option>
                  <option value="dammam">{isArabic ? 'الدمام' : 'Dammam'}</option>
                  <option value="makkah">{isArabic ? 'مكة' : 'Makkah'}</option>
                  <option value="khobar">{isArabic ? 'الخبر' : 'Khobar'}</option>
                </select>

                <select
                  value={pricingContext.quality}
                  onChange={(e) => setPricingContext(prev => ({ ...prev, quality: e.target.value as any }))}
                  className="p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <option value="economy">{isArabic ? 'اقتصادي' : 'Economy'}</option>
                  <option value="standard">{isArabic ? 'قياسي' : 'Standard'}</option>
                  <option value="premium">{isArabic ? 'فاخر' : 'Premium'}</option>
                </select>

                <select
                  value={pricingContext.projectSize}
                  onChange={(e) => setPricingContext(prev => ({ ...prev, projectSize: e.target.value as any }))}
                  className="p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <option value="small">{isArabic ? 'صغير' : 'Small'}</option>
                  <option value="medium">{isArabic ? 'متوسط' : 'Medium'}</option>
                  <option value="large">{isArabic ? 'كبير' : 'Large'}</option>
                </select>

                <select
                  value={pricingContext.urgency}
                  onChange={(e) => setPricingContext(prev => ({ ...prev, urgency: e.target.value as any }))}
                  className="p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <option value="normal">{isArabic ? 'عادي' : 'Normal'}</option>
                  <option value="urgent">{isArabic ? 'مستعجل' : 'Urgent'}</option>
                </select>

                <select
                  value={pricingContext.season}
                  onChange={(e) => setPricingContext(prev => ({ ...prev, season: e.target.value as any }))}
                  className="p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <option value="spring">{isArabic ? 'ربيع' : 'Spring'}</option>
                  <option value="summer">{isArabic ? 'صيف' : 'Summer'}</option>
                  <option value="autumn">{isArabic ? 'خريف' : 'Autumn'}</option>
                  <option value="winter">{isArabic ? 'شتاء' : 'Winter'}</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>

      {/* تاريخ البحث والمشاريع المحفوظة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* تاريخ البحث */}
        {searchHistory.length > 0 && (
          <GlassCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <History className="w-5 h-5 mr-2" />
              {isArabic ? 'تاريخ البحث' : 'Search History'}
            </h3>
            <div className="space-y-2">
              {searchHistory.slice(0, 5).map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(query);
                    handleSearch(query);
                  }}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:bg-white/20 rounded-lg transition-colors"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <Clock className="w-3 h-3 inline mr-2" />
                  {query}
                </button>
              ))}
            </div>
          </GlassCard>
        )}

        {/* المشاريع المحفوظة تلقائياً */}
        {autoSavedProjects.length > 0 && (
          <GlassCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Save className="w-5 h-5 mr-2" />
              {isArabic ? 'المشاريع المحفوظة' : 'Saved Projects'}
            </h3>
            <div className="space-y-2">
              {autoSavedProjects.slice(0, 3).map((project, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/20 rounded-lg border border-white/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">
                      {project.projectName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  {project.estimatedCost && (
                    <div className="text-xs text-gray-600 mt-1">
                      التكلفة: {project.estimatedCost.toLocaleString()} ريال
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>

      {/* نتائج البحث */}
      {searchResults.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {isArabic ? 'نتائج البحث' : 'Search Results'} ({searchResults.length})
            </h3>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">{pricingContext.region}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => onItemSelect?.(item)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {isArabic ? item.nameAr : item.nameEn}
                  </h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {item.code}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {item.specifications}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {isArabic ? 'السعر:' : 'Price:'}
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-600">
                        {item.basePrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 block">
                        ريال/{item.unit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {isArabic ? 'ساعات العمل:' : 'Labor Hours:'}
                    </span>
                    <span className="text-gray-800">{item.laborHours}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      <span className="text-gray-600">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {isArabic ? 'الاستخدام:' : 'Usage:'} {item.usageCount}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* رسالة عدم وجود نتائج */}
      {searchQuery && !isSearching && searchResults.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {isArabic ? 'لا توجد نتائج' : 'No results found'}
          </h3>
          <p className="text-gray-600">
            {isArabic 
              ? 'جرب تغيير كلمات البحث أو الفلاتر'
              : 'Try changing your search terms or filters'
            }
          </p>
        </div>
      )}

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{searchHistory.length}</p>
          <p className="text-sm text-gray-600">{isArabic ? 'عمليات البحث' : 'Searches'}</p>
        </GlassCard>

        <GlassCard className="p-4 text-center">
          <Save className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{autoSavedProjects.length}</p>
          <p className="text-sm text-gray-600">{isArabic ? 'مشاريع محفوظة' : 'Saved Projects'}</p>
        </GlassCard>

        <GlassCard className="p-4 text-center">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">{searchResults.length}</p>
          <p className="text-sm text-gray-600">{isArabic ? 'نتائج حالية' : 'Current Results'}</p>
        </GlassCard>

        <GlassCard className="p-4 text-center">
          <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">
            {pricingContext.quality === 'premium' ? '⭐' : 
             pricingContext.quality === 'standard' ? '✓' : '💰'}
          </p>
          <p className="text-sm text-gray-600">
            {isArabic ? 
              (pricingContext.quality === 'premium' ? 'فاخر' : 
               pricingContext.quality === 'standard' ? 'قياسي' : 'اقتصادي') :
              pricingContext.quality
            }
          </p>
        </GlassCard>
      </div>
    </div>
  );
}