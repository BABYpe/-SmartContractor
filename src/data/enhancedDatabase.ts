// قاعدة بيانات شاملة ومحدثة للمقاولات السعودية
export interface EnhancedItem {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: string;
  subcategory: string;
  unit: string;
  basePrice: number;
  currentPrice: number;
  priceHistory: Array<{ date: string; price: number; source: string }>;
  regionalPrices: {
    riyadh: number;
    jeddah: number;
    dammam: number;
    madinah: number;
    abha: number;
    tabuk: number;
    hail: number;
    qassim: number;
  };
  specifications: string;
  laborHours: number;
  suppliers: string[];
  qualityGrades: {
    economy: { multiplier: number; description: string };
    standard: { multiplier: number; description: string };
    premium: { multiplier: number; description: string };
  };
  seasonalFactors: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
  marketTrend: 'rising' | 'falling' | 'stable';
  volatility: 'low' | 'medium' | 'high';
  lastUpdated: string;
  isActive: boolean;
  projectTypes: string[];
}

export const enhancedItems: EnhancedItem[] = [
  // أعمال الحفر والأساسات
  {
    id: 'EXC001',
    code: 'EXC-001',
    nameAr: 'حفر أساسات عادية',
    nameEn: 'Normal Foundation Excavation',
    category: 'أعمال إنشائية',
    subcategory: 'أعمال الحفر',
    unit: 'متر مكعب',
    basePrice: 45,
    currentPrice: 47,
    priceHistory: [
      { date: '2024-01-15', price: 47, source: 'market_update' },
      { date: '2024-01-10', price: 45, source: 'base_price' },
      { date: '2024-01-05', price: 44, source: 'market_update' }
    ],
    regionalPrices: {
      riyadh: 47,
      jeddah: 49,
      dammam: 44,
      madinah: 48,
      abha: 42,
      tabuk: 43,
      hail: 41,
      qassim: 43
    },
    specifications: 'حفر في تربة عادية بعمق حتى 3 متر مع نقل المخلفات',
    laborHours: 2,
    suppliers: ['شركة المعدات الثقيلة المتقدمة', 'مؤسسة الحفر المتخصصة', 'شركة الآليات الحديثة'],
    qualityGrades: {
      economy: { multiplier: 0.8, description: 'حفر عادي بمعدات بسيطة' },
      standard: { multiplier: 1.0, description: 'حفر بمعدات متوسطة الجودة' },
      premium: { multiplier: 1.3, description: 'حفر دقيق بمعدات متطورة ومسح ليزر' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.1, autumn: 1.0, winter: 0.95 },
    marketTrend: 'rising',
    volatility: 'medium',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'industrial']
  },

  // أعمال الخرسانة المسلحة
  {
    id: 'CON001',
    code: 'CON-001',
    nameAr: 'خرسانة مسلحة درجة 25',
    nameEn: 'Reinforced Concrete Grade 25',
    category: 'أعمال إنشائية',
    subcategory: 'أعمال الخرسانة',
    unit: 'متر مكعب',
    basePrice: 280,
    currentPrice: 285,
    priceHistory: [
      { date: '2024-01-15', price: 285, source: 'cement_price_increase' },
      { date: '2024-01-12', price: 282, source: 'market_update' },
      { date: '2024-01-08', price: 280, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 285,
      jeddah: 295,
      dammam: 280,
      madinah: 290,
      abha: 275,
      tabuk: 278,
      hail: 272,
      qassim: 276
    },
    specifications: 'خرسانة مسلحة مقاومة 25 ميجاباسكال شاملة الصب والمعالجة',
    laborHours: 4,
    suppliers: ['شركة الخرسانة الجاهزة السعودية', 'مصنع الخرسانة المتقدم', 'شركة ريدي مكس'],
    qualityGrades: {
      economy: { multiplier: 0.92, description: 'خرسانة مسلحة اقتصادية' },
      standard: { multiplier: 1.0, description: 'خرسانة مسلحة قياسية' },
      premium: { multiplier: 1.15, description: 'خرسانة عالية الأداء مع مضافات خاصة' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.08, autumn: 1.0, winter: 0.96 },
    marketTrend: 'rising',
    volatility: 'high',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'industrial', 'infrastructure']
  },

  // حديد التسليح
  {
    id: 'STL001',
    code: 'STL-001',
    nameAr: 'حديد تسليح قطر 12 مم',
    nameEn: 'Reinforcement Steel 12mm',
    category: 'أعمال إنشائية',
    subcategory: 'أعمال الحديد',
    unit: 'طن',
    basePrice: 2700,
    currentPrice: 2750,
    priceHistory: [
      { date: '2024-01-15', price: 2750, source: 'global_steel_prices' },
      { date: '2024-01-10', price: 2720, source: 'market_update' },
      { date: '2024-01-05', price: 2700, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 2750,
      jeddah: 2780,
      dammam: 2720,
      madinah: 2760,
      abha: 2700,
      tabuk: 2710,
      hail: 2690,
      qassim: 2705
    },
    specifications: 'حديد تسليح قطر 12 مم درجة 60 حسب المواصفات السعودية SASO',
    laborHours: 14,
    suppliers: ['مصانع الراجحي للحديد', 'شركة حديد الإنماء', 'مصانع اليمامة للحديد'],
    qualityGrades: {
      economy: { multiplier: 0.95, description: 'حديد تسليح عادي' },
      standard: { multiplier: 1.0, description: 'حديد تسليح قياسي معتمد' },
      premium: { multiplier: 1.08, description: 'حديد تسليح عالي الجودة مقاوم للتآكل' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.05, autumn: 1.02, winter: 0.98 },
    marketTrend: 'rising',
    volatility: 'high',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'industrial', 'infrastructure']
  },

  // أعمال المباني
  {
    id: 'MAS001',
    code: 'MAS-001',
    nameAr: 'بناء جدران بلوك أسمنتي 20 سم',
    nameEn: 'Concrete Block Wall 20cm',
    category: 'أعمال إنشائية',
    subcategory: 'أعمال المباني',
    unit: 'متر مربع',
    basePrice: 85,
    currentPrice: 87,
    priceHistory: [
      { date: '2024-01-15', price: 87, source: 'cement_price_increase' },
      { date: '2024-01-08', price: 85, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 87,
      jeddah: 90,
      dammam: 84,
      madinah: 88,
      abha: 82,
      tabuk: 83,
      hail: 81,
      qassim: 83
    },
    specifications: 'بناء جدران بلوك أسمنتي مقاس 20×20×40 سم شامل المونة',
    laborHours: 1.8,
    suppliers: ['مصنع البلوك المتطور', 'شركة مواد البناء الحديثة', 'مؤسسة البلوك السعودي'],
    qualityGrades: {
      economy: { multiplier: 0.9, description: 'بلوك أسمنتي عادي' },
      standard: { multiplier: 1.0, description: 'بلوك أسمنتي قياسي' },
      premium: { multiplier: 1.15, description: 'بلوك أسمنتي عالي الجودة ومعزول' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.03, autumn: 1.0, winter: 0.98 },
    marketTrend: 'stable',
    volatility: 'low',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial']
  },

  // أعمال التشطيبات - البلاط
  {
    id: 'TIL001',
    code: 'TIL-001',
    nameAr: 'تركيب بلاط سيراميك 60×60',
    nameEn: 'Ceramic Floor Tiling 60x60',
    category: 'أعمال التشطيبات',
    subcategory: 'أعمال البلاط',
    unit: 'متر مربع',
    basePrice: 95,
    currentPrice: 98,
    priceHistory: [
      { date: '2024-01-15', price: 98, source: 'import_cost_increase' },
      { date: '2024-01-05', price: 95, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 98,
      jeddah: 102,
      dammam: 94,
      madinah: 100,
      abha: 92,
      tabuk: 93,
      hail: 90,
      qassim: 92
    },
    specifications: 'تركيب بلاط سيراميك للأرضيات مقاس 60×60 سم درجة أولى',
    laborHours: 1.5,
    suppliers: ['شركة السيراميك السعودي', 'مؤسسة البلاط المتطور', 'شركة الخزف الملكي'],
    qualityGrades: {
      economy: { multiplier: 0.8, description: 'سيراميك اقتصادي محلي' },
      standard: { multiplier: 1.0, description: 'سيراميك قياسي مستورد' },
      premium: { multiplier: 1.4, description: 'سيراميك فاخر مستورد من إيطاليا' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.03, autumn: 1.0, winter: 0.97 },
    marketTrend: 'rising',
    volatility: 'medium',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'hotel']
  },

  // أعمال الدهان
  {
    id: 'PNT001',
    code: 'PNT-001',
    nameAr: 'دهان جدران داخلي 3 طبقات',
    nameEn: 'Internal Wall Painting (3 coats)',
    category: 'أعمال التشطيبات',
    subcategory: 'أعمال الدهان',
    unit: 'متر مربع',
    basePrice: 32,
    currentPrice: 33,
    priceHistory: [
      { date: '2024-01-15', price: 33, source: 'paint_material_cost' },
      { date: '2024-01-01', price: 32, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 33,
      jeddah: 35,
      dammam: 31,
      madinah: 34,
      abha: 30,
      tabuk: 31,
      hail: 29,
      qassim: 30
    },
    specifications: 'دهان جدران داخلي أكريليك عالي الجودة 3 طبقات',
    laborHours: 0.8,
    suppliers: ['شركة الدهانات المتقدمة', 'مؤسسة الألوان الحديثة', 'شركة جوتن السعودية'],
    qualityGrades: {
      economy: { multiplier: 0.8, description: 'دهان اقتصادي محلي' },
      standard: { multiplier: 1.0, description: 'دهان قياسي مقاوم' },
      premium: { multiplier: 1.4, description: 'دهان فاخر مقاوم للبقع والرطوبة' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.02, autumn: 1.0, winter: 0.98 },
    marketTrend: 'stable',
    volatility: 'low',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'office']
  },

  // أعمال الكهرباء
  {
    id: 'ELE001',
    code: 'ELE-001',
    nameAr: 'تركيب نقطة إنارة مع مفتاح ومقبس',
    nameEn: 'Lighting Point Installation (Switch & Socket)',
    category: 'أعمال كهروميكانيكية',
    subcategory: 'أعمال الكهرباء',
    unit: 'نقطة',
    basePrice: 45,
    currentPrice: 47,
    priceHistory: [
      { date: '2024-01-15', price: 47, source: 'copper_price_increase' },
      { date: '2024-01-01', price: 45, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 47,
      jeddah: 49,
      dammam: 45,
      madinah: 48,
      abha: 43,
      tabuk: 44,
      hail: 42,
      qassim: 44
    },
    specifications: 'تركيب نقطة إنارة شاملة المفتاح والمقبس والكابل',
    laborHours: 1.5,
    suppliers: ['شركة التمديدات الكهربائية', 'مؤسسة الكهرباء المتطورة', 'شركة الأنظمة الذكية'],
    qualityGrades: {
      economy: { multiplier: 0.85, description: 'تمديدات عادية' },
      standard: { multiplier: 1.0, description: 'تمديدات قياسية معتمدة' },
      premium: { multiplier: 1.25, description: 'تمديدات ذكية عالية الجودة' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.02, autumn: 1.0, winter: 0.98 },
    marketTrend: 'rising',
    volatility: 'medium',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'office', 'industrial']
  },

  // أعمال السباكة
  {
    id: 'PLB001',
    code: 'PLB-001',
    nameAr: 'تمديد أنابيب مياه PPR 20 مم',
    nameEn: 'Water Pipe Extension (PPR 20mm)',
    category: 'أعمال كهروميكانيكية',
    subcategory: 'أعمال السباكة',
    unit: 'متر طولي',
    basePrice: 24,
    currentPrice: 25,
    priceHistory: [
      { date: '2024-01-15', price: 25, source: 'plastic_material_cost' },
      { date: '2024-01-01', price: 24, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 25,
      jeddah: 26,
      dammam: 24,
      madinah: 25,
      abha: 23,
      tabuk: 24,
      hail: 22,
      qassim: 23
    },
    specifications: 'تمديد أنابيب مياه باردة PPR قطر 20 مم مع التوصيلات',
    laborHours: 0.5,
    suppliers: ['شركة التمديدات الصحية', 'مؤسسة السباكة المتطورة', 'شركة الأنابيب الحديثة'],
    qualityGrades: {
      economy: { multiplier: 0.85, description: 'أنابيب PPR عادية' },
      standard: { multiplier: 1.0, description: 'أنابيب PPR قياسية معتمدة' },
      premium: { multiplier: 1.2, description: 'أنابيب PPR عالية الجودة مقاومة للحرارة' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.02, autumn: 1.0, winter: 0.98 },
    marketTrend: 'stable',
    volatility: 'low',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'hotel']
  },

  // أعمال العزل
  {
    id: 'INS001',
    code: 'INS-001',
    nameAr: 'عزل مائي للأسطح برولات البيتومين',
    nameEn: 'Roof Waterproofing (Bituminous Rolls)',
    category: 'أعمال التشطيبات',
    subcategory: 'أعمال العزل',
    unit: 'متر مربع',
    basePrice: 30,
    currentPrice: 32,
    priceHistory: [
      { date: '2024-01-15', price: 32, source: 'oil_price_increase' },
      { date: '2024-01-01', price: 30, source: 'base_price' }
    ],
    regionalPrices: {
      riyadh: 32,
      jeddah: 34,
      dammam: 30,
      madinah: 33,
      abha: 29,
      tabuk: 30,
      hail: 28,
      qassim: 29
    },
    specifications: 'عزل مائي للأسطح برولات البيتومين سماكة 4 مم',
    laborHours: 0.8,
    suppliers: ['شركة العزل المائي', 'مؤسسة مواد العزل', 'شركة الحماية المتقدمة'],
    qualityGrades: {
      economy: { multiplier: 0.85, description: 'عزل مائي عادي' },
      standard: { multiplier: 1.0, description: 'عزل مائي قياسي' },
      premium: { multiplier: 1.2, description: 'عزل مائي متطور مقاوم للأشعة' }
    },
    seasonalFactors: { spring: 1.0, summer: 1.1, autumn: 1.0, winter: 0.95 },
    marketTrend: 'rising',
    volatility: 'medium',
    lastUpdated: new Date().toISOString(),
    isActive: true,
    projectTypes: ['residential', 'commercial', 'industrial']
  }
];

// أخبار السوق المباشرة
export interface MarketNews {
  id: string;
  date: string;
  time: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  affectedItems: string[];
  priceChange: number;
  source: string;
  isBreaking: boolean;
}

export const liveMarketNews: MarketNews[] = [
  {
    id: 'news001',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('ar-SA'),
    titleAr: 'ارتفاع أسعار الحديد 5% بسبب زيادة الطلب العالمي',
    titleEn: 'Steel prices up 5% due to increased global demand',
    contentAr: 'شهدت أسعار حديد التسليح ارتفاعاً ملحوظاً بنسبة 5% خلال الأسبوع الماضي نتيجة زيادة الطلب العالمي وارتفاع أسعار خام الحديد في الأسواق الدولية.',
    contentEn: 'Reinforcement steel prices have risen significantly by 5% over the past week due to increased global demand and rising iron ore prices in international markets.',
    impact: 'high',
    category: 'steel',
    affectedItems: ['STL001', 'STL002', 'STL003'],
    priceChange: 5,
    source: 'Saudi Steel Association',
    isBreaking: true
  },
  {
    id: 'news002',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('ar-SA'),
    titleAr: 'استقرار أسعار الأسمنت مع توقعات انخفاض طفيف',
    titleEn: 'Cement prices stable with expectations of slight decline',
    contentAr: 'تشهد أسعار الأسمنت استقراراً نسبياً مع توقعات انخفاض طفيف بنسبة 2-3% خلال الشهر القادم بسبب زيادة الإنتاج المحلي.',
    contentEn: 'Cement prices are experiencing relative stability with expectations of a slight decline of 2-3% next month due to increased local production.',
    impact: 'medium',
    category: 'concrete',
    affectedItems: ['CON001', 'CON002', 'MAS001'],
    priceChange: -2,
    source: 'Saudi Cement Company',
    isBreaking: false
  },
  {
    id: 'news003',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('ar-SA'),
    titleAr: 'انخفاض تكاليف النقل يؤثر إيجابياً على أسعار مواد البناء',
    titleEn: 'Reduced transport costs positively impact construction material prices',
    contentAr: 'أدى انخفاض أسعار الوقود وتحسن شبكة النقل إلى تقليل تكاليف النقل بنسبة 8%، مما ينعكس إيجابياً على أسعار مواد البناء.',
    contentEn: 'Lower fuel prices and improved transport network have reduced transport costs by 8%, positively reflecting on construction material prices.',
    impact: 'low',
    category: 'logistics',
    affectedItems: ['ALL'],
    priceChange: -1,
    source: 'Ministry of Transport',
    isBreaking: false
  }
];

// فئات المشاريع الشاملة
export const projectCategories = {
  // مشاريع البناء السكني
  residential: {
    nameAr: 'مشاريع سكنية',
    nameEn: 'Residential Projects',
    subcategories: {
      villas: { nameAr: 'فلل ومنازل خاصة', nameEn: 'Villas and Private Houses' },
      compounds: { nameAr: 'مجمعات سكنية', nameEn: 'Residential Compounds' },
      apartments: { nameAr: 'عمارات سكنية', nameEn: 'Apartment Buildings' },
      social_housing: { nameAr: 'الإسكان الاجتماعي', nameEn: 'Social Housing' }
    }
  },
  
  // مشاريع البناء التجاري
  commercial: {
    nameAr: 'مشاريع تجارية',
    nameEn: 'Commercial Projects',
    subcategories: {
      malls: { nameAr: 'مراكز تسوق ومولات', nameEn: 'Shopping Centers and Malls' },
      offices: { nameAr: 'مباني المكاتب', nameEn: 'Office Buildings' },
      hotels: { nameAr: 'فنادق ومنتجعات', nameEn: 'Hotels and Resorts' },
      retail: { nameAr: 'محلات تجارية', nameEn: 'Retail Stores' }
    }
  },
  
  // مشاريع البناء الصناعي
  industrial: {
    nameAr: 'مشاريع صناعية',
    nameEn: 'Industrial Projects',
    subcategories: {
      factories: { nameAr: 'مصانع وورش عمل', nameEn: 'Factories and Workshops' },
      warehouses: { nameAr: 'مخازن ومستودعات', nameEn: 'Warehouses and Storage' },
      logistics: { nameAr: 'مراكز لوجستية', nameEn: 'Logistics Centers' }
    }
  },
  
  // مشاريع البنية التحتية
  infrastructure: {
    nameAr: 'مشاريع البنية التحتية',
    nameEn: 'Infrastructure Projects',
    subcategories: {
      roads: { nameAr: 'الطرق والجسور', nameEn: 'Roads and Bridges' },
      utilities: { nameAr: 'شبكات المرافق', nameEn: 'Utility Networks' },
      airports: { nameAr: 'مطارات وموانئ', nameEn: 'Airports and Ports' }
    }
  },
  
  // مشاريع المباني العامة
  public: {
    nameAr: 'مشاريع عامة وحكومية',
    nameEn: 'Public and Government Projects',
    subcategories: {
      hospitals: { nameAr: 'مستشفيات ومراكز صحية', nameEn: 'Hospitals and Health Centers' },
      schools: { nameAr: 'مدارس وجامعات', nameEn: 'Schools and Universities' },
      government: { nameAr: 'مباني حكومية', nameEn: 'Government Buildings' }
    }
  },
  
  // مشاريع الطاقة المتجددة
  renewable_energy: {
    nameAr: 'مشاريع الطاقة المتجددة',
    nameEn: 'Renewable Energy Projects',
    subcategories: {
      solar: { nameAr: 'محطات الطاقة الشمسية', nameEn: 'Solar Power Plants' },
      wind: { nameAr: 'مزارع الرياح', nameEn: 'Wind Farms' }
    }
  },
  
  // المشاريع الضخمة
  mega_projects: {
    nameAr: 'المشاريع الضخمة',
    nameEn: 'Mega Projects',
    subcategories: {
      neom: { nameAr: 'مشاريع نيوم', nameEn: 'NEOM Projects' },
      red_sea: { nameAr: 'مشروع البحر الأحمر', nameEn: 'Red Sea Project' },
      qiddiya: { nameAr: 'مشروع القدية', nameEn: 'Qiddiya Project' }
    }
  }
};

// مناطق المملكة
export const saudiRegions = {
  riyadh: { nameAr: 'الرياض', nameEn: 'Riyadh', factor: 1.0 },
  jeddah: { nameAr: 'جدة', nameEn: 'Jeddah', factor: 1.05 },
  dammam: { nameAr: 'الدمام', nameEn: 'Dammam', factor: 0.98 },
  madinah: { nameAr: 'المدينة المنورة', nameEn: 'Madinah', factor: 1.02 },
  abha: { nameAr: 'أبها', nameEn: 'Abha', factor: 0.95 },
  tabuk: { nameAr: 'تبوك', nameEn: 'Tabuk', factor: 0.97 },
  hail: { nameAr: 'حائل', nameEn: 'Hail', factor: 0.93 },
  qassim: { nameAr: 'القصيم', nameEn: 'Qassim', factor: 0.95 }
};