import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Brain, Sparkles, Activity } from 'lucide-react';
import Header from './components/Header';
import EnhancedNavigationSidebar from './components/EnhancedNavigationSidebar';
import RealTimeStatus from './components/RealTimeStatus';
import LandingPage from './components/LandingPage';
import ResponsiveLayout from './components/ResponsiveLayout';
import { useAdvancedTranslation } from './hooks/useAdvancedTranslation';
import { useThemeStore } from './stores/themeStore';
import { performanceMonitor } from './utils/performanceMonitor';
import type { Language, ProjectDetails, CostBreakdown, BOQItem, PaymentMilestone } from './types';

// تحميل كسول محسن للمكونات الأساسية فقط
const CustomizableDashboard = lazy(() => import('./components/CustomizableDashboard'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const EnhancedProjectEstimation = lazy(() => import('./components/EnhancedProjectEstimation'));
const ReferenceItemsDatabase = lazy(() => import('./components/ReferenceItemsDatabase'));
const EnhancedBOQManager = lazy(() => import('./components/EnhancedBOQManager'));
const PaymentSchedule = lazy(() => import('./components/PaymentSchedule'));
const ProjectDuration = lazy(() => import('./components/ProjectDuration'));
const WorkforceEstimation = lazy(() => import('./components/WorkforceEstimation'));
const ProposalGeneration = lazy(() => import('./components/ProposalGeneration'));
const RiskAnalysis = lazy(() => import('./components/RiskAnalysis'));
const CostOptimization = lazy(() => import('./components/CostOptimization'));
const ProjectSummary = lazy(() => import('./components/ProjectSummary'));
const ClientManagement = lazy(() => import('./components/ClientManagement'));
const FinancialReports = lazy(() => import('./components/FinancialReports'));
const ProjectTemplates = lazy(() => import('./components/ProjectTemplates'));
const EnhancedSettings = lazy(() => import('./components/EnhancedSettings'));

// مكون التحميل المحسن والأنيق
const SmartLoader = ({ section }: { section: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <motion.div
        className="relative w-20 h-20 mx-auto mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{section}</h3>
        <div className="flex items-center justify-center space-x-1">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">مدعوم بالذكاء الاصطناعي</span>
        </div>
      </motion.div>
    </div>
  </div>
);

export default function App() {
  // حالة عرض صفحة الهبوط
  const [showLandingPage, setShowLandingPage] = useState(true);
  
  // حالة التطبيق المحسنة
  const [lang, setLang] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState({
    ai: 'connected',
    database: 'updated',
    market: 'live',
    performance: 'optimal'
  });

  // بيانات المشروع
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    companyName: '',
    companyLogo: '',
    projectDate: new Date().toISOString().split('T')[0],
    engineeringDrawings: '',
    city: 'riyadh',
    area: '',
    projectType: 'residential',
    profitMargin: '15',
    wastePercentage: '5'
  });

  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);
  const [customBoqItems, setCustomBoqItems] = useState<BOQItem[]>([]);
  const [paymentMilestones, setPaymentMilestones] = useState<PaymentMilestone[]>([
    { name: 'دفعة التعاقد', percentage: '20' },
    { name: 'بداية الأعمال', percentage: '30' },
    { name: 'إنجاز الهيكل', percentage: '30' },
    { name: 'التسليم النهائي', percentage: '20' }
  ]);
  const [projectDuration, setProjectDuration] = useState<string | null>(null);

  const { t, dir, formatTime, formatDate } = useAdvancedTranslation(lang);
  const { applyTheme } = useThemeStore();

  // دالة للانتقال إلى التطبيق الرئيسي
  const handleEnterApp = () => {
    setShowLandingPage(false);
  };

  // تحديث الوقت
  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // تطبيق الثيم عند التحميل
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  // تهيئة النظام
  useEffect(() => {
    if (!showLandingPage) {
      const initializeSystem = async () => {
        try {
          setIsLoading(true);
          
          // قياس أداء التهيئة
          await performanceMonitor.measureFunction('system_initialization', async () => {
            // محاكاة تحميل النظام
            await new Promise(resolve => setTimeout(resolve, 1200));
          });
          
          setIsLoading(false);
        } catch (error) {
          console.error('System initialization error:', error);
          setIsLoading(false);
        }
      };

      initializeSystem();
    }
  }, [showLandingPage]);

  // مراقبة حالة النظام
  useEffect(() => {
    if (!showLandingPage) {
      const statusInterval = setInterval(() => {
        setSystemStatus({
          ai: Math.random() > 0.05 ? 'connected' : 'disconnected',
          database: 'updated',
          market: 'live',
          performance: Math.random() > 0.1 ? 'optimal' : 'normal'
        });
      }, 10000);

      return () => clearInterval(statusInterval);
    }
  }, [showLandingPage]);

  // تحديث اتجاه النص
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  // معالج تغيير القسم
  const handleSectionChange = (section: string) => {
    performanceMonitor.recordMetric('section_change', performance.now());
    setActiveSection(section);
    setSidebarOpen(false);
  };

  // إذا كانت صفحة الهبوط مفعلة، اعرضها
  if (showLandingPage) {
    return (
      <LandingPage 
        onEnterApp={handleEnterApp}
        lang={lang}
        setLang={setLang}
      />
    );
  }

  // شاشة التحميل المحسنة
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8">
            <motion.div
              className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="w-16 h-16 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-5xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AchoX Pro Engineering
          </motion.h1>
          
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-6 h-6 text-yellow-500 mr-3" />
            <span className="text-xl font-semibold text-gray-700">منصة التسعير الذكي المتقدمة</span>
            <Sparkles className="w-6 h-6 text-yellow-500 ml-3" />
          </div>

          <motion.div
            className="w-80 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="text-gray-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            جاري تحميل النظام المتقدم...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // عرض المحتوى
  const renderContent = () => {
    const commonProps = {
      projectDetails,
      setProjectDetails,
      estimatedCost,
      setEstimatedCost,
      costBreakdown,
      setCostBreakdown,
      customBoqItems,
      setCustomBoqItems,
      paymentMilestones,
      setPaymentMilestones,
      projectDuration,
      setProjectDuration,
      lang,
      t
    };

    const sections: Record<string, JSX.Element> = {
      'dashboard': <Suspense fallback={<SmartLoader section={t('dashboard')} />}><CustomizableDashboard lang={lang} /></Suspense>,
      'project-details': <Suspense fallback={<SmartLoader section={t('projectDetails')} />}><ProjectDetails projectDetails={projectDetails} setProjectDetails={setProjectDetails} lang={lang} t={t} /></Suspense>,
      'project-estimation': <Suspense fallback={<SmartLoader section={t('projectEstimation')} />}><EnhancedProjectEstimation {...commonProps} /></Suspense>,
      'reference-items': <Suspense fallback={<SmartLoader section="البنود المرجعية" />}><ReferenceItemsDatabase lang={lang} t={t} /></Suspense>,
      'custom-boq': <Suspense fallback={<SmartLoader section={t('customBoq')} />}><EnhancedBOQManager customBoqItems={customBoqItems} setCustomBoqItems={setCustomBoqItems} projectType={projectDetails.projectType} city={projectDetails.city} wastePercentage={projectDetails.wastePercentage} lang={lang} t={t} /></Suspense>,
      'payment-schedule': <Suspense fallback={<SmartLoader section={t('paymentSchedule')} />}><PaymentSchedule paymentMilestones={paymentMilestones} setPaymentMilestones={setPaymentMilestones} lang={lang} t={t} /></Suspense>,
      'project-duration': <Suspense fallback={<SmartLoader section={t('projectDuration')} />}><ProjectDuration {...commonProps} /></Suspense>,
      'workforce-estimation': <Suspense fallback={<SmartLoader section={t('workforceEstimation')} />}><WorkforceEstimation {...commonProps} /></Suspense>,
      'proposal-generation': <Suspense fallback={<SmartLoader section={t('proposalGeneration')} />}><ProposalGeneration estimatedCost={estimatedCost} customBoqItems={customBoqItems} projectType={projectDetails.projectType} city={projectDetails.city} area={projectDetails.area} companyName={projectDetails.companyName} projectDate={projectDetails.projectDate} engineeringDrawings={projectDetails.engineeringDrawings} profitMargin={projectDetails.profitMargin} wastePercentage={projectDetails.wastePercentage} lang={lang} t={t} /></Suspense>,
      'risk-analysis': <Suspense fallback={<SmartLoader section={t('riskAnalysis')} />}><RiskAnalysis {...commonProps} /></Suspense>,
      'cost-optimization': <Suspense fallback={<SmartLoader section={t('costOptimization')} />}><CostOptimization {...commonProps} /></Suspense>,
      'project-summary': <Suspense fallback={<SmartLoader section={t('projectSummary')} />}><ProjectSummary {...commonProps} /></Suspense>,
      'client-management': <Suspense fallback={<SmartLoader section={t('clientManagement')} />}><ClientManagement lang={lang} t={t} /></Suspense>,
      'financial-reports': <Suspense fallback={<SmartLoader section={t('financialReports')} />}><FinancialReports lang={lang} t={t} /></Suspense>,
      'project-templates': <Suspense fallback={<SmartLoader section={t('projectTemplates')} />}><ProjectTemplates lang={lang} t={t} /></Suspense>,
      'settings': <Suspense fallback={<SmartLoader section={t('settings')} />}><EnhancedSettings lang={lang} setLang={setLang} t={t} /></Suspense>
    };

    return sections[activeSection] || sections['dashboard'];
  };

  return (
    <ResponsiveLayout
      header={
        <RealTimeStatus 
          systemStatus={systemStatus}
          currentTime={currentTime}
          lang={lang}
          setLang={setLang}
          formatTime={formatTime}
          formatDate={formatDate}
        />
      }
      sidebar={
        <EnhancedNavigationSidebar
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          lang={lang}
          t={t}
        />
      }
    >
      <div className="container mx-auto px-4 py-6">
        <Header
          title={t('appTitle')}
          subtitle={t('appSubtitle')}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* نظام الإشعارات المحسن */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
            fontFamily: 'Cairo, Inter, system-ui, sans-serif'
          }
        }}
      />

      {/* مؤشر الحالة */}
      <motion.div
        className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            systemStatus.performance === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
          } animate-pulse`} />
          <span className="text-xs font-medium text-gray-700">
            {systemStatus.performance === 'optimal' ? 'النظام مُحسَّن' : 'النظام نشط'}
          </span>
          <Activity className="w-3 h-3 text-gray-500" />
        </div>
      </motion.div>
    </ResponsiveLayout>
  );
}