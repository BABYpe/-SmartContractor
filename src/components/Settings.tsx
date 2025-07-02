import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Database,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import toast from 'react-hot-toast';
import type { Language } from '../types';

interface SettingsProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

export default function Settings({ lang, setLang, t }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      fullName: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      company: 'شركة المقاولات المتقدمة',
      position: 'مهندس مشاريع'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketUpdates: true,
      projectAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    preferences: {
      theme: 'light',
      currency: 'SAR',
      dateFormat: 'dd/mm/yyyy',
      timeFormat: '24h',
      autoSave: true
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: lang === 'ar' ? 'الملف الشخصي' : 'Profile', icon: User },
    { id: 'notifications', label: lang === 'ar' ? 'الإشعارات' : 'Notifications', icon: Bell },
    { id: 'security', label: lang === 'ar' ? 'الأمان' : 'Security', icon: Shield },
    { id: 'preferences', label: lang === 'ar' ? 'التفضيلات' : 'Preferences', icon: Palette },
    { id: 'data', label: lang === 'ar' ? 'البيانات' : 'Data', icon: Database }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // محاكاة حفظ الإعدادات
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(lang === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
    } catch (error) {
      toast.error(lang === 'ar' ? 'فشل في حفظ الإعدادات' : 'Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings-backup.json';
    a.click();
    toast.success(lang === 'ar' ? 'تم تصدير البيانات' : 'Data exported');
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast.success(lang === 'ar' ? 'تم استيراد البيانات' : 'Data imported');
        } catch (error) {
          toast.error(lang === 'ar' ? 'فشل في استيراد البيانات' : 'Failed to import data');
        }
      };
      reader.readAsText(file);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
          </label>
          <input
            type="text"
            value={settings.profile.fullName}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, fullName: e.target.value }
            }))}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, email: e.target.value }
            }))}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
          </label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, phone: e.target.value }
            }))}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'اسم الشركة' : 'Company Name'}
          </label>
          <input
            type="text"
            value={settings.profile.company}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, company: e.target.value }
            }))}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'ar' ? 'المنصب' : 'Position'}
        </label>
        <input
          type="text"
          value={settings.profile.position}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            profile: { ...prev.profile, position: e.target.value }
          }))}
          className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
          <div>
            <h4 className="font-medium text-gray-800">
              {key === 'emailNotifications' ? (lang === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications') :
               key === 'smsNotifications' ? (lang === 'ar' ? 'إشعارات الرسائل النصية' : 'SMS Notifications') :
               key === 'pushNotifications' ? (lang === 'ar' ? 'الإشعارات الفورية' : 'Push Notifications') :
               key === 'marketUpdates' ? (lang === 'ar' ? 'تحديثات السوق' : 'Market Updates') :
               (lang === 'ar' ? 'تنبيهات المشاريع' : 'Project Alerts')}
            </h4>
          </div>
          <button
            onClick={() => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, [key]: !value }
            }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              value ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
              value ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
        <div>
          <h4 className="font-medium text-gray-800">
            {lang === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
          </h4>
          <p className="text-sm text-gray-600">
            {lang === 'ar' ? 'حماية إضافية لحسابك' : 'Extra security for your account'}
          </p>
        </div>
        <button
          onClick={() => setSettings(prev => ({
            ...prev,
            security: { ...prev.security, twoFactorAuth: !prev.security.twoFactorAuth }
          }))}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            settings.security.twoFactorAuth ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
            settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'ar' ? 'انتهاء الجلسة (دقيقة)' : 'Session Timeout (minutes)'}
        </label>
        <select
          value={settings.security.sessionTimeout}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            security: { ...prev.security, sessionTimeout: Number(e.target.value) }
          }))}
          className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={120}>120</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
        </label>
        <div className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={lang === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
              className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <input
            type="password"
            placeholder={lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder={lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'اللغة' : 'Language'}
          </label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'العملة' : 'Currency'}
          </label>
          <select
            value={settings.preferences.currency}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              preferences: { ...prev.preferences, currency: e.target.value }
            }))}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="SAR">ريال سعودي (SAR)</option>
            <option value="USD">دولار أمريكي (USD)</option>
            <option value="EUR">يورو (EUR)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'تنسيق التاريخ' : 'Date Format'}
          </label>
          <select
            value={settings.preferences.dateFormat}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              preferences: { ...prev.preferences, dateFormat: e.target.value }
            }))}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'ar' ? 'تنسيق الوقت' : 'Time Format'}
          </label>
          <select
            value={settings.preferences.timeFormat}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              preferences: { ...prev.preferences, timeFormat: e.target.value }
            }))}
            className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">24 ساعة</option>
            <option value="12h">12 ساعة</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
        <div>
          <h4 className="font-medium text-gray-800">
            {lang === 'ar' ? 'الحفظ التلقائي' : 'Auto Save'}
          </h4>
          <p className="text-sm text-gray-600">
            {lang === 'ar' ? 'حفظ التغييرات تلقائياً' : 'Save changes automatically'}
          </p>
        </div>
        <button
          onClick={() => setSettings(prev => ({
            ...prev,
            preferences: { ...prev.preferences, autoSave: !prev.preferences.autoSave }
          }))}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            settings.preferences.autoSave ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
            settings.preferences.autoSave ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatedButton
          onClick={handleExportData}
          variant="primary"
          size="lg"
          className="w-full"
        >
          <Download className="w-5 h-5 mr-2" />
          {lang === 'ar' ? 'تصدير البيانات' : 'Export Data'}
        </AnimatedButton>

        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImportData}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <AnimatedButton
            variant="secondary"
            size="lg"
            className="w-full pointer-events-none"
          >
            <Upload className="w-5 h-5 mr-2" />
            {lang === 'ar' ? 'استيراد البيانات' : 'Import Data'}
          </AnimatedButton>
        </div>
      </div>

      <div className="bg-red-50/50 border border-red-200 rounded-xl p-4">
        <h4 className="font-medium text-red-800 mb-2">
          {lang === 'ar' ? 'منطقة الخطر' : 'Danger Zone'}
        </h4>
        <p className="text-sm text-red-600 mb-4">
          {lang === 'ar' ? 'هذه الإجراءات لا يمكن التراجع عنها' : 'These actions cannot be undone'}
        </p>
        <AnimatedButton
          onClick={() => {
            if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف جميع البيانات؟' : 'Are you sure you want to delete all data?')) {
              toast.success(lang === 'ar' ? 'تم حذف البيانات' : 'Data deleted');
            }
          }}
          variant="danger"
          size="md"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {lang === 'ar' ? 'حذف جميع البيانات' : 'Delete All Data'}
        </AnimatedButton>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SettingsIcon className="w-8 h-8 text-gray-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {lang === 'ar' ? 'الإعدادات' : 'Settings'}
            </h1>
            <p className="text-gray-600">
              {lang === 'ar' ? 'إدارة إعدادات حسابك وتفضيلاتك' : 'Manage your account settings and preferences'}
            </p>
          </div>
        </div>

        <AnimatedButton
          onClick={handleSave}
          loading={isLoading}
          variant="primary"
          size="lg"
        >
          <Save className="w-5 h-5 mr-2" />
          {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
        </AnimatedButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <GlassCard className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </GlassCard>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <GlassCard className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'security' && renderSecurityTab()}
              {activeTab === 'preferences' && renderPreferencesTab()}
              {activeTab === 'data' && renderDataTab()}
            </motion.div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}