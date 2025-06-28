import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Copy, Briefcase, DollarSign } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { callGeminiAPI } from '../utils/api';
import { downloadTextFile, copyToClipboard } from '../utils/file';
import toast from 'react-hot-toast';
import type { BOQItem, Language } from '../types';

interface ProposalGenerationProps {
  estimatedCost: number | null;
  customBoqItems: BOQItem[];
  projectType: string;
  city: string;
  area: string;
  companyName: string;
  projectDate: string;
  engineeringDrawings: string;
  profitMargin: string;
  wastePercentage: string;
  lang: Language;
  t: any;
}

export default function ProposalGeneration({
  estimatedCost,
  customBoqItems,
  projectType,
  city,
  area,
  companyName,
  projectDate,
  engineeringDrawings,
  profitMargin,
  wastePercentage,
  lang,
  t
}: ProposalGenerationProps) {
  const [technicalProposal, setTechnicalProposal] = useState<string | null>(null);
  const [financialProposal, setFinancialProposal] = useState<string | null>(null);
  const [isGeneratingTechnical, setIsGeneratingTechnical] = useState(false);
  const [isGeneratingFinancial, setIsGeneratingFinancial] = useState(false);

  const generateProposalContent = async (proposalType: 'technical' | 'financial') => {
    if (estimatedCost === null) {
      toast.error(t.proposalNoEstimate);
      return;
    }

    if (customBoqItems.length === 0 && proposalType === 'financial') {
      toast.error(t.proposalNoBoqForFinancial);
      return;
    }

    const currentProjectType = t[projectType as keyof typeof t];
    const currentCity = t[city as keyof typeof t];

    const boqDetailsForPrompt = customBoqItems.length > 0 ?
      ` وتفصيل بنود الـ BOQ المخصصة التالية: ${customBoqItems.map(item => 
        `${item.itemName} (الكمية: ${item.quantity} ${item.unit}) بتكلفة إجمالية تقديرية ${item.price ? (item.price * item.quantity * (1 + (parseFloat(wastePercentage) / 100 || 0))).toLocaleString() + ' SAR' : 'غير متوفر'}`
      ).join('؛ ')}.` : '';

    const companyInfo = companyName.trim() !== '' ? `بواسطة شركة ${companyName}. ` : '';
    const dateInfo = projectDate.trim() !== '' ? `تاريخ المشروع: ${projectDate}. ` : '';
    const drawingsDescription = engineeringDrawings.trim() !== '' ? ` مدعوم بالرسومات الهندسية والتقنية التالية: ${engineeringDrawings}.` : '';

    let prompt = '';

    if (proposalType === 'technical') {
      setIsGeneratingTechnical(true);
      setTechnicalProposal(null);
      
      prompt = `بصفتك خبيراً في الهندسة المعمارية والإنشائية ومتخصصاً في السوق السعودي، اكتب عرضاً فنياً وهندسياً مفصلاً ومحترفاً لمشروع ${currentProjectType} في ${currentCity}، بمساحة ${area} متر مربع، بتكلفة تقديرية إجمالية قدرها ${estimatedCost.toLocaleString()} ريال سعودي. ${companyInfo}${dateInfo}${drawingsDescription}${boqDetailsForPrompt}

      يجب أن يشمل العرض:

      **1. منهجية التصميم والتخطيط المتقدمة:**
      - المراحل التفصيلية للتصميم (مبدئي، تفصيلي، تنفيذي)
      - استخدام البرامج الهندسية الحديثة (BIM, AutoCAD, Revit)
      - التنسيق مع جميع الأطراف المعنية
      - ضمان التوافق مع اللوائح المحلية والكود السعودي

      **2. المواصفات الفنية والمواد:**
      - اختيار المواد عالية الجودة المطابقة للمواصفات السعودية (SASO)
      - الخرسانة المسلحة وحديد التسليح وفقاً للمعايير الدولية
      - أنظمة العزل الحراري والمائي المتقدمة
      - التشطيبات المعمارية عالية الجودة

      **3. أساليب البناء والتنفيذ:**
      - التقنيات المبتكرة في البناء
      - أنظمة الشدات المتطورة
      - تقنيات صب الخرسانة المتقدمة
      - إدارة المخلفات الإنشائية بشكل مستدام

      **4. إدارة الجودة وضبطها:**
      - نظام إدارة الجودة (QMS) المتبع
      - الفحوصات المخبرية الدورية
      - اختبارات الجودة للمراحل الإنشائية
      - الإشراف الهندسي المستمر

      **5. الالتزام بالكود السعودي للمباني (SBC):**
      - SBC 201 (الأحمال والقوى)
      - SBC 301 (الخرسانة)
      - SBC 401 (المنشآت المعدنية)
      - SBC 601-801-901 (الكهرباء والميكانيكا والحماية من الحريق)

      **6. الجدول الزمني المقترح:**
      - مراحل المشروع الرئيسية
      - الأنشطة الحرجة
      - ضمان التسليم في الموعد المحدد

      اجعل النص احترافياً ومنظماً بفقرات واضحة ورؤوس فرعية، مناسباً للغة ${lang === 'ar' ? 'العربية الفصحى' : 'الإنجليزية الاحترافية'}.`;
    } else {
      setIsGeneratingFinancial(true);
      setFinancialProposal(null);
      
      prompt = `بصفتك خبيراً في التمويل الإنشائي وتطوير الأعمال في المملكة العربية السعودية، اكتب عرضاً مالياً تنافسياً ومفصلاً لمشروع ${currentProjectType} في ${currentCity} بمساحة ${area} متر مربع، بتكلفة تقديرية إجمالية قدرها ${estimatedCost.toLocaleString()} ريال سعودي. ${companyInfo}${dateInfo}${boqDetailsForPrompt}

      مع الأخذ في الاعتبار هامش ربح بنسبة ${profitMargin}% ونسبة هدر متوقعة تبلغ ${wastePercentage}%.

      يجب أن يشمل العرض:

      **1. تحليل التكلفة التفصيلي:**
      - التكاليف المباشرة (مواد البناء، أجور العمالة، المعدات)
      - التكاليف غير المباشرة (إدارة المشروع، الإشراف الهندسي)
      - المصاريف الإدارية والتشغيلية
      - هامش الربح ${profitMargin}% المدروس

      **2. استراتيجية التسعير التنافسية:**
      - الموازنة المثلى بين السعر والجودة
      - وفورات التكاليف من خلال الشراء بالجملة
      - كفاءة إدارة المشروع لتقليل الهدر
      - العائد على الاستثمار للعميل

      **3. الضرائب والرسوم:**
      - ضريبة القيمة المضافة (VAT) 15%
      - الرسوم الحكومية والبلدية المطبقة

      **4. جدول الدفع المقترح:**
      - دفعة مقدمة (10-20% عند توقيع العقد)
      - دفعات مرحلية مرتبطة بالتقدم
      - دفعة نهائية (10% عند التسليم النهائي)

      **5. الضمانات وشروط العقد:**
      - الضمانات المقدمة على الأعمال والمواد
      - شروط الصيانة اللاحقة للتسليم
      - التأمينات الشاملة للمشروع

      **6. القيمة المضافة المتميزة:**
      - الخدمات الإضافية المقدمة
      - الدعم الفني المستمر
      - ضمان الجودة والالتزام بالمواعيد

      اجعل النص احترافياً ومقنعاً، مناسباً للغة ${lang === 'ar' ? 'العربية الفصحى' : 'الإنجليزية الاحترافية'}.`;
    }

    try {
      const response = await callGeminiAPI(prompt);
      if (response) {
        if (proposalType === 'technical') {
          setTechnicalProposal(response);
          toast.success('تم توليد العرض الفني بنجاح');
        } else {
          setFinancialProposal(response);
          toast.success('تم توليد العرض المالي بنجاح');
        }
      } else {
        toast.error(t.proposalError);
      }
    } catch (error) {
      console.error("Error generating proposal:", error);
      toast.error(t.proposalNetworkError);
    } finally {
      if (proposalType === 'technical') {
        setIsGeneratingTechnical(false);
      } else {
        setIsGeneratingFinancial(false);
      }
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
    <GlassCard gradient="from-purple-500/20 to-pink-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{t.proposalGenerationTitle}</h2>
        </div>

        <p className="text-gray-600 mb-8 text-center">
          {t.proposalInstruction}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Technical Proposal */}
          <div className="space-y-4">
            <AnimatedButton
              onClick={() => generateProposalContent('technical')}
              loading={isGeneratingTechnical}
              disabled={estimatedCost === null}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              {isGeneratingTechnical ? t.generatingTechnical : t.generateTechnicalProposal}
            </AnimatedButton>

            {technicalProposal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.technicalProposalHeader}</h3>
                <div 
                  className="prose max-w-none text-gray-700 text-sm leading-relaxed"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {technicalProposal}
                </div>
                <div className="flex gap-2 mt-6">
                  <AnimatedButton
                    onClick={() => downloadTextFile(technicalProposal, 'technical-proposal.txt')}
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t.exportButton}
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => handleCopyToClipboard(technicalProposal)}
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
          </div>

          {/* Financial Proposal */}
          <div className="space-y-4">
            <AnimatedButton
              onClick={() => generateProposalContent('financial')}
              loading={isGeneratingFinancial}
              disabled={estimatedCost === null || customBoqItems.length === 0}
              variant="success"
              size="lg"
              className="w-full"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              {isGeneratingFinancial ? t.generatingFinancial : t.generateFinancialProposal}
            </AnimatedButton>

            {financialProposal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.financialProposalHeader}</h3>
                <div 
                  className="prose max-w-none text-gray-700 text-sm leading-relaxed"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {financialProposal}
                </div>
                <div className="flex gap-2 mt-6">
                  <AnimatedButton
                    onClick={() => downloadTextFile(financialProposal, 'financial-proposal.txt')}
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t.exportButton}
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => handleCopyToClipboard(financialProposal)}
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
          </div>
        </div>

        {/* Requirements Notice */}
        {(estimatedCost === null || customBoqItems.length === 0) && (
          <div className="bg-yellow-100/50 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50">
            <p className="text-sm text-gray-600 text-center">
              {estimatedCost === null ? t.proposalNoEstimate : t.proposalNoBoqForFinancial}
            </p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}