import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Download,
  Upload,
  Save,
  RefreshCw
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import toast from 'react-hot-toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'أحمد محمد السعيد',
      email: 'ahmed@smartcontractor.com',
      phone: '+966501234567',
      company: 'شركة المقاولات المتقدمة',
      position: 'مدير المشاريع',
      avatar: ''
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      projectUpdates: true,
      paymentReminders: true,
      systemAlerts: true,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAlerts: true
    },
    appearance: {
      theme: 'light',
      language: 'ar',
      dateFormat: 'dd/mm/yyyy',
      currency: 'SAR',
      timezone: 'Asia/Riyadh'
    },
    system: {
      autoSave: true,
      backupFrequency: 'daily',
      dataRetention: 365,
      apiAccess: false
    }
  });

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'appearance', label: 'المظهر', icon: Palette },
    { id: 'system', label: 'النظام', icon: Database }
  ];

  const handleSaveSettings = () => {
    // Save settings logic here
    toast.success('تم حفظ الإعدادات بنجاح');
  };

  const handleExportData = () => {
    // Export data logic here
    toast.success('تم تصدير البيانات بنجاح');
  };

  const handleImportData = () => {
    // Import data logic here
    toast.success('تم استيراد البيانات بنجاح');
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {settings.profile.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{settings.profile.name}</h3>
          <p className="text-gray-600">{settings.profile.position}</p>
          <AnimatedButton variant="secondary" size="sm" className="mt-2">
            تغيير الصورة
          </AnimatedButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, name: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, email: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, phone: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الشركة</label>
          <input
            type="text"
            value={settings.profile.company}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, company: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">المنصب</label>
          <input
            type="text"
            value={settings.profile.position}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, position: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">إعدادات الإشعارات</h3>
      
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-white/30 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">
                {key === 'emailNotifications' ? 'إشعارات البريد الإلكتروني' :
                 key === 'smsNotifications' ? 'إشعارات الرسائل النصية' :
                 key === 'projectUpdates' ? 'تحديثات المشاريع' :
                 key === 'paymentReminders' ? 'تذكيرات الدفع' :
                 key === 'systemAlerts' ? 'تنبيهات النظام' :
                 'رسائل التسويق'}
              </h4>
              <p className="text-sm text-gray-600">
                {key === 'emailNotifications' ? 'استقبال الإشعارات عبر البريد الإلكتروني' :
                 key === 'smsNotifications' ? 'استقبال الإشعارات عبر الرسائل النصية' :
                 key === 'projectUpdates' ? 'إشعارات حول تحديثات المشاريع' :
                 key === 'paymentReminders' ? 'تذكيرات بمواعيد الدفع' :
                 key === 'systemAlerts' ? 'تنبيهات النظام والأمان' :
                 'رسائل ترويجية وتسويقية'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, [key]: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">إعدادات الأمان</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/30 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">المصادقة الثنائية</h4>
            <p className="text-sm text-gray-600">تفعيل طبقة حماية إضافية لحسابك</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, twoFactorAuth: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="p-4 bg-white/30 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">مهلة انتهاء الجلسة (دقيقة)</label>
          <select
            value={settings.security.sessionTimeout}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={15}>15 دقيقة</option>
            <option value={30}>30 دقيقة</option>
            <option value={60}>60 دقيقة</option>
            <option value={120}>120 دقيقة</option>
          </select>
        </div>

        <div className="p-4 bg-white/30 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">انتهاء صلاحية كلمة المرور (يوم)</label>
          <select
            value={settings.security.passwordExpiry}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={30}>30 يوم</option>
            <option value={60}>60 يوم</option>
            <option value={90}>90 يوم</option>
            <option value={180}>180 يوم</option>
          </select>
        </div>

        <div className="space-y-3">
          <AnimatedButton variant="warning" size="md" className="w-full">
            تغيير كلمة المرور
          </AnimatedButton>
          <AnimatedButton variant="secondary" size="md" className="w-full">
            تسجيل الخروج من جميع الأجهزة
          </AnimatedButton>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">إعدادات المظهر</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">المظهر</label>
          <select
            value={settings.appearance.theme}
            onChange={(e) => setSettings({
              ...settings,
              appearance: { ...settings.appearance, theme: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
            <option value="auto">تلقائي</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
          <select
            value={settings.appearance.language}
            onChange={(e) => setSettings({
              ...settings,
              appearance: { ...settings.appearance, language: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق التاريخ</label>
          <select
            value={settings.appearance.dateFormat}
            onChange={(e) => setSettings({
              ...settings,
              appearance: { ...settings.appearance, dateFormat: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
            <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
            <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
          <select
            value={settings.appearance.currency}
            onChange={(e) => setSettings({
              ...settings,
              appearance: { ...settings.appearance, currency: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="SAR">ريال سعودي (SAR)</option>
            <option value="USD">دولار أمريكي (USD)</option>
            <option value="EUR">يورو (EUR)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
          <select
            value={settings.appearance.timezone}
            onChange={(e) => setSettings({
              ...settings,
              appearance: { ...settings.appearance, timezone: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="Asia/Riyadh">الرياض (GMT+3)</option>
            <option value="Asia/Dubai">دبي (GMT+4)</option>
            <option value="Europe/London">لندن (GMT+0)</option>
            <option value="America/New_York">نيويورك (GMT-5)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">إعدادات النظام</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/30 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">الحفظ التلقائي</h4>
            <p className="text-sm text-gray-600">حفظ التغييرات تلقائياً أثناء العمل</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.system.autoSave}
              onChange={(e) => setSettings({
                ...settings,
                system: { ...settings.system, autoSave: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="p-4 bg-white/30 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">تكرار النسخ الاحتياطي</label>
          <select
            value={settings.system.backupFrequency}
            onChange={(e) => setSettings({
              ...settings,
              system: { ...settings.system, backupFrequency: e.target.value }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="daily">يومي</option>
            <option value="weekly">أسبوعي</option>
            <option value="monthly">شهري</option>
          </select>
        </div>

        <div className="p-4 bg-white/30 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">مدة الاحتفاظ بالبيانات (يوم)</label>
          <select
            value={settings.system.dataRetention}
            onChange={(e) => setSettings({
              ...settings,
              system: { ...settings.system, dataRetention: parseInt(e.target.value) }
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value={90}>90 يوم</option>
            <option value={180}>180 يوم</option>
            <option value={365}>سنة واحدة</option>
            <option value={730}>سنتان</option>
          </select>
        </div>

        <div className="space-y-3">
          <AnimatedButton 
            onClick={handleExportData}
            variant="secondary" 
            size="md" 
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            تصدير البيانات
          </AnimatedButton>
          
          <AnimatedButton 
            onClick={handleImportData}
            variant="secondary" 
            size="md" 
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            استيراد البيانات
          </AnimatedButton>
          
          <AnimatedButton 
            variant="warning" 
            size="md" 
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            إعادة تعيين النظام
          </AnimatedButton>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'appearance': return renderAppearanceSettings();
      case 'system': return renderSystemSettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3 text-gray-600" />
            الإعدادات
          </h1>
          <p className="text-gray-600 mt-2">إدارة إعدادات الحساب والنظام</p>
        </div>
        
        <AnimatedButton
          onClick={handleSaveSettings}
          variant="primary"
          size="lg"
        >
          <Save className="w-5 h-5 mr-2" />
          حفظ التغييرات
        </AnimatedButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <GlassCard className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-white/30'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </GlassCard>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <GlassCard className="p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}