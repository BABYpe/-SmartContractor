import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DashboardWidget {
  id: string;
  type: 'metrics' | 'chart' | 'activities' | 'quick-actions' | 'ai-insights' | 'performance';
  title: string;
  titleEn: string;
  position: { x: number; y: number; w: number; h: number };
  isVisible: boolean;
  config?: Record<string, any>;
}

interface DashboardState {
  widgets: DashboardWidget[];
  layout: 'grid' | 'list';
  isEditMode: boolean;
  setWidgets: (widgets: DashboardWidget[]) => void;
  updateWidget: (id: string, updates: Partial<DashboardWidget>) => void;
  toggleWidget: (id: string) => void;
  setLayout: (layout: 'grid' | 'list') => void;
  setEditMode: (isEditMode: boolean) => void;
  resetToDefault: () => void;
}

const defaultWidgets: DashboardWidget[] = [
  {
    id: 'metrics',
    type: 'metrics',
    title: 'المقاييس الرئيسية',
    titleEn: 'Key Metrics',
    position: { x: 0, y: 0, w: 12, h: 4 },
    isVisible: true
  },
  {
    id: 'chart',
    type: 'chart',
    title: 'تحليل الأداء',
    titleEn: 'Performance Analysis',
    position: { x: 0, y: 4, w: 8, h: 6 },
    isVisible: true
  },
  {
    id: 'activities',
    type: 'activities',
    title: 'الأنشطة الحديثة',
    titleEn: 'Recent Activities',
    position: { x: 8, y: 4, w: 4, h: 6 },
    isVisible: true
  },
  {
    id: 'quick-actions',
    type: 'quick-actions',
    title: 'الإجراءات السريعة',
    titleEn: 'Quick Actions',
    position: { x: 0, y: 10, w: 12, h: 3 },
    isVisible: true
  },
  {
    id: 'ai-insights',
    type: 'ai-insights',
    title: 'رؤى الذكاء الاصطناعي',
    titleEn: 'AI Insights',
    position: { x: 0, y: 13, w: 12, h: 4 },
    isVisible: true
  },
  {
    id: 'performance',
    type: 'performance',
    title: 'مراقبة الأداء',
    titleEn: 'Performance Monitor',
    position: { x: 0, y: 17, w: 6, h: 3 },
    isVisible: false
  }
];

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: defaultWidgets,
      layout: 'grid',
      isEditMode: false,
      
      setWidgets: (widgets) => set({ widgets }),
      
      updateWidget: (id, updates) => {
        const widgets = get().widgets.map(widget =>
          widget.id === id ? { ...widget, ...updates } : widget
        );
        set({ widgets });
      },
      
      toggleWidget: (id) => {
        const widgets = get().widgets.map(widget =>
          widget.id === id ? { ...widget, isVisible: !widget.isVisible } : widget
        );
        set({ widgets });
      },
      
      setLayout: (layout) => set({ layout }),
      
      setEditMode: (isEditMode) => set({ isEditMode }),
      
      resetToDefault: () => set({ widgets: defaultWidgets, layout: 'grid', isEditMode: false })
    }),
    {
      name: 'dashboard-settings'
    }
  )
);