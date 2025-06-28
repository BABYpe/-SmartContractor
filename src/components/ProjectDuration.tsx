import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Download, Copy } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { callGeminiAPI } from '../utils/api';
import { downloadTextFile, copyToClipboard } from '../utils/file';
import toast from 'react-hot-toast';
import type { BOQItem, Language } from '../types';

interface ProjectDurationProps {
  estimatedCost: number | null;
  customBoqItems: BOQItem[];
  projectType: string;
  city: string;
  area: string;
  projectDuration: string | null;
  setProjectDuration: (duration: string | null) => void;
  lang: Language;
  t: any;
}

export default function ProjectDuration({
  estimatedCost,
  customBoqItems,
  projectType,
  city,
  area,
  projectDuration,
  setProjectDuration,
  lang,
  t
}: ProjectDurationProps) {
  const [isGeneratingDuration, setIsGeneratingDuration] = useState(false);

  const estimateProjectDuration = async () => {
    if (estimatedCost === null) {
      toast.error(t.durationMessage);
      return;
    }

    setIsGeneratingDuration(true);
    setProjectDuration(null);

    const currentProjectType = t[projectType as keyof typeof t];
    const currentCity = t[city as keyof typeof t];

    const projectSummary = `${t.project} ${currentProjectType} في ${currentCity} بمساحة ${area} متر مربع وتكلفة تقديرية ${estimatedCost.toLocaleString()} ريال سعودي.`;
    const boqSummary = customBoqItems.length > 0 ?
      ` ويتضمن بنود الأعمال التالية: ${customBoqItems.map(item => `${item.itemName} (${item.quantity} ${item.unit})`).join('، ')}.` :
      '';

    const prompt = `بصفتك خبيراً في تخطيط المشاريع الإنشائية في المملكة العربية السعودية، قدر المدة الزمنية الإجمالية لمشروع ${projectSummary}${boqSummary}

    قدم تقديراً شاملاً يشمل:

    **1. المدة الزمنية الإجمالية:**
    - المدة الإجمالية بالأسابيع والأشهر
    - تاريخ البدء المقترح
    - تاريخ الانتهاء المتوقع

    **2. تفصيل المراحل الزمنية:**
    - مرحلة التخطيط والتصاميم (المدة)
    - مرحلة الحصول على التراخيص (المدة)
    - مرحلة الأعمال التحضيرية (المدة)
    - مرحلة الأساسات والهيكل الإنشائي (المدة)
    - مرحلة التشطيبات الداخلية والخارجية (المدة)
    - مرحلة الأعمال الكهروميكانيكية (المدة)
    - مرحلة التسليم والاستلام (المدة)

    **3. العوامل المؤثرة على المدة:**
    - حجم وتعقيد المشروع
    - توفر العمالة والمواد
    - الظروف الجوية الموسمية
    - متطلبات الجودة والمواصفات
    - التحديات اللوجستية والموقعية

    **4. المخاطر الزمنية:**
    - احتمالية التأخير وأسبابها
    - الأنشطة الحرجة في المسار الزمني
    - خطط الطوارئ للتعامل مع التأخير
    - احتياطي زمني مقترح

    **5. استراتيجيات تسريع التنفيذ:**
    - العمل بنظام الورديات المتعددة
    - التنفيذ المتوازي للأنشطة
    - استخدام تقنيات البناء السريع
    - تحسين سلسلة التوريد

    **6. التوصيات الخاصة بالسوق السعودي:**
    - مراعاة أوقات الصلاة وأيام الجمعة
    - تجنب العمل في أوقات الذروة الحارة
    - مراعاة المواسم والأعياد الدينية
    - الامتثال للوائح العمل المحلية

    قدم التقدير بشكل واقعي ومناسب للسوق السعودي، مع مراعاة الممارسات المحلية والظروف البيئية.

    اجعل الإجابة مناسبة للغة ${lang === 'ar' ? 'العربية الفصحى' : 'الإنجليزية الاحترافية'}.`;

    try {
      const response = await callGeminiAPI(prompt);
      if (response) {
        setProjectDuration(response);
        toast.success('تم تقدير المدة الزمنية بنجاح');
      } else {
        toast.error(t.durationError);
      }
    } catch (error) {
      console.error("Error generating project duration:", error);
      toast.error(t.durationError);
    } finally {
      setIsGeneratingDuration(false);
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
    <GlassCard gradient="from-purple-500/20 to-violet-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <Clock className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{t.durationEstimationTitle}</h2>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          {t.durationMessage}
        </p>

        <AnimatedButton
          onClick={estimateProjectDuration}
          loading={isGeneratingDuration}
          disabled={estimatedCost === null}
          variant="primary"
          size="lg"
          className="w-full mb-6"
        >
          <Clock className="w-5 h-5 mr-2" />
          {isGeneratingDuration ? t.generatingDuration : t.generateDuration}
        </AnimatedButton>

        {projectDuration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.totalProjectDuration}</h3>
            <div 
              className="prose max-w-none text-gray-700 text-sm leading-relaxed"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {projectDuration}
            </div>
            <div className="flex gap-2 mt-6">
              <AnimatedButton
                onClick={() => downloadTextFile(projectDuration, 'project-duration-estimate.txt')}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.exportButton}
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleCopyToClipboard(projectDuration)}
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

        {estimatedCost === null && (
          <div className="bg-yellow-100/50 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50">
            <p className="text-sm text-gray-600 text-center">
              {t.durationMessage}
            </p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}