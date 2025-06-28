import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3, 
  Download,
  Calendar,
  Filter,
  Eye,
  FileText
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';

export default function FinancialReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');

  const financialData = {
    totalRevenue: 8750000,
    totalExpenses: 6200000,
    netProfit: 2550000,
    profitMargin: 29.1,
    monthlyRevenue: [
      { month: 'يناير', revenue: 650000, expenses: 480000 },
      { month: 'فبراير', revenue: 720000, expenses: 520000 },
      { month: 'مارس', revenue: 850000, expenses: 610000 },
      { month: 'أبريل', revenue: 780000, expenses: 560000 },
      { month: 'مايو', revenue: 920000, expenses: 650000 },
      { month: 'يونيو', revenue: 1100000, expenses: 780000 },
      { month: 'يوليو', revenue: 980000, expenses: 700000 },
      { month: 'أغسطس', revenue: 1050000, expenses: 750000 },
      { month: 'سبتمبر', revenue: 890000, expenses: 640000 },
      { month: 'أكتوبر', revenue: 960000, expenses: 690000 },
      { month: 'نوفمبر', revenue: 840000, expenses: 600000 },
      { month: 'ديسمبر', revenue: 1000000, expenses: 710000 }
    ],
    projectCategories: [
      { category: 'مشاريع سكنية', value: 3500000, percentage: 40 },
      { category: 'مشاريع تجارية', value: 2800000, percentage: 32 },
      { category: 'مشاريع صناعية', value: 1750000, percentage: 20 },
      { category: 'مشاريع أخرى', value: 700000, percentage: 8 }
    ],
    expenses: [
      { category: 'المواد والخامات', amount: 2800000, percentage: 45 },
      { category: 'أجور العمالة', amount: 1550000, percentage: 25 },
      { category: 'المعدات والآليات', amount: 930000, percentage: 15 },
      { category: 'مصاريف إدارية', amount: 620000, percentage: 10 },
      { category: 'مصاريف أخرى', amount: 300000, percentage: 5 }
    ]
  };

  const kpis = [
    {
      title: 'إجمالي الإيرادات',
      value: financialData.totalRevenue,
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'صافي الربح',
      value: financialData.netProfit,
      change: '+22.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'هامش الربح',
      value: `${financialData.profitMargin}%`,
      change: '+3.1%',
      trend: 'up',
      icon: PieChart,
      color: 'text-purple-600'
    },
    {
      title: 'إجمالي المصروفات',
      value: financialData.totalExpenses,
      change: '+8.5%',
      trend: 'up',
      icon: TrendingDown,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-green-600" />
            التقارير المالية
          </h1>
          <p className="text-gray-600 mt-2">تحليل شامل للأداء المالي والربحية</p>
        </div>
        
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-green-500"
            dir="rtl"
          >
            <option value="monthly">شهري</option>
            <option value="quarterly">ربع سنوي</option>
            <option value="yearly">سنوي</option>
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-green-500"
            dir="rtl"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          
          <AnimatedButton variant="primary" size="md">
            <Download className="w-4 h-4 mr-2" />
            تصدير التقرير
          </AnimatedButton>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  kpi.color.includes('green') ? 'bg-green-100' :
                  kpi.color.includes('blue') ? 'bg-blue-100' :
                  kpi.color.includes('purple') ? 'bg-purple-100' : 'bg-red-100'
                }`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
              
              <h3 className="text-sm text-gray-600 mb-2">{kpi.title}</h3>
              <p className={`text-2xl font-bold ${kpi.color}`}>
                {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                {typeof kpi.value === 'number' && ' ريال'}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">الإيرادات مقابل المصروفات الشهرية</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">الإيرادات</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">المصروفات</span>
            </div>
          </div>
        </div>
        
        <div className="h-80 flex items-end justify-between space-x-1">
          {financialData.monthlyRevenue.map((data, index) => {
            const maxValue = Math.max(...financialData.monthlyRevenue.map(d => d.revenue));
            const revenueHeight = (data.revenue / maxValue) * 100;
            const expenseHeight = (data.expenses / maxValue) * 100;
            
            return (
              <div key={data.month} className="flex-1 flex flex-col items-center space-y-1">
                <div className="w-full flex space-x-1 items-end" style={{ height: '250px' }}>
                  <motion.div
                    className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg flex-1"
                    initial={{ height: 0 }}
                    animate={{ height: `${revenueHeight}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                  <motion.div
                    className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg flex-1"
                    initial={{ height: 0 }}
                    animate={{ height: `${expenseHeight}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <span className="text-xs text-gray-600 transform -rotate-45 origin-center">
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Project Categories & Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Categories */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <PieChart className="w-6 h-6 mr-2 text-blue-600" />
            توزيع الإيرادات حسب نوع المشروع
          </h3>
          
          <div className="space-y-4">
            {financialData.projectCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}
                  />
                  <span className="text-sm text-gray-700">{category.category}</span>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {category.value.toLocaleString()} ريال
                  </p>
                  <p className="text-xs text-gray-600">{category.percentage}%</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Simple Pie Chart Representation */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                {financialData.projectCategories.map((category, index) => {
                  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
                  const startAngle = financialData.projectCategories
                    .slice(0, index)
                    .reduce((sum, cat) => sum + (cat.percentage * 3.6), 0);
                  const endAngle = startAngle + (category.percentage * 3.6);
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = category.percentage > 50 ? 1 : 0;
                  
                  return (
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={colors[index]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </GlassCard>

        {/* Expenses Breakdown */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <TrendingDown className="w-6 h-6 mr-2 text-red-600" />
            تفصيل المصروفات
          </h3>
          
          <div className="space-y-4">
            {financialData.expenses.map((expense, index) => (
              <motion.div
                key={expense.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{expense.category}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-800">
                      {expense.amount.toLocaleString()} ريال
                    </span>
                    <span className="text-xs text-gray-600 ml-2">({expense.percentage}%)</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${expense.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Financial Summary */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-indigo-600" />
          الملخص المالي السنوي
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <h4 className="text-lg font-semibold text-green-800 mb-2">الأداء المالي</h4>
            <p className="text-3xl font-bold text-green-600 mb-1">ممتاز</p>
            <p className="text-sm text-green-700">نمو مستدام في الإيرادات</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">كفاءة التكلفة</h4>
            <p className="text-3xl font-bold text-blue-600 mb-1">جيد</p>
            <p className="text-sm text-blue-700">إمكانية تحسين المصروفات</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
            <h4 className="text-lg font-semibold text-purple-800 mb-2">الربحية</h4>
            <p className="text-3xl font-bold text-purple-600 mb-1">عالية</p>
            <p className="text-sm text-purple-700">هامش ربح صحي</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <h5 className="font-semibold text-yellow-800 mb-2">التوصيات المالية:</h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• تحسين إدارة المخزون لتقليل تكاليف المواد</li>
            <li>• زيادة الاستثمار في المشاريع التجارية عالية الربحية</li>
            <li>• تطوير استراتيجيات تسعير أكثر تنافسية</li>
            <li>• تحسين كفاءة العمليات لتقليل المصروفات الإدارية</li>
          </ul>
        </div>
      </GlassCard>
    </div>
  );
}