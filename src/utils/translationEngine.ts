// محرك الترجمة الذكي المتقدم
export class TranslationEngine {
  private static instance: TranslationEngine;
  private translations = new Map<string, any>();
  private fallbackTranslations = new Map<string, string>();
  private cache = new Map<string, string>();

  private constructor() {
    this.initializeTranslations();
  }

  static getInstance(): TranslationEngine {
    if (!TranslationEngine.instance) {
      TranslationEngine.instance = new TranslationEngine();
    }
    return TranslationEngine.instance;
  }

  private initializeTranslations(): void {
    // ترجمات شاملة للمنصة
    const translations = {
      ar: {
        // العناوين الرئيسية
        appTitle: "SmartContractor Pro",
        appSubtitle: "منصة تسعير المقاولات المدعومة بالذكاء الاصطناعي",
        
        // التنقل والأقسام
        dashboard: "لوحة التحكم الذكية",
        projectDetails: "تفاصيل المشروع",
        projectEstimation: "التقدير الذكي المتقدم",
        customBoq: "نظام إدارة جدول الكميات",
        paymentSchedule: "جدول الدفعات المالية",
        projectDuration: "المدة الزمنية للمشروع",
        workforceEstimation: "تقدير الموارد البشرية",
        proposalGeneration: "توليد العروض الفنية والمالية",
        riskAnalysis: "تحليل المخاطر المتقدم",
        costOptimization: "تحسين التكلفة والكفاءة",
        projectSummary: "ملخص المشروع الشامل",
        clientManagement: "إدارة العملاء",
        financialReports: "التقارير المالية",
        projectTemplates: "قوالب المشاريع الجاهزة",
        settings: "الإعدادات والتخصيص",

        // أنواع المشاريع المتقدمة
        residential: "مشاريع سكنية",
        residential_villa: "فلل ومنازل خاصة",
        residential_compound: "مجمعات سكنية متكاملة",
        residential_apartments: "عمارات سكنية وشقق",
        social_housing: "مشاريع الإسكان الاجتماعي",
        
        commercial: "مشاريع تجارية",
        commercial_mall: "مراكز تسوق ومولات تجارية",
        commercial_office: "مباني المكاتب والأبراج الإدارية",
        commercial_hotel: "فنادق ومنتجعات سياحية",
        commercial_retail: "محلات تجارية ومعارض",
        commercial_restaurant: "مطاعم ومقاهي",
        
        industrial: "مشاريع صناعية",
        industrial_factory: "مصانع ووحدات إنتاج",
        industrial_warehouse: "مخازن ومستودعات",
        industrial_logistics: "مراكز لوجستية متكاملة",
        industrial_petrochemical: "مصانع بتروكيماويات",
        
        infrastructure: "مشاريع البنية التحتية",
        infrastructure_roads: "الطرق والجسور والأنفاق",
        infrastructure_utilities: "شبكات المياه والصرف الصحي",
        infrastructure_power: "شبكات الكهرباء والاتصالات",
        infrastructure_airports: "مطارات وموانئ",
        infrastructure_railways: "شبكات السكك الحديدية",
        
        public: "مشاريع المباني العامة",
        public_hospital: "مستشفيات ومراكز صحية",
        public_school: "مدارس وجامعات",
        public_government: "مباني حكومية وإدارية",
        public_mosque: "مساجد ومراكز إسلامية",
        public_sports: "مراكز رياضية وملاعب",
        
        renewable_energy: "مشاريع الطاقة المتجددة",
        renewable_solar: "محطات الطاقة الشمسية",
        renewable_wind: "مزارع الرياح",
        renewable_hydro: "محطات الطاقة المائية",
        
        mega_projects: "المشاريع الضخمة (رؤية 2030)",
        mega_neom: "مشاريع نيوم المستقبلية",
        mega_red_sea: "مشروع البحر الأحمر",
        mega_qiddiya: "مشروع القدية الترفيهي",
        mega_diriyah: "مشروع بوابة الدرعية التاريخي",
        mega_amaala: "مشروع أمالا السياحي",

        // المدن السعودية
        riyadh: "الرياض",
        jeddah: "جدة",
        dammam: "الدمام",
        madinah: "المدينة المنورة",
        makkah: "مكة المكرمة",
        khobar: "الخبر",
        dhahran: "الظهران",
        jubail: "الجبيل",
        yanbu: "ينبع",
        abha: "أبها",
        taif: "الطائف",
        tabuk: "تبوك",
        hail: "حائل",
        qassim: "القصيم",
        najran: "نجران",
        jazan: "جازان",

        // بنود الأعمال والمواد
        excavation: "أعمال الحفر والردم",
        concrete: "أعمال الخرسانة المسلحة",
        steel: "أعمال الحديد والمعادن",
        masonry: "أعمال المباني والبلوك",
        tiles: "أعمال البلاط والسيراميك",
        paint: "أعمال الدهان والتشطيبات",
        electrical: "التمديدات الكهربائية",
        plumbing: "أعمال السباكة والصرف",
        hvac: "أنظمة التكييف والتهوية",
        insulation: "أعمال العزل المائي والحراري",
        roofing: "أعمال الأسطح والتسقيف",
        flooring: "أعمال الأرضيات",
        ceiling: "أعمال الأسقف المستعارة",
        doors_windows: "الأبواب والنوافذ",
        glass_aluminum: "أعمال الزجاج والألمنيوم",
        landscaping: "أعمال تنسيق الحدائق",
        security_systems: "أنظمة الأمن والمراقبة",
        fire_safety: "أنظمة مكافحة الحريق",
        elevators: "المصاعد والسلالم المتحركة",
        
        // الوحدات والمقاييس
        square_meter: "متر مربع",
        cubic_meter: "متر مكعب",
        linear_meter: "متر طولي",
        ton: "طن",
        kilogram: "كيلوجرام",
        unit: "وحدة",
        piece: "قطعة",
        set: "مجموعة",
        point: "نقطة",
        
        // العمليات والإجراءات
        generate: "توليد",
        calculate: "حساب",
        estimate: "تقدير",
        analyze: "تحليل",
        optimize: "تحسين",
        export: "تصدير",
        import: "استيراد",
        save: "حفظ",
        load: "تحميل",
        delete: "حذف",
        edit: "تعديل",
        add: "إضافة",
        remove: "إزالة",
        update: "تحديث",
        refresh: "تحديث",
        search: "بحث",
        filter: "تصفية",
        sort: "ترتيب",
        
        // الحالات والأوضاع
        active: "نشط",
        inactive: "غير نشط",
        pending: "معلق",
        completed: "مكتمل",
        in_progress: "قيد التنفيذ",
        cancelled: "ملغي",
        approved: "موافق عليه",
        rejected: "مرفوض",
        draft: "مسودة",
        final: "نهائي",
        
        // الأولويات والمستويات
        high: "عالي",
        medium: "متوسط",
        low: "منخفض",
        urgent: "عاجل",
        normal: "عادي",
        critical: "حرج",
        
        // الرسائل والإشعارات
        success: "تم بنجاح",
        error: "حدث خطأ",
        warning: "تحذير",
        info: "معلومات",
        loading: "جاري التحميل...",
        processing: "جاري المعالجة...",
        calculating: "جاري الحساب...",
        generating: "جاري التوليد...",
        saving: "جاري الحفظ...",
        
        // أخبار السوق والتحديثات
        market_news: "أخبار السوق",
        price_update: "تحديث الأسعار",
        last_update: "آخر تحديث",
        live_updates: "تحديثات مباشرة",
        market_trends: "اتجاهات السوق",
        price_analysis: "تحليل الأسعار",
        market_volatility: "تقلبات السوق",
        
        // قوالب المشاريع
        project_template: "قالب المشروع",
        use_template: "استخدام القالب",
        save_as_template: "حفظ كقالب",
        template_library: "مكتبة القوالب",
        custom_template: "قالب مخصص",
        template_category: "فئة القالب",
        template_description: "وصف القالب",
        
        // إدارة العملاء
        client_name: "اسم العميل",
        client_contact: "معلومات الاتصال",
        client_email: "البريد الإلكتروني",
        client_phone: "رقم الهاتف",
        client_address: "العنوان",
        project_history: "تاريخ المشاريع",
        client_notes: "ملاحظات العميل",
        client_rating: "تقييم العميل",
        
        // التقارير المالية
        financial_summary: "الملخص المالي",
        profit_margin: "هامش الربح",
        total_revenue: "إجمالي الإيرادات",
        project_costs: "تكاليف المشاريع",
        monthly_report: "التقرير الشهري",
        yearly_report: "التقرير السنوي",
        cash_flow: "التدفق النقدي",
        budget_analysis: "تحليل الميزانية",
        
        // التواريخ والأوقات
        today: "اليوم",
        yesterday: "أمس",
        tomorrow: "غداً",
        this_week: "هذا الأسبوع",
        this_month: "هذا الشهر",
        this_year: "هذا العام",
        last_week: "الأسبوع الماضي",
        last_month: "الشهر الماضي",
        last_year: "العام الماضي",
        
        // أزرار وعناصر التحكم
        submit: "إرسال",
        cancel: "إلغاء",
        confirm: "تأكيد",
        close: "إغلاق",
        next: "التالي",
        previous: "السابق",
        finish: "إنهاء",
        continue: "متابعة",
        back: "رجوع",
        
        // رسائل التحقق والأخطاء
        required_field: "هذا الحقل مطلوب",
        invalid_email: "البريد الإلكتروني غير صحيح",
        invalid_phone: "رقم الهاتف غير صحيح",
        invalid_number: "الرقم غير صحيح",
        min_length: "الحد الأدنى للطول",
        max_length: "الحد الأقصى للطول",
        
        // إعدادات النظام
        language: "اللغة",
        theme: "المظهر",
        notifications: "الإشعارات",
        privacy: "الخصوصية",
        security: "الأمان",
        backup: "النسخ الاحتياطي",
        restore: "الاستعادة",
        
        // مصطلحات تقنية
        ai_powered: "مدعوم بالذكاء الاصطناعي",
        machine_learning: "التعلم الآلي",
        real_time: "الوقت الفعلي",
        cloud_based: "قائم على السحابة",
        automated: "آلي",
        intelligent: "ذكي",
        advanced: "متقدم",
        professional: "احترافي"
      },
      
      en: {
        // Main Titles
        appTitle: "SmartContractor Pro",
        appSubtitle: "AI-Powered Construction Pricing Platform",
        
        // Navigation and Sections
        dashboard: "Smart Dashboard",
        projectDetails: "Project Details",
        projectEstimation: "Advanced Smart Estimation",
        customBoq: "BOQ Management System",
        paymentSchedule: "Payment Schedule",
        projectDuration: "Project Duration",
        workforceEstimation: "Workforce Estimation",
        proposalGeneration: "Technical & Financial Proposal Generation",
        riskAnalysis: "Advanced Risk Analysis",
        costOptimization: "Cost & Efficiency Optimization",
        projectSummary: "Comprehensive Project Summary",
        clientManagement: "Client Management",
        financialReports: "Financial Reports",
        projectTemplates: "Ready-to-Use Project Templates",
        settings: "Settings & Customization",

        // Advanced Project Types
        residential: "Residential Projects",
        residential_villa: "Private Villas & Houses",
        residential_compound: "Integrated Residential Compounds",
        residential_apartments: "Apartment Buildings",
        social_housing: "Social Housing Projects",
        
        commercial: "Commercial Projects",
        commercial_mall: "Shopping Malls & Retail Centers",
        commercial_office: "Office Buildings & Administrative Towers",
        commercial_hotel: "Hotels & Tourist Resorts",
        commercial_retail: "Retail Stores & Showrooms",
        commercial_restaurant: "Restaurants & Cafes",
        
        industrial: "Industrial Projects",
        industrial_factory: "Factories & Production Units",
        industrial_warehouse: "Warehouses & Storage Facilities",
        industrial_logistics: "Integrated Logistics Centers",
        industrial_petrochemical: "Petrochemical Plants",
        
        infrastructure: "Infrastructure Projects",
        infrastructure_roads: "Roads, Bridges & Tunnels",
        infrastructure_utilities: "Water & Wastewater Networks",
        infrastructure_power: "Electricity & Telecommunication Networks",
        infrastructure_airports: "Airports & Ports",
        infrastructure_railways: "Railway Networks",
        
        public: "Public Building Projects",
        public_hospital: "Hospitals & Health Centers",
        public_school: "Schools & Universities",
        public_government: "Government & Administrative Buildings",
        public_mosque: "Mosques & Islamic Centers",
        public_sports: "Sports Centers & Stadiums",
        
        renewable_energy: "Renewable Energy Projects",
        renewable_solar: "Solar Power Plants",
        renewable_wind: "Wind Farms",
        renewable_hydro: "Hydroelectric Plants",
        
        mega_projects: "Mega Projects (Vision 2030)",
        mega_neom: "NEOM Future Projects",
        mega_red_sea: "The Red Sea Project",
        mega_qiddiya: "Qiddiya Entertainment Project",
        mega_diriyah: "Diriyah Gate Historical Project",
        mega_amaala: "AMAALA Tourism Project",

        // Saudi Cities
        riyadh: "Riyadh",
        jeddah: "Jeddah",
        dammam: "Dammam",
        madinah: "Madinah",
        makkah: "Makkah",
        khobar: "Khobar",
        dhahran: "Dhahran",
        jubail: "Jubail",
        yanbu: "Yanbu",
        abha: "Abha",
        taif: "Taif",
        tabuk: "Tabuk",
        hail: "Hail",
        qassim: "Qassim",
        najran: "Najran",
        jazan: "Jazan",

        // Work Items and Materials
        excavation: "Excavation & Backfill Works",
        concrete: "Reinforced Concrete Works",
        steel: "Steel & Metal Works",
        masonry: "Masonry & Block Works",
        tiles: "Tiling & Ceramic Works",
        paint: "Painting & Finishing Works",
        electrical: "Electrical Installation",
        plumbing: "Plumbing & Drainage Works",
        hvac: "HVAC & Ventilation Systems",
        insulation: "Waterproofing & Thermal Insulation",
        roofing: "Roofing Works",
        flooring: "Flooring Works",
        ceiling: "Suspended Ceiling Works",
        doors_windows: "Doors & Windows",
        glass_aluminum: "Glass & Aluminum Works",
        landscaping: "Landscaping Works",
        security_systems: "Security & Surveillance Systems",
        fire_safety: "Fire Protection Systems",
        elevators: "Elevators & Escalators",
        
        // Units and Measurements
        square_meter: "Square Meter",
        cubic_meter: "Cubic Meter",
        linear_meter: "Linear Meter",
        ton: "Ton",
        kilogram: "Kilogram",
        unit: "Unit",
        piece: "Piece",
        set: "Set",
        point: "Point",
        
        // Operations and Actions
        generate: "Generate",
        calculate: "Calculate",
        estimate: "Estimate",
        analyze: "Analyze",
        optimize: "Optimize",
        export: "Export",
        import: "Import",
        save: "Save",
        load: "Load",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        remove: "Remove",
        update: "Update",
        refresh: "Refresh",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        
        // Status and States
        active: "Active",
        inactive: "Inactive",
        pending: "Pending",
        completed: "Completed",
        in_progress: "In Progress",
        cancelled: "Cancelled",
        approved: "Approved",
        rejected: "Rejected",
        draft: "Draft",
        final: "Final",
        
        // Priorities and Levels
        high: "High",
        medium: "Medium",
        low: "Low",
        urgent: "Urgent",
        normal: "Normal",
        critical: "Critical",
        
        // Messages and Notifications
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Information",
        loading: "Loading...",
        processing: "Processing...",
        calculating: "Calculating...",
        generating: "Generating...",
        saving: "Saving...",
        
        // Market News and Updates
        market_news: "Market News",
        price_update: "Price Update",
        last_update: "Last Update",
        live_updates: "Live Updates",
        market_trends: "Market Trends",
        price_analysis: "Price Analysis",
        market_volatility: "Market Volatility",
        
        // Project Templates
        project_template: "Project Template",
        use_template: "Use Template",
        save_as_template: "Save as Template",
        template_library: "Template Library",
        custom_template: "Custom Template",
        template_category: "Template Category",
        template_description: "Template Description",
        
        // Client Management
        client_name: "Client Name",
        client_contact: "Contact Information",
        client_email: "Email Address",
        client_phone: "Phone Number",
        client_address: "Address",
        project_history: "Project History",
        client_notes: "Client Notes",
        client_rating: "Client Rating",
        
        // Financial Reports
        financial_summary: "Financial Summary",
        profit_margin: "Profit Margin",
        total_revenue: "Total Revenue",
        project_costs: "Project Costs",
        monthly_report: "Monthly Report",
        yearly_report: "Yearly Report",
        cash_flow: "Cash Flow",
        budget_analysis: "Budget Analysis",
        
        // Dates and Times
        today: "Today",
        yesterday: "Yesterday",
        tomorrow: "Tomorrow",
        this_week: "This Week",
        this_month: "This Month",
        this_year: "This Year",
        last_week: "Last Week",
        last_month: "Last Month",
        last_year: "Last Year",
        
        // Buttons and Controls
        submit: "Submit",
        cancel: "Cancel",
        confirm: "Confirm",
        close: "Close",
        next: "Next",
        previous: "Previous",
        finish: "Finish",
        continue: "Continue",
        back: "Back",
        
        // Validation and Error Messages
        required_field: "This field is required",
        invalid_email: "Invalid email address",
        invalid_phone: "Invalid phone number",
        invalid_number: "Invalid number",
        min_length: "Minimum length",
        max_length: "Maximum length",
        
        // System Settings
        language: "Language",
        theme: "Theme",
        notifications: "Notifications",
        privacy: "Privacy",
        security: "Security",
        backup: "Backup",
        restore: "Restore",
        
        // Technical Terms
        ai_powered: "AI-Powered",
        machine_learning: "Machine Learning",
        real_time: "Real-time",
        cloud_based: "Cloud-based",
        automated: "Automated",
        intelligent: "Intelligent",
        advanced: "Advanced",
        professional: "Professional"
      }
    };

    this.translations.set('ar', translations.ar);
    this.translations.set('en', translations.en);
  }

  translate(key: string, lang: 'ar' | 'en' = 'ar', fallback?: string): string {
    const cacheKey = `${lang}_${key}`;
    
    // فحص التخزين المؤقت
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const langTranslations = this.translations.get(lang);
    if (!langTranslations) {
      return fallback || key;
    }

    const translation = langTranslations[key] || fallback || key;
    
    // حفظ في التخزين المؤقت
    this.cache.set(cacheKey, translation);
    
    return translation;
  }

  // ترجمة متعددة المفاتيح
  translateMultiple(keys: string[], lang: 'ar' | 'en' = 'ar'): Record<string, string> {
    const result: Record<string, string> = {};
    keys.forEach(key => {
      result[key] = this.translate(key, lang);
    });
    return result;
  }

  // ترجمة مع متغيرات
  translateWithVars(key: string, vars: Record<string, string | number>, lang: 'ar' | 'en' = 'ar'): string {
    let translation = this.translate(key, lang);
    
    Object.entries(vars).forEach(([varKey, varValue]) => {
      translation = translation.replace(`{${varKey}}`, String(varValue));
    });
    
    return translation;
  }

  // الحصول على جميع الترجمات للغة معينة
  getAllTranslations(lang: 'ar' | 'en' = 'ar'): Record<string, string> {
    return this.translations.get(lang) || {};
  }

  // إضافة ترجمات جديدة
  addTranslations(lang: 'ar' | 'en', newTranslations: Record<string, string>): void {
    const existing = this.translations.get(lang) || {};
    this.translations.set(lang, { ...existing, ...newTranslations });
    
    // مسح التخزين المؤقت للغة المحدثة
    for (const [key] of this.cache) {
      if (key.startsWith(`${lang}_`)) {
        this.cache.delete(key);
      }
    }
  }

  // فحص وجود ترجمة
  hasTranslation(key: string, lang: 'ar' | 'en' = 'ar'): boolean {
    const langTranslations = this.translations.get(lang);
    return langTranslations ? key in langTranslations : false;
  }

  // مسح التخزين المؤقت
  clearCache(): void {
    this.cache.clear();
  }

  // إحصائيات الترجمة
  getStats(): { totalKeys: number; cacheSize: number; languages: string[] } {
    const arKeys = Object.keys(this.translations.get('ar') || {}).length;
    const enKeys = Object.keys(this.translations.get('en') || {}).length;
    
    return {
      totalKeys: Math.max(arKeys, enKeys),
      cacheSize: this.cache.size,
      languages: Array.from(this.translations.keys())
    };
  }
}

export const translationEngine = TranslationEngine.getInstance();