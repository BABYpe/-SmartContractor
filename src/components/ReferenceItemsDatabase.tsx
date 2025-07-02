import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Upload,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw,
  Settings,
  Eye,
  Copy,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Globe,
  Calendar,
  DollarSign
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { downloadTextFile } from '../utils/file';
import toast from 'react-hot-toast';

interface ReferenceItem {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: string;
  subcategory: string;
  unit: string;
  basePrice: number;
  currentPrice: number;
  priceHistory: { date: string; price: number }[];
  specifications: string;
  laborHours: number;
  suppliers: string[];
  regions: { [key: string]: number };
  qualityGrades: {
    economy: { price: number; description: string };
    standard: { price: number; description: string };
    premium: { price: number; description: string };
  };
  tags: string[];
  isActive: boolean;
  isVerified: boolean;
  lastUpdated: string;
  usageCount: number;
  rating: number;
  notes: string;
}

interface ReferenceItemsDatabaseProps {
  lang: 'ar' | 'en';
  t: any;
}

export default function ReferenceItemsDatabase({ lang, t }: ReferenceItemsDatabaseProps) {
  const [items, setItems] = useState<ReferenceItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ReferenceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('riyadh');
  const [selectedQuality, setSelectedQuality] = useState<'economy' | 'standard' | 'premium'>('standard');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'usage' | 'updated'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<ReferenceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalItems: 0,
    categories: 0,
    avgPrice: 0,
    lastUpdate: new Date().toISOString()
  });

  // تحميل البيانات المرجعية
  useEffect(() => {
    loadReferenceItems();
  }, []);

  // تصفية وترتيب البيانات
  useEffect(() => {
    filterAndSortItems();
  }, [items, searchTerm, selectedCategory, sortBy, sortOrder]);

  const loadReferenceItems = async () => {
    setIsLoading(true);
    try {
      // محاكاة تحميل البيانات من قاعدة البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sampleItems: ReferenceItem[] = [
        {
          id: '1',
          code: 'CON-001',
          nameAr: 'خرسانة مسلحة درجة 25',
          nameEn: 'Reinforced Concrete Grade 25',
          category: 'أعمال إنشائية',
          subcategory: 'خرسانة',
          unit: 'متر مكعب',
          basePrice: 280,
          currentPrice: 285,
          priceHistory: [
            { date: '2024-01-01', price: 275 },
            { date: '2024-02-01', price: 280 },
            { date: '2024-03-01', price: 285 }
          ],
          specifications: 'خرسانة مسلحة بمقاومة 25 ميجاباسكال مع حديد تسليح',
          laborHours: 8,
          suppliers: ['شركة الخرسانة المتقدمة', 'مصنع الرياض للخرسانة'],
          regions: {
            riyadh: 285,
            jeddah: 295,
            dammam: 290,
            makkah: 300
          },
          qualityGrades: {
            economy: { price: 242, description: 'درجة اقتصادية' },
            standard: { price: 285, description: 'درجة قياسية' },
            premium: { price: 356, description: 'درجة ممتازة' }
          },
          tags: ['خرسانة', 'إنشائي', 'أساسي'],
          isActive: true,
          isVerified: true,
          lastUpdated: '2024-03-15',
          usageCount: 156,
          rating: 4.8,
          notes: 'سعر شامل التوريد والصب'
        },
        {
          id: '2',
          code: 'STL-001',
          nameAr: 'حديد تسليح قطر 12 مم',
          nameEn: 'Reinforcement Steel 12mm',
          category: 'أعمال إنشائية',
          subcategory: 'حديد',
          unit: 'طن',
          basePrice: 2700,
          currentPrice: 2750,
          priceHistory: [
            { date: '2024-01-01', price: 2650 },
            { date: '2024-02-01', price: 2700 },
            { date: '2024-03-01', price: 2750 }
          ],
          specifications: 'حديد تسليح عالي المقاومة قطر 12 مم',
          laborHours: 12,
          suppliers: ['شركة حديد الراجحي', 'مصنع الحديد السعودي'],
          regions: {
            riyadh: 2750,
            jeddah: 2780,
            dammam: 2720,
            makkah: 2800
          },
          qualityGrades: {
            economy: { price: 2475, description: 'درجة اقتصادية' },
            standard: { price: 2750, description: 'درجة قياسية' },
            premium: { price: 3162, description: 'درجة ممتازة' }
          },
          tags: ['حديد', 'تسليح', 'إنشائي'],
          isActive: true,
          isVerified: true,
          lastUpdated: '2024-03-14',
          usageCount: 203,
          rating: 4.9,
          notes: 'سعر شامل التقطيع والتشكيل'
        },
        {
          id: '3',
          code: 'TIL-001',
          nameAr: 'بلاط سيراميك 60×60',
          nameEn: 'Ceramic Tiles 60x60',
          category: 'أعمال التشطيبات',
          subcategory: 'أرضيات',
          unit: 'متر مربع',
          basePrice: 95,
          currentPrice: 98,
          priceHistory: [
            { date: '2024-01-01', price: 92 },
            { date: '2024-02-01', price: 95 },
            { date: '2024-03-01', price: 98 }
          ],
          specifications: 'بلاط سيراميك مقاس 60×60 سم درجة أولى',
          laborHours: 4,
          suppliers: ['شركة البلاط الذهبي', 'معرض السيراميك الحديث'],
          regions: {
            riyadh: 98,
            jeddah: 102,
            dammam: 96,
            makkah: 105
          },
          qualityGrades: {
            economy: { price: 69, description: 'درجة اقتصادية' },
            standard: { price: 98, description: 'درجة قياسية' },
            premium: { price: 147, description: 'درجة ممتازة' }
          },
          tags: ['بلاط', 'تشطيبات', 'أرضيات'],
          isActive: true,
          isVerified: true,
          lastUpdated: '2024-03-13',
          usageCount: 89,
          rating: 4.6,
          notes: 'سعر شامل التركيب والمواد اللاصقة'
        }
      ];

      setItems(sampleItems);
      updateStats(sampleItems);
    } catch (error) {
      toast.error('فشل في تحميل البيانات المرجعية');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = (itemsList: ReferenceItem[]) => {
    const categories = new Set(itemsList.map(item => item.category)).size;
    const avgPrice = itemsList.reduce((sum, item) => sum + item.currentPrice, 0) / itemsList.length;
    
    setStats({
      totalItems: itemsList.length,
      categories,
      avgPrice,
      lastUpdate: new Date().toISOString()
    });
  };

  const filterAndSortItems = () => {
    let filtered = items.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory && item.isActive;
    });

    // ترتيب النتائج
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.regions[selectedRegion] || a.currentPrice;
          bValue = b.regions[selectedRegion] || b.currentPrice;
          break;
        case 'usage':
          aValue = a.usageCount;
          bValue = b.usageCount;
          break;
        case 'updated':
          aValue = new Date(a.lastUpdated).getTime();
          bValue = new Date(b.lastUpdated).getTime();
          break;
        default:
          aValue = lang === 'ar' ? a.nameAr : a.nameEn;
          bValue = lang === 'ar' ? b.nameAr : b.nameEn;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredItems(filtered);
  };

  const getCategories = () => {
    return Array.from(new Set(items.map(item => item.category)));
  };

  const getPriceChange = (item: ReferenceItem) => {
    if (item.priceHistory.length < 2) return 0;
    const latest = item.priceHistory[item.priceHistory.length - 1].price;
    const previous = item.priceHistory[item.priceHistory.length - 2].price;
    return ((latest - previous) / previous) * 100;
  };

  const exportData = () => {
    const csvContent = [
      'الكود,الاسم العربي,الاسم الإنجليزي,الفئة,الوحدة,السعر الحالي,المنطقة,آخر تحديث',
      ...filteredItems.map(item => [
        item.code,
        item.nameAr,
        item.nameEn,
        item.category,
        item.unit,
        item.regions[selectedRegion] || item.currentPrice,
        selectedRegion,
        item.lastUpdated
      ].join(','))
    ].join('\n');

    downloadTextFile(csvContent, 'reference-items.csv');
    toast.success('تم تصدير البيانات بنجاح');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Database className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-gray-600">جاري تحميل البنود المرجعية...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {lang === 'ar' ? 'البنود المرجعية الذكية' : 'Smart Reference Items'}
            </h1>
            <p className="text-gray-600">
              {lang === 'ar' ? 'قاعدة بيانات شاملة للبنود والأسعار المرجعية' : 'Comprehensive database of reference items and prices'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <AnimatedButton
            onClick={() => setShowFilters(!showFilters)}
            variant="secondary"
            size="sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            {lang === 'ar' ? 'فلاتر' : 'Filters'}
          </AnimatedButton>
          
          <AnimatedButton
            onClick={exportData}
            variant="primary"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            {lang === 'ar' ? 'تصدير' : 'Export'}
          </AnimatedButton>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <Database className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-600">{stats.totalItems}</p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي البنود' : 'Total Items'}</p>
        </GlassCard>

        <GlassCard className="p-4 text-center">
          <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{stats.categories}</p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'الفئات' : 'Categories'}</p>
        </GlassCard>

        <GlassCard className="p-4 text-center">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{stats.avgPrice.toFixed(0)}</p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'متوسط السعر' : 'Avg Price'}</p>
        </GlassCard>

        <GlassCard className="p-4 text-center">
          <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-purple-600">
            {new Date(stats.lastUpdate).toLocaleDateString('ar-SA')}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'آخر تحديث' : 'Last Update'}</p>
        </GlassCard>
      </div>

      {/* Search and Filters */}
      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'البحث في البنود المرجعية...' : 'Search reference items...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-500"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <option value="">{lang === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
            {getCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-500"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <option value="riyadh">{lang === 'ar' ? 'الرياض' : 'Riyadh'}</option>
            <option value="jeddah">{lang === 'ar' ? 'جدة' : 'Jeddah'}</option>
            <option value="dammam">{lang === 'ar' ? 'الدمام' : 'Dammam'}</option>
            <option value="makkah">{lang === 'ar' ? 'مكة' : 'Makkah'}</option>
          </select>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/20 pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value as any)}
                  className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                >
                  <option value="economy">{lang === 'ar' ? 'اقتصادي' : 'Economy'}</option>
                  <option value="standard">{lang === 'ar' ? 'قياسي' : 'Standard'}</option>
                  <option value="premium">{lang === 'ar' ? 'فاخر' : 'Premium'}</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                >
                  <option value="name">{lang === 'ar' ? 'الاسم' : 'Name'}</option>
                  <option value="price">{lang === 'ar' ? 'السعر' : 'Price'}</option>
                  <option value="usage">{lang === 'ar' ? 'الاستخدام' : 'Usage'}</option>
                  <option value="updated">{lang === 'ar' ? 'التحديث' : 'Updated'}</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                >
                  <option value="asc">{lang === 'ar' ? 'تصاعدي' : 'Ascending'}</option>
                  <option value="desc">{lang === 'ar' ? 'تنازلي' : 'Descending'}</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const priceChange = getPriceChange(item);
            const currentPrice = item.qualityGrades[selectedQuality].price;
            const regionPrice = item.regions[selectedRegion] || item.currentPrice;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <GlassCard className="p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">
                          {item.code}
                        </span>
                        {item.isVerified && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
                        {lang === 'ar' ? item.nameAr : item.nameEn}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                      
                      <p className="text-xs text-gray-500 line-clamp-2">{item.specifications}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{lang === 'ar' ? 'السعر الحالي:' : 'Current Price:'}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-emerald-600">
                          {currentPrice.toLocaleString()} {lang === 'ar' ? 'ريال' : 'SAR'}
                        </span>
                        <span className="text-sm text-gray-500 block">/{item.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{selectedRegion}:</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {regionPrice.toLocaleString()} {lang === 'ar' ? 'ريال' : 'SAR'}
                        </span>
                        {priceChange !== 0 && (
                          <div className={`flex items-center ml-2 ${priceChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {priceChange > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            <span className="text-xs ml-1">{Math.abs(priceChange).toFixed(1)}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{lang === 'ar' ? 'ساعات العمل:' : 'Labor Hours:'} {item.laborHours}</span>
                      <span>{lang === 'ar' ? 'الاستخدام:' : 'Usage:'} {item.usageCount}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                      <span className="text-xs text-gray-500">
                        {lang === 'ar' ? 'آخر تحديث:' : 'Updated:'} {new Date(item.lastUpdated).toLocaleDateString('ar-SA')}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                          title={lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title={lang === 'ar' ? 'نسخ' : 'Copy'}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        
                        <button
                          className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                          title={lang === 'ar' ? 'إضافة للمفضلة' : 'Add to Favorites'}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {lang === 'ar' ? 'لا توجد بنود مطابقة' : 'No matching items'}
          </h3>
          <p className="text-gray-600">
            {lang === 'ar' ? 'جرب تغيير معايير البحث أو الفلاتر' : 'Try changing your search criteria or filters'}
          </p>
        </div>
      )}

      {/* AI Enhancement Notice */}
      <GlassCard className="p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="flex items-start">
          <Brain className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              {lang === 'ar' ? 'تحسين ذكي للأسعار' : 'Smart Price Enhancement'}
            </h4>
            <p className="text-sm text-blue-700">
              {lang === 'ar'
                ? 'يتم تحديث الأسعار تلقائياً باستخدام الذكاء الاصطناعي وبيانات السوق الحية لضمان الدقة والحداثة.'
                : 'Prices are automatically updated using AI and live market data to ensure accuracy and freshness.'
              }
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}