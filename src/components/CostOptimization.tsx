import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Download, Copy, Lightbulb } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { callGeminiAPI } from '../utils/api';
import { downloadTextFile, copyToClipboard } from '../utils/file';
import toast from 'react-hot-toast';
import type { BOQItem, Language } from '../types';

interface CostOptimizationProps {
  estimatedCost: number | null;
  customBoqItems: BOQItem[];
  projectType: string;
  city: string;
  area: string;
  wastePercentage: string;
  lang: Language;
  t: any;
}

export default function CostOptimization({
  estimatedCost,
  customBoqItems,
  projectType,
  city,
  area,
  wastePercentage,
  lang,
  t
}: CostOptimizationProps) {
  const [costOptimizationSuggestions, setCostOptimizationSuggestions] = useState<string | null>(null);
  const [isGeneratingCostOptimizations, setIsGeneratingCostOptimizations] = useState(false);

  const generateCostOptimizationSuggestions = async () => {
    if (estimatedCost === null) {
      toast.error(t.optimizationNoEstimate);
      return;
    }

    if (customBoqItems.length === 0) {
      toast.error(t.optimizationNoBoq);
      return;
    }

    setIsGeneratingCostOptimizations(true);
    setCostOptimizationSuggestions(null);

    const currentProjectType = t[projectType as keyof typeof t];
    const currentCity = t[city as keyof typeof t];

    const boqDetailedList = customBoqItems.map(item => 
      `${item.itemName} (الكمية: ${item.quantity} ${item.unit}، التكلفة التقديرية: ${item.price ? (item.price * item.quantity * (1 + (parseFloat(wastePercentage) / 100 || 0))).toLocaleString() : 'غير متوفر'} SAR)`
    ).join('؛ ');

    const prompt = `بصفتك خبيراً في هندسة القيمة وإدارة التكاليف في قطاع البناء السعودي، قم بتحليل بنود الأعمال التالية لمشروع ${currentProjectType} في ${currentCity} بمساحة ${area} متر مربع، بتكلفة تقديرية إجمالية ${estimatedCost.toLocaleString()} ريال سعودي: ${boqDetailedList}.

    قدم تحليلاً شاملاً واقتراحات عملية لتحسين التكلفة وزيادة الكفاءة:

    **1. تحليل التكاليف الحالية:**
    - تحديد البنود عالية التكلفة
    - نسبة كل بند من إجمالي التكلفة
    - تحليل القيمة مقابل التكلفة لكل بند

    **2. بدائل المواد والتقنيات:**

    **أ) بدائل المواد المحلية:**
    - استخدام الحجر الطبيعي السعودي بدلاً من المستورد
    - الخرسانة الجاهزة المحلية عالية الجودة
    - حديد التسليح من المصانع المحلية (حديد الراجحي، اليمامة)
    - مواد العزل المحلية المطابقة للمعايير

    **ب) تقنيات البناء المحسنة:**
    - استخدام تقنيات البناء الجاهز (Precast)
    - أنظمة الشدات المعدنية القابلة لإعادة الاستخدام
    - تقنيات صب الخرسانة المتقدمة لتقليل الهدر
    - استخدام المضافات لتحسين خواص الخرسانة

    **3. تحسين سلسلة التوريد:**
    - الشراء المباشر من المصانع
    - التفاوض على أسعار الكميات الكبيرة
    - تحسين جدولة التوريد لتقليل تكاليف التخزين
    - استخدام موردين محليين لتقليل تكاليف النقل

    **4. إدارة النفايات والهدر:**
    - تطبيق مبادئ البناء الأخضر
    - إعادة تدوير مخلفات البناء
    - تحسين التخطيط لتقليل الهدر في المواد
    - استخدام تقنيات القطع الدقيق للمواد

    **5. تحسين الكفاءة التشغيلية:**
    - تحسين جدولة العمل لتقليل وقت الخمول
    - استخدام المعدات الحديثة عالية الكفاءة
    - تدريب العمالة لتحسين الإنتاجية
    - تطبيق أنظمة إدارة المشاريع الرقمية

    **6. الاستفادة من التقنيات الحديثة:**
    - استخدام نمذجة معلومات البناء (BIM) لتحسين التخطيط
    - تطبيق تقنيات الذكاء الاصطناعي في إدارة المشاريع
    - استخدام الطائرات بدون طيار للمراقبة والمسح
    - تطبيق إنترنت الأشياء (IoT) لمراقبة المعدات

    **7. التحسينات المالية:**
    - تحسين شروط الدفع مع الموردين
    - الاستفادة من برامج التمويل الحكومية
    - تحسين إدارة التدفق النقدي
    - تقليل تكاليف التأمين من خلال تحسين السلامة

    **8. الاستدامة والكفاءة البيئية:**
    - استخدام مواد صديقة للبيئة
    - تطبيق معايير البناء الأخضر
    - تحسين كفاءة الطاقة في التصميم
    - استخدام الطاقة المتجددة في الموقع

    **9. التوصيات الخاصة بالسوق السعودي:**
    - الاستفادة من مبادرات رؤية 2030
    - التوطين وتدريب العمالة المحلية
    - الشراكة مع الشركات المحلية
    - الامتثال لمعايير الجودة السعودية

    **10. خطة التنفيذ المقترحة:**
    - ترتيب الأولويات حسب التأثير والسهولة
    - جدول زمني للتطبيق
    - مؤشرات قياس النجاح
    - آليات المتابعة والتقييم

    لكل اقتراح، قدم:
    - التوفير المتوقع في التكلفة (نسبة مئوية أو مبلغ تقديري)
    - سهولة التطبيق (سهل/متوسط/صعب)
    - الوقت المطلوب للتنفيذ
    - المخاطر المحتملة وطرق التخفيف منها

    اجعل الاقتراحات عملية وقابلة للتطبيق في السياق السعودي، ومناسبة للغة ${lang === 'ar' ? 'العربية الفصحى' : 'الإنجليزية الاحترافية'}.`;

    try {
      const response = await callGeminiAPI(prompt);
      if (response) {
        setCostOptimizationSuggestions(response);
        toast.success('تم توليد اقتراحات التحسين بنجاح');
      } else {
        toast.error(t.optimizationGenerationError);
      }
    } catch (error) {
      console.error("Error generating optimization suggestions:", error);
      toast.error(t.optimizationNetworkError);
    } finally {
      setIsGeneratingCostOptimizations(false);
    }
  };

  const handleCopyToClipboard = async (content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      toast.success(t.copySuccess);
    } else {
      toast.error(t.copyFail);
    }
  };

  return (
    <GlassCard gradient="from-green-500/20 to-teal-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <TrendingDown className="w-8 h-8 text-green-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{t.costOptimizationTitle}</h2>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          {t.costOptimizationInstruction}
        </p>

        <AnimatedButton
          onClick={generateCostOptimizationSuggestions}
          loading={isGeneratingCostOptimizations}
          disabled={estimatedCost === null || customBoqItems.length === 0}
          variant="success"
          size="lg"
          className="w-full mb-6"
        >
          <Lightbulb className="w-5 h-5 mr-2" />
          {isGeneratingCostOptimizations ? t.generatingOptimization : t.generateOptimizationButton}
        </AnimatedButton>

        {costOptimizationSuggestions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.optimizationHeader}</h3>
            <div 
              className="prose max-w-none text-gray-700 text-sm leading-relaxed"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {costOptimizationSuggestions}
            </div>
            <div className="flex gap-2 mt-6">
              <AnimatedButton
                onClick={() => downloadTextFile(costOptimizationSuggestions, 'cost-optimization-suggestions.txt')}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.exportButton}
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleCopyToClipboard(costOptimizationSuggestions)}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                {t.copyButton}
              </AnimatedButton>
            </div>
          </motion.div>
        )}

        {(estimatedCost === null || customBoqItems.length === 0) && (
          <div className="bg-yellow-100/50 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50">
            <p className="text-sm text-gray-600 text-center">
              {estimatedCost === null ? t.optimizationNoEstimate : t.optimizationNoBoq}
            </p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}