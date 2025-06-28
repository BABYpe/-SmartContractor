import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Download,
  Upload,
  RefreshCw,
  Settings,
  BarChart3,
  Zap,
  Star,
  ShoppingCart
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { databaseEngine } from '../utils/enhancedDatabaseEngine';
import { marketPricingEngine } from '../utils/marketPricing';
import { downloadTextFile } from '../utils/file';
import toast from 'react-hot-toast';
import type { BOQItem, ConstructionItem, Language } from '../types';

interface EnhancedBOQManagerProps {
  customBoqItems: BOQItem[];
  setCustomBoqItems: (items: BOQItem[]) => void;
  projectType: string;
  city: string;
  wastePercentage: string;
  lang: Language;
  t: any;
}

export default function EnhancedBOQManager({
  customBoqItems,
  setCustomBoqItems,
  projectType,
  city,
  wastePercentage,
  lang,
  t
}: EnhancedBOQManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [qualityLevel, setQualityLevel] = useState<'economy' | 'standard' | 'premium'>('standard');
  const [searchResults, setSearchResults] = useState<ConstructionItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [databaseStats, setDatabaseStats] = useState<any>(null);

  // تحميل إحصائيات قاعدة البيانات
  useEffect(() => {
    const stats = databaseEngine.getDatabaseStats();
    setDatabaseStats(stats);
  }, []);

  // البحث في قاعدة البيانات
  const handleSearch = async () => {
    if (!searchTerm.trim() && !selectedCategory) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = databaseEngine.advancedSearch({
        query: searchTerm,
        category: selectedCategory || undefined,
        subcategory: selectedSubcategory || undefined,
        priceRange: priceRange.min > 0 || priceRange.max < 10000 ? priceRange : undefined,
        sortBy: 'name',
        sortOrder: 'asc',
        limit: 50
      });
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching database:', error);
      toast.error('خطأ في البحث');
    } finally {
      setIsSearching(false);
    }
  };

  // إضافة بند من قاعدة البيانات
  const addItemFromDatabase = (item: ConstructionItem, quantity: number = 1) => {
    const boqItem = databaseEngine.convertToBOQItem(item, quantity, {
      region: city,
      quality: qualityLevel,
      season: getCurrentSeason()
    });

    setCustomBoqItems([...customBoqItems, boqItem]);
    toast.success(`تم إضافة "${item.nameAr}" بنجاح`);
  };

  // الحصول على الموسم الحالي
  const getCurrentSeason = (): 'spring' | 'summer' | 'autumn' | 'winter' => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  // حذف بند
  const deleteItem = (itemId: string) => {
    setCustomBoqItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
    toast.success('تم حذف البند');
  };

  // تحديث بند
  const updateItem = (itemId: string, updates: Partial<BOQItem>) => {
    setCustomBoqItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, ...updates, lastUpdated: new Date().toISOString() }
        : item
    ));
  };

  // تحديث الأسعار من السوق
  const updateMarketPrices = async () => {
    if (customBoqItems.length === 0) {
      toast.error('لا توجد بنود لتحديث أسعارها');
      return;
    }

    try {
      const updatedItems = await marketPricingEngine.updatePricesForItems(customBoqItems, city);
      setCustomBoqItems(updatedItems);
      toast.success(`تم تحديث أسعار ${updatedItems.length} بند بنجاح`);
    } catch (error) {
      console.error('Error updating prices:', error);
      toast.error('فشل في تحديث الأسعار');
    }
  };

  // تصدير البيانات
  const exportData = () => {
    if (customBoqItems.length === 0) {
      toast.error('لا توجد بنود للتصدير');
      return;
    }

    const csvContent = [
      'الكود,اسم البند,الكمية,الوحدة,سعر الوحدة,التكلفة الإجمالية,المصدر,المواصفات',
      ...customBoqItems.map(item => {
        const totalItemCost = item.price ? 
          (item.price * item.quantity * (1 + (parseFloat(wastePercentage) / 100 || 0))).toFixed(2) : 
          'غير متوفر';
        return [
          item.id,
          item.itemName,
          item.quantity,
          item.unit,
          item.price || 'غير متوفر',
          totalItemCost,
          item.source,
          item.specifications || ''
        ].join(',');
      })
    ].join('\n');

    downloadTextFile(csvContent, 'enhanced-boq-data.csv');
    toast.success('تم تصدير البيانات بنجاح');
  };

  // حساب التكلفة الإجمالية
  const totalCost = customBoqItems.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    const wasteFactorValue = 1 + (parseFloat(wastePercentage) / 100 || 0);
    return sum + (itemPrice * item.quantity * wasteFactorValue);
  }, 0);

  // الحصول على الفئات الفرعية
  const subcategories = selectedCategory ? databaseEngine.getSubcategories(selectedCategory) : [];

  return (
    <GlassCard gradient="from-blue-500/20 to-cyan-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Database className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                نظام إدارة جدول الكميات المتطور
              </h2>
              <p className="text-gray-600 mt-1">
                مدعوم بقاعدة بيانات شاملة وتسعير ذكي
              </p>
            </div>
          </div>
          
          {databaseStats && (
            <div className="text-sm text-gray-500 text-right">
              <p>قاعدة البيانات: {databaseStats.totalItems} بند</p>
              <p>آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}</p>
            </div>
          )}
        </div>

        {/* Database Stats */}
        {databaseStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(databaseStats.itemsByCategory).map(([category, count]) => (
              <div key={category} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <h4 className="text-sm font-medium text-gray-700">{category}</h4>
                <p className="text-2xl font-bold text-blue-600">{count as number}</p>
              </div>
            ))}
          </div>
        )}

        {/* Search and Filters */}
        <GlassCard className="p-6 mb-6">
          <div className="space-y-4">
            {/* Basic Search */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في قاعدة البيانات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>
              
              <AnimatedButton
                onClick={handleSearch}
                loading={isSearching}
                variant="primary"
                size="md"
              >
                <Search className="w-4 h-4 mr-2" />
                بحث
              </AnimatedButton>
              
              <AnimatedButton
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                variant="secondary"
                size="md"
              >
                <Filter className="w-4 h-4 mr-2" />
                مرشحات متقدمة
              </AnimatedButton>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/20"
                >
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubcategory('');
                    }}
                    className="p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                    dir="rtl"
                  >
                    <option value="">جميع الفئات</option>
                    {databaseEngine.getCategories().map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    disabled={!selectedCategory}
                    className="p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    dir="rtl"
                  >
                    <option value="">جميع الفئات الفرعية</option>
                    {subcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>

                  <select
                    value={qualityLevel}
                    onChange={(e) => setQualityLevel(e.target.value as any)}
                    className="p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                    dir="rtl"
                  >
                    <option value="economy">اقتصادي</option>
                    <option value="standard">قياسي</option>
                    <option value="premium">فاخر</option>
                  </select>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="السعر من"
                      value={priceRange.min || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                      className="w-1/2 p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="إلى"
                      value={priceRange.max === 10000 ? '' : priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 10000 }))}
                      className="w-1/2 p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <GlassCard className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              نتائج البحث ({searchResults.length} بند)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {searchResults.map((item) => {
                const pricing = databaseEngine.calculatePrice(item, {
                  region: city,
                  quality: qualityLevel,
                  season: getCurrentSeason()
                });

                return (
                  <motion.div
                    key={item.id}
                    className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">{item.nameAr}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {item.code}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{item.specifications}</p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-700">
                        {pricing.adjustedPrice.toLocaleString()} ريال/{item.unit}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="الكمية"
                        min="1"
                        defaultValue="1"
                        className="flex-1 p-2 text-sm bg-white/50 border border-white/30 rounded-lg focus:ring-1 focus:ring-blue-500"
                        id={`quantity-${item.id}`}
                      />
                      <AnimatedButton
                        onClick={() => {
                          const quantityInput = document.getElementById(`quantity-${item.id}`) as HTMLInputElement;
                          const quantity = parseFloat(quantityInput.value) || 1;
                          addItemFromDatabase(item, quantity);
                        }}
                        variant="primary"
                        size="sm"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        إضافة
                      </AnimatedButton>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        )}

        {/* Action Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <AnimatedButton
            onClick={updateMarketPrices}
            variant="primary"
            size="md"
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            تحديث الأسعار
          </AnimatedButton>

          <AnimatedButton
            onClick={exportData}
            variant="secondary"
            size="md"
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            تصدير البيانات
          </AnimatedButton>

          <AnimatedButton
            onClick={() => setSelectedItems(new Set())}
            variant="secondary"
            size="md"
            className="w-full"
          >
            <Settings className="w-4 h-4 mr-2" />
            إعدادات متقدمة
          </AnimatedButton>

          <AnimatedButton
            onClick={() => toast.info('قريباً: تحليل البيانات')}
            variant="secondary"
            size="md"
            className="w-full"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            تحليل البيانات
          </AnimatedButton>
        </div>

        {/* BOQ Items Table */}
        {customBoqItems.length > 0 ? (
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white/20">
                  <tr>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">البند</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">الكمية</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">الوحدة</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">سعر الوحدة</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">التكلفة الإجمالية</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">المصدر</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">الحالة</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  <AnimatePresence>
                    {customBoqItems.map((item) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="hover:bg-white/10 transition-colors duration-200"
                      >
                        <td className="px-4 py-3 text-right">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {item.itemName}
                            </div>
                            {item.specifications && (
                              <div className="text-xs text-gray-600 mt-1">
                                {item.specifications}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700">
                          {editingItem === item.id ? (
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                              className="w-20 p-1 text-center bg-white/50 border border-white/30 rounded"
                              min="0.01"
                              step="0.01"
                            />
                          ) : (
                            item.quantity.toLocaleString()
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700">
                          {item.unit}
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {item.loading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            </div>
                          ) : item.error ? (
                            <span className="text-red-600 text-xs">خطأ</span>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="font-semibold text-green-700">
                                {item.price ? `${item.price.toLocaleString()} SAR` : '--'}
                              </span>
                              {item.priceRange && (
                                <span className="text-xs text-gray-500">
                                  ({item.priceRange.min.toLocaleString()} - {item.priceRange.max.toLocaleString()})
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-semibold">
                          {item.loading || item.error ? (
                            <span className="text-gray-500">--</span>
                          ) : (
                            <span className="text-green-800">
                              {item.price ? 
                                `${(item.price * item.quantity * (1 + (parseFloat(wastePercentage) / 100 || 0))).toLocaleString()} SAR` : 
                                '--'
                              }
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.source === 'database' ? 'bg-green-100 text-green-800' :
                            item.source === 'ai' ? 'bg-blue-100 text-blue-800' :
                            item.source === 'pdf' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.source === 'database' ? 'قاعدة البيانات' :
                             item.source === 'ai' ? 'ذكاء اصطناعي' :
                             item.source === 'pdf' ? 'PDF' : 'يدوي'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center">
                            {item.verified ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                            )}
                            {item.confidence && (
                              <span className="text-xs text-gray-500 ml-1">
                                {Math.round(item.confidence * 100)}%
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="تعديل"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-6 border-t border-white/30">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">إجمالي البنود</h4>
                  <p className="text-2xl font-bold text-blue-600">{customBoqItems.length}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">البنود المؤكدة</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {customBoqItems.filter(item => item.verified).length}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">التكلفة الإجمالية</h4>
                  <p className="text-2xl font-bold text-green-600">{totalCost.toLocaleString()} SAR</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">شامل الهدر</h4>
                  <p className="text-lg text-gray-600">{wastePercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد بنود في جدول الكميات</p>
            <p className="text-gray-400 text-sm">ابدأ بالبحث في قاعدة البيانات لإضافة البنود</p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}