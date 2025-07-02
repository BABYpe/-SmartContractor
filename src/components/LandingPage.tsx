import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  FileText, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Target,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Github,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useTranslation, type Language } from '../utils/translations';

interface LandingPageProps {
  onEnterApp: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function LandingPage({ onEnterApp, lang, setLang }: LandingPageProps) {
  const { t } = useTranslation(lang);

  const features = [
    {
      icon: Brain,
      title: t('aiPowered'),
      description: t('aiPoweredDesc'),
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Target,
      title: t('accurateEstimates'),
      description: t('accurateEstimatesDesc'),
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: FileText,
      title: t('comprehensiveReports'),
      description: t('comprehensiveReportsDesc'),
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const sections = [
    {
      icon: Calculator,
      title: t('projectEstimationTitle'),
      description: t('projectEstimationDesc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: t('boqManagementTitle'),
      description: t('boqManagementDesc'),
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: FileText,
      title: t('reportGenerationTitle'),
      description: t('reportGenerationDesc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: t('riskAnalysis'),
      description: 'تحليل شامل للمخاطر المحتملة في المشروع',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: t('costOptimization'),
      description: 'اقتراحات ذكية لتحسين التكلفة والكفاءة',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: Users,
      title: t('workforceEstimation'),
      description: 'تقدير دقيق للموارد البشرية المطلوبة',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                <img 
                  src="https://github.com/BABYpe/achoxproeng/blob/main/achoxpro.png?raw=true"
                  alt="AchoX Pro Engineering Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Sparkles className="w-6 h-6 text-blue-600 hidden" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AchoX Pro Engineering</h1>
                <p className="text-xs text-gray-600">Smart Construction Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/BABYpe/achoxproeng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">GitHub</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
              <button
                onClick={onEnterApp}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center"
              >
                {t('getStarted')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Hero */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/30">
                  <img 
                    src="https://github.com/BABYpe/achoxproeng/blob/main/achoxpro.png?raw=true"
                    alt="AchoX Pro Engineering Logo"
                    className="w-20 h-20 object-contain mx-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-20 h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 leading-tight">
              AchoX Pro Engineering
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              {t('heroTitle')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onEnterApp}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t('getStarted')}
              </motion.button>
              
              <motion.a
                href="https://github.com/BABYpe/achoxproeng"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-white/30 text-gray-700 rounded-xl font-semibold text-lg hover:bg-white/70 transition-all duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 mr-2" />
                مستودع المشروع
                <ExternalLink className="w-4 h-4 ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('features')}</h2>
            <p className="text-xl text-gray-600">مميزات تجعل منصتنا الخيار الأمثل لمشاريعك</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/30 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('sectionsTitle')}</h2>
            <p className="text-xl text-gray-600">استكشف جميع أقسام المنصة وإمكانياتها المتقدمة</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={onEnterApp}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center mb-4`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              ابدأ رحلتك مع التسعير الذكي اليوم
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف المقاولين الذين يثقون في منصتنا لتقدير مشاريعهم بدقة واحترافية
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onEnterApp}
                className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calculator className="w-5 h-5 mr-2 inline" />
                ابدأ الآن مجاناً
              </motion.button>
              
              <motion.a
                href="https://github.com/BABYpe/achoxproeng"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 mr-2 inline" />
                عرض الكود المصدري
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <img 
                    src="https://github.com/BABYpe/achoxproeng/blob/main/achoxpro.png?raw=true"
                    alt="AchoX Pro Engineering Logo"
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Sparkles className="w-5 h-5 text-blue-600 hidden" />
                </div>
                <h3 className="text-lg font-bold">AchoX Pro Engineering</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                منصة التسعير الذكي للمقاولات المدعومة بالذكاء الاصطناعي
              </p>
              <a
                href="https://github.com/BABYpe/achoxproeng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                <Github className="w-4 h-4 mr-2" />
                مستودع المشروع
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">المنصة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">المميزات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسعار</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الدعم</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('aboutUs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المدونة</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">قانوني</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('privacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('terms')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ملفات تعريف الارتباط</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 AchoX Pro Engineering. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}