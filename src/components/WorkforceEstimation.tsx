import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Download, Copy } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { callGeminiAPI } from '../utils/api';
import { downloadTextFile, copyToClipboard } from '../utils/file';
import toast from 'react-hot-toast';
import type { BOQItem, Language } from '../types';

interface WorkforceEstimationProps {
  estimatedCost: number | null;
  customBoqItems: BOQItem[];
  projectType: string;
  city: string;
  area: string;
  projectDuration: string | null;
  lang: Language;
  t: any;
}

export default function WorkforceEstimation({
  estimatedCost,
  customBoqItems,
  projectType,
  city,
  area,
  projectDuration,
  lang,
  t
}: WorkforceEstimationProps) {
  const [workforceReport, setWorkforceReport] = useState<string | null>(null);
  const [isGeneratingWorkforce, setIsGeneratingWorkforce] = useState(false);

  const estimateWorkforce = async () => {
    if (estimatedCost === null || customBoqItems.length === 0) {
      toast.error(t.noProjectDetailsForWorkforce);
      return;
    }

    setIsGeneratingWorkforce(true);
    setWorkforceReport(null);

    const currentProjectType = t[projectType as keyof typeof t];
    const currentCity = t[city as keyof typeof t];

    const projectSummary = `${t.project} ${currentProjectType} في ${currentCity} بمساحة ${area} متر مربع وتكلفة تقديرية ${estimatedCost.toLocaleString()} ريال سعودي.`;
    const boqSummary = customBoqItems.length > 0 ?
      ` ويتضمن بنود الأعمال التالية: ${customBoqItems.map(item => `${item.itemName} (${item.quantity} ${item.unit})`).join('، ')}.` :
      '';
    
    const durationInfo = projectDuration ? `والمدة التقديرية ${projectDuration}.` : '';

    const prompt = `بصفتك خبيراً في تخطيط الموارد البشرية للمشاريع الإنشائية في المملكة العربية السعودية، بناءً على ${projectSummary}${boqSummary}${durationInfo}

    قدم تقريراً شاملاً لتقدير الموارد البشرية المطلوبة يشمل:

    **1. تقدير العمالة المطلوبة:**

    **أ) العمالة الماهرة:**
    - عمال الخرسانة المسلحة (عدد وتكلفة شهرية)
    - عمال البناء والمباني (عدد وتكلفة شهرية)
    - عمال التشطيبات (عدد وتكلفة شهرية)
    - عمال الكهرباء والسباكة (عدد وتكلفة شهرية)
    - عمال اللحام والحدادة (عدد وتكلفة شهرية)

    **ب) العمالة غير الماهرة:**
    - عمال عاديين للأعمال المساعدة (عدد وتكلفة شهرية)
    - عمال النظافة والخدمات (عدد وتكلفة شهرية)
    - عمال النقل والمناولة (عدد وتكلفة شهرية)

    **ج) المشغلين والسائقين:**
    - مشغلي المعدات الثقيلة (عدد وتكلفة شهرية)
    - سائقي الشاحنات والمعدات (عدد وتكلفة شهرية)

    **2. تقدير الكوادر الهندسية والإدارية:**

    **أ) الكوادر الهندسية:**
    - مهندس مشروع رئيسي (مدني/معماري)
    - مهندسين مدنيين (عدد وتخصص)
    - مهندسين معماريين (عدد وتخصص)
    - مهندسين كهربائيين (عدد وتخصص)
    - مهندسين ميكانيكيين (عدد وتخصص)
    - مهندسي السلامة والجودة (عدد وتخصص)

    **ب) الكوادر الإدارية:**
    - مدير المشروع
    - مدير الموقع
    - مشرفين فنيين (عدد وتخصص)
    - محاسب المشروع
    - مسؤول المشتريات واللوجستيات
    - مسؤول الموارد البشرية

    **3. التكلفة الإجمالية للموارد البشرية:**
    - تكلفة العمالة الشهرية (SAR)
    - تكلفة الكوادر الهندسية الشهرية (SAR)
    - تكلفة الكوادر الإدارية الشهرية (SAR)
    - التكلفة الإجمالية الشهرية (SAR)
    - التكلفة الإجمالية للمشروع (SAR)

    **4. متطلبات التوطين والامتثال:**
    - نسبة التوطين المطلوبة حسب اللوائح السعودية
    - برامج التدريب والتطوير للعمالة المحلية
    - متطلبات التأشيرات والإقامات للعمالة الأجنبية
    - الامتثال لقوانين العمل السعودية

    **5. خطة التوظيف والجدولة:**
    - جدول التوظيف حسب مراحل المشروع
    - ذروة العمالة المطلوبة
    - خطة تسريح العمالة عند انتهاء المراحل
    - احتياطي العمالة للطوارئ

    **6. التحديات والحلول:**
    - تحديات توفر العمالة الماهرة
    - استراتيجيات الاستقطاب والاحتفاظ
    - برامج التحفيز والمكافآت
    - حلول الإسكان والمواصلات

    **7. مؤشرات الأداء والمراقبة:**
    - مؤشرات إنتاجية العمالة
    - معدلات الغياب والدوران
    - مؤشرات السلامة المهنية
    - آليات التقييم والمتابعة

    **8. التوصيات الخاصة بالسوق السعودي:**
    - الاستفادة من برامج التدريب الحكومية
    - الشراكة مع المعاهد التقنية المحلية
    - تطبيق أفضل الممارسات في إدارة الموارد البشرية
    - الامتثال لمعايير رؤية 2030

    قدم الأرقام بشكل واقعي ومناسب للسوق السعودي، مع مراعاة الأسعار الحالية للأجور والرواتب.

    اجعل التقرير احترافياً، منظماً بنقاط واضحة، ومناسباً للغة ${lang === 'ar' ? 'العربية الفصحى' : 'الإنجليزية الاحترافية'}.`;

    try {
      const response = await callGeminiAPI(prompt);
      if (response) {
        setWorkforceReport(response);
        toast.success('تم توليد تقرير الموارد البشرية بنجاح');
      } else {
        toast.error('فشل تقدير العمالة. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error("Error generating workforce estimation:", error);
      toast.error('حدث خطأ أثناء تقدير العمالة. يرجى التحقق من اتصالك بالإنترنت.');
    } finally {
      setIsGeneratingWorkforce(false);
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
    <GlassCard gradient="from-emerald-500/20 to-green-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <Users className="w-8 h-8 text-emerald-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{t.workforceEstimation}</h2>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          {t.noProjectDetailsForWorkforce}
        </p>

        <AnimatedButton
          onClick={estimateWorkforce}
          loading={isGeneratingWorkforce}
          disabled={estimatedCost === null || customBoqItems.length === 0}
          variant="success"
          size="lg"
          className="w-full mb-6"
        >
          <Users className="w-5 h-5 mr-2" />
          {isGeneratingWorkforce ? t.generatingWorkforce : t.generateWorkforce}
        </AnimatedButton>

        {workforceReport && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.workforceReportHeader}</h3>
            <div 
              className="prose max-w-none text-gray-700 text-sm leading-relaxed"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {workforceReport}
            </div>
            <div className="flex gap-2 mt-6">
              <AnimatedButton
                onClick={() => downloadTextFile(workforceReport, 'workforce-estimation-report.txt')}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.exportButton}
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleCopyToClipboard(workforceReport)}
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
              {t.noProjectDetailsForWorkforce}
            </p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}