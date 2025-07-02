export const translations = {
  ar: {
    // العناوين الرئيسية
    appTitle: "SmartContractor Pro",
    appSubtitle: "منصة تسعير المقاولات المدعومة بالذكاء الاصطناعي",
    
    // الأقسام
    dashboard: "لوحة التحكم",
    projectDetails: "تفاصيل المشروع",
    projectEstimation: "تقدير المشروع",
    customBoq: "جدول الكميات",
    paymentSchedule: "جدول الدفعات",
    projectDuration: "المدة الزمنية",
    workforceEstimation: "تقدير العمالة",
    proposalGeneration: "توليد العروض",
    riskAnalysis: "تحليل المخاطر",
    costOptimization: "تحسين التكلفة",
    projectSummary: "ملخص المشروع",
    settings: "الإعدادات",

    // أنواع المشاريع
    residential: "مشاريع سكنية",
    commercial: "مشاريع تجارية",
    industrial: "مشاريع صناعية",
    infrastructure: "مشاريع البنية التحتية",
    public: "مشاريع عامة",

    // المدن
    riyadh: "الرياض",
    jeddah: "جدة",
    dammam: "الدمام",
    madinah: "المدينة المنورة",
    makkah: "مكة المكرمة",
    khobar: "الخبر",
    abha: "أبها",
    taif: "الطائف",
    tabuk: "تبوك",
    hail: "حائل",
    qassim: "القصيم",

    // العمليات
    generate: "توليد",
    calculate: "حساب",
    estimate: "تقدير",
    export: "تصدير",
    save: "حفظ",
    delete: "حذف",
    edit: "تعديل",
    add: "إضافة",

    // الرسائل
    success: "تم بنجاح",
    error: "حدث خطأ",
    loading: "جاري التحميل...",
    
    // صفحة الهبوط
    heroTitle: "منصة التسعير الذكي للمقاولات",
    heroSubtitle: "احصل على تقديرات دقيقة لمشاريعك الإنشائية باستخدام الذكاء الاصطناعي",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",
    
    // المميزات
    features: "المميزات",
    aiPowered: "مدعوم بالذكاء الاصطناعي",
    aiPoweredDesc: "تقديرات دقيقة وسريعة باستخدام أحدث تقنيات الذكاء الاصطناعي",
    accurateEstimates: "تقديرات دقيقة",
    accurateEstimatesDesc: "احصل على تقديرات تكلفة دقيقة بناءً على بيانات السوق الحالية",
    comprehensiveReports: "تقارير شاملة",
    comprehensiveReportsDesc: "تقارير مفصلة تشمل جميع جوانب المشروع والمخاطر المحتملة",
    
    // الأقسام
    sectionsTitle: "أقسام المنصة",
    projectEstimationTitle: "تقدير المشروع",
    projectEstimationDesc: "احصل على تقديرات دقيقة لتكلفة مشروعك",
    boqManagementTitle: "إدارة جدول الكميات",
    boqManagementDesc: "إنشاء وإدارة جداول الكميات بسهولة",
    reportGenerationTitle: "توليد التقارير",
    reportGenerationDesc: "تقارير فنية ومالية احترافية",
    
    // تذييل الصفحة
    aboutUs: "من نحن",
    contact: "اتصل بنا",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام"
  },
  
  en: {
    // Main Titles
    appTitle: "SmartContractor Pro",
    appSubtitle: "AI-Powered Construction Pricing Platform",
    
    // Sections
    dashboard: "Dashboard",
    projectDetails: "Project Details",
    projectEstimation: "Project Estimation",
    customBoq: "BOQ Management",
    paymentSchedule: "Payment Schedule",
    projectDuration: "Project Duration",
    workforceEstimation: "Workforce Estimation",
    proposalGeneration: "Proposal Generation",
    riskAnalysis: "Risk Analysis",
    costOptimization: "Cost Optimization",
    projectSummary: "Project Summary",
    settings: "Settings",

    // Project Types
    residential: "Residential Projects",
    commercial: "Commercial Projects",
    industrial: "Industrial Projects",
    infrastructure: "Infrastructure Projects",
    public: "Public Projects",

    // Cities
    riyadh: "Riyadh",
    jeddah: "Jeddah",
    dammam: "Dammam",
    madinah: "Madinah",
    makkah: "Makkah",
    khobar: "Khobar",
    abha: "Abha",
    taif: "Taif",
    tabuk: "Tabuk",
    hail: "Hail",
    qassim: "Qassim",

    // Operations
    generate: "Generate",
    calculate: "Calculate",
    estimate: "Estimate",
    export: "Export",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    add: "Add",

    // Messages
    success: "Success",
    error: "Error",
    loading: "Loading...",
    
    // Landing Page
    heroTitle: "Smart Construction Pricing Platform",
    heroSubtitle: "Get accurate estimates for your construction projects using artificial intelligence",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // Features
    features: "Features",
    aiPowered: "AI-Powered",
    aiPoweredDesc: "Accurate and fast estimates using the latest AI technologies",
    accurateEstimates: "Accurate Estimates",
    accurateEstimatesDesc: "Get precise cost estimates based on current market data",
    comprehensiveReports: "Comprehensive Reports",
    comprehensiveReportsDesc: "Detailed reports covering all project aspects and potential risks",
    
    // Sections
    sectionsTitle: "Platform Sections",
    projectEstimationTitle: "Project Estimation",
    projectEstimationDesc: "Get accurate estimates for your project cost",
    boqManagementTitle: "BOQ Management",
    boqManagementDesc: "Create and manage bill of quantities easily",
    reportGenerationTitle: "Report Generation",
    reportGenerationDesc: "Professional technical and financial reports",
    
    // Footer
    aboutUs: "About Us",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions"
  }
};

export function useTranslation(lang: Language = 'ar') {
  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations[typeof lang]] || key;
  };

  return { t, lang };
}