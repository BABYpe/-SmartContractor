import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Download, 
  Copy, 
  Building, 
  Calculator, 
  Clock, 
  Users, 
  CreditCard,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { downloadTextFile, copyToClipboard } from '../utils/file';
import toast from 'react-hot-toast';
import type { ProjectDetails, CostBreakdown, BOQItem, PaymentMilestone, Language } from '../types';

interface ProjectSummaryProps {
  projectDetails: ProjectDetails;
  estimatedCost: number | null;
  costBreakdown: CostBreakdown | null;
  customBoqItems: BOQItem[];
  paymentMilestones: PaymentMilestone[];
  projectDuration: string | null;
  lang: Language;
  t: any;
}

export default function ProjectSummary({
  projectDetails,
  estimatedCost,
  costBreakdown,
  customBoqItems,
  paymentMilestones,
  projectDuration,
  lang,
  t
}: ProjectSummaryProps) {
  const totalBoqCost = customBoqItems.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
    const wasteFactorValue = 1 + (parseFloat(projectDetails.wastePercentage) / 100 || 0);
    return sum + (itemPrice * itemQuantity * wasteFactorValue);
  }, 0);

  const totalPaymentPercentage = paymentMilestones.reduce((sum, milestone) => {
    const percentage = parseFloat(milestone.percentage) || 0;
    return sum + percentage;
  }, 0);

  const completionStatus = {
    projectDetails: !!(projectDetails.companyName && projectDetails.area),
    costEstimation: estimatedCost !== null,
    boqItems: customBoqItems.length > 0,
    paymentSchedule: Math.abs(totalPaymentPercentage - 100) < 0.01,
    projectDuration: projectDuration !== null
  };

  const completionPercentage = Object.values(completionStatus).filter(Boolean).length / Object.keys(completionStatus).length * 100;

  const generateComprehensiveReport = () => {
    const currentProjectType = t[projectDetails.projectType as keyof typeof t];
    const currentCity = t[projectDetails.city as keyof typeof t];

    const report = `
# تقرير ملخص المشروع الشامل
## ${projectDetails.companyName || 'مشروع إنشائي'}

### معلومات المشروع الأساسية
- **نوع المشروع:** ${currentProjectType}
- **الموقع:** ${currentCity}
- **المساحة المبنية:** ${projectDetails.area} متر مربع
- **تاريخ المشروع:** ${projectDetails.projectDate || 'غير محدد'}
- **هامش الربح:** ${projectDetails.profitMargin}%
- **نسبة الهدر:** ${projectDetails.wastePercentage}%

### التكلفة التقديرية الإجمالية
${estimatedCost ? `**التكلفة الإجمالية:** ${estimatedCost.toLocaleString()} ريال سعودي` : 'لم يتم تقدير التكلفة بعد'}
${estimatedCost && projectDetails.area ? `**التكلفة للمتر المربع:** ${Math.round(estimatedCost / parseFloat(projectDetails.area)).toLocaleString()} ريال/م²` : ''}

### تفصيل التكاليف
${costBreakdown ? Object.entries(costBreakdown).map(([category, cost]) => 
  `- **${category}:** ${cost.toLocaleString()} ريال سعودي`
).join('\n') : 'لا توجد تفاصيل تكلفة متاحة'}

### بنود الأعمال المخصصة
${customBoqItems.length > 0 ? `
**عدد البنود:** ${customBoqItems.length}
**إجمالي تكلفة البنود:** ${totalBoqCost.toLocaleString()} ريال سعودي

**تفصيل البنود:**
${customBoqItems.map(item => 
  `- ${item.itemName}: ${item.quantity} ${item.unit} × ${item.price ? item.price.toLocaleString() : 'غير متوفر'} = ${item.price ? (item.price * item.quantity * (1 + (parseFloat(projectDetails.wastePercentage) / 100 || 0))).toLocaleString() : 'غير متوفر'} ريال`
).join('\n')}
` : 'لم يتم إضافة بنود أعمال مخصصة'}

### جدول الدفعات
${paymentMilestones.length > 0 && paymentMilestones[0].name ? `
**إجمالي النسب:** ${totalPaymentPercentage.toFixed(1)}%
**حالة الجدول:** ${Math.abs(totalPaymentPercentage - 100) < 0.01 ? '✅ مكتمل' : '⚠️ غير مكتمل'}

**تفصيل الدفعات:**
${paymentMilestones.filter(m => m.name).map((milestone, index) => 
  `${index + 1}. ${milestone.name}: ${milestone.percentage}%`
).join('\n')}
` : 'لم يتم تحديد جدول الدفعات'}

### المدة الزمنية للمشروع
${projectDuration ? projectDuration : 'لم يتم تقدير المدة الزمنية بعد'}

### حالة اكتمال المشروع
**نسبة الاكتمال الإجمالية:** ${completionPercentage.toFixed(0)}%

- تفاصيل المشروع: ${completionStatus.projectDetails ? '✅' : '❌'}
- تقدير التكلفة: ${completionStatus.costEstimation ? '✅' : '❌'}
- بنود الأعمال: ${completionStatus.boqItems ? '✅' : '❌'}
- جدول الدفعات: ${completionStatus.paymentSchedule ? '✅' : '❌'}
- المدة الزمنية: ${completionStatus.projectDuration ? '✅' : '❌'}

### ملاحظات وتوصيات
- هذا التقرير تم إنشاؤه بواسطة منصة SmartContractor Pro
- جميع التقديرات قابلة للمراجعة والتحديث
- يُنصح بمراجعة الأسعار مع السوق المحلي
- التكاليف شاملة لضريبة القيمة المضافة 15%

---
تم إنشاء هذا التقرير في: ${new Date().toLocaleDateString('ar-SA')}
`;

    return report;
  };

  const handleExportReport = () => {
    const report = generateComprehensiveReport();
    downloadTextFile(report, `project-summary-${Date.now()}.txt`);
    toast.success('تم تصدير التقرير بنجاح');
  };

  const handleCopyReport = async () => {
    const report = generateComprehensiveReport();
    const success = await copyToClipboard(report);
    if (success) {
      toast.success('تم نسخ التقرير بنجاح');
    } else {
      toast.error('فشل في نسخ التقرير');
    }
  };

  return (
    <GlassCard gradient="from-indigo-500/20 to-purple-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-8">
          <BarChart3 className="w-8 h-8 text-indigo-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">
            {lang === 'ar' ? 'ملخص المشروع الشامل' : 'Comprehensive Project Summary'}
          </h2>
        </div>

        {/* Project Completion Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {lang === 'ar' ? 'حالة اكتمال المشروع' : 'Project Completion Status'}
            </h3>
            <div className="text-right">
              <span className="text-2xl font-bold text-indigo-600">{completionPercentage.toFixed(0)}%</span>
              <p className="text-sm text-gray-600">{lang === 'ar' ? 'مكتمل' : 'Complete'}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { key: 'projectDetails', icon: Building, label: lang === 'ar' ? 'تفاصيل المشروع' : 'Project Details' },
              { key: 'costEstimation', icon: Calculator, label: lang === 'ar' ? 'تقدير التكلفة' : 'Cost Estimation' },
              { key: 'boqItems', icon: CheckCircle, label: lang === 'ar' ? 'بنود الأعمال' : 'BOQ Items' },
              { key: 'paymentSchedule', icon: CreditCard, label: lang === 'ar' ? 'جدول الدفعات' : 'Payment Schedule' },
              { key: 'projectDuration', icon: Clock, label: lang === 'ar' ? 'المدة الزمنية' : 'Duration' }
            ].map(({ key, icon: Icon, label }) => (
              <div
                key={key}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  completionStatus[key as keyof typeof completionStatus]
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className="w-5 h-5" />
                  {completionStatus[key as keyof typeof completionStatus] ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Calculator className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {lang === 'ar' ? 'التكلفة الإجمالية' : 'Total Cost'}
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              {estimatedCost ? `${estimatedCost.toLocaleString()} SAR` : '--'}
            </p>
            {estimatedCost && projectDetails.area && (
              <p className="text-sm text-gray-600 mt-1">
                {Math.round(estimatedCost / parseFloat(projectDetails.area)).toLocaleString()} {lang === 'ar' ? 'ريال/م²' : 'SAR/m²'}
              </p>
            )}
          </motion.div>

          <motion.div
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {customBoqItems.length}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {lang === 'ar' ? 'بنود الأعمال' : 'BOQ Items'}
            </h4>
            <p className="text-2xl font-bold text-green-600">
              {totalBoqCost > 0 ? `${totalBoqCost.toLocaleString()} SAR` : '--'}
            </p>
          </motion.div>

          <motion.div
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-yellow-600" />
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                Math.abs(totalPaymentPercentage - 100) < 0.01
                  ? 'text-green-600 bg-green-100'
                  : 'text-red-600 bg-red-100'
              }`}>
                {totalPaymentPercentage.toFixed(0)}%
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {lang === 'ar' ? 'جدول الدفعات' : 'Payment Schedule'}
            </h4>
            <p className="text-2xl font-bold text-yellow-600">
              {paymentMilestones.filter(m => m.name).length} {lang === 'ar' ? 'مراحل' : 'Milestones'}
            </p>
          </motion.div>

          <motion.div
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {lang === 'ar' ? 'حالة المشروع' : 'Project Status'}
            </h4>
            <p className="text-2xl font-bold text-purple-600">
              {projectDuration ? (lang === 'ar' ? 'مقدر' : 'Estimated') : '--'}
            </p>
          </motion.div>
        </div>

        {/* Detailed Breakdown */}
        {costBreakdown && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {lang === 'ar' ? 'تفصيل التكاليف' : 'Cost Breakdown'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(costBreakdown).map(([category, cost]) => {
                const percentage = estimatedCost ? ((cost / estimatedCost) * 100).toFixed(1) : '0';
                return (
                  <div key={category} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{category}</span>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {percentage}%
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{cost.toLocaleString()} SAR</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <AnimatedButton
            onClick={handleExportReport}
            variant="primary"
            size="lg"
            className="flex-1"
          >
            <Download className="w-5 h-5 mr-2" />
            {lang === 'ar' ? 'تصدير التقرير الشامل' : 'Export Comprehensive Report'}
          </AnimatedButton>
          
          <AnimatedButton
            onClick={handleCopyReport}
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            <Copy className="w-5 h-5 mr-2" />
            {lang === 'ar' ? 'نسخ التقرير' : 'Copy Report'}
          </AnimatedButton>
        </div>

        {/* Completion Notice */}
        {completionPercentage < 100 && (
          <div className="mt-6 p-4 bg-yellow-100/50 backdrop-blur-sm rounded-xl border border-yellow-200/50">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700 font-medium mb-1">
                  {lang === 'ar' ? 'المشروع غير مكتمل' : 'Project Incomplete'}
                </p>
                <p className="text-sm text-gray-600">
                  {lang === 'ar' 
                    ? 'يرجى إكمال جميع الأقسام للحصول على تقرير شامل ودقيق.'
                    : 'Please complete all sections for a comprehensive and accurate report.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}