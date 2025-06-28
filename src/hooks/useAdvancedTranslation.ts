import { useMemo, useCallback } from 'react';
import { translationEngine } from '../utils/translationEngine';
import type { Language } from '../types';

export function useAdvancedTranslation(lang: Language) {
  // دالة الترجمة الأساسية
  const t = useCallback((key: string, fallback?: string) => {
    return translationEngine.translate(key, lang, fallback);
  }, [lang]);

  // دالة الترجمة مع متغيرات
  const tv = useCallback((key: string, vars: Record<string, string | number>, fallback?: string) => {
    return translationEngine.translateWithVars(key, vars, lang);
  }, [lang]);

  // دالة الترجمة المتعددة
  const tm = useCallback((keys: string[]) => {
    return translationEngine.translateMultiple(keys, lang);
  }, [lang]);

  // اتجاه النص
  const dir = useMemo(() => lang === 'ar' ? 'rtl' : 'ltr', [lang]);

  // فحص اللغة العربية
  const isRTL = useMemo(() => lang === 'ar', [lang]);

  // تنسيق الأرقام حسب اللغة
  const formatNumber = useCallback((num: number, options?: Intl.NumberFormatOptions) => {
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(num);
  }, [lang]);

  // تنسيق العملة
  const formatCurrency = useCallback((amount: number, currency: string = 'SAR') => {
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  }, [lang]);

  // تنسيق التاريخ
  const formatDate = useCallback((date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-US';
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(dateObj);
  }, [lang]);

  // تنسيق الوقت
  const formatTime = useCallback((date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(dateObj);
  }, [lang]);

  // تنسيق النسبة المئوية
  const formatPercent = useCallback((value: number, decimals: number = 1) => {
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  }, [lang]);

  // ترجمة أنواع المشاريع
  const translateProjectType = useCallback((projectType: string) => {
    return t(projectType, projectType);
  }, [t]);

  // ترجمة المدن
  const translateCity = useCallback((city: string) => {
    return t(city, city);
  }, [t]);

  // ترجمة بنود الأعمال
  const translateBoqItem = useCallback((itemKey: string) => {
    return t(itemKey, itemKey);
  }, [t]);

  // ترجمة الوحدات
  const translateUnit = useCallback((unit: string) => {
    return t(unit, unit);
  }, [t]);

  // ترجمة الحالات
  const translateStatus = useCallback((status: string) => {
    return t(status, status);
  }, [t]);

  // دالة مساعدة للحصول على النص المناسب حسب اللغة
  const getLocalizedText = useCallback((arText: string, enText: string) => {
    return lang === 'ar' ? arText : enText;
  }, [lang]);

  // دالة لترجمة الأخطاء
  const translateError = useCallback((errorKey: string, fallback: string = 'حدث خطأ غير متوقع') => {
    return t(`error_${errorKey}`, fallback);
  }, [t]);

  // دالة لترجمة رسائل النجاح
  const translateSuccess = useCallback((successKey: string, fallback: string = 'تم بنجاح') => {
    return t(`success_${successKey}`, fallback);
  }, [t]);

  return {
    t,
    tv,
    tm,
    dir,
    isRTL,
    formatNumber,
    formatCurrency,
    formatDate,
    formatTime,
    formatPercent,
    translateProjectType,
    translateCity,
    translateBoqItem,
    translateUnit,
    translateStatus,
    getLocalizedText,
    translateError,
    translateSuccess,
    lang
  };
}