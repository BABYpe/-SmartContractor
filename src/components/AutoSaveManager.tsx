import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Clock, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Settings,
  History
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import { enhancedPricingEngine } from '../utils/enhancedPricingEngine';
import toast from 'react-hot-toast';

interface AutoSaveManagerProps {
  currentProject?: any;
  onProjectLoad?: (project: any) => void;
  lang: 'ar' | 'en';
}

export default function AutoSaveManager({ 
  currentProject, 
  onProjectLoad, 
  lang 
}: AutoSaveManagerProps) {
  const [autoSavedProjects, setAutoSavedProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30); // ثواني
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

  const isArabic = lang === 'ar';

  // تحميل المشاريع المحفوظة عند بدء التشغيل
  useEffect(() => {
    loadAutoSavedProjects();
  }, []);

  // الحفظ التلقائي الدوري
  useEffect(() => {
    if (!autoSaveEnabled || !currentProject) return;

    const interval = setInterval(() => {
      autoSaveCurrentProject();
    }, autoSaveInterval * 1000);

    return () => clearInterval(interval);
  }, [autoSaveEnabled, autoSaveInterval, currentProject]);

  const loadAutoSavedProjects = async () => {
    setIsLoading(true);
    try {
      const projects = await enhancedPricingEngine.getAutoSavedProjects('current-user');
      setAutoSavedProjects(projects.sort((a, b) => 
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
      ));
    } catch (error) {
      console.error('Error loading auto-saved projects:', error);
      toast.error(isArabic ? 'فشل في تحميل المشاريع المحفوظة' : 'Failed to load saved projects');
    } finally {
      setIsLoading(false);
    }
  };

  const autoSaveCurrentProject = async () => {
    if (!currentProject) return;

    try {
      await enhancedPricingEngine.autoSaveProject(
        currentProject, 
        'current-user', 
        'auto'
      );
      setLastAutoSave(new Date());
      
      // تحديث قائمة المشاريع المحفوظة
      await loadAutoSavedProjects();
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  };

  const manualSave = async () => {
    if (!currentProject) {
      toast.error(isArabic ? 'لا يوجد مشروع للحفظ' : 'No project to save');
      return;
    }

    try {
      await enhancedPricingEngine.autoSaveProject(
        currentProject, 
        'current-user', 
        'manual'
      );
      setLastAutoSave(new Date());
      await loadAutoSavedProjects();
      toast.success(isArabic ? 'تم حفظ المشروع بنجاح' : 'Project saved successfully');
    } catch (error) {
      console.error('Manual save error:', error);
      toast.error(isArabic ? 'فشل في حفظ المشروع' : 'Failed to save project');
    }
  };

  const loadProject = (project: any) => {
    if (onProjectLoad) {
      onProjectLoad(project.projectData);
      toast.success(isArabic ? 'تم تحميل المشروع' : 'Project loaded');
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      // في التطبيق الحقيقي، سيتم حذف المشروع من قاعدة البيانات
      const updatedProjects = autoSavedProjects.filter(p => p.id !== projectId);
      setAutoSavedProjects(updatedProjects);
      
      // تحديث التخزين المحلي
      localStorage.setItem('autoSavedProjects', JSON.stringify(updatedProjects));
      
      toast.success(isArabic ? 'تم حذف المشروع' : 'Project deleted');
    } catch (error) {
      console.error('Delete project error:', error);
      toast.error(isArabic ? 'فشل في حذف المشروع' : 'Failed to delete project');
    }
  };

  const exportProjects = () => {
    try {
      const dataStr = JSON.stringify(autoSavedProjects, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `auto-saved-projects-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      toast.success(isArabic ? 'تم تصدير المشاريع' : 'Projects exported');
    } catch (error) {
      console.error('Export error:', error);
      toast.error(isArabic ? 'فشل في التصدير' : 'Export failed');
    }
  };

  const importProjects = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedProjects = JSON.parse(e.target?.result as string);
        
        // دمج المشاريع المستوردة مع الموجودة
        const mergedProjects = [...autoSavedProjects, ...importedProjects];
        setAutoSavedProjects(mergedProjects);
        
        localStorage.setItem('autoSavedProjects', JSON.stringify(mergedProjects));
        toast.success(isArabic ? 'تم استيراد المشاريع' : 'Projects imported');
      } catch (error) {
        console.error('Import error:', error);
        toast.error(isArabic ? 'فشل في الاستيراد' : 'Import failed');
      }
    };
    reader.readAsText(file);
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return isArabic ? 'الآن' : 'Now';
    if (diffInMinutes < 60) return isArabic ? `منذ ${diffInMinutes} دقيقة` : `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return isArabic ? `منذ ${diffInHours} ساعة` : `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return isArabic ? `منذ ${diffInDays} يوم` : `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* إعدادات الحفظ التلقائي */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            {isArabic ? 'إعدادات الحفظ التلقائي' : 'Auto-Save Settings'}
          </h3>
          
          <div className="flex items-center space-x-2">
            {lastAutoSave && (
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                {isArabic ? 'آخر حفظ:' : 'Last saved:'} {formatTimeAgo(lastAutoSave.toISOString())}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-white/20 rounded-xl">
            <span className="text-sm font-medium text-gray-700">
              {isArabic ? 'تفعيل الحفظ التلقائي' : 'Enable Auto-Save'}
            </span>
            <motion.button
              onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                autoSaveEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ x: autoSaveEnabled ? 26 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              {isArabic ? 'فترة الحفظ (ثانية)' : 'Save Interval (seconds)'}
            </label>
            <select
              value={autoSaveInterval}
              onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
              className="p-2 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={!autoSaveEnabled}
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={120}>120</option>
            </select>
          </div>

          <AnimatedButton
            onClick={manualSave}
            variant="primary"
            size="md"
            className="w-full"
            disabled={!currentProject}
          >
            <Save className="w-4 h-4 mr-2" />
            {isArabic ? 'حفظ يدوي' : 'Manual Save'}
          </AnimatedButton>
        </div>
      </GlassCard>

      {/* قائمة المشاريع المحفوظة */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <History className="w-6 h-6 mr-2" />
            {isArabic ? 'المشاريع المحفوظة تلقائياً' : 'Auto-Saved Projects'}
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {autoSavedProjects.length}
            </span>
          </h3>

          <div className="flex items-center space-x-2">
            <AnimatedButton
              onClick={loadAutoSavedProjects}
              variant="secondary"
              size="sm"
              loading={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {isArabic ? 'تحديث' : 'Refresh'}
            </AnimatedButton>

            <AnimatedButton
              onClick={exportProjects}
              variant="secondary"
              size="sm"
              disabled={autoSavedProjects.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              {isArabic ? 'تصدير' : 'Export'}
            </AnimatedButton>

            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={importProjects}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <AnimatedButton
                variant="secondary"
                size="sm"
                className="pointer-events-none"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isArabic ? 'استيراد' : 'Import'}
              </AnimatedButton>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-spin" />
            <p className="text-gray-600">{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
          </div>
        ) : autoSavedProjects.length === 0 ? (
          <div className="text-center py-8">
            <Save className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              {isArabic ? 'لا توجد مشاريع محفوظة' : 'No saved projects'}
            </h4>
            <p className="text-gray-600">
              {isArabic 
                ? 'ابدأ العمل على مشروع جديد وسيتم حفظه تلقائياً'
                : 'Start working on a new project and it will be auto-saved'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {autoSavedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-800 truncate">
                          {project.projectName}
                        </h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.saveTrigger === 'auto' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.saveTrigger === 'auto' 
                            ? (isArabic ? 'تلقائي' : 'Auto')
                            : (isArabic ? 'يدوي' : 'Manual')
                          }
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        {project.estimatedCost && (
                          <div>
                            <span className="font-medium">
                              {isArabic ? 'التكلفة:' : 'Cost:'}
                            </span>
                            <span className="ml-1">
                              {project.estimatedCost.toLocaleString()} ريال
                            </span>
                          </div>
                        )}
                        
                        {project.projectType && (
                          <div>
                            <span className="font-medium">
                              {isArabic ? 'النوع:' : 'Type:'}
                            </span>
                            <span className="ml-1">{project.projectType}</span>
                          </div>
                        )}
                        
                        {project.city && (
                          <div>
                            <span className="font-medium">
                              {isArabic ? 'المدينة:' : 'City:'}
                            </span>
                            <span className="ml-1">{project.city}</span>
                          </div>
                        )}
                        
                        <div>
                          <span className="font-medium">
                            {isArabic ? 'آخر وصول:' : 'Last accessed:'}
                          </span>
                          <span className="ml-1">
                            {formatTimeAgo(project.lastAccessed)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <AnimatedButton
                        onClick={() => loadProject(project)}
                        variant="primary"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        {isArabic ? 'تحميل' : 'Load'}
                      </AnimatedButton>
                      
                      <AnimatedButton
                        onClick={() => deleteProject(project.id)}
                        variant="danger"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </GlassCard>

      {/* تحذير الحفظ التلقائي */}
      {!autoSaveEnabled && currentProject && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-100/50 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50"
        >
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-800 font-medium mb-1">
                {isArabic ? 'تحذير: الحفظ التلقائي معطل' : 'Warning: Auto-save is disabled'}
              </p>
              <p className="text-sm text-yellow-700">
                {isArabic 
                  ? 'قد تفقد تقدمك إذا لم تحفظ المشروع يدوياً'
                  : 'You may lose your progress if you don\'t save manually'
                }
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}