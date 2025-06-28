import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, Calendar, Globe, Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ title, subtitle, sidebarOpen, setSidebarOpen }: HeaderProps) {
  // الحصول على التاريخ الميلادي الحالي
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return now.toLocaleDateString('ar-SA-u-ca-gregory', options);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div 
      className="flex items-center justify-between mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mr-4 p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* شعار محسن وحديث */}
        <motion.div
          className="relative mr-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* خلفية متوهجة */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
          
          {/* الشعار الرئيسي */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 rounded-2xl shadow-2xl">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          {/* مؤشر الذكاء الاصطناعي */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-2 h-2 text-white" />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* اسم محسن وقصير */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
            تكلفة AI
          </h1>
          <div className="flex items-center mt-1">
            <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
              Smart Construction Pricing
            </span>
            <Sparkles className="w-4 h-4 text-yellow-500 ml-2" />
          </div>
          <motion.p 
            className="text-sm sm:text-base text-gray-700 mt-2 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            منصة التسعير الذكي المدعومة بالذكاء الاصطناعي المتقدم
          </motion.p>
        </motion.div>
      </div>

      {/* Date and Time Display */}
      <motion.div
        className="hidden md:flex flex-col items-end space-y-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{getCurrentDate()}</span>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
          <div className="flex items-center text-gray-700">
            <Globe className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{getCurrentTime()}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}