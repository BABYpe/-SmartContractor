import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Calculator, 
  ClipboardList, 
  CreditCard, 
  Clock, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingDown,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  Zap,
  Database,
  Home,
  UserCheck,
  DollarSign,
  Settings as SettingsIcon,
  Layers,
  Calendar,
  Activity
} from 'lucide-react';
import { environmentDetector } from '../utils/environmentDetector';

interface NavigationSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  lang: string;
  t: any;
}

export default function NavigationSidebar({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
  lang,
  t
}: NavigationSidebarProps) {
  // إخفاء زر القائمة في بيئة الإنتاج/النشر
  const isProduction = environmentDetector.isProduction();
  const isNetlifyDeployment = environmentDetector.isNetlifyDeployment();
  const shouldHideMenuButton = isProduction || isNetlifyDeployment;

  const navigationItems = [
    {
      id: 'dashboard',
      icon: Home,
      labelAr: 'لوحة التحكم',
      labelEn: 'Dashboard',
      color: 'from-blue-500 to-indigo-600',
      badge: 'NEW'
    },
    {
      id: 'project-details',
      icon: Building,
      labelAr: 'تفاصيل المشروع',
      labelEn: 'Project Details',
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'project-estimation',
      icon: Calculator,
      labelAr: 'التقدير الذكي المتقدم',
      labelEn: 'Advanced Smart Estimation',
      color: 'from-blue-500 to-indigo-600',
      badge: 'AI'
    },
    {
      id: 'custom-boq',
      icon: Database,
      labelAr: 'نظام BOQ الموحد',
      labelEn: 'Unified BOQ System',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'payment-schedule',
      icon: CreditCard,
      labelAr: 'جدول الدفعات',
      labelEn: 'Payment Schedule',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'project-duration',
      icon: Clock,
      labelAr: 'المدة الزمنية',
      labelEn: 'Project Duration',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'workforce-estimation',
      icon: Users,
      labelAr: 'الموارد البشرية',
      labelEn: 'Human Resources',
      color: 'from-emerald-500 to-green-600'
    },
    {
      id: 'proposal-generation',
      icon: FileText,
      labelAr: 'توليد العروض',
      labelEn: 'Proposal Generation',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'risk-analysis',
      icon: AlertTriangle,
      labelAr: 'تحليل المخاطر',
      labelEn: 'Risk Analysis',
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 'cost-optimization',
      icon: TrendingDown,
      labelAr: 'تحسين التكلفة',
      labelEn: 'Cost Optimization',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'project-summary',
      icon: BarChart3,
      labelAr: 'ملخص المشروع',
      labelEn: 'Project Summary',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'client-management',
      icon: UserCheck,
      labelAr: 'إدارة العملاء',
      labelEn: 'Client Management',
      color: 'from-teal-500 to-cyan-600',
      badge: 'NEW'
    },
    {
      id: 'financial-reports',
      icon: DollarSign,
      labelAr: 'التقارير المالية',
      labelEn: 'Financial Reports',
      color: 'from-green-500 to-emerald-600',
      badge: 'NEW'
    },
    {
      id: 'project-templates',
      icon: Layers,
      labelAr: 'قوالب المشاريع',
      labelEn: 'Project Templates',
      color: 'from-purple-500 to-violet-600',
      badge: 'NEW'
    },
    {
      id: 'settings',
      icon: SettingsIcon,
      labelAr: 'الإعدادات',
      labelEn: 'Settings',
      color: 'from-gray-500 to-slate-600'
    }
  ];

  // الحصول على التاريخ والوقت الحالي
  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('ar-SA-u-ca-gregory', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: now.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date, time } = getCurrentDateTime();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -240,
          width: sidebarOpen ? 320 : 80
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/20 backdrop-blur-xl border-r border-white/30 z-50 shadow-2xl ${
          sidebarOpen ? 'w-80' : 'w-20'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center relative">
                  <Building className="w-4 h-4 text-white" />
                  <Zap className="w-2 h-2 text-yellow-400 absolute -top-1 -right-1" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-800">SmartContractor</h2>
                  <p className="text-xs text-gray-600">Pro Platform AI</p>
                </div>
              </motion.div>
            )}
            
            {/* إخفاء زر القائمة في بيئة الإنتاج */}
            {!shouldHideMenuButton && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="w-4 h-4 text-gray-700" />
                ) : (
                  <Menu className="w-4 h-4 text-gray-700" />
                )}
              </button>
            )}
          </div>

          {/* Date and Time in Sidebar */}
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 p-2 bg-white/10 rounded-lg border border-white/20"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Activity className="w-3 h-3 mr-1" />
                  <span>{time}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1 overflow-y-auto h-full pb-32">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const label = lang === 'ar' ? item.labelAr : item.labelEn;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                    : 'hover:bg-white/20 text-gray-700'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className={`p-1.5 rounded-md ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-gradient-to-r ' + item.color + ' text-white group-hover:scale-110'
                } transition-transform duration-200 relative`}>
                  <Icon className="w-4 h-4" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-1 rounded-full text-[8px]">
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 text-left"
                  >
                    <span className="font-medium text-xs">{label}</span>
                  </motion.div>
                )}
                
                {sidebarOpen && isActive && (
                  <ChevronRight className="w-3 h-3" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
          >
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Powered by Advanced AI</p>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">System Online</span>
                <Zap className="w-2 h-2 text-yellow-500 ml-1" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Real-time AI Pricing Engine
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}