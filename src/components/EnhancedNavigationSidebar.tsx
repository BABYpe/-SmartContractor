import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  Building, 
  Calculator, 
  Database,
  CreditCard, 
  Clock, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingDown,
  BarChart3,
  UserCheck,
  DollarSign,
  Settings as SettingsIcon,
  Layers,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Brain,
  Search,
  Star,
  Bookmark,
  Activity,
  Globe,
  Shield,
  ArrowUp,
  ArrowDown,
  Filter,
  Maximize2,
  Minimize2,
  Github,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface NavigationItem {
  id: string;
  icon: any;
  labelAr: string;
  labelEn: string;
  color: string;
  badge?: string;
  shortcut?: string;
  category: 'main' | 'analysis' | 'reports' | 'management';
  isNew?: boolean;
  isPro?: boolean;
  description?: string;
  descriptionEn?: string;
}

interface EnhancedNavigationSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  lang: 'ar' | 'en';
  t: any;
}

export default function EnhancedNavigationSidebar({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
  lang,
  t
}: EnhancedNavigationSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['main', 'analysis', 'reports', 'management'])
  );
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['dashboard', 'project-estimation']));
  const [recentItems, setRecentItems] = useState<string[]>(['dashboard']);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      icon: Home,
      labelAr: 'لوحة التحكم الذكية',
      labelEn: 'Smart Dashboard',
      color: 'from-blue-500 to-indigo-600',
      badge: 'AI',
      shortcut: '⌘1',
      category: 'main',
      isNew: true,
      description: 'مراقبة شاملة لأداء النظام والمشاريع',
      descriptionEn: 'Comprehensive system and project monitoring'
    },
    {
      id: 'project-details',
      icon: Building,
      labelAr: 'تفاصيل المشروع',
      labelEn: 'Project Details',
      color: 'from-gray-500 to-slate-600',
      shortcut: '⌘2',
      category: 'main',
      description: 'إدارة معلومات المشروع الأساسية',
      descriptionEn: 'Manage basic project information'
    },
    {
      id: 'project-estimation',
      icon: Calculator,
      labelAr: 'التقدير الذكي المتقدم',
      labelEn: 'Advanced Smart Estimation',
      color: 'from-blue-500 to-indigo-600',
      badge: 'AI+',
      shortcut: '⌘3',
      category: 'main',
      isPro: true,
      description: 'تقديرات دقيقة مدعومة بالذكاء الاصطناعي',
      descriptionEn: 'AI-powered accurate estimations'
    },
    {
      id: 'reference-items',
      icon: Database,
      labelAr: 'البنود المرجعية',
      labelEn: 'Reference Items',
      color: 'from-emerald-500 to-green-600',
      badge: 'NEW',
      shortcut: '⌘4',
      category: 'main',
      isNew: true,
      description: 'قاعدة بيانات شاملة للبنود والأسعار',
      descriptionEn: 'Comprehensive items and pricing database'
    },
    {
      id: 'custom-boq',
      icon: Layers,
      labelAr: 'نظام BOQ الموحد',
      labelEn: 'Unified BOQ System',
      color: 'from-cyan-500 to-blue-600',
      shortcut: '⌘5',
      category: 'main',
      description: 'إدارة جداول الكميات بذكاء',
      descriptionEn: 'Smart bill of quantities management'
    },
    {
      id: 'payment-schedule',
      icon: CreditCard,
      labelAr: 'جدول الدفعات',
      labelEn: 'Payment Schedule',
      color: 'from-yellow-500 to-orange-600',
      shortcut: '⌘6',
      category: 'main',
      description: 'تنظيم مراحل الدفع والتدفق النقدي',
      descriptionEn: 'Organize payment phases and cash flow'
    },
    {
      id: 'project-duration',
      icon: Clock,
      labelAr: 'المدة الزمنية',
      labelEn: 'Project Duration',
      color: 'from-purple-500 to-violet-600',
      category: 'analysis',
      description: 'تحليل وتقدير المدة الزمنية للمشروع',
      descriptionEn: 'Project timeline analysis and estimation'
    },
    {
      id: 'workforce-estimation',
      icon: Users,
      labelAr: 'الموارد البشرية',
      labelEn: 'Human Resources',
      color: 'from-emerald-500 to-green-600',
      category: 'analysis',
      description: 'تقدير العمالة والموارد البشرية المطلوبة',
      descriptionEn: 'Workforce and human resources estimation'
    },
    {
      id: 'risk-analysis',
      icon: AlertTriangle,
      labelAr: 'تحليل المخاطر',
      labelEn: 'Risk Analysis',
      color: 'from-red-500 to-orange-600',
      category: 'analysis',
      description: 'تحليل شامل للمخاطر المحتملة',
      descriptionEn: 'Comprehensive risk analysis'
    },
    {
      id: 'cost-optimization',
      icon: TrendingDown,
      labelAr: 'تحسين التكلفة',
      labelEn: 'Cost Optimization',
      color: 'from-green-500 to-emerald-600',
      category: 'analysis',
      description: 'اقتراحات ذكية لتحسين التكلفة',
      descriptionEn: 'Smart cost optimization suggestions'
    },
    {
      id: 'proposal-generation',
      icon: FileText,
      labelAr: 'توليد العروض',
      labelEn: 'Proposal Generation',
      color: 'from-pink-500 to-rose-600',
      category: 'reports',
      description: 'إنشاء عروض فنية ومالية احترافية',
      descriptionEn: 'Generate professional technical and financial proposals'
    },
    {
      id: 'project-summary',
      icon: BarChart3,
      labelAr: 'ملخص المشروع',
      labelEn: 'Project Summary',
      color: 'from-indigo-500 to-purple-600',
      category: 'reports',
      description: 'تقرير شامل لجميع جوانب المشروع',
      descriptionEn: 'Comprehensive project overview report'
    },
    {
      id: 'client-management',
      icon: UserCheck,
      labelAr: 'إدارة العملاء',
      labelEn: 'Client Management',
      color: 'from-teal-500 to-cyan-600',
      badge: 'NEW',
      category: 'management',
      isNew: true,
      description: 'إدارة بيانات العملاء والمشاريع',
      descriptionEn: 'Manage client data and projects'
    },
    {
      id: 'financial-reports',
      icon: DollarSign,
      labelAr: 'التقارير المالية',
      labelEn: 'Financial Reports',
      color: 'from-green-500 to-emerald-600',
      badge: 'NEW',
      category: 'management',
      isNew: true,
      description: 'تقارير مالية تفصيلية ومؤشرات الأداء',
      descriptionEn: 'Detailed financial reports and KPIs'
    },
    {
      id: 'project-templates',
      icon: Layers,
      labelAr: 'قوالب المشاريع',
      labelEn: 'Project Templates',
      color: 'from-purple-500 to-violet-600',
      badge: 'NEW',
      category: 'management',
      isNew: true,
      description: 'قوالب جاهزة لتسريع إنشاء المشاريع',
      descriptionEn: 'Ready templates to accelerate project creation'
    },
    {
      id: 'settings',
      icon: SettingsIcon,
      labelAr: 'الإعدادات',
      labelEn: 'Settings',
      color: 'from-gray-500 to-slate-600',
      category: 'management',
      description: 'إعدادات النظام والتفضيلات الشخصية',
      descriptionEn: 'System settings and personal preferences'
    }
  ];

  // تصفية العناصر بناءً على البحث
  const filteredItems = navigationItems.filter(item => {
    const label = lang === 'ar' ? item.labelAr : item.labelEn;
    const description = lang === 'ar' ? item.description : item.descriptionEn;
    return label.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (description && description.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // تجميع العناصر حسب الفئة
  const groupedItems = {
    favorites: filteredItems.filter(item => favorites.has(item.id)),
    recent: filteredItems.filter(item => recentItems.includes(item.id) && !favorites.has(item.id)),
    main: filteredItems.filter(item => item.category === 'main' && !favorites.has(item.id) && !recentItems.includes(item.id)),
    analysis: filteredItems.filter(item => item.category === 'analysis'),
    reports: filteredItems.filter(item => item.category === 'reports'),
    management: filteredItems.filter(item => item.category === 'management')
  };

  // معالج تغيير القسم
  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    
    // إضافة إلى العناصر الأخيرة
    setRecentItems(prev => {
      const newRecent = [sectionId, ...prev.filter(id => id !== sectionId)].slice(0, 5);
      return newRecent;
    });
  }, [setActiveSection, setSidebarOpen]);

  // معالج إضافة/إزالة المفضلة
  const toggleFavorite = useCallback((itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  }, []);

  // معالج توسيع/طي الفئات
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(category)) {
        newExpanded.delete(category);
      } else {
        newExpanded.add(category);
      }
      return newExpanded;
    });
  }, []);

  // التنقل بالكيبورد
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!sidebarOpen) return;

      const allVisibleItems = [
        ...groupedItems.favorites,
        ...groupedItems.recent,
        ...groupedItems.main,
        ...groupedItems.analysis,
        ...groupedItems.reports,
        ...groupedItems.management
      ];

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, allVisibleItems.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && allVisibleItems[focusedIndex]) {
            handleSectionChange(allVisibleItems[focusedIndex].id);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setSidebarOpen(false);
          setFocusedIndex(-1);
          break;
        case '/':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            searchInputRef.current?.focus();
          }
          break;
      }

      // اختصارات لوحة المفاتيح للأقسام
      if (e.metaKey || e.ctrlKey) {
        const item = navigationItems.find(item => item.shortcut?.includes(e.key));
        if (item) {
          e.preventDefault();
          handleSectionChange(item.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sidebarOpen, focusedIndex, groupedItems, handleSectionChange, setSidebarOpen]);

  // إعادة تعيين الفهرس المركز عند تغيير البحث
  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchTerm]);

  const CategoryHeader = ({ 
    title, 
    icon: Icon, 
    category, 
    count 
  }: { 
    title: string; 
    icon: any; 
    category: string;
    count: number;
  }) => {
    const isExpanded = expandedCategories.has(category);
    
    return (
      <motion.button
        onClick={() => toggleCategory(category)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 hover:bg-white/10 rounded-lg transition-all duration-200 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center">
          <Icon className="w-3 h-3 mr-2" />
          <span className="uppercase tracking-wider">{title}</span>
          {count > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
              {count}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </motion.button>
    );
  };

  const NavigationItem = ({ 
    item, 
    index 
  }: { 
    item: NavigationItem; 
    index: number;
  }) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;
    const isFavorite = favorites.has(item.id);
    const isFocused = focusedIndex === index;
    const label = lang === 'ar' ? item.labelAr : item.labelEn;
    const description = lang === 'ar' ? item.description : item.descriptionEn;

    return (
      <motion.div
        className="relative"
        onHoverStart={() => setHoveredItem(item.id)}
        onHoverEnd={() => setHoveredItem(null)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <button
          onClick={() => handleSectionChange(item.id)}
          className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group relative ${
            isActive
              ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
              : isFocused
              ? 'bg-white/30 text-gray-800 ring-2 ring-blue-500'
              : 'hover:bg-white/20 text-gray-700'
          }`}
        >
          {/* أيقونة العنصر */}
          <div className={`relative p-2 rounded-lg transition-all duration-200 ${
            isActive 
              ? 'bg-white/20' 
              : `bg-gradient-to-r ${item.color} text-white group-hover:scale-110`
          }`}>
            <Icon className="w-4 h-4" />
            {item.badge && (
              <motion.span 
                className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-1 rounded-full text-[8px]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {item.badge}
              </motion.span>
            )}
          </div>
          
          {/* نص العنصر */}
          {sidebarOpen && !isCompactMode && (
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{label}</h4>
                  {description && (
                    <p className="text-xs opacity-75 truncate mt-0.5">{description}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  {/* زر المفضلة */}
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className={`p-1 rounded-full transition-colors ${
                      isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <Star className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  
                  {/* شارات خاصة */}
                  {item.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs px-1 rounded">جديد</span>
                  )}
                  {item.isPro && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-1 rounded">PRO</span>
                  )}
                </div>
              </div>
              
              {/* اختصار لوحة المفاتيح */}
              {item.shortcut && (
                <span className="text-xs text-gray-500 mt-1 block">{item.shortcut}</span>
              )}
            </div>
          )}
          
          {/* مؤشر النشاط */}
          {isActive && (
            <motion.div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
              layoutId="activeIndicator"
            />
          )}
        </button>

        {/* تلميح عند التمرير */}
        {(!sidebarOpen || isCompactMode) && hoveredItem === item.id && showTooltips && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-full top-0 ml-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-50 shadow-xl"
          >
            <div className="font-medium">{label}</div>
            {description && (
              <div className="text-xs opacity-75 mt-1">{description}</div>
            )}
            {item.shortcut && (
              <div className="text-xs text-gray-400 mt-1">{item.shortcut}</div>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -320,
          width: sidebarOpen ? (isCompactMode ? 240 : 320) : 80
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/20 backdrop-blur-xl border-r border-white/30 z-50 shadow-2xl ${
          sidebarOpen ? (isCompactMode ? 'w-60' : 'w-80') : 'w-20'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center relative border border-white/30 shadow-lg">
                  <img 
                    src="https://github.com/BABYpe/achoxproeng/blob/main/achoxpro.png?raw=true"
                    alt="AchoX Pro Engineering Logo"
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Brain className="w-4 h-4 text-blue-600 hidden" />
                  <Sparkles className="w-2 h-2 text-yellow-400 absolute -top-1 -right-1" />
                </div>
                {!isCompactMode && (
                  <div>
                    <h2 className="text-sm font-bold text-gray-800">AchoX Pro Engineering</h2>
                    <p className="text-xs text-gray-600">AI Platform</p>
                  </div>
                )}
              </motion.div>
            )}
            
            <div className="flex items-center space-x-1">
              {sidebarOpen && (
                <>
                  <button
                    onClick={() => setIsCompactMode(!isCompactMode)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
                    title={isCompactMode ? 'توسيع' : 'ضغط'}
                  >
                    {isCompactMode ? (
                      <Maximize2 className="w-3 h-3 text-gray-700" />
                    ) : (
                      <Minimize2 className="w-3 h-3 text-gray-700" />
                    )}
                  </button>
                  
                  <a
                    href="https://github.com/BABYpe/achoxproeng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
                    title="مستودع المشروع"
                  >
                    <Github className="w-3 h-3 text-gray-700" />
                  </a>
                </>
              )}
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="w-4 h-4 text-gray-700" />
                ) : (
                  <Menu className="w-4 h-4 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* شريط البحث */}
          {sidebarOpen && !isCompactMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={lang === 'ar' ? 'البحث... (Ctrl+/)' : 'Search... (Ctrl+/)'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {sidebarOpen && !isCompactMode ? (
            <>
              {/* المفضلة */}
              {groupedItems.favorites.length > 0 && (
                <div className="mb-4">
                  <CategoryHeader 
                    title={lang === 'ar' ? 'المفضلة' : 'Favorites'} 
                    icon={Star} 
                    category="favorites"
                    count={groupedItems.favorites.length}
                  />
                  <AnimatePresence>
                    {expandedCategories.has('favorites') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 mt-2"
                      >
                        {groupedItems.favorites.map((item, index) => (
                          <NavigationItem key={item.id} item={item} index={index} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* العناصر الأخيرة */}
              {groupedItems.recent.length > 0 && (
                <div className="mb-4">
                  <CategoryHeader 
                    title={lang === 'ar' ? 'الأخيرة' : 'Recent'} 
                    icon={Clock} 
                    category="recent"
                    count={groupedItems.recent.length}
                  />
                  <AnimatePresence>
                    {expandedCategories.has('recent') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 mt-2"
                      >
                        {groupedItems.recent.map((item, index) => (
                          <NavigationItem key={item.id} item={item} index={index + groupedItems.favorites.length} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* العناصر الرئيسية */}
              {groupedItems.main.length > 0 && (
                <div className="mb-4">
                  <CategoryHeader 
                    title={lang === 'ar' ? 'الرئيسية' : 'Main'} 
                    icon={Home} 
                    category="main"
                    count={groupedItems.main.length}
                  />
                  <AnimatePresence>
                    {expandedCategories.has('main') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 mt-2"
                      >
                        {groupedItems.main.map((item, index) => (
                          <NavigationItem 
                            key={item.id} 
                            item={item} 
                            index={index + groupedItems.favorites.length + groupedItems.recent.length} 
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* التحليل */}
              {groupedItems.analysis.length > 0 && (
                <div className="mb-4">
                  <CategoryHeader 
                    title={lang === 'ar' ? 'التحليل' : 'Analysis'} 
                    icon={BarChart3} 
                    category="analysis"
                    count={groupedItems.analysis.length}
                  />
                  <AnimatePresence>
                    {expandedCategories.has('analysis') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 mt-2"
                      >
                        {groupedItems.analysis.map((item, index) => (
                          <NavigationItem 
                            key={item.id} 
                            item={item} 
                            index={index + groupedItems.favorites.length + groupedItems.recent.length + groupedItems.main.length} 
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* التقارير */}
              {groupedItems.reports.length > 0 && (
                <div className="mb-4">
                  <CategoryHeader 
                    title={lang === 'ar' ? 'التقارير' : 'Reports'} 
                    icon={FileText} 
                    category="reports"
                    count={groupedItems.reports.length}
                  />
                  <AnimatePresence>
                    {expandedCategories.has('reports') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 mt-2"
                      >
                        {groupedItems.reports.map((item, index) => (
                          <NavigationItem 
                            key={item.id} 
                            item={item} 
                            index={index + groupedItems.favorites.length + groupedItems.recent.length + groupedItems.main.length + groupedItems.analysis.length} 
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* الإدارة */}
              {groupedItems.management.length > 0 && (
                <div className="mb-4">
                  <CategoryHeader 
                    title={lang === 'ar' ? 'الإدارة' : 'Management'} 
                    icon={SettingsIcon} 
                    category="management"
                    count={groupedItems.management.length}
                  />
                  <AnimatePresence>
                    {expandedCategories.has('management') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 mt-2"
                      >
                        {groupedItems.management.map((item, index) => (
                          <NavigationItem 
                            key={item.id} 
                            item={item} 
                            index={index + groupedItems.favorites.length + groupedItems.recent.length + groupedItems.main.length + groupedItems.analysis.length + groupedItems.reports.length} 
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          ) : (
            // عرض مضغوط
            <div className="space-y-1">
              {filteredItems.map((item, index) => (
                <NavigationItem key={item.id} item={item} index={index} />
              ))}
            </div>
          )}

          {/* رسالة عدم وجود نتائج */}
          {searchTerm && filteredItems.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                {lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-3 border-t border-white/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600">
                  {lang === 'ar' ? 'النظام متصل' : 'System Online'}
                </span>
                <Brain className="w-3 h-3 text-blue-600" />
              </div>
              {!isCompactMode && (
                <>
                  <p className="text-xs text-gray-500 mb-2">
                    AchoX Pro Engineering v2.0
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Shield className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">
                      {lang === 'ar' ? 'آمن ومشفر' : 'Secure & Encrypted'}
                    </span>
                  </div>
                  <a
                    href="https://github.com/BABYpe/achoxproeng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    <span>مستودع المشروع</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* مؤشرات التنقل بالكيبورد */}
        {sidebarOpen && focusedIndex >= 0 && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs">
            ↑↓ للتنقل • Enter للاختيار • Esc للإغلاق
          </div>
        )}
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </>
  );
}