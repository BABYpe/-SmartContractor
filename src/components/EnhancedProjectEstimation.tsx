import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, PieChart, AlertCircle, Zap, Brain } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import EnhancedDropdownSelect from './EnhancedDropdownSelect';
import { callGeminiAPI, extractJSONFromResponse } from '../utils/api';
import { marketPricingEngine } from '../utils/marketPricing';
import { securityManager } from '../utils/securityManager';
import { performanceMonitor } from '../utils/performanceMonitor';
import type { ProjectDetails, CostBreakdown, BOQItem, Language } from '../types';

interface EnhancedProjectEstimationProps {
  projectDetails: ProjectDetails;
  setProjectDetails: (details: ProjectDetails) => void;
  estimatedCost: number | null;
  setEstimatedCost: (cost: number | null) => void;
  costBreakdown: CostBreakdown | null;
  setCostBreakdown: (breakdown: CostBreakdown | null) => void;
  customBoqItems: BOQItem[];
  setCustomBoqItems: (items: BOQItem[]) => void;
  lang: Language;
  t: any;
}

export default function EnhancedProjectEstimation({
  projectDetails,
  setProjectDetails,
  estimatedCost,
  setEstimatedCost,
  costBreakdown,
  setCostBreakdown,
  customBoqItems,
  setCustomBoqItems,
  lang,
  t
}: EnhancedProjectEstimationProps) {
  const [isEstimating, setIsEstimating] = useState(false);
  const [message, setMessage] = useState('');

  // خيارات المدن مع الترجمة
  const cityOptions = [
    { value: 'riyadh', label: 'الرياض', labelEn: 'Riyadh' },
    { value: 'jeddah', label: 'جدة', labelEn: 'Jeddah' },
    { value: 'dammam', label: 'الدمام', labelEn: 'Dammam' },
    { value: 'madinah', label: 'المدينة المنورة', labelEn: 'Madinah' },
    { value: 'makkah', label: 'مكة المكرمة', labelEn: 'Makkah' },
    { value: 'khobar', label: 'الخبر', labelEn: 'Khobar' },
    { value: 'abha', label: 'أبها', labelEn: 'Abha' },
    { value: 'taif', label: 'الطائف', labelEn: 'Taif' },
    { value: 'tabuk', label: 'تبوك', labelEn: 'Tabuk' },
    { value: 'hail', label: 'حائل', labelEn: 'Hail' },
    { value: 'qassim', label: 'القصيم', labelEn: 'Qassim' }
  ];

  // خيارات أنواع المشاريع مع الترجمة
  const projectTypeOptions = [
    { value: 'residential', label: 'مشاريع سكنية', labelEn: 'Residential Projects' },
    { value: 'commercial', label: 'مشاريع تجارية', labelEn: 'Commercial Projects' },
    { value: 'industrial', label: 'مشاريع صناعية', labelEn: 'Industrial Projects' },
    { value: 'infrastructure', label: 'مشاريع البنية التحتية', labelEn: 'Infrastructure Projects' },
    { value: 'public', label: 'مشاريع عامة', labelEn: 'Public Projects' },
    { value: 'renewable_energy', label: 'مشاريع الطاقة المتجددة', labelEn: 'Renewable Energy Projects' },
    { value: 'mega_projects', label: 'المشاريع الضخمة', labelEn: 'Mega Projects' }
  ];

  const handleGenerateEstimate = async () => {
    try {
      setMessage('');
      setEstimatedCost(null);
      setCostBreakdown(null);
      setIsEstimating(true);

      // التحقق من صحة البيانات
      if (!projectDetails.area || isNaN(parseFloat(projectDetails.area)) || parseFloat(projectDetails.area) <= 0) {
        setMessage(lang === 'ar' ? 'يرجى إدخال مساحة صحيحة للمشروع' : 'Please enter a valid project area');
        return;
      }

      if (parseFloat(projectDetails.area) > 50000) {
        setMessage(lang === 'ar' ? 'المساحة كبيرة جداً. يرجى إدخال مساحة أقل من 50,000 متر مربع.' : 'Area too large. Please enter an area less than 50,000 square meters.');
        return;
      }

      // تشفير البيانات الحساسة
      const encryptedProjectData = securityManager.encryptData(projectDetails);

      // قياس الأداء
      await performanceMonitor.measureFunction('project_estimation', async () => {
        const currentProjectType = projectTypeOptions.find(p => p.value === projectDetails.projectType);
        const currentCity = cityOptions.find(c => c.value === projectDetails.city);

        const projectTypeLabel = lang === 'ar' ? currentProjectType?.label : currentProjectType?.labelEn;
        const cityLabel = lang === 'ar' ? currentCity?.label : currentCity?.labelEn;

        // توليد تقدير التكلفة مع بنود BOQ
        const prompt = `بصفتك خبيراً في تقدير تكاليف البناء في المملكة العربية السعودية، قم بتوليد تقدير شامل لمشروع ${projectTypeLabel} في ${cityLabel} بمساحة بناء ${projectDetails.area} متر مربع.

        قدم النتائج في تنسيق JSON يحتوي على:
        1. تفصيل التكاليف الرئيسية (costBreakdown)
        2. قائمة مفصلة ببنود الأعمال (boqItems)

        تنسيق الإخراج المطلوب:
        {
          "costBreakdown": [
            {"category": "أعمال إنشائية", "cost": 150000},
            {"category": "أعمال التشطيبات", "cost": 100000},
            {"category": "أعمال كهروميكانيكية", "cost": 50000},
            {"category": "أعمال البنية التحتية", "cost": 75000},
            {"category": "أعمال خارجية ومناظر طبيعية", "cost": 25000},
            {"category": "تكاليف غير مباشرة", "cost": 30000},
            {"category": "تكاليف طوارئ", "cost": 15000}
          ],
          "boqItems": [
            {
              "itemName": "أعمال حفر وردم",
              "quantity": 200,
              "unit": "متر مكعب",
              "specifications": "حفر في تربة عادية بعمق متوسط 1.5 متر",
              "laborHours": 8
            },
            {
              "itemName": "صب خرسانة مسلحة للأساسات",
              "quantity": 80,
              "unit": "متر مكعب",
              "specifications": "خرسانة مقاومة 25 ميجاباسكال مع حديد تسليح",
              "laborHours": 12
            }
          ]
        }

        تأكد من أن:
        - الأرقام واقعية ومناسبة للسوق السعودي
        - بنود BOQ شاملة ومفصلة
        - المواصفات واضحة ومحددة
        - ساعات العمل منطقية لكل بند`;

        const response = await callGeminiAPI(prompt);
        if (response) {
          const parsedData = extractJSONFromResponse(response);
          
          if (!parsedData.costBreakdown || !parsedData.boqItems) {
            throw new Error("AI did not return valid data structure.");
          }

          // معالجة تفصيل التكاليف
          const breakdownMap: CostBreakdown = {};
          parsedData.costBreakdown.forEach((item: any) => {
            if (item.category && typeof item.cost === 'number' && item.cost > 0) {
              breakdownMap[item.category] = item.cost;
            }
          });
          
          if (Object.keys(breakdownMap).length === 0) {
            throw new Error("No valid cost categories found in response.");
          }
          
          setCostBreakdown(breakdownMap);
          
          // حساب التكلفة الإجمالية
          const baseCost = Object.values(breakdownMap).reduce((sum, cost) => sum + cost, 0);
          const wasteFactor = 1 + (parseFloat(projectDetails.wastePercentage) / 100 || 0);
          const profitFactor = 1 + (parseFloat(projectDetails.profitMargin) / 100 || 0);
          
          const finalEstimatedCost = Math.round(baseCost * wasteFactor * profitFactor);
          setEstimatedCost(finalEstimatedCost);

          // معالجة بنود BOQ
          const boqItems: BOQItem[] = parsedData.boqItems.map((item: any) => ({
            id: crypto.randomUUID(),
            itemName: item.itemName || 'بند غير محدد',
            quantity: item.quantity || 1,
            unit: item.unit || 'وحدة',
            price: null,
            loading: false,
            error: false,
            source: 'ai' as const,
            specifications: item.specifications || '',
            laborHours: item.laborHours || 8,
            lastUpdated: new Date().toISOString(),
            verified: false
          }));

          // تحديث أسعار البنود من السوق
          const pricedItems = await marketPricingEngine.updatePricesForItems(boqItems, projectDetails.city);
          setCustomBoqItems(pricedItems);
          
          setMessage(lang === 'ar' ? 
            'تم تقدير التكلفة وتوليد بنود الأعمال بنجاح! يمكنك الآن مراجعة وتعديل البنود في قسم جدول الكميات.' :
            'Cost estimation and work items generated successfully! You can now review and modify items in the BOQ section.'
          );
        } else {
          setMessage(lang === 'ar' ? 'فشل في تقدير التكلفة. يرجى المحاولة مرة أخرى.' : 'Failed to estimate cost. Please try again.');
        }
      });
    } catch (error) {
      console.error("Error in enhanced project estimation:", error);
      securityManager.handleError('estimation_error', error);
      setMessage(lang === 'ar' ? 'حدث خطأ أثناء التقدير. يرجى التحقق من اتصالك بالإنترنت.' : 'An error occurred during estimation. Please check your internet connection.');
    } finally {
      setIsEstimating(false);
    }
  };

  const getCostPerSquareMeter = () => {
    if (estimatedCost && projectDetails.area) {
      return Math.round(estimatedCost / parseFloat(projectDetails.area));
    }
    return 0;
  };

  return (
    <GlassCard gradient="from-indigo-500/20 to-purple-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <div className="relative mr-3">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <Brain className="w-4 h-4 text-purple-600 absolute -top-1 -right-1" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {lang === 'ar' ? 'تقدير المشروع الذكي المتقدم' : 'Advanced Smart Project Estimation'}
            </h2>
            <p className="text-gray-600 mt-1">
              {lang === 'ar' ? 'مدعوم بالذكاء الاصطناعي والتسعير اللحظي' : 'Powered by AI and real-time pricing'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* City Selection */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              {lang === 'ar' ? 'المدينة' : 'City'}
            </label>
            <EnhancedDropdownSelect
              options={cityOptions}
              value={projectDetails.city}
              onChange={(value) => setProjectDetails({ ...projectDetails, city: value })}
              placeholder={lang === 'ar' ? 'اختر المدينة' : 'Select City'}
              lang={lang}
            />
          </div>

          {/* Area Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              {lang === 'ar' ? 'المساحة (متر مربع)' : 'Area (Square Meters)'}
            </label>
            <input
              type="number"
              value={projectDetails.area}
              onChange={(e) => setProjectDetails({ ...projectDetails, area: e.target.value })}
              placeholder={lang === 'ar' ? 'أدخل المساحة' : 'Enter area'}
              className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              min="1"
              max="50000"
              dir="ltr"
            />
          </div>

          {/* Project Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              {lang === 'ar' ? 'نوع المشروع' : 'Project Type'}
            </label>
            <EnhancedDropdownSelect
              options={projectTypeOptions}
              value={projectDetails.projectType}
              onChange={(value) => setProjectDetails({ ...projectDetails, projectType: value })}
              placeholder={lang === 'ar' ? 'اختر نوع المشروع' : 'Select Project Type'}
              lang={lang}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              {lang === 'ar' ? 'هامش الربح (%)' : 'Profit Margin (%)'}
            </label>
            <input
              type="number"
              value={projectDetails.profitMargin}
              onChange={(e) => setProjectDetails({ ...projectDetails, profitMargin: e.target.value })}
              placeholder="15"
              className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              min="0"
              max="50"
              dir="ltr"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              {lang === 'ar' ? 'نسبة الهدر (%)' : 'Waste Percentage (%)'}
            </label>
            <input
              type="number"
              value={projectDetails.wastePercentage}
              onChange={(e) => setProjectDetails({ ...projectDetails, wastePercentage: e.target.value })}
              placeholder="5"
              className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              min="0"
              max="25"
              dir="ltr"
            />
          </div>
        </div>

        <AnimatedButton
          onClick={handleGenerateEstimate}
          disabled={isEstimating || !projectDetails.area}
          loading={isEstimating}
          variant="primary"
          size="lg"
          className="w-full mb-6"
        >
          <Zap className="w-5 h-5 mr-2" />
          {isEstimating ? 
            (lang === 'ar' ? 'جاري التقدير الذكي...' : 'Smart estimation in progress...') : 
            (lang === 'ar' ? 'تقدير ذكي شامل مع بنود الأعمال' : 'Comprehensive smart estimation with work items')
          }
        </AnimatedButton>

        {/* Results Display */}
        {estimatedCost !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {lang === 'ar' ? 'التكلفة التقديرية للمشروع' : 'Estimated Project Cost'}
              </h3>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                <p className="text-4xl font-black text-green-600">
                  SAR {estimatedCost.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100/50 backdrop-blur-sm rounded-xl p-3 border border-green-200/50">
                <p className="text-lg font-semibold text-green-800">
                  {lang === 'ar' ? 
                    `التكلفة للمتر المربع: ${getCostPerSquareMeter().toLocaleString()} ريال/م²` :
                    `Cost per square meter: ${getCostPerSquareMeter().toLocaleString()} SAR/m²`
                  }
                </p>
              </div>
            </div>

            {costBreakdown && (
              <div className="border-t border-white/30 pt-6">
                <div className="flex items-center mb-4">
                  <PieChart className="w-6 h-6 text-indigo-600 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-800">
                    {lang === 'ar' ? 'تفصيل التكاليف التفصيلي' : 'Detailed Cost Breakdown'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(costBreakdown).map(([category, cost]) => {
                    const percentage = ((cost / Object.values(costBreakdown).reduce((sum, c) => sum + c, 0)) * 100).toFixed(1);
                    return (
                      <motion.div
                        key={category}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-medium text-sm">{category}</span>
                          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            {percentage}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900 font-bold text-lg">{cost.toLocaleString()} SAR</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {customBoqItems.length > 0 && (
              <div className="border-t border-white/30 pt-6 mt-6">
                <div className="bg-blue-100/50 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
                  <div className="flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600 mr-2" />
                    <p className="text-blue-800 font-semibold">
                      {lang === 'ar' ? 
                        `تم توليد ${customBoqItems.length} بند في جدول الكميات تلقائياً` :
                        `${customBoqItems.length} BOQ items generated automatically`
                      }
                    </p>
                  </div>
                  <p className="text-blue-700 text-sm text-center mt-2">
                    {lang === 'ar' ? 
                      'يمكنك مراجعة وتعديل البنود في قسم "نظام إدارة جدول الكميات الموحد"' :
                      'You can review and modify items in the "Unified BOQ Management System" section'
                    }
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-yellow-100/50 backdrop-blur-sm rounded-xl border border-yellow-200/50">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {lang === 'ar' ? 
                    'هذا التقدير تقريبي ويعتمد على متوسط أسعار السوق الحالية. قد تختلف التكلفة الفعلية حسب المواصفات التفصيلية والظروف الخاصة بالمشروع.' :
                    'This estimate is approximate and based on current market price averages. Actual costs may vary depending on detailed specifications and project-specific conditions.'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 backdrop-blur-sm rounded-xl text-center ${
              message.includes('بنجاح') || message.includes('success') 
                ? 'bg-green-100/50 border border-green-300/50 text-green-700'
                : 'bg-red-100/50 border border-red-300/50 text-red-700'
            }`}
            role="alert"
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </GlassCard>
  );
}