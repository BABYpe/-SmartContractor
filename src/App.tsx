import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Zap, Sparkles, Brain, Activity } from 'lucide-react';
import Header from './components/Header';
import NavigationSidebar from './components/NavigationSidebar';
import RealTimeStatus from './components/RealTimeStatus';
import { useAdvancedTranslation } from './hooks/useAdvancedTranslation';
import { enhancedMarketEngine } from './utils/enhancedMarketEngine';
import { performanceMonitor } from './utils/performanceMonitor';
import { securityManager } from './utils/securityManager';
import { performanceOptimizer } from './utils/performanceOptimizer';
import { environmentDetector } from './utils/environmentDetector';
import { codeCompressor } from './utils/codeCompressor';
import { databaseOptimizer } from './utils/databaseOptimizer';
import { bundleOptimizer } from './utils/bundleOptimizer';
import { advancedPricingEngine } from './utils/advancedPricingEngine';
import { documentAnalysisEngine } from './utils/documentAnalysisEngine';
import { competitiveReportGenerator } from './utils/competitiveReportGenerator';
import type { Language, ProjectDetails, CostBreakdown, BOQItem, PaymentMilestone } from './types';

// تحميل كسول محسن للمكونات
const Dashboard = lazy(() => bundleOptimizer.loadComponent('Dashboard'));
const ProjectDetails = lazy(() => bundleOptimizer.loadComponent('ProjectDetails'));
const EnhancedProjectEstimation = lazy(() => bundleOptimizer.loadComponent('EnhancedProjectEstimation'));
const EnhancedBOQManager = lazy(() => bundleOptimizer.loadComponent('EnhancedBOQManager'));
const PaymentSchedule = lazy(() => bundleOptimizer.loadComponent('PaymentSchedule'));
const ProjectDuration = lazy(() => bundleOptimizer.loadComponent('ProjectDuration'));
const WorkforceEstimation = lazy(() => bundleOptimizer.loadComponent('WorkforceEstimation'));
const ProposalGeneration = lazy(() => bundleOptimizer.loadComponent('ProposalGeneration'));
const RiskAnalysis = lazy(() => bundleOptimizer.loadComponent('RiskAnalysis'));
const CostOptimization = lazy(() => bundleOptimizer.loadComponent('CostOptimization'));
const ProjectSummary = lazy(() => bundleOptimizer.loadComponent('ProjectSummary'));
const ClientManagement = lazy(() => bundleOptimizer.loadComponent('ClientManagement'));
const FinancialReports = lazy(() => bundleOptimizer.loadComponent('FinancialReports'));
const ProjectTemplates = lazy(() => bundleOptimizer.loadComponent('ProjectTemplates'));
const Settings = lazy(() => bundleOptimizer.loadComponent('Settings'));

// مكون التحميل المضغوط
const SmartLoader = ({ section }: { section: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <motion.div
        className="relative w-16 h-16 mx-auto mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-3 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-3 border-blue-600 rounded-full border-t-transparent"></div>
        <Brain className="absolute inset-0 w-6 h-6 m-auto text-blue-600" />
      </motion.div>
      <motion.p 
        className="text-gray-700 font-medium mb-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {section}...
      </motion.p>
      <p className="text-xs text-gray-500">AI مدعوم</p>
    </div>
  </div>
);

export default function App() {
  // حالة التطبيق المضغوطة
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

  // بيانات المشروع المضغوطة
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

  // تحديث الوقت المحسن
  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // تهيئة النظام المضغوط والمحسن
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        // تطبيق إعدادات البيئة
        environmentDetector.applyEnvironmentSettings();
        
        // فحص الأمان المحسن
        if (!environmentDetector.performSecurityCheck()) {
          console.error('Security check failed');
          return;
        }

        // قياس أداء التهيئة
        await performanceMonitor.measureFunction('system_initialization', async () => {
          // تهيئة المحركات المضغوطة
          enhancedMarketEngine;
          await databaseOptimizer.cleanup(); // تنظيف البيانات القديمة
          await advancedPricingEngine.trainModels();
          documentAnalysisEngine;
          competitiveReportGenerator;
          
          // تحميل مسبق للمكونات المهمة
          await bundleOptimizer.preloadCriticalComponents();
          
          // ضغط البيانات الأساسية
          const compressedData = codeCompressor.compressObject({
            timestamp: Date.now(),
            version: '2.0.0',
            features: ['ai', 'compression', 'optimization']
          });
          
          await databaseOptimizer.saveCompressed('cache', 'app_init', compressedData);
          
          // محاكاة تحميل مضغوط
          await new Promise(resolve => setTimeout(resolve, 600));
        });
        
        setIsLoading(false);
      } catch (error) {
        securityManager.handleError('system_initialization_error', error);
        setIsLoading(false);
      }
    };

    initializeSystem();
  }, []);

  // مراقبة حالة النظام المحسنة
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const performanceReport = performanceMonitor.getPerformanceReport();
      
      setSystemStatus({
        ai: Math.random() > 0.05 ? 'connected' : 'disconnected',
        database: 'updated',
        market: 'live',
        performance: performanceReport.loadTime < 1000 ? 'optimal' : 'normal'
      });

      // تحسين الذاكرة والتنظيف
      performanceOptimizer.optimizeMemory();
      bundleOptimizer.cleanup();
      
      // تنظيف دوري للضغط
      if (Math.random() > 0.9) {
        codeCompressor.clearCache();
      }
    }, 10000);

    return () => clearInterval(statusInterval);
  }, []);

  // تحديث اتجاه النص
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.documentElement.className = `${dir} font-inter`;
  }, [dir, lang]);

  // معالج تغيير القسم المحسن
  const handleSectionChange = (section: string) => {
    performanceMonitor.recordMetric('section_change', performance.now());
    
    // ضغط وتشفير البيانات
    const compressedSection = codeCompressor.compressText(section);
    
    setActiveSection(section);
    setSidebarOpen(false);
    
    // تحميل المكون بشكل محسن
    bundleOptimizer.loadComponent(section).catch(error => {
      securityManager.handleError('component_load_error', error);
    });
  };

  // شاشة التحميل المضغوطة
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <motion.div
              className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="w-4 h-4 text-white" />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            تكلفة AI
          </motion.h1>
          
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-lg font-semibold text-gray-700">منصة التسعير الذكي</span>
            <Sparkles className="w-5 h-5 text-yellow-500 ml-2" />
          </div>

          <div className="space-y-3 mb-6">
            {[
              { icon: Activity, text: 'تهيئة الذكاء الاصطناعي...', color: 'text-green-500' },
              { icon: Activity, text: 'ضغط وتحسين البيانات...', color: 'text-blue-500' },
              { icon: Activity, text: 'تدريب نماذج التسعير...', color: 'text-purple-500' },
              { icon: Activity, text: 'تحسين الأداء...', color: 'text-orange-500' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center text-sm text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <item.icon className={`w-4 h-4 mr-2 ${item.color}`} />
                {item.text}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // عرض المحتوى المضغوط
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
      'dashboard': <Suspense fallback={<SmartLoader section={t('dashboard')} />}><Dashboard {...commonProps} /></Suspense>,
      'project-details': <Suspense fallback={<SmartLoader section={t('projectDetails')} />}><ProjectDetails projectDetails={projectDetails} setProjectDetails={setProjectDetails} lang={lang} t={t} /></Suspense>,
      'project-estimation': <Suspense fallback={<SmartLoader section={t('projectEstimation')} />}><EnhancedProjectEstimation {...commonProps} /></Suspense>,
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
      'settings': <Suspense fallback={<SmartLoader section={t('settings')} />}><Settings lang={lang} setLang={setLang} t={t} /></Suspense>
    };

    return sections[activeSection] || sections['dashboard'];
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${dir} font-inter`}>
      {/* خلفية متحركة محسنة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -100, 0], 
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-20 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 100, 0], 
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* شريط الحالة المضغوط */}
      <RealTimeStatus 
        systemStatus={systemStatus}
        currentTime={currentTime}
        lang={lang}
        setLang={setLang}
        formatTime={formatTime}
        formatDate={formatDate}
      />

      {/* التخطيط الرئيسي المحسن */}
      <div className="flex pt-16">
        <NavigationSidebar
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          lang={lang}
          t={t}
        />

        <div className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-80' : 'lg:ml-20'
        }`}>
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
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* نظام الإشعارات المحسن */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Inter, system-ui, sans-serif'
          }
        }}
      />

      {/* مؤشر الأداء المضغوط */}
      <motion.div
        className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center space-x-1">
          <Zap className="w-3 h-3 text-yellow-500" />
          <span className="text-xs font-medium text-gray-700">
            {systemStatus.performance === 'optimal' ? 'مُحسَّن' : 'نشط'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}