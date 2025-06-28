import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Download, Copy } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { callGeminiAPI } from '../utils/api';
import { downloadTextFile, copyToClipboard } from '../utils/file';
import toast from 'react-hot-toast';
import type { BOQItem, Language } from '../types';

interface RiskAnalysisProps {
  estimatedCost: number | null;
  customBoqItems: BOQItem[];
  projectType: string;
  city: string;
  area: string;
  lang: Language;
  t: any;
}

export default function RiskAnalysis({
  estimatedCost,
  customBoqItems,
  projectType,
  city,
  area,
  lang,
  t
}: RiskAnalysisProps) {
  const [riskAnalysisInput, setRiskAnalysisInput] = useState('');
  const [riskReport, setRiskReport] = useState<string | null>(null);
  const [isGeneratingRiskReport, setIsGeneratingRiskReport] = useState(false);

  const generateRiskReport = async () => {
    if (estimatedCost === null) {
      toast.error(t.riskNoEstimate);
      return;
    }

    setIsGeneratingRiskReport(true);
    setRiskReport(null);

    const currentProjectType = t[projectType as keyof typeof t];
    const currentCity = t[city as keyof typeof t];

    const projectSummary = `${currentProjectType} ${t.project} في ${currentCity} بمساحة ${area} متر مربع وتكلفة تقديرية ${estimatedCost.toLocaleString()} ريال سعودي.`;
    const boqSummary = customBoqItems.length > 0 ?
      `ويتضمن بنود الأعمال التالية: ${customBoqItems.map(item => `${item.itemName} (${item.quantity} ${item.unit})`).join('، ')}.` :
      '';

    const prompt = `بصفتك خبيراً في إدارة المشاريع الإنشائية في المملكة العربية السعودية، قم بتحليل المخاطر المحتملة لمشروع ${projectSummary}${boqSummary} ${riskAnalysisInput ? `وتفاصيل إضافية: ${riskAnalysisInput}.` : ''}

    قدم تقريراً شاملاً يحدد:

    **1. المخاطر الرئيسية:**

    **أ) مخاطر السوق والاقتصاد:**
    - تقلبات أسعار المواد الخام والوقود
    - التضخم وتأثيره على التكاليف
    - تغيرات أسعار صرف العملات للمواد المستوردة
    - المنافسة في السوق المحلي

    **ب) مخاطر التشغيل والتنفيذ:**
    - تأخير توريد المواد والمعدات
    - نقص العمالة الماهرة
    - مشاكل الجودة في التنفيذ
    - حوادث العمل والسلامة المهنية

    **ج) المخاطر التنظيمية والقانونية:**
    - تأخير الحصول على التراخيص والموافقات
    - تغييرات في اللوائح والقوانين
    - مشاكل ملكية الأراضي
    - متطلبات الامتثال البيئي

    **د) المخاطر الجيولوجية والبيئية:**
    - طبيعة التربة وتحديات الأساسات
    - الظروف الجوية القاسية (عواصف رملية، أمطار)
    - المخاطر الزلزالية في بعض المناطق
    - التحديات البيئية والاستدامة

    **هـ) مخاطر التمويل والسيولة:**
    - تأخير الدفعات من العميل
    - تقلبات أسعار الفائدة
    - مشاكل التدفق النقدي
    - مخاطر ائتمانية

    **2. تقييم تأثير كل خطر:**
    - درجة الاحتمالية (عالية/متوسطة/منخفضة)
    - شدة التأثير على المشروع (حرج/متوسط/بسيط)
    - التأثير على الجدول الزمني والتكلفة

    **3. استراتيجيات التخفيف المقترحة:**

    **أ) استراتيجيات وقائية:**
    - دراسات الجدوى التفصيلية
    - التخطيط المسبق الشامل
    - اختيار الموردين والمقاولين الموثوقين
    - التأمين الشامل للمشروع

    **ب) استراتيجيات تشغيلية:**
    - نظام مراقبة وتتبع متقدم
    - خطط الطوارئ والبدائل
    - برامج التدريب والتطوير
    - أنظمة إدارة الجودة الصارمة

    **ج) استراتيجيات مالية:**
    - احتياطيات مالية للطوارئ
    - تنويع مصادر التمويل
    - عقود التأمين المناسبة
    - آليات تسعير مرنة

    **4. خطة مراقبة المخاطر:**
    - مؤشرات الإنذار المبكر
    - دورية المراجعة والتقييم
    - آليات الاستجابة السريعة
    - تحديث استراتيجيات التخفيف

    **5. توصيات خاصة بالسياق السعودي:**
    - الاستفادة من برامج الدعم الحكومية
    - التوطين وتدريب العمالة المحلية
    - الامتثال لرؤية 2030 ومتطلبات الاستدامة
    - التعامل مع التحديات المناخية المحلية

    اجعل التقرير احترافياً، منظماً بنقاط واضحة، ومناسباً للغة ${lang === 'ar' ? 'العربية الفصحى' : 'الإنجليزية الاحترافية'}.`;

    try {
      const response = await callGeminiAPI(prompt);
      if (response) {
        setRiskReport(response);
        toast.success('تم توليد تقرير المخاطر بنجاح');
      } else {
        toast.error(t.riskGenerationError);
      }
    } catch (error) {
      console.error("Error generating risk report:", error);
      toast.error(t.riskNetworkError);
    } finally {
      setIsGeneratingRiskReport(false);
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
    <GlassCard gradient="from-red-500/20 to-orange-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{t.riskAnalysisTitle}</h2>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          {t.riskAnalysisInstruction}
        </p>

        <div className="mb-6">
          <label htmlFor="riskAnalysisInput" className="block text-gray-700 font-medium mb-2">
            تفاصيل إضافية عن المشروع
          </label>
          <textarea
            id="riskAnalysisInput"
            value={riskAnalysisInput}
            onChange={(e) => setRiskAnalysisInput(e.target.value)}
            placeholder={t.riskAnalysisPlaceholder}
            rows={4}
            className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>

        <AnimatedButton
          onClick={generateRiskReport}
          loading={isGeneratingRiskReport}
          disabled={estimatedCost === null}
          variant="warning"
          size="lg"
          className="w-full mb-6"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          {isGeneratingRiskReport ? t.generatingRiskReport : t.generateRiskReportButton}
        </AnimatedButton>

        {riskReport && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.riskReportHeader}</h3>
            <div 
              className="prose max-w-none text-gray-700 text-sm leading-relaxed"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {riskReport}
            </div>
            <div className="flex gap-2 mt-6">
              <AnimatedButton
                onClick={() => downloadTextFile(riskReport, 'risk-analysis-report.txt')}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.exportButton}
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleCopyToClipboard(riskReport)}
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
              {t.riskNoEstimate}
            </p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}