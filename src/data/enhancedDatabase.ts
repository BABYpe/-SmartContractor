import type { ConstructionItem } from '../types';

export const enhancedItems: ConstructionItem[] = [
  {
    id: '1',
    code: 'CON-001',
    nameAr: 'خرسانة مسلحة درجة 25',
    nameEn: 'Reinforced Concrete Grade 25',
    category: 'أعمال إنشائية',
    subcategory: 'خرسانة',
    unit: 'متر مكعب',
    basePrice: 280,
    specifications: 'خرسانة مسلحة بمقاومة 25 ميجاباسكال مع حديد تسليح',
    laborHours: 8,
    suppliers: ['شركة الخرسانة المتقدمة', 'مصنع الرياض للخرسانة'],
    regions: {
      riyadh: 285,
      jeddah: 295,
      dammam: 290,
      makkah: 300,
      khobar: 288,
      abha: 275,
      taif: 292,
      tabuk: 278,
      hail: 280,
      qassim: 283
    },
    qualityGrades: {
      economy: { price: 242, description: 'درجة اقتصادية' },
      standard: { price: 285, description: 'درجة قياسية' },
      premium: { price: 356, description: 'درجة ممتازة' }
    },
    tags: ['خرسانة', 'إنشائي', 'أساسي'],
    isActive: true,
    lastUpdated: '2024-03-15',
    usageCount: 156,
    rating: 4.8
  },
  {
    id: '2',
    code: 'STL-001',
    nameAr: 'حديد تسليح قطر 12 مم',
    nameEn: 'Reinforcement Steel 12mm',
    category: 'أعمال إنشائية',
    subcategory: 'حديد',
    unit: 'طن',
    basePrice: 2700,
    specifications: 'حديد تسليح عالي المقاومة قطر 12 مم',
    laborHours: 12,
    suppliers: ['شركة حديد الراجحي', 'مصنع الحديد السعودي'],
    regions: {
      riyadh: 2750,
      jeddah: 2780,
      dammam: 2720,
      makkah: 2800,
      khobar: 2730,
      abha: 2690,
      taif: 2770,
      tabuk: 2710,
      hail: 2740,
      qassim: 2760
    },
    qualityGrades: {
      economy: { price: 2475, description: 'درجة اقتصادية' },
      standard: { price: 2750, description: 'درجة قياسية' },
      premium: { price: 3162, description: 'درجة ممتازة' }
    },
    tags: ['حديد', 'تسليح', 'إنشائي'],
    isActive: true,
    lastUpdated: '2024-03-14',
    usageCount: 203,
    rating: 4.9
  },
  {
    id: '3',
    code: 'TIL-001',
    nameAr: 'بلاط سيراميك 60×60',
    nameEn: 'Ceramic Tiles 60x60',
    category: 'أعمال التشطيبات',
    subcategory: 'أرضيات',
    unit: 'متر مربع',
    basePrice: 95,
    specifications: 'بلاط سيراميك مقاس 60×60 سم درجة أولى',
    laborHours: 4,
    suppliers: ['شركة البلاط الذهبي', 'معرض السيراميك الحديث'],
    regions: {
      riyadh: 98,
      jeddah: 102,
      dammam: 96,
      makkah: 105,
      khobar: 97,
      abha: 92,
      taif: 100,
      tabuk: 94,
      hail: 95,
      qassim: 99
    },
    qualityGrades: {
      economy: { price: 69, description: 'درجة اقتصادية' },
      standard: { price: 98, description: 'درجة قياسية' },
      premium: { price: 147, description: 'درجة ممتازة' }
    },
    tags: ['بلاط', 'تشطيبات', 'أرضيات'],
    isActive: true,
    lastUpdated: '2024-03-13',
    usageCount: 89,
    rating: 4.6
  },
  {
    id: '4',
    code: 'EXC-001',
    nameAr: 'حفر أساسات عادية',
    nameEn: 'Normal Foundation Excavation',
    category: 'أعمال إنشائية',
    subcategory: 'حفر',
    unit: 'متر مكعب',
    basePrice: 47,
    specifications: 'حفر أساسات في تربة عادية بعمق متوسط 1.5 متر',
    laborHours: 6,
    suppliers: ['شركة الحفر المتخصصة', 'مؤسسة الأعمال الترابية'],
    regions: {
      riyadh: 47,
      jeddah: 52,
      dammam: 45,
      makkah: 55,
      khobar: 46,
      abha: 42,
      taif: 50,
      tabuk: 44,
      hail: 45,
      qassim: 48
    },
    qualityGrades: {
      economy: { price: 38, description: 'حفر عادي' },
      standard: { price: 47, description: 'حفر قياسي' },
      premium: { price: 61, description: 'حفر متقدم' }
    },
    tags: ['حفر', 'أساسات', 'ترابية'],
    isActive: true,
    lastUpdated: '2024-03-12',
    usageCount: 134,
    rating: 4.5
  },
  {
    id: '5',
    code: 'MAS-001',
    nameAr: 'بناء جدران بلوك أسمنتي 20 سم',
    nameEn: 'Concrete Block Wall 20cm',
    category: 'أعمال إنشائية',
    subcategory: 'مباني',
    unit: 'متر مربع',
    basePrice: 87,
    specifications: 'بناء جدران بلوك أسمنتي مقاس 20×20×40 سم',
    laborHours: 5,
    suppliers: ['مصنع البلوك الحديث', 'شركة المواد الإنشائية'],
    regions: {
      riyadh: 87,
      jeddah: 92,
      dammam: 85,
      makkah: 95,
      khobar: 86,
      abha: 82,
      taif: 90,
      tabuk: 84,
      hail: 85,
      qassim: 88
    },
    qualityGrades: {
      economy: { price: 70, description: 'بلوك عادي' },
      standard: { price: 87, description: 'بلوك قياسي' },
      premium: { price: 113, description: 'بلوك عالي الجودة' }
    },
    tags: ['بلوك', 'جدران', 'مباني'],
    isActive: true,
    lastUpdated: '2024-03-11',
    usageCount: 167,
    rating: 4.7
  },
  {
    id: '6',
    code: 'PNT-001',
    nameAr: 'دهان جدران داخلي 3 طبقات',
    nameEn: 'Interior Wall Paint 3 Coats',
    category: 'أعمال التشطيبات',
    subcategory: 'دهانات',
    unit: 'متر مربع',
    basePrice: 33,
    specifications: 'دهان أكريليك داخلي 3 طبقات مع المعجون',
    laborHours: 2,
    suppliers: ['شركة الدهانات الحديثة', 'معرض الألوان'],
    regions: {
      riyadh: 33,
      jeddah: 36,
      dammam: 32,
      makkah: 38,
      khobar: 33,
      abha: 30,
      taif: 35,
      tabuk: 31,
      hail: 32,
      qassim: 34
    },
    qualityGrades: {
      economy: { price: 25, description: 'دهان اقتصادي' },
      standard: { price: 33, description: 'دهان قياسي' },
      premium: { price: 46, description: 'دهان فاخر' }
    },
    tags: ['دهان', 'تشطيبات', 'داخلي'],
    isActive: true,
    lastUpdated: '2024-03-10',
    usageCount: 198,
    rating: 4.4
  },
  {
    id: '7',
    code: 'ELE-001',
    nameAr: 'تركيب نقطة إنارة مع مفتاح ومقبس',
    nameEn: 'Light Point with Switch and Socket',
    category: 'أعمال كهروميكانيكية',
    subcategory: 'كهرباء',
    unit: 'نقطة',
    basePrice: 47,
    specifications: 'تركيب نقطة إنارة كاملة مع مفتاح ومقبس',
    laborHours: 3,
    suppliers: ['شركة الكهرباء المتقدمة', 'مؤسسة الأنظمة الكهربائية'],
    regions: {
      riyadh: 47,
      jeddah: 52,
      dammam: 45,
      makkah: 55,
      khobar: 46,
      abha: 42,
      taif: 50,
      tabuk: 44,
      hail: 45,
      qassim: 48
    },
    qualityGrades: {
      economy: { price: 38, description: 'تركيب عادي' },
      standard: { price: 47, description: 'تركيب قياسي' },
      premium: { price: 61, description: 'تركيب فاخر' }
    },
    tags: ['كهرباء', 'إنارة', 'مقابس'],
    isActive: true,
    lastUpdated: '2024-03-09',
    usageCount: 145,
    rating: 4.6
  },
  {
    id: '8',
    code: 'PLB-001',
    nameAr: 'تمديد أنابيب مياه PPR 20 مم',
    nameEn: 'PPR Water Pipes 20mm Installation',
    category: 'أعمال كهروميكانيكية',
    subcategory: 'سباكة',
    unit: 'متر طولي',
    basePrice: 25,
    specifications: 'تمديد أنابيب مياه PPR قطر 20 مم مع التوصيلات',
    laborHours: 1.5,
    suppliers: ['شركة الأنابيب الحديثة', 'مؤسسة السباكة المتقدمة'],
    regions: {
      riyadh: 25,
      jeddah: 28,
      dammam: 24,
      makkah: 30,
      khobar: 25,
      abha: 22,
      taif: 27,
      tabuk: 23,
      hail: 24,
      qassim: 26
    },
    qualityGrades: {
      economy: { price: 20, description: 'أنابيب عادية' },
      standard: { price: 25, description: 'أنابيب قياسية' },
      premium: { price: 33, description: 'أنابيب عالية الجودة' }
    },
    tags: ['سباكة', 'أنابيب', 'مياه'],
    isActive: true,
    lastUpdated: '2024-03-08',
    usageCount: 112,
    rating: 4.5
  },
  {
    id: '9',
    code: 'INS-001',
    nameAr: 'عزل مائي للأسطح برولات البيتومين',
    nameEn: 'Waterproofing with Bitumen Rolls',
    category: 'أعمال التشطيبات',
    subcategory: 'عزل',
    unit: 'متر مربع',
    basePrice: 32,
    specifications: 'عزل مائي للأسطح باستخدام رولات البيتومين المعدل',
    laborHours: 3,
    suppliers: ['شركة العزل المتخصصة', 'مؤسسة المواد العازلة'],
    regions: {
      riyadh: 32,
      jeddah: 35,
      dammam: 31,
      makkah: 37,
      khobar: 32,
      abha: 29,
      taif: 34,
      tabuk: 30,
      hail: 31,
      qassim: 33
    },
    qualityGrades: {
      economy: { price: 26, description: 'عزل اقتصادي' },
      standard: { price: 32, description: 'عزل قياسي' },
      premium: { price: 42, description: 'عزل متقدم' }
    },
    tags: ['عزل', 'مائي', 'أسطح'],
    isActive: true,
    lastUpdated: '2024-03-07',
    usageCount: 87,
    rating: 4.7
  },
  {
    id: '10',
    code: 'FIN-001',
    nameAr: 'تركيب أبواب خشبية داخلية',
    nameEn: 'Interior Wooden Doors Installation',
    category: 'أعمال التشطيبات',
    subcategory: 'نجارة',
    unit: 'باب',
    basePrice: 450,
    specifications: 'تركيب أبواب خشبية داخلية مع الإكسسوارات',
    laborHours: 4,
    suppliers: ['معرض الأبواب الحديث', 'شركة النجارة المتقدمة'],
    regions: {
      riyadh: 450,
      jeddah: 480,
      dammam: 440,
      makkah: 500,
      khobar: 445,
      abha: 420,
      taif: 470,
      tabuk: 430,
      hail: 440,
      qassim: 460
    },
    qualityGrades: {
      economy: { price: 360, description: 'أبواب اقتصادية' },
      standard: { price: 450, description: 'أبواب قياسية' },
      premium: { price: 585, description: 'أبواب فاخرة' }
    },
    tags: ['أبواب', 'خشب', 'نجارة'],
    isActive: true,
    lastUpdated: '2024-03-06',
    usageCount: 76,
    rating: 4.8
  }
];

export const categories = [
  'أعمال إنشائية',
  'أعمال التشطيبات',
  'أعمال كهروميكانيكية'
];

export const subcategories = {
  'أعمال إنشائية': ['خرسانة', 'حديد', 'حفر', 'مباني'],
  'أعمال التشطيبات': ['أرضيات', 'دهانات', 'عزل', 'نجارة'],
  'أعمال كهروميكانيكية': ['كهرباء', 'سباكة']
};

export const regions = [
  'riyadh',
  'jeddah',
  'dammam',
  'makkah',
  'khobar',
  'abha',
  'taif',
  'tabuk',
  'hail',
  'qassim'
];