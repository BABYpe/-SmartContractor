import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Calendar, Globe, Sparkles, Github, ExternalLink, Brain } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ title, subtitle, sidebarOpen, setSidebarOpen }: HeaderProps) {
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
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mr-4 p-3 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200 shadow-lg hover:shadow-xl z-50 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-6 h-6 text-gray-700" />
          <span className="sr-only">فتح القائمة</span>
        </motion.button>

        {/* Logo Section */}
        <motion.div
          className="relative mr-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* Glowing Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
          
          {/* Main Logo Container */}
          <div className="relative bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/40">
            <img 
              src="https://github.com/BABYpe/achoxproeng/blob/main/achoxpro.png?raw=true"
              alt="AchoX Pro Engineering Logo"
              className="w-14 h-14 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-14 h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* AI Indicator */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        </motion.div>
        
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
            AchoX Pro Engineering
          </h1>
          <div className="flex items-center mt-2">
            <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wide">
              Smart Construction Pricing Platform
            </span>
            <Sparkles className="w-5 h-5 text-yellow-500 ml-2" />
          </div>
          <motion.p 
            className="text-sm sm:text-base text-gray-700 mt-2 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            منصة التسعير الذكي المدعومة بالذكاء الاصطناعي المتقدم
          </motion.p>
          
          {/* GitHub Link */}
          <motion.a
            href="https://github.com/BABYpe/achoxproeng"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-3 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4 mr-2" />
            <span>مستودع المشروع</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </motion.a>
        </motion.div>
      </div>

      {/* Date and Time Display */}
      <motion.div
        className="hidden md:flex flex-col items-end space-y-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/40 shadow-lg">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-5 h-5 mr-3" />
            <span className="text-sm font-semibold">{getCurrentDate()}</span>
          </div>
        </div>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/40 shadow-lg">
          <div className="flex items-center text-gray-700">
            <Globe className="w-5 h-5 mr-3" />
            <span className="text-lg font-bold font-mono">{getCurrentTime()}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}