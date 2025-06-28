import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Download, Eye, TrendingUp, Clock, DollarSign, Building, Factory, Guitar as Hospital, Sun, Zap, ChevronDown, BookOpen, Sparkles } from 'lucide-react';
import { 
  smartProjectTemplates, 
  getTemplatesByCategory, 
  searchTemplates, 
  getPopularTemplates,
  getTopRatedTemplates,
  updateTemplateUsage,
  type ProjectTemplate 
} from '../data/projectTemplates';
import { useAdvancedTranslation } from '../hooks/useAdvancedTranslation';
import type { Language } from '../types';

interface SmartProjectTemplatesProps {
  lang: Language;
  onTemplateSelect?: (template: ProjectTemplate) => void;
}

export default function SmartProjectTemplates({ lang, onTemplateSelect }: SmartProjectTemplatesProps) {
  const { t, formatCurrency, formatNumber } = useAdvancedTranslation(lang);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredTemplates, setFilteredTemplates] = useState<ProjectTemplate[]>(smartProjectTemplates);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);

  // تحديث القائمة المفلترة
  useEffect(() => {
    let results = smartProjectTemplates;

    // تطبيق البحث النصي
    if (searchQuery.trim()) {
      results = searchTemplates(searchQuery, lang);
    }

    // تطبيق فلتر الفئة
    if (selectedCategory) {
      results = results.filter(template => template.category === selectedCategory);
    }

    // تطبيق فلتر التعقيد
    if (selectedComplexity) {
      results = results.filter(template => template.complexity === selectedComplexity);
    }

    // تطبيق الترتيب
    switch (sortBy) {
      case 'popular':
        results = results.sort((a, b) => b.usageCount - a.usageCount);
        break;
      case 'rating':
        results = results.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
        results = results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'cost_low':
        results = results.sort((a, b) => a.averageCostPerSqm.average - b.averageCostPerSqm.average);
        break;
      case 'cost_high':
        results = results.sort((a, b) => b.averageCostPerSqm.average - a.averageCostPerSqm.average);
        break;
    }

    setFilteredTemplates(results);
  }, [searchQuery, selectedCategory, selectedComplexity, sortBy, lang]);

  // الحصول على أيقونة الفئة
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      residential: Building,
      commercial: Building,
      industrial: Factory,
      public: Hospital,
      renewable_energy: Sun,
      mega_projects: Zap
    };
    return icons[category] || Building;
  };

  // الحصول على لون التعقيد
  const getComplexityColor = (complexity: string) => {
    const colors: { [key: string]: string } = {
      simple: 'green',
      medium: 'yellow',
      complex: 'orange',
      mega: 'red'
    };
    return colors[complexity] || 'gray';
  };

  // معالج اختيار القالب
  const handleTemplateSelect = (template: ProjectTemplate) => {
    updateTemplateUsage(template.id);
    setSelectedTemplate(template);
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  // فئات المشاريع
  const categories = [
    { id: 'residential', nameAr: 'مشاريع سكنية', nameEn: 'Residential Projects' },
    { id: 'commercial', nameAr: 'مشاريع تجارية', nameEn: 'Commercial Projects' },
    { id: 'industrial', nameAr: 'مشاريع صناعية', nameEn: 'Industrial Projects' },
    { id: 'public', nameAr: 'مشاريع عامة', nameEn: 'Public Projects' },
    { id: 'renewable_energy', nameAr: 'طاقة متجددة', nameEn: 'Renewable Energy' },
    { id: 'mega_projects', nameAr: 'مشاريع ضخمة', nameEn: 'Mega Projects' }
  ];

  return (
    <div className="space-y-8">
      {/* العنوان والوصف */}
      <div className="text-center">
        <motion.h1
          className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BookOpen className="inline-block w-10 h-10 mr-3 text-blue-600" />
          {lang === 'ar' ? 'مكتبة القوالب الذكية' : 'Smart Templates Library'}
        </motion.h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          {lang === 'ar' 
            ? 'قوالب جاهزة ومحدثة لجميع أنواع المشاريع مع تقديرات دقيقة وبنود أعمال شاملة'
            : 'Ready-to-use and updated templates for all project types with accurate estimates and comprehensive work items'
          }
        </p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/40"
          whileHover={{ scale: 1.02 }}
        >
          <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{smartProjectTemplates.length}</p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'قالب متاح' : 'Available Templates'}</p>
        </motion.div>

        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/40"
          whileHover={{ scale: 1.02 }}
        >
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{getPopularTemplates().length}</p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'قالب شائع' : 'Popular Templates'}</p>
        </motion.div>

        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/40"
          whileHover={{ scale: 1.02 }}
        >
          <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">4.7</p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'متوسط التقييم' : 'Average Rating'}</p>
        </motion.div>

        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/40"
          whileHover={{ scale: 1.02 }}
        >
          <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">
            {smartProjectTemplates.reduce((sum, t) => sum + t.usageCount, 0)}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'مرة استخدام' : 'Times Used'}</p>
        </motion.div>
      </div>

      {/* شريط البحث والفلاتر */}
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* البحث */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'البحث في القوالب...' : 'Search templates...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          {/* الترتيب */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/50 border border-white/30 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <option value="popular">{lang === 'ar' ? 'الأكثر شيوعاً' : 'Most Popular'}</option>
              <option value="rating">{lang === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
              <option value="recent">{lang === 'ar' ? 'الأحدث' : 'Most Recent'}</option>
              <option value="cost_low">{lang === 'ar' ? 'التكلفة (منخفض إلى عالي)' : 'Cost (Low to High)'}</option>
              <option value="cost_high">{lang === 'ar' ? 'التكلفة (عالي إلى منخفض)' : 'Cost (High to Low)'}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* زر الفلاتر */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            <Filter className="w-5 h-5 mr-2" />
            {lang === 'ar' ? 'فلاتر' : 'Filters'}
          </button>
        </div>

        {/* الفلاتر المتقدمة */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/20 pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === 'ar' ? 'فئة المشروع' : 'Project Category'}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <option value="">{lang === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {lang === 'ar' ? category.nameAr : category.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === 'ar' ? 'مستوى التعقيد' : 'Complexity Level'}
                  </label>
                  <select
                    value={selectedComplexity}
                    onChange={(e) => setSelectedComplexity(e.target.value)}
                    className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <option value="">{lang === 'ar' ? 'جميع المستويات' : 'All Levels'}</option>
                    <option value="simple">{lang === 'ar' ? 'بسيط' : 'Simple'}</option>
                    <option value="medium">{lang === 'ar' ? 'متوسط' : 'Medium'}</option>
                    <option value="complex">{lang === 'ar' ? 'معقد' : 'Complex'}</option>
                    <option value="mega">{lang === 'ar' ? 'ضخم' : 'Mega'}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* عرض القوالب */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTemplates.map((template, index) => {
            const CategoryIcon = getCategoryIcon(template.category);
            const complexityColor = getComplexityColor(template.complexity);

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => handleTemplateSelect(template)}
                whileHover={{ scale: 1.02 }}
              >
                {/* شارات الحالة */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {template.isPopular && (
                      <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {lang === 'ar' ? 'شائع' : 'Popular'}
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${complexityColor}-100 text-${complexityColor}-800`}>
                      {template.complexity === 'simple' ? (lang === 'ar' ? 'بسيط' : 'Simple') :
                       template.complexity === 'medium' ? (lang === 'ar' ? 'متوسط' : 'Medium') :
                       template.complexity === 'complex' ? (lang === 'ar' ? 'معقد' : 'Complex') :
                       (lang === 'ar' ? 'ضخم' : 'Mega')}
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium ml-1">{template.rating}</span>
                  </div>
                </div>

                {/* أيقونة الفئة */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <CategoryIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {lang === 'ar' ? template.nameAr : template.nameEn}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'ar' ? template.categoryAr : template.categoryEn}
                    </p>
                  </div>
                </div>

                {/* الوصف */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {lang === 'ar' ? template.descriptionAr : template.descriptionEn}
                </p>

                {/* معلومات التكلفة والمدة */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {lang === 'ar' ? 'التكلفة المتوقعة:' : 'Expected Cost:'}
                    </span>
                    <span className="font-medium text-gray-800">
                      {formatCurrency(template.averageCostPerSqm.average)}/م²
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {lang === 'ar' ? 'المدة المتوقعة:' : 'Expected Duration:'}
                    </span>
                    <span className="font-medium text-gray-800">
                      {lang === 'ar' ? template.estimatedDuration : template.estimatedDurationEn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {lang === 'ar' ? 'مرات الاستخدام:' : 'Usage Count:'}
                    </span>
                    <span className="font-medium text-gray-800">
                      {formatNumber(template.usageCount)}
                    </span>
                  </div>
                </div>

                {/* العلامات */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(lang === 'ar' ? template.tags : template.tagsEn).slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* زر الاستخدام */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center group-hover:shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {lang === 'ar' ? 'استخدام القالب' : 'Use Template'}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* رسالة عدم وجود نتائج */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {lang === 'ar' ? 'لا توجد قوالب مطابقة' : 'No Matching Templates'}
          </h3>
          <p className="text-gray-600">
            {lang === 'ar' 
              ? 'جرب تغيير معايير البحث أو الفلاتر'
              : 'Try changing your search criteria or filters'
            }
          </p>
        </div>
      )}

      {/* معلومات إضافية */}
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
        <div className="flex items-start">
          <Sparkles className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              {lang === 'ar' ? 'قوالب ذكية محدثة باستمرار' : 'Continuously Updated Smart Templates'}
            </h4>
            <p className="text-sm text-blue-700">
              {lang === 'ar'
                ? 'جميع القوالب محدثة بأحدث الأسعار والمواصفات السعودية ومدعومة بالذكاء الاصطناعي لضمان الدقة والشمولية.'
                : 'All templates are updated with the latest Saudi prices and specifications, powered by AI to ensure accuracy and comprehensiveness.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}