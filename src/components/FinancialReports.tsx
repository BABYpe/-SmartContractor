import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  Calculator,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Building,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import toast from 'react-hot-toast';
import type { Language } from '../types';

interface FinancialData {
  revenue: {
    total: number;
    monthly: { month: string; amount: number; projects: number }[];
    growth: number;
  };
  expenses: {
    total: number;
    categories: { name: string; amount: number; percentage: number }[];
  };
  profit: {
    total: number;
    margin: number;
    trend: number;
  };
  projects: {
    completed: number;
    inProgress: number;
    planned: number;
    totalValue: number;
  };
  clients: {
    active: number;
    new: number;
    retention: number;
  };
  kpis: {
    averageProjectValue: number;
    profitPerProject: number;
    clientLifetimeValue: number;
    costPerAcquisition: number;
  };
}

interface FinancialReportsProps {
  lang: Language;
  t: any;
}

export default function FinancialReports({ lang, t }: FinancialReportsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);

  // Sample financial data
  useEffect(() => {
    const generateFinancialData = (): FinancialData => {
      const monthlyData = [
        { month: 'يناير', amount: 850000, projects: 3 },
        { month: 'فبراير', amount: 920000, projects: 4 },
        { month: 'مارس', amount: 1100000, projects: 5 },
        { month: 'أبريل', amount: 980000, projects: 4 },
        { month: 'مايو', amount: 1250000, projects: 6 },
        { month: 'يونيو', amount: 1180000, projects: 5 },
        { month: 'يوليو', amount: 1350000, projects: 7 },
        { month: 'أغسطس', amount: 1420000, projects: 6 },
        { month: 'سبتمبر', amount: 1300000, projects: 5 },
        { month: 'أكتوبر', amount: 1480000, projects: 8 },
        { month: 'نوفمبر', amount: 1520000, projects: 7 },
        { month: 'ديسمبر', amount: 1600000, projects: 9 }
      ];

      const totalRevenue = monthlyData.reduce((sum, month) => sum + month.amount, 0);
      const totalProjects = monthlyData.reduce((sum, month) => sum + month.projects, 0);

      return {
        revenue: {
          total: totalRevenue,
          monthly: monthlyData,
          growth: 15.8
        },
        expenses: {
          total: totalRevenue * 0.65,
          categories: [
            { name: 'مواد البناء', amount: totalRevenue * 0.35, percentage: 35 },
            { name: 'العمالة', amount: totalRevenue * 0.20, percentage: 20 },
            { name: 'المعدات', amount: totalRevenue * 0.08, percentage: 8 },
            { name: 'النقل', amount: totalRevenue * 0.05, percentage: 5 },
            { name: 'إدارية', amount: totalRevenue * 0.07, percentage: 7 }
          ]
        },
        profit: {
          total: totalRevenue * 0.35,
          margin: 35,
          trend: 12.5
        },
        projects: {
          completed: 45,
          inProgress: 12,
          planned: 8,
          totalValue: totalRevenue
        },
        clients: {
          active: 28,
          new: 8,
          retention: 85
        },
        kpis: {
          averageProjectValue: totalRevenue / totalProjects,
          profitPerProject: (totalRevenue * 0.35) / totalProjects,
          clientLifetimeValue: 450000,
          costPerAcquisition: 15000
        }
      };
    };

    setTimeout(() => {
      setFinancialData(generateFinancialData());
      setIsLoading(false);
    }, 1000);
  }, [selectedPeriod, selectedYear]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  const exportReport = () => {
    if (!financialData) return;

    const reportData = {
      period: selectedPeriod,
      year: selectedYear,
      generatedAt: new Date().toISOString(),
      data: financialData
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-report-${selectedYear}-${selectedPeriod}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(lang === 'ar' ? 'تم تصدير التقرير' : 'Report exported');
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  if (isLoading || !financialData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <DollarSign className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-gray-600">جاري تحميل التقارير المالية...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: lang === 'ar' ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
    { id: 'revenue', label: lang === 'ar' ? 'الإيرادات' : 'Revenue', icon: TrendingUp },
    { id: 'expenses', label: lang === 'ar' ? 'المصروفات' : 'Expenses', icon: TrendingDown },
    { id: 'projects', label: lang === 'ar' ? 'المشاريع' : 'Projects', icon: Building },
    { id: 'kpis', label: lang === 'ar' ? 'مؤشرات الأداء' : 'KPIs', icon: Target }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            <ArrowUpRight className="w-4 h-4 text-green-500 ml-1" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(financialData.revenue.total)}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</p>
          <div className="flex items-center justify-center mt-2">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{financialData.revenue.growth}%
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <TrendingDown className="w-8 h-8 text-red-600" />
            <ArrowDownRight className="w-4 h-4 text-red-500 ml-1" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(financialData.expenses.total)}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</p>
          <div className="flex items-center justify-center mt-2">
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              {((financialData.expenses.total / financialData.revenue.total) * 100).toFixed(1)}%
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Target className="w-8 h-8 text-blue-600" />
            <ArrowUpRight className="w-4 h-4 text-green-500 ml-1" />
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(financialData.profit.total)}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'صافي الربح' : 'Net Profit'}</p>
          <div className="flex items-center justify-center mt-2">
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {financialData.profit.margin}% {lang === 'ar' ? 'هامش' : 'margin'}
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Building className="w-8 h-8 text-purple-600" />
            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {financialData.projects.completed}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'مشاريع مكتملة' : 'Completed Projects'}</p>
          <div className="flex items-center justify-center mt-2">
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              {financialData.projects.inProgress} {lang === 'ar' ? 'قيد التنفيذ' : 'in progress'}
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Revenue Trend Chart */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {lang === 'ar' ? 'اتجاه الإيرادات الشهرية' : 'Monthly Revenue Trend'}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={financialData.revenue.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000)}K`} />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), lang === 'ar' ? 'الإيرادات' : 'Revenue']}
              labelStyle={{ color: '#374151' }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#3B82F6" 
              fill="url(#colorRevenue)" 
              strokeWidth={3}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {lang === 'ar' ? 'توزيع المصروفات' : 'Expense Breakdown'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={financialData.expenses.categories}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="amount"
                label={({ name, percentage }) => `${name} (${percentage}%)`}
              >
                {financialData.expenses.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {lang === 'ar' ? 'مؤشرات الأداء الرئيسية' : 'Key Performance Indicators'}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
              <span className="text-gray-700">{lang === 'ar' ? 'متوسط قيمة المشروع' : 'Avg Project Value'}</span>
              <span className="font-semibold text-blue-600">
                {formatCurrency(financialData.kpis.averageProjectValue)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
              <span className="text-gray-700">{lang === 'ar' ? 'ربح لكل مشروع' : 'Profit per Project'}</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(financialData.kpis.profitPerProject)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
              <span className="text-gray-700">{lang === 'ar' ? 'قيمة العميل مدى الحياة' : 'Client Lifetime Value'}</span>
              <span className="font-semibold text-purple-600">
                {formatCurrency(financialData.kpis.clientLifetimeValue)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
              <span className="text-gray-700">{lang === 'ar' ? 'تكلفة اكتساب العميل' : 'Customer Acquisition Cost'}</span>
              <span className="font-semibold text-orange-600">
                {formatCurrency(financialData.kpis.costPerAcquisition)}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderRevenueTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(financialData.revenue.total)}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(financialData.revenue.total / 12)}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'متوسط شهري' : 'Monthly Average'}</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <ArrowUpRight className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-emerald-600">
            +{financialData.revenue.growth}%
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'نمو سنوي' : 'Annual Growth'}</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {lang === 'ar' ? 'تفصيل الإيرادات الشهرية' : 'Monthly Revenue Breakdown'}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={financialData.revenue.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000)}K`} />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), lang === 'ar' ? 'الإيرادات' : 'Revenue']}
            />
            <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            <DollarSign className="inline-block w-10 h-10 mr-3 text-green-600" />
            {lang === 'ar' ? 'التقارير المالية المتقدمة' : 'Advanced Financial Reports'}
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            {lang === 'ar' 
              ? 'تحليل شامل للأداء المالي ومؤشرات الربحية'
              : 'Comprehensive financial performance analysis and profitability indicators'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-green-500"
          >
            <option value="month">{lang === 'ar' ? 'شهري' : 'Monthly'}</option>
            <option value="quarter">{lang === 'ar' ? 'ربع سنوي' : 'Quarterly'}</option>
            <option value="year">{lang === 'ar' ? 'سنوي' : 'Yearly'}</option>
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-green-500"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
          </select>
          
          <AnimatedButton
            onClick={exportReport}
            variant="secondary"
            size="md"
          >
            <Download className="w-4 h-4 mr-2" />
            {lang === 'ar' ? 'تصدير' : 'Export'}
          </AnimatedButton>
        </div>
      </div>

      {/* Tabs */}
      <GlassCard className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white/20 text-gray-700 hover:bg-white/30'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'revenue' && renderRevenueTab()}
            {/* Add other tabs as needed */}
          </motion.div>
        </AnimatePresence>
      </GlassCard>

      {/* Financial Health Indicator */}
      <GlassCard className="p-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <div>
              <h4 className="font-semibold text-green-800">
                {lang === 'ar' ? 'الوضع المالي ممتاز' : 'Excellent Financial Health'}
              </h4>
              <p className="text-sm text-green-700">
                {lang === 'ar' 
                  ? 'نمو مستقر في الإيرادات مع هامش ربح صحي'
                  : 'Stable revenue growth with healthy profit margins'
                }
              </p>
            </div>
          </div>
          <Zap className="w-6 h-6 text-green-600" />
        </div>
      </GlassCard>
    </div>
  );
}