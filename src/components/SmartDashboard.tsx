import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Database, 
  TrendingUp, 
  Clock, 
  Brain,
  Cpu,
  BarChart3,
  Globe,
  RefreshCw
} from 'lucide-react';
import { aiOptimizer } from '../utils/aiOptimizer';
import { smartCache } from '../utils/smartCache';
import { performanceMonitor } from '../utils/performanceMonitor';
import RealTimeMarketDashboard from './RealTimeMarketDashboard';

interface SmartDashboardProps {
  lang: 'ar' | 'en';
}

export default function SmartDashboard({ lang }: SmartDashboardProps) {
  const [systemStats, setSystemStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateStats = () => {
      const stats = {
        ai: aiOptimizer.getStats(),
        cache: smartCache.getStats(),
        performance: performanceMonitor.getPerformanceReport(),
        timestamp: new Date().toISOString()
      };
      setSystemStats(stats);
      setIsLoading(false);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-gray-600">جاري تحميل لوحة التحكم الذكية...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* عنوان لوحة التحكم */}
      <div className="text-center">
        <motion.h1
          className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {lang === 'ar' ? 'لوحة التحكم الذكية' : 'Smart Dashboard'}
        </motion.h1>
        <p className="text-gray-600 text-lg">
          {lang === 'ar' 
            ? 'مراقبة شاملة لأداء النظام والذكاء الاصطناعي في الوقت الفعلي'
            : 'Comprehensive real-time monitoring of system and AI performance'
          }
        </p>
      </div>

      {/* مؤشرات الأداء الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <div className="text-right">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {lang === 'ar' ? 'محرك الذكاء الاصطناعي' : 'AI Engine'}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'الطلبات النشطة:' : 'Active Requests:'}
              </span>
              <span className="font-medium">{systemStats?.ai?.activeRequests || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'قائمة الانتظار:' : 'Queue Length:'}
              </span>
              <span className="font-medium">{systemStats?.ai?.queueLength || 0}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Database className="w-8 h-8 text-green-600" />
            <div className="text-right">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {lang === 'ar' ? 'التخزين المؤقت' : 'Cache System'}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'معدل النجاح:' : 'Hit Rate:'}
              </span>
              <span className="font-medium text-green-600">
                {((systemStats?.cache?.hitRate || 0) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'العناصر المخزنة:' : 'Cached Items:'}
              </span>
              <span className="font-medium">{systemStats?.cache?.size || 0}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Cpu className="w-8 h-8 text-purple-600" />
            <div className="text-right">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {lang === 'ar' ? 'أداء النظام' : 'System Performance'}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'وقت التحميل:' : 'Load Time:'}
              </span>
              <span className="font-medium">
                {(systemStats?.performance?.loadTime || 0).toFixed(0)}ms
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'وقت العرض:' : 'Render Time:'}
              </span>
              <span className="font-medium">
                {(systemStats?.performance?.renderTime || 0).toFixed(0)}ms
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Globe className="w-8 h-8 text-orange-600" />
            <div className="text-right">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {lang === 'ar' ? 'الاتصال المباشر' : 'Live Connection'}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'حالة الاتصال:' : 'Connection Status:'}
              </span>
              <span className="font-medium text-green-600">
                {lang === 'ar' ? 'متصل' : 'Connected'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lang === 'ar' ? 'آخر تحديث:' : 'Last Update:'}
              </span>
              <span className="font-medium">
                {new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* أخبار السوق المباشرة */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <RealTimeMarketDashboard lang={lang} />
      </motion.div>

      {/* رسم بياني للأداء */}
      <motion.div
        className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
          {lang === 'ar' ? 'مراقبة الأداء المباشر' : 'Real-time Performance Monitoring'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50/50 rounded-xl">
            <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-blue-700 mb-1">
              {lang === 'ar' ? 'معدل الاستجابة' : 'Response Rate'}
            </p>
            <p className="text-2xl font-bold text-blue-600">98.5%</p>
          </div>

          <div className="text-center p-4 bg-green-50/50 rounded-xl">
            <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-700 mb-1">
              {lang === 'ar' ? 'كفاءة الذكاء الاصطناعي' : 'AI Efficiency'}
            </p>
            <p className="text-2xl font-bold text-green-600">97.2%</p>
          </div>

          <div className="text-center p-4 bg-purple-50/50 rounded-xl">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-purple-700 mb-1">
              {lang === 'ar' ? 'متوسط وقت المعالجة' : 'Avg Processing Time'}
            </p>
            <p className="text-2xl font-bold text-purple-600">1.2s</p>
          </div>
        </div>
      </motion.div>

      {/* معلومات النظام */}
      <motion.div
        className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              {lang === 'ar' ? 'نظام ذكي متطور' : 'Advanced Smart System'}
            </h4>
            <p className="text-sm text-blue-700">
              {lang === 'ar'
                ? 'يستخدم أحدث تقنيات الذكاء الاصطناعي والتعلم الآلي لتقديم تقديرات دقيقة وسريعة'
                : 'Utilizes cutting-edge AI and machine learning technologies for accurate and fast estimates'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-sm text-blue-600 font-medium">
              {lang === 'ar' ? 'تحديث مستمر' : 'Continuous Updates'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}