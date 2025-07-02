import { useMemo } from 'react';
import { translations } from '../utils/translations';
import type { Language } from '../types';

export function useAdvancedTranslation(lang: Language = 'ar') {
  const translationData = useMemo(() => {
    return translations[lang] || translations.ar;
  }, [lang]);

  // Translation function
  const t = useMemo(() => {
    return (key: string): string => {
      return translationData[key as keyof typeof translationData] || key;
    };
  }, [translationData]);

  // Text direction
  const dir = useMemo(() => {
    return lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Format time
  const formatTime = useMemo(() => {
    return (date: Date): string => {
      return date.toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    };
  }, [lang]);

  // Format date
  const formatDate = useMemo(() => {
    return (date: Date): string => {
      return date.toLocaleDateString(lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  }, [lang]);

  // Format currency
  const formatCurrency = useMemo(() => {
    return (amount: number, currency: string = 'SAR'): string => {
      return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
    };
  }, [lang]);

  // Format number
  const formatNumber = useMemo(() => {
    return (num: number): string => {
      return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US').format(num);
    };
  }, [lang]);

  // Format percentage
  const formatPercentage = useMemo(() => {
    return (value: number): string => {
      return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(value / 100);
    };
  }, [lang]);

  // Format file size
  const formatFileSize = useMemo(() => {
    return (bytes: number): string => {
      const sizes = lang === 'ar' 
        ? ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت']
        : ['B', 'KB', 'MB', 'GB'];
      
      if (bytes === 0) return `0 ${sizes[0]}`;
      
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      const size = (bytes / Math.pow(1024, i)).toFixed(1);
      
      return `${size} ${sizes[i]}`;
    };
  }, [lang]);

  // Format duration
  const formatDuration = useMemo(() => {
    return (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);

      if (lang === 'ar') {
        if (hours > 0) {
          return `${hours} ساعة ${minutes} دقيقة`;
        } else if (minutes > 0) {
          return `${minutes} دقيقة ${secs} ثانية`;
        } else {
          return `${secs} ثانية`;
        }
      } else {
        if (hours > 0) {
          return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
          return `${minutes}m ${secs}s`;
        } else {
          return `${secs}s`;
        }
      }
    };
  }, [lang]);

  // Get relative time
  const getRelativeTime = useMemo(() => {
    return (date: Date): string => {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (lang === 'ar') {
        if (diffInSeconds < 60) return 'منذ لحظات';
        if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
        if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
        return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;
      } else {
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
      }
    };
  }, [lang]);

  return {
    t,
    dir,
    lang,
    formatTime,
    formatDate,
    formatCurrency,
    formatNumber,
    formatPercentage,
    formatFileSize,
    formatDuration,
    getRelativeTime
  };
}

export type { Language };