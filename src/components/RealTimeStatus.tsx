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
  Brain,
  Shield,
  Bell,
  User,
  Settings,
  ChevronDown,
  Search,
  Menu
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
        return 'bg-emerald-500';
      case 'warning':
      case 'normal':
        return 'bg-amber-500';
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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {/* Logo Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl blur-lg opacity-20 animate-pulse"></div>
              
              {/* Logo Container */}
              <div className="relative bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-white/30">
                <img 
                  src="https://github.com/BABYpe/achoxproeng/blob/main/achoxpro.png?raw=true"
                  alt="AchoX Pro Engineering Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Brain className="w-8 h-8 text-blue-600 hidden" />
              </div>
              
              {/* AI Indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Brand Name */}
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                AchoX Pro Engineering
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                {lang === 'ar' ? 'منصة التسعير الذكي' : 'Smart Pricing Platform'}
              </p>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'البحث في المنصة...' : 'Search platform...'}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all duration-200"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          </div>

          {/* Right Side - Status & Controls */}
          <div className="flex items-center space-x-3">
            {/* System Status Indicators */}
            <div className="hidden xl:flex items-center space-x-2 bg-gray-50/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/50">
              {statusItems.map((item, index) => {
                const Icon = getStatusIcon(item.key);
                return (
                  <motion.div
                    key={item.key}
                    className="flex items-center space-x-1.5 group relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <motion.div
                        className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${getStatusColor(item.status)}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {item.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Time Display */}
            <motion.div
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm rounded-xl px-3 py-2 border border-blue-200/30"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="w-4 h-4 text-blue-600" />
              <div className="text-sm">
                <div className="font-semibold text-gray-800 font-mono">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-600">
                  {formatDate(currentTime).split('،')[0]}
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.button
              className="relative p-2.5 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Language Switcher */}
            <motion.button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl px-3 py-2.5 font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {lang === 'ar' ? 'EN' : 'عر'}
              </span>
            </motion.button>

            {/* User Menu */}
            <div className="relative group">
              <motion.button
                className="flex items-center space-x-2 bg-gray-50/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </motion.button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="p-2">
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100/80 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100/80 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'الإعدادات' : 'Settings'}</span>
                  </a>
                  <hr className="my-2 border-gray-200" />
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2.5 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Secondary Bar - System Status Details */}
        <motion.div
          className="hidden lg:flex items-center justify-between py-2 border-t border-gray-200/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-6">
            {statusItems.map((item, index) => {
              const Icon = getStatusIcon(item.key);
              return (
                <div key={item.key} className="flex items-center space-x-2">
                  <div className="relative">
                    <Icon className="w-3.5 h-3.5 text-gray-500" />
                    <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${getStatusColor(item.status)}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{item.label}</span>
                  <span className="text-xs text-gray-500 capitalize">
                    {item.status === 'connected' ? (lang === 'ar' ? 'متصل' : 'Connected') :
                     item.status === 'updated' ? (lang === 'ar' ? 'محدث' : 'Updated') :
                     item.status === 'live' ? (lang === 'ar' ? 'مباشر' : 'Live') :
                     item.status === 'optimal' ? (lang === 'ar' ? 'مثالي' : 'Optimal') : item.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-green-600" />
              <span>{lang === 'ar' ? 'آمن ومشفر' : 'Secure & Encrypted'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wifi className="w-3 h-3 text-blue-600" />
              <span>{lang === 'ar' ? 'متصل' : 'Online'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Server className="w-3 h-3 text-purple-600" />
              <span>v2.1.0</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.header>
  );
}