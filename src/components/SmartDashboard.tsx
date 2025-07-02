import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  Zap,
  Brain,
  Target,
  Layers,
  PieChart,
  LineChart,
  Building,
  Calculator,
  FileText,
  Settings,
  Bell,
  Star,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';

interface SmartDashboardProps {
  lang: 'ar' | 'en';
}

interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface RecentActivity {
  id: string;
  type: 'project' | 'estimate' | 'report';
  title: string;
  time: string;
  status: 'completed' | 'pending' | 'in_progress';
}

export default function SmartDashboard({ lang }: SmartDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isArabic = lang === 'ar';

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // تحميل البيانات
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // محاكاة تحميل البيانات
      await new Promise(resolve => setTimeout(resolve, 1500));

      // بيانات المقاييس
      const dashboardMetrics: DashboardMetric[] = [
        {
          id: '1',
          title: isArabic ? 'إجمالي المشاريع' : 'Total Projects',
          value: '24',
          change: 12.5,
          icon: Building,
          color: 'from-blue-500 to-indigo-600',
          trend: 'up'
        },
        {
          id: '2',
          title: isArabic ? 'التقديرات النشطة' : 'Active Estimates',
          value: '8',
          change: 8.3,
          icon: Calculator,
          color: 'from-emerald-500 to-green-600',
          trend: 'up'
        },
        {
          id: '3',
          title: isArabic ? 'إجمالي القيمة' : 'Total Value',
          value: isArabic ? '2.4 مليون ريال' : '2.4M SAR',
          change: 15.7,
          icon: DollarSign,
          color: 'from-yellow-500 to-orange-600',
          trend: 'up'
        },
        {
          id: '4',
          title: isArabic ? 'معدل الدقة' : 'Accuracy Rate',
          value: '94.2%',
          change: 2.1,
          icon: Target,
          color: 'from-purple-500 to-violet-600',
          trend: 'up'
        }
      ];

      // الأنشطة الحديثة
      const activities: RecentActivity[] = [
        {
          id: '1',
          type: 'project',
          title: isArabic ? 'مشروع سكني - الرياض' : 'Residential Project - Riyadh',
          time: isArabic ? 'منذ 5 دقائق' : '5 minutes ago',
          status: 'completed'
        },
        {
          id: '2',
          type: 'estimate',
          title: isArabic ? 'تقدير مشروع تجاري' : 'Commercial Project Estimate',
          time: isArabic ? 'منذ 15 دقيقة' : '15 minutes ago',
          status: 'in_progress'
        },
        {
          id: '3',
          type: 'report',
          title: isArabic ? 'تقرير تحليل المخاطر' : 'Risk Analysis Report',
          time: isArabic ? 'منذ ساعة' : '1 hour ago',
          status: 'pending'
        }
      ];

      setMetrics(dashboardMetrics);
      setRecentActivities(activities);
      setIsLoading(false);
    };

    loadDashboardData();
  }, [isArabic]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(isArabic ? 'ar-SA-u-ca-gregory' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <motion.div
              className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="w-10 h-10 text-white" />
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
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {isArabic ? 'جاري تحميل لوحة التحكم الذكية...' : 'Loading Smart Dashboard...'}
          </h3>
          <p className="text-gray-600">
            {isArabic ? 'تحليل البيانات بالذكاء الاصطناعي' : 'AI-powered data analysis'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
              {isArabic ? 'لوحة التحكم الذكية' : 'Smart Dashboard'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isArabic ? 'مراقبة شاملة مدعومة بالذكاء الاصطناعي' : 'AI-powered comprehensive monitoring'}
            </p>
          </div>
        </div>

        {/* Time Display */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="bg-white/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-mono text-lg font-bold text-gray-800">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>
          <div className="bg-white/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {formatDate(currentTime)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">{metric.change}%</span>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <LineChart className="w-6 h-6 mr-2 text-blue-600" />
                  {isArabic ? 'تحليل الأداء الشهري' : 'Monthly Performance Analysis'}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {isArabic ? 'آخر 6 أشهر' : 'Last 6 months'}
                  </span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
              
              {/* Placeholder Chart */}
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-100">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {isArabic ? 'مخطط تفاعلي للأداء' : 'Interactive Performance Chart'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {isArabic ? 'سيتم تطويره قريباً' : 'Coming Soon'}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-purple-600" />
                {isArabic ? 'الأنشطة الحديثة' : 'Recent Activities'}
              </h3>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'project' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'estimate' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'project' ? <Building className="w-5 h-5" /> :
                       activity.type === 'estimate' ? <Calculator className="w-5 h-5" /> :
                       <FileText className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'in_progress' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`} />
                  </motion.div>
                ))}
              </div>
              
              <AnimatedButton
                variant="secondary"
                size="sm"
                className="w-full mt-4"
              >
                {isArabic ? 'عرض جميع الأنشطة' : 'View All Activities'}
              </AnimatedButton>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-600" />
            {isArabic ? 'الإجراءات السريعة' : 'Quick Actions'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatedButton
              variant="primary"
              size="lg"
              className="flex items-center justify-center"
            >
              <Calculator className="w-5 h-5 mr-2" />
              {isArabic ? 'تقدير جديد' : 'New Estimate'}
            </AnimatedButton>
            
            <AnimatedButton
              variant="success"
              size="lg"
              className="flex items-center justify-center"
            >
              <Building className="w-5 h-5 mr-2" />
              {isArabic ? 'مشروع جديد' : 'New Project'}
            </AnimatedButton>
            
            <AnimatedButton
              variant="secondary"
              size="lg"
              className="flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              {isArabic ? 'تقرير شامل' : 'Generate Report'}
            </AnimatedButton>
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassCard className="p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Brain className="w-6 h-6 text-white" />
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
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-blue-600 font-medium">
                  {isArabic ? 'توصية ذكية' : 'Smart Recommendation'}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}