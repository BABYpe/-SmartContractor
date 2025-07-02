import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Type, 
  Layout, 
  Eye, 
  Monitor,
  Sun,
  Moon,
  Smartphone,
  Volume2,
  VolumeX,
  Accessibility,
  Save,
  RotateCcw,
  Download,
  Upload,
  User,
  Bell,
  Shield,
  Globe,
  Zap
} from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { useDashboardStore } from '../stores/dashboardStore';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import toast from 'react-hot-toast';
import type { Language } from '../types';

interface EnhancedSettingsProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

export default function EnhancedSettings({ lang, setLang, t }: EnhancedSettingsProps) {
  const [activeTab, setActiveTab] = useState('appearance');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const {
    theme,
    fontSize,
    density,
    reducedMotion,
    highContrast,
    setTheme,
    setFontSize,
    setDensity,
    setReducedMotion,
    setHighContrast
  } = useThemeStore();

  const { resetToDefault: resetDashboard } = useDashboardStore();

  const isArabic = lang === 'ar';

  const tabs = [
    { id: 'appearance', label: isArabic ? 'المظهر' : 'Appearance', icon: Palette },
    { id: 'layout', label: isArabic ? 'التخطيط' : 'Layout', icon: Layout },
    { id: 'accessibility', label: isArabic ? 'إمكانية الوصول' : 'Accessibility', icon: Accessibility },
    { id: 'notifications', label: isArabic ? 'الإشعارات' : 'Notifications', icon: Bell },
    { id: 'account', label: isArabic ? 'الحساب' : 'Account', icon: User },
    { id: 'advanced', label: isArabic ? 'متقدم' : 'Advanced', icon: Settings }
  ];

  const handleExportSettings = () => {
    const settings = {
      theme,
      fontSize,
      density,
      reducedMotion,
      highContrast,
      lang,
      soundEnabled,
      notificationsEnabled,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'achox-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(isArabic ? 'تم تصدير الإعدادات بنجاح' : 'Settings exported successfully');
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        
        if (settings.theme) setTheme(settings.theme);
        if (settings.fontSize) setFontSize(settings.fontSize);
        if (settings.density) setDensity(settings.density);
        if (typeof settings.reducedMotion === 'boolean') setReducedMotion(settings.reducedMotion);
        if (typeof settings.highContrast === 'boolean') setHighContrast(settings.highContrast);
        if (settings.lang) setLang(settings.lang);
        if (typeof settings.soundEnabled === 'boolean') setSoundEnabled(settings.soundEnabled);
        if (typeof settings.notificationsEnabled === 'boolean') setNotificationsEnabled(settings.notificationsEnabled);

        toast.success(isArabic ? 'تم استيراد الإعدادات بنجاح' : 'Settings imported successfully');
      } catch (error) {
        toast.error(isArabic ? 'فشل في استيراد الإعدادات' : 'Failed to import settings');
      }
    };
    reader.readAsText(file);
  };

  const resetAllSettings = () => {
    setTheme('light');
    setFontSize('medium');
    setDensity('comfortable');
    setReducedMotion(false);
    setHighContrast(false);
    setLang('ar');
    setSoundEnabled(true);
    setNotificationsEnabled(true);
    resetDashboard();
    
    toast.success(isArabic ? 'تم إعادة تعيين جميع الإعدادات' : 'All settings reset to default');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <div className="space-y-6">
            {/* اختيار الثيم */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                {isArabic ? 'نمط الألوان' : 'Color Theme'}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: isArabic ? 'فاتح' : 'Light', icon: Sun },
                  { value: 'dark', label: isArabic ? 'داكن' : 'Dark', icon: Moon },
                  { value: 'auto', label: isArabic ? 'تلقائي' : 'Auto', icon: Monitor }
                ].map(({ value, label, icon: Icon }) => (
                  <motion.button
                    key={value}
                    onClick={() => setTheme(value as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === value
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* حجم الخط */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Type className="w-5 h-5 mr-2" />
                {isArabic ? 'حجم الخط' : 'Font Size'}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'small', label: isArabic ? 'صغير' : 'Small' },
                  { value: 'medium', label: isArabic ? 'متوسط' : 'Medium' },
                  { value: 'large', label: isArabic ? 'كبير' : 'Large' }
                ].map(({ value, label }) => (
                  <motion.button
                    key={value}
                    onClick={() => setFontSize(value as any)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      fontSize === value
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`font-medium ${
                      value === 'small' ? 'text-sm' :
                      value === 'large' ? 'text-lg' : 'text-base'
                    }`}>
                      {label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* كثافة المعلومات */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Layout className="w-5 h-5 mr-2" />
                {isArabic ? 'كثافة المعلومات' : 'Information Density'}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'compact', label: isArabic ? 'مضغوط' : 'Compact' },
                  { value: 'comfortable', label: isArabic ? 'مريح' : 'Comfortable' },
                  { value: 'spacious', label: isArabic ? 'واسع' : 'Spacious' }
                ].map(({ value, label }) => (
                  <motion.button
                    key={value}
                    onClick={() => setDensity(value as any)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      density === value
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-sm font-medium">{label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* اللغة */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                {isArabic ? 'اللغة' : 'Language'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'ar', label: 'العربية', flag: '🇸🇦' },
                  { value: 'en', label: 'English', flag: '🇺🇸' }
                ].map(({ value, label, flag }) => (
                  <motion.button
                    key={value}
                    onClick={() => setLang(value as Language)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      lang === value
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-2">{flag}</div>
                    <div className="text-sm font-medium">{label}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {/* تقليل الحركة */}
              <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h5 className="font-medium text-gray-800">
                      {isArabic ? 'تقليل الحركة' : 'Reduce Motion'}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'تقليل الرسوم المتحركة والانتقالات' : 'Reduce animations and transitions'}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    reducedMotion ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: reducedMotion ? 26 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>

              {/* التباين العالي */}
              <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
                <div className="flex items-center">
                  <Eye className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <h5 className="font-medium text-gray-800">
                      {isArabic ? 'التباين العالي' : 'High Contrast'}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'زيادة التباين لتحسين الرؤية' : 'Increase contrast for better visibility'}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    highContrast ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: highContrast ? 26 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>

              {/* الأصوات */}
              <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
                <div className="flex items-center">
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-green-600 mr-3" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-red-600 mr-3" />
                  )}
                  <div>
                    <h5 className="font-medium text-gray-800">
                      {isArabic ? 'الأصوات' : 'Sound Effects'}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'تفعيل أصوات التفاعل' : 'Enable interaction sounds'}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    soundEnabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: soundEnabled ? 26 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h5 className="font-medium text-gray-800">
                      {isArabic ? 'الإشعارات' : 'Notifications'}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'تلقي إشعارات النظام' : 'Receive system notifications'}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: notificationsEnabled ? 26 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedButton
                onClick={handleExportSettings}
                variant="secondary"
                size="md"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                {isArabic ? 'تصدير الإعدادات' : 'Export Settings'}
              </AnimatedButton>

              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportSettings}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <AnimatedButton
                  variant="secondary"
                  size="md"
                  className="w-full pointer-events-none"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isArabic ? 'استيراد الإعدادات' : 'Import Settings'}
                </AnimatedButton>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <AnimatedButton
                onClick={resetAllSettings}
                variant="danger"
                size="lg"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {isArabic ? 'إعادة تعيين جميع الإعدادات' : 'Reset All Settings'}
              </AnimatedButton>
              <p className="text-sm text-gray-500 text-center mt-2">
                {isArabic 
                  ? 'سيتم إعادة تعيين جميع الإعدادات إلى القيم الافتراضية'
                  : 'This will reset all settings to their default values'
                }
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">{isArabic ? 'قريباً' : 'Coming Soon'}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center mb-6">
          <Settings className="w-8 h-8 text-gray-600 mr-3" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {isArabic ? 'الإعدادات المتقدمة' : 'Advanced Settings'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isArabic ? 'تخصيص تجربة الاستخدام حسب تفضيلاتك' : 'Customize your experience to your preferences'}
            </p>
          </div>
        </div>

        {/* التبويبات */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/20 pb-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/20 text-gray-700 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* محتوى التبويب */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}