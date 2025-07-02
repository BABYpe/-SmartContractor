import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { 
  Settings, 
  Grid3X3, 
  List, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Save,
  Edit3,
  Plus,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useDashboardStore } from '../stores/dashboardStore';
import { useThemeStore } from '../stores/themeStore';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import DashboardWidget from './DashboardWidget';
import toast from 'react-hot-toast';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface CustomizableDashboardProps {
  lang: 'ar' | 'en';
}

export default function CustomizableDashboard({ lang }: CustomizableDashboardProps) {
  const {
    widgets,
    layout,
    isEditMode,
    setWidgets,
    updateWidget,
    toggleWidget,
    setLayout,
    setEditMode,
    resetToDefault
  } = useDashboardStore();

  const { density } = useThemeStore();
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);

  const isArabic = lang === 'ar';

  // تحويل widgets إلى تخطيط grid layout
  const gridLayout = widgets.map(widget => ({
    i: widget.id,
    x: widget.position.x,
    y: widget.position.y,
    w: widget.position.w,
    h: widget.position.h,
    minW: 2,
    minH: 2
  }));

  // معالج تغيير التخطيط
  const handleLayoutChange = useCallback((newLayout: any[]) => {
    if (!isEditMode) return;

    const updatedWidgets = widgets.map(widget => {
      const layoutItem = newLayout.find(item => item.i === widget.id);
      if (layoutItem) {
        return {
          ...widget,
          position: {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h
          }
        };
      }
      return widget;
    });

    setWidgets(updatedWidgets);
  }, [widgets, setWidgets, isEditMode]);

  // حفظ التخطيط
  const handleSaveLayout = () => {
    setEditMode(false);
    toast.success(isArabic ? 'تم حفظ التخطيط بنجاح' : 'Layout saved successfully');
  };

  // إعادة تعيين التخطيط
  const handleResetLayout = () => {
    resetToDefault();
    toast.success(isArabic ? 'تم إعادة تعيين التخطيط' : 'Layout reset to default');
  };

  // الحصول على الأدوات المرئية
  const visibleWidgets = widgets.filter(widget => widget.isVisible);

  return (
    <div className="space-y-6">
      {/* شريط التحكم */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Grid3X3 className="w-6 h-6 mr-2" />
              {isArabic ? 'لوحة التحكم القابلة للتخصيص' : 'Customizable Dashboard'}
            </h2>
            
            {isEditMode && (
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  {isArabic ? 'وضع التحرير' : 'Edit Mode'}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* تبديل التخطيط */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 rounded-md transition-all ${
                  layout === 'grid' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                title={isArabic ? 'عرض الشبكة' : 'Grid View'}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-2 rounded-md transition-all ${
                  layout === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                title={isArabic ? 'عرض القائمة' : 'List View'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* أزرار التحكم */}
            <AnimatedButton
              onClick={() => setShowWidgetSelector(!showWidgetSelector)}
              variant="secondary"
              size="sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              {isArabic ? 'إدارة الأدوات' : 'Manage Widgets'}
            </AnimatedButton>

            {isEditMode ? (
              <div className="flex space-x-2">
                <AnimatedButton
                  onClick={handleSaveLayout}
                  variant="success"
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isArabic ? 'حفظ' : 'Save'}
                </AnimatedButton>
                
                <AnimatedButton
                  onClick={() => setEditMode(false)}
                  variant="secondary"
                  size="sm"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </AnimatedButton>
              </div>
            ) : (
              <AnimatedButton
                onClick={() => setEditMode(true)}
                variant="primary"
                size="sm"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isArabic ? 'تحرير التخطيط' : 'Edit Layout'}
              </AnimatedButton>
            )}
          </div>
        </div>

        {/* منتقي الأدوات */}
        <AnimatePresence>
          {showWidgetSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/20"
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {isArabic ? 'إدارة الأدوات:' : 'Manage Widgets:'}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {widgets.map(widget => (
                  <motion.button
                    key={widget.id}
                    onClick={() => toggleWidget(widget.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      widget.isVisible
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">
                        {isArabic ? widget.title : widget.titleEn}
                      </span>
                      {widget.isVisible ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                    </div>
                    <div className="text-xs opacity-75">
                      {widget.isVisible ? 
                        (isArabic ? 'مرئي' : 'Visible') : 
                        (isArabic ? 'مخفي' : 'Hidden')
                      }
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <AnimatedButton
                  onClick={handleResetLayout}
                  variant="warning"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isArabic ? 'إعادة تعيين' : 'Reset'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      {/* لوحة التحكم */}
      <div className={`${density === 'compact' ? 'space-y-4' : density === 'spacious' ? 'space-y-8' : 'space-y-6'}`}>
        {layout === 'grid' ? (
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: gridLayout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
            isDraggable={isEditMode}
            isResizable={isEditMode}
            onLayoutChange={handleLayoutChange}
            margin={[16, 16]}
            containerPadding={[0, 0]}
          >
            {visibleWidgets.map(widget => (
              <div key={widget.id} className={isEditMode ? 'cursor-move' : ''}>
                <DashboardWidget
                  widget={widget}
                  isEditMode={isEditMode}
                  lang={lang}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        ) : (
          <div className="space-y-6">
            {visibleWidgets
              .sort((a, b) => a.position.y - b.position.y)
              .map(widget => (
                <motion.div
                  key={widget.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DashboardWidget
                    widget={widget}
                    isEditMode={isEditMode}
                    lang={lang}
                  />
                </motion.div>
              ))}
          </div>
        )}
      </div>

      {/* رسالة عدم وجود أدوات */}
      {visibleWidgets.length === 0 && (
        <div className="text-center py-12">
          <Grid3X3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {isArabic ? 'لا توجد أدوات مرئية' : 'No visible widgets'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isArabic 
              ? 'قم بتفعيل بعض الأدوات من إعدادات إدارة الأدوات'
              : 'Enable some widgets from the widget management settings'
            }
          </p>
          <AnimatedButton
            onClick={() => setShowWidgetSelector(true)}
            variant="primary"
            size="md"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isArabic ? 'إضافة أدوات' : 'Add Widgets'}
          </AnimatedButton>
        </div>
      )}
    </div>
  );
}