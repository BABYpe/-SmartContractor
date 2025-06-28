import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  AlertCircle,
  BarChart3,
  Zap,
  Globe,
  RefreshCw,
  Calendar,
  DollarSign
} from 'lucide-react';
import { enhancedMarketEngine } from '../utils/enhancedMarketEngine';

interface Props {
  lang: 'ar' | 'en';
}

export default function RealTimeMarketDashboard({ lang }: Props) {
  const [marketNews, setMarketNews] = useState<any[]>([]);
  const [marketStats, setMarketStats] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const updateData = () => {
      const news = enhancedMarketEngine.getMarketNews(lang, 8);
      const stats = enhancedMarketEngine.getMarketStatistics();
      
      setMarketNews(news);
      setMarketStats(stats);
      setLastUpdate(new Date());
    };

    updateData();
    
    // تحديث كل دقيقة
    const interval = setInterval(updateData, 60000);
    
    // محاكاة الاتصال المباشر
    const liveInterval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(liveInterval);
    };
  }, [lang]);

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'medium': return <Activity className="w-4 h-4 text-yellow-500" />;
      default: return <TrendingDown className="w-4 h-4 text-green-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-red-200 bg-red-50/50';
      case 'medium': return 'border-yellow-200 bg-yellow-50/50';
      default: return 'border-green-200 bg-green-50/50';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* الوقت والتاريخ الحالي */}
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {formatDate(currentTime)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-lg font-bold text-gray-800">
                {formatTime(currentTime)}
              </span>
            </div>
            <motion.div
              className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}
              animate={{ scale: isLive ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* حالة السوق المباشرة */}
      <motion.div
        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            {lang === 'ar' ? 'حالة السوق المباشرة' : 'Live Market Status'}
          </h3>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
            <span className="text-xs text-gray-600">
              {lang === 'ar' ? 'تحديث مستمر' : 'Live Updates'}
            </span>
          </div>
        </div>

        {marketStats && (
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              className="text-center p-4 bg-green-50/50 rounded-lg border border-green-200/50"
              whileHover={{ scale: 1.02 }}
            >
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">
                {lang === 'ar' ? 'ارتفاع' : 'Rising'}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {marketStats.priceChanges.rising}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {lang === 'ar' ? 'بند' : 'items'}
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-4 bg-red-50/50 rounded-lg border border-red-200/50"
              whileHover={{ scale: 1.02 }}
            >
              <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-red-800">
                {lang === 'ar' ? 'انخفاض' : 'Falling'}
              </p>
              <p className="text-2xl font-bold text-red-600">
                {marketStats.priceChanges.falling}
              </p>
              <p className="text-xs text-red-700 mt-1">
                {lang === 'ar' ? 'بند' : 'items'}
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-4 bg-blue-50/50 rounded-lg border border-blue-200/50"
              whileHover={{ scale: 1.02 }}
            >
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">
                {lang === 'ar' ? 'مستقر' : 'Stable'}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {marketStats.priceChanges.stable}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {lang === 'ar' ? 'بند' : 'items'}
              </p>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* أخبار السوق العاجلة */}
      <motion.div
        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
            {lang === 'ar' ? 'أخبار السوق العاجلة' : 'Breaking Market News'}
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {lang === 'ar' ? 'آخر تحديث:' : 'Last update:'} {formatTime(lastUpdate)}
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {marketNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-4 rounded-lg border ${getImpactColor(news.impact)} overflow-hidden`}
              >
                {news.isBreaking && (
                  <motion.div
                    className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {lang === 'ar' ? 'عاجل' : 'BREAKING'}
                  </motion.div>
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center mb-2">
                      {getImpactIcon(news.impact)}
                      <h4 className="text-sm font-semibold text-gray-800 mr-2">
                        {news.title}
                      </h4>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {news.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{news.time}</span>
                        <span>•</span>
                        <span>{news.source}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-3 h-3 text-gray-500" />
                        <span className={`text-xs font-bold ${
                          news.priceChange > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {news.priceChange > 0 ? '+' : ''}{news.priceChange.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* مؤشر الأهمية */}
                <div className={`absolute right-0 top-0 bottom-0 w-1 ${
                  news.impact === 'high' ? 'bg-red-500' :
                  news.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* مؤشرات الأداء التفصيلية */}
      <motion.div
        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-600" />
          {lang === 'ar' ? 'مؤشرات الأداء التفصيلية' : 'Detailed Performance Indicators'}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-purple-50/50 rounded-lg border border-purple-200/50">
            <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-purple-700 mb-1">
              {lang === 'ar' ? 'إجمالي البنود' : 'Total Items'}
            </p>
            <p className="text-xl font-bold text-purple-600">
              {marketStats?.totalItems || 0}
            </p>
          </div>

          <div className="text-center p-3 bg-orange-50/50 rounded-lg border border-orange-200/50">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-orange-700 mb-1">
              {lang === 'ar' ? 'التقلب العام' : 'Market Volatility'}
            </p>
            <p className="text-lg font-bold text-orange-600 capitalize">
              {lang === 'ar' ? 
                (marketStats?.averageVolatility === 'high' ? 'عالي' :
                 marketStats?.averageVolatility === 'medium' ? 'متوسط' : 'منخفض') :
                marketStats?.averageVolatility || 'Medium'
              }
            </p>
          </div>

          <div className="text-center p-3 bg-indigo-50/50 rounded-lg border border-indigo-200/50">
            <Globe className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm text-indigo-700 mb-1">
              {lang === 'ar' ? 'الأسواق النشطة' : 'Active Markets'}
            </p>
            <p className="text-xl font-bold text-indigo-600">8</p>
          </div>

          <div className="text-center p-3 bg-teal-50/50 rounded-lg border border-teal-200/50">
            <Zap className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <p className="text-sm text-teal-700 mb-1">
              {lang === 'ar' ? 'دقة التوقعات' : 'Forecast Accuracy'}
            </p>
            <p className="text-xl font-bold text-teal-600">94%</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span>
                {lang === 'ar' ? 'النظام متصل ويعمل بكامل طاقته' : 'System online and fully operational'}
              </span>
            </div>
            <div className="flex items-center">
              <RefreshCw className="w-3 h-3 mr-1" />
              <span>
                {lang === 'ar' ? 'تحديث كل دقيقة' : 'Updates every minute'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* تحليل الاتجاهات */}
      <motion.div
        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          {lang === 'ar' ? 'تحليل الاتجاهات اليومية' : 'Daily Trend Analysis'}
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg border border-green-200/50">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {lang === 'ar' ? 'مواد البناء الأساسية' : 'Basic Construction Materials'}
                </p>
                <p className="text-xs text-green-600">
                  {lang === 'ar' ? 'ارتفاع متوسط 2.3%' : 'Average increase 2.3%'}
                </p>
              </div>
            </div>
            <span className="text-green-600 font-bold">+2.3%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-lg border border-red-200/50">
            <div className="flex items-center">
              <TrendingDown className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  {lang === 'ar' ? 'مواد التشطيبات' : 'Finishing Materials'}
                </p>
                <p className="text-xs text-red-600">
                  {lang === 'ar' ? 'انخفاض متوسط 1.1%' : 'Average decrease 1.1%'}
                </p>
              </div>
            </div>
            <span className="text-red-600 font-bold">-1.1%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-200/50">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {lang === 'ar' ? 'المعدات والآليات' : 'Equipment & Machinery'}
                </p>
                <p className="text-xs text-blue-600">
                  {lang === 'ar' ? 'استقرار نسبي' : 'Relatively stable'}
                </p>
              </div>
            </div>
            <span className="text-blue-600 font-bold">+0.2%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}