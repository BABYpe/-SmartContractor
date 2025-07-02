import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Activity, 
  Zap, 
  Brain, 
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Target,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import type { DashboardWidget } from '../stores/dashboardStore';

interface DashboardWidgetProps {
  widget: DashboardWidget;
  isEditMode: boolean;
  lang: 'ar' | 'en';
}

// بيانات تجريبية للرسوم البيانية
const chartData = [
  { name: 'يناير', value: 400, cost: 240, projects: 12 },
  { name: 'فبراير', value: 300, cost: 139, projects: 8 },
  { name: 'مارس', value: 200, cost: 980, projects: 15 },
  { name: 'أبريل', value: 278, cost: 390, projects: 20 },
  { name: 'مايو', value: 189, cost: 480, projects: 18 },
  { name: 'يونيو', value: 239, cost: 380, projects: 22 }
];

const pieData = [
  { name: 'مشاريع سكنية', value: 400, color: '#3B82F6' },
  { name: 'مشاريع تجارية', value: 300, color: '#10B981' },
  { name: 'مشاريع صناعية', value: 200, color: '#F59E0B' },
  { name: 'مشاريع عامة', value: 100, color: '#EF4444' }
];

const metrics = [
  {
    id: 'projects',
    title: 'إجمالي المشاريع',
    titleEn: 'Total Projects',
    value: '24',
    change: 12.5,
    icon: BarChart3,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'estimates',
    title: 'التقديرات النشطة',
    titleEn: 'Active Estimates',
    value: '8',
    change: 8.3,
    icon: Target,
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 'value',
    title: 'إجمالي القيمة',
    titleEn: 'Total Value',
    value: '2.4M SAR',
    change: 15.7,
    icon: DollarSign,
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'accuracy',
    title: 'معدل الدقة',
    titleEn: 'Accuracy Rate',
    value: '94.2%',
    change: 2.1,
    icon: Brain,
    color: 'from-purple-500 to-violet-600'
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'project',
    title: 'مشروع سكني - الرياض',
    titleEn: 'Residential Project - Riyadh',
    time: 'منذ 5 دقائق',
    timeEn: '5 minutes ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'estimate',
    title: 'تقدير مشروع تجاري',
    titleEn: 'Commercial Project Estimate',
    time: 'منذ 15 دقيقة',
    timeEn: '15 minutes ago',
    status: 'in_progress'
  },
  {
    id: '3',
    type: 'report',
    title: 'تقرير تحليل المخاطر',
    titleEn: 'Risk Analysis Report',
    time: 'منذ ساعة',
    timeEn: '1 hour ago',
    status: 'pending'
  }
];

export default function DashboardWidget({ widget, isEditMode, lang }: DashboardWidgetProps) {
  const isArabic = lang === 'ar';

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'metrics':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center text-sm ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}%
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">
                    {isArabic ? metric.title : metric.titleEn}
                  </h4>
                  <p className="text-xl font-bold text-gray-800">{metric.value}</p>
                </motion.div>
              );
            })}
          </div>
        );

      case 'chart':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {isArabic ? 'تحليل الأداء الشهري' : 'Monthly Performance Analysis'}
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {isArabic ? 'التكلفة' : 'Cost'}
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  {isArabic ? 'المشاريع' : 'Projects'}
                </button>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-600" />
              {isArabic ? 'الأنشطة الحديثة' : 'Recent Activities'}
            </h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl border border-white/30 hover:bg-white/30 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'project' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'estimate' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'project' ? <BarChart3 className="w-4 h-4" /> :
                     activity.type === 'estimate' ? <Target className="w-4 h-4" /> :
                     <Activity className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {isArabic ? activity.title : activity.titleEn}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isArabic ? activity.time : activity.timeEn}
                    </p>
                  </div>
                  
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'in_progress' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`} />
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'quick-actions':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              {isArabic ? 'الإجراءات السريعة' : 'Quick Actions'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AnimatedButton variant="primary" size="md" className="flex items-center justify-center">
                <Target className="w-4 h-4 mr-2" />
                {isArabic ? 'تقدير جديد' : 'New Estimate'}
              </AnimatedButton>
              
              <AnimatedButton variant="success" size="md" className="flex items-center justify-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                {isArabic ? 'مشروع جديد' : 'New Project'}
              </AnimatedButton>
              
              <AnimatedButton variant="secondary" size="md" className="flex items-center justify-center">
                <Activity className="w-4 h-4 mr-2" />
                {isArabic ? 'تقرير شامل' : 'Generate Report'}
              </AnimatedButton>
            </div>
          </div>
        );

      case 'ai-insights':
        return (
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  {isArabic ? 'رؤى الذكاء الاصطناعي' : 'AI Insights'}
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {isArabic 
                    ? 'بناءً على تحليل البيانات الحديثة، نلاحظ زيادة في دقة التقديرات بنسبة 15% هذا الشهر. يُنصح بالتركيز على المشاريع السكنية في منطقة الرياض للحصول على أفضل العوائد.'
                    : 'Based on recent data analysis, we observe a 15% increase in estimation accuracy this month. We recommend focusing on residential projects in Riyadh area for optimal returns.'
                  }
                </p>
                <div className="flex items-center mt-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2" />
                  <span className="text-sm text-blue-600 font-medium">
                    {isArabic ? 'توصية ذكية' : 'Smart Recommendation'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              {isArabic ? 'مراقبة الأداء' : 'Performance Monitor'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{isArabic ? 'وقت الاستجابة' : 'Response Time'}</span>
                  <span className="text-green-600 text-sm font-medium">245ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{isArabic ? 'استخدام الذاكرة' : 'Memory Usage'}</span>
                  <span className="text-blue-600 text-sm font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">{isArabic ? 'أداة غير معروفة' : 'Unknown widget'}</p>
          </div>
        );
    }
  };

  return (
    <GlassCard className={`h-full ${isEditMode ? 'ring-2 ring-blue-500/30 ring-dashed' : ''}`}>
      <div className="p-4 h-full flex flex-col">
        {isEditMode && (
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/20">
            <span className="text-sm font-medium text-gray-700">
              {isArabic ? widget.title : widget.titleEn}
            </span>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Settings className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
        
        <div className="flex-1 overflow-hidden">
          {renderWidgetContent()}
        </div>
      </div>
    </GlassCard>
  );
}