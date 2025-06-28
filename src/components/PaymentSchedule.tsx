import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2, AlertCircle } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import toast from 'react-hot-toast';
import type { PaymentMilestone, Language } from '../types';

interface PaymentScheduleProps {
  paymentMilestones: PaymentMilestone[];
  setPaymentMilestones: (milestones: PaymentMilestone[]) => void;
  lang: Language;
  t: any;
}

export default function PaymentSchedule({
  paymentMilestones,
  setPaymentMilestones,
  lang,
  t
}: PaymentScheduleProps) {
  const addPaymentMilestone = () => {
    if (paymentMilestones.length >= 10) {
      toast.error('لا يمكن إضافة أكثر من 10 مراحل دفع');
      return;
    }
    setPaymentMilestones([...paymentMilestones, { name: '', percentage: '' }]);
    toast.success('تم إضافة مرحلة دفع جديدة');
  };

  const removePaymentMilestone = (index: number) => {
    if (paymentMilestones.length <= 1) {
      toast.error('يجب الاحتفاظ بمرحلة دفع واحدة على الأقل');
      return;
    }
    const newMilestones = paymentMilestones.filter((_, i) => i !== index);
    setPaymentMilestones(newMilestones);
    toast.success('تم حذف مرحلة الدفع');
  };

  const handlePaymentMilestoneChange = (index: number, field: string, value: string) => {
    // Validation for percentage
    if (field === 'percentage') {
      const numValue = parseFloat(value);
      if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > 100)) {
        toast.error('النسبة المئوية يجب أن تكون بين 0 و 100');
        return;
      }
    }

    // Validation for name length
    if (field === 'name' && value.length > 100) {
      toast.error('اسم المرحلة طويل جداً');
      return;
    }

    const newMilestones = paymentMilestones.map((milestone, i) =>
      i === index ? { ...milestone, [field]: value } : milestone
    );
    setPaymentMilestones(newMilestones);
  };

  const totalPaymentPercentage = paymentMilestones.reduce((sum, milestone) => {
    const percentage = parseFloat(milestone.percentage) || 0;
    return sum + percentage;
  }, 0);

  const isValidPercentage = Math.abs(totalPaymentPercentage - 100) < 0.01;

  const addDefaultMilestones = () => {
    const defaultMilestones = [
      { name: 'دفعة التعاقد', percentage: '15' },
      { name: 'بداية الأعمال', percentage: '20' },
      { name: 'إنجاز الهيكل الإنشائي', percentage: '30' },
      { name: 'إنجاز التشطيبات', percentage: '25' },
      { name: 'التسليم النهائي', percentage: '10' }
    ];
    setPaymentMilestones(defaultMilestones);
    toast.success('تم إضافة جدول الدفع النموذجي');
  };

  return (
    <GlassCard gradient="from-yellow-500/20 to-amber-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <CreditCard className="w-8 h-8 text-yellow-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{t.paymentSchedule}</h2>
        </div>

        <div className="mb-6 flex gap-2">
          <AnimatedButton
            onClick={addDefaultMilestones}
            variant="secondary"
            size="sm"
          >
            إضافة جدول نموذجي
          </AnimatedButton>
        </div>

        <div className="space-y-4 mb-6">
          {paymentMilestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col">
                <label htmlFor={`milestone-name-${index}`} className="text-gray-700 font-medium mb-2">
                  {t.milestoneName}
                </label>
                <input
                  type="text"
                  id={`milestone-name-${index}`}
                  value={milestone.name}
                  onChange={(e) => handlePaymentMilestoneChange(index, 'name', e.target.value)}
                  placeholder={`مرحلة ${index + 1}`}
                  className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  maxLength={100}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor={`milestone-percentage-${index}`} className="text-gray-700 font-medium mb-2">
                  {t.percentage}
                </label>
                <input
                  type="number"
                  id={`milestone-percentage-${index}`}
                  value={milestone.percentage}
                  onChange={(e) => handlePaymentMilestoneChange(index, 'percentage', e.target.value)}
                  placeholder="0"
                  className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  min="0"
                  max="100"
                  step="0.1"
                  dir="ltr"
                />
              </div>
              <div className="flex items-end h-full">
                {paymentMilestones.length > 1 && (
                  <AnimatedButton
                    onClick={() => removePaymentMilestone(index)}
                    variant="danger"
                    size="md"
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t.removeMilestone}
                  </AnimatedButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedButton
          onClick={addPaymentMilestone}
          disabled={paymentMilestones.length >= 10}
          variant="primary"
          size="lg"
          className="w-full mb-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t.addMilestone}
        </AnimatedButton>

        <motion.div
          className={`p-4 rounded-xl text-center font-bold transition-all duration-300 ${
            isValidPercentage 
              ? 'bg-green-100/50 text-green-800 border border-green-300/50' 
              : 'bg-red-100/50 text-red-800 border border-red-300/50'
          }`}
          animate={{ scale: isValidPercentage ? 1.02 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-center mb-2">
            {!isValidPercentage && <AlertCircle className="w-5 h-5 mr-2" />}
            <p className="text-lg">
              {t.totalPercentage}: {totalPaymentPercentage.toFixed(1)}%
            </p>
          </div>
          {!isValidPercentage && (
            <p className="text-sm mt-1">
              {totalPaymentPercentage > 100 
                ? `الإجمالي يتجاوز 100% بمقدار ${(totalPaymentPercentage - 100).toFixed(1)}%`
                : `الإجمالي أقل من 100% بمقدار ${(100 - totalPaymentPercentage).toFixed(1)}%`
              }
            </p>
          )}
          {isValidPercentage && (
            <p className="text-sm mt-1 text-green-700">
              ✓ جدول الدفع صحيح ومكتمل
            </p>
          )}
        </motion.div>

        {paymentMilestones.length === 0 && (
          <div className="text-center py-8">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لم يتم إضافة أي مراحل دفع</p>
            <p className="text-gray-400 text-sm">ابدأ بإضافة مراحل الدفع لتنظيم التدفق النقدي</p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}