import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  Calendar, 
  Globe, 
  Zap, 
  Database, 
  TrendingUp,
  Wifi,
  Server,
  Brain
} from 'lucide-react';

interface RealTimeStatusProps {
  systemStatus: {
    ai: string;
    database: string;
    market: string;
    performance: string;
  };
  currentTime: Date;
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  formatTime: (date: Date) => string;
  formatDate: (date: Date) => string;
}

export default function RealTimeStatus({
  systemStatus,
  currentTime,
  lang,
  setLang,
  formatTime,
  formatDate
}: RealTimeStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'updated':
      case 'live':
      case 'optimal':
        return 'bg-green-500';
      case 'warning':
      case 'normal':
        return 'bg-yellow-500';
      case 'disconnected':
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return Brain;
      case 'database':
        return Database;
      case 'market':
        return TrendingUp;
      case 'performance':
        return Zap;
      default:
        return Activity;
    }
  };

  const statusItems = [
    { key: 'ai', label: lang === 'ar' ? 'محرك الذكاء الاصطناعي' : 'AI Engine', status: systemStatus.ai },
    { key: 'database', label: lang === 'ar' ? 'قاعدة البيانات' : 'Database', status: systemStatus.database },
    { key: 'market', label: lang === 'ar' ? 'بيانات السوق' : 'Market Data', status: systemStatus.market },
    { key: 'performance', label: lang === 'ar' ? 'الأداء' : 'Performance', status: systemStatus.performance }
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* معلومات النظام */}
          <div className="flex items-center space-x-6">
            {statusItems.map((item, index) => {
              const Icon = getStatusIcon(item.key);
              return (
                <motion.div
                  key={item.key}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <motion.div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(item.status)}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 hidden md:block">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* الوقت والتاريخ */}
          <div className="flex items-center space-x-6">
            <motion.div
              className="flex items-center space-x-2 bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {formatDate(currentTime)}
              </span>
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-2 bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-lg font-bold text-gray-800 font-mono">
                {formatTime(currentTime)}
              </span>
            </motion.div>

            {/* مبدل اللغة المحسن */}
            <motion.button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2 font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">
                {lang === 'ar' ? 'English' : 'العربية'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* شريط الأداء */}
        <motion.div
          className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}