// قوالب المشاريع الجاهزة والذكية
export interface ProjectTemplate {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  complexity: 'simple' | 'medium' | 'complex' | 'mega';
  estimatedDuration: string;
  estimatedDurationEn: string;
  averageCostPerSqm: {
    min: number;
    max: number;
    average: number;
  };
  projectDetails: {
    projectType: string;
    city: string;
    profitMargin: string;
    wastePercentage: string;
  };
  boqItems: Array<{
    itemName: string;
    itemNameEn: string;
    quantity: number;
    unit: string;
    unitEn: string;
    estimatedPrice: number;
    category: string;
    specifications: string;
    specificationsEn: string;
    priority: 'essential' | 'important' | 'optional';
  }>;
  paymentMilestones: Array<{
    name: string;
    nameEn: string;
    percentage: string;
  }>;
  specialRequirements: string[];
  specialRequirementsEn: string[];
  tags: string[];
  tagsEn: string[];
  isPopular: boolean;
  usageCount: number;
  rating: number;
  lastUpdated: string;
  thumbnail?: string;
}

export const smartProjectTemplates: ProjectTemplate[] = [
  // قالب فيلا سكنية متوسطة
  {
    id: 'villa_medium_template',
    nameAr: 'فيلا سكنية متوسطة (300 م²)',
    nameEn: 'Medium Residential Villa (300 m²)',
    category: 'residential',
    categoryAr: 'مشاريع سكنية',
    categoryEn: 'Residential Projects',
    descriptionAr: 'قالب شامل لبناء فيلا سكنية متوسطة الحجم مع جميع التشطيبات الأساسية',
    descriptionEn: 'Comprehensive template for building a medium-sized residential villa with all basic finishes',
    complexity: 'medium',
    estimatedDuration: '8-10 أشهر',
    estimatedDurationEn: '8-10 months',
    averageCostPerSqm: { min: 1500, max: 2200, average: 1850 },
    projectDetails: {
      projectType: 'residential_villa',
      city: 'riyadh',
      profitMargin: '15',
      wastePercentage: '5'
    },
    boqItems: [
      {
        itemName: 'أعمال الحفر والردم',
        itemNameEn: 'Excavation and Backfill',
        quantity: 240,
        unit: 'متر مكعب',
        unitEn: 'cubic meter',
        estimatedPrice: 45,
        category: 'earthworks',
        specifications: 'حفر أساسات بعمق 1.5 متر مع نقل المخلفات',
        specificationsEn: 'Foundation excavation 1.5m deep with waste removal',
        priority: 'essential'
      },
      {
        itemName: 'خرسانة مسلحة للأساسات',
        itemNameEn: 'Reinforced Concrete for Foundations',
        quantity: 90,
        unit: 'متر مكعب',
        unitEn: 'cubic meter',
        estimatedPrice: 280,
        category: 'concrete',
        specifications: 'خرسانة مقاومة 25 ميجاباسكال مع حديد تسليح',
        specificationsEn: '25 MPa concrete with reinforcement steel',
        priority: 'essential'
      },
      {
        itemName: 'بناء جدران بلوك أسمنتي',
        itemNameEn: 'Concrete Block Masonry',
        quantity: 750,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 85,
        category: 'masonry',
        specifications: 'بلوك أسمنتي مقاس 20×20×40 سم مع المونة',
        specificationsEn: 'Concrete blocks 20×20×40 cm with mortar',
        priority: 'essential'
      },
      {
        itemName: 'تركيب بلاط أرضيات',
        itemNameEn: 'Floor Tile Installation',
        quantity: 300,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 95,
        category: 'finishes',
        specifications: 'بلاط بورسلين 60×60 سم درجة أولى',
        specificationsEn: 'First grade porcelain tiles 60×60 cm',
        priority: 'important'
      },
      {
        itemName: 'أعمال دهان داخلي',
        itemNameEn: 'Interior Painting',
        quantity: 900,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 32,
        category: 'finishes',
        specifications: 'دهان أكريليك عالي الجودة 3 طبقات',
        specificationsEn: 'High quality acrylic paint 3 coats',
        priority: 'important'
      },
      {
        itemName: 'تمديدات كهربائية',
        itemNameEn: 'Electrical Installation',
        quantity: 240,
        unit: 'نقطة',
        unitEn: 'point',
        estimatedPrice: 45,
        category: 'electrical',
        specifications: 'نقاط إنارة ومقابس شاملة الكابلات والتوصيلات',
        specificationsEn: 'Lighting and socket points including cables and connections',
        priority: 'essential'
      },
      {
        itemName: 'تمديدات سباكة',
        itemNameEn: 'Plumbing Installation',
        quantity: 600,
        unit: 'متر طولي',
        unitEn: 'linear meter',
        estimatedPrice: 24,
        category: 'plumbing',
        specifications: 'أنابيب PPR للمياه الباردة والساخنة مع التوصيلات',
        specificationsEn: 'PPR pipes for hot and cold water with fittings',
        priority: 'essential'
      },
      {
        itemName: 'تركيب أبواب خشبية',
        itemNameEn: 'Wooden Door Installation',
        quantity: 8,
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedPrice: 1200,
        category: 'finishes',
        specifications: 'أبواب خشب صلب مع الإكسسوارات والتركيب',
        specificationsEn: 'Solid wood doors with accessories and installation',
        priority: 'important'
      },
      {
        itemName: 'تركيب نوافذ ألمنيوم',
        itemNameEn: 'Aluminum Window Installation',
        quantity: 15,
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedPrice: 800,
        category: 'finishes',
        specifications: 'نوافذ ألمنيوم مع زجاج مزدوج',
        specificationsEn: 'Aluminum windows with double glazing',
        priority: 'important'
      },
      {
        itemName: 'أعمال تنسيق الحدائق',
        itemNameEn: 'Landscaping Works',
        quantity: 200,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 65,
        category: 'landscaping',
        specifications: 'تنسيق حدائق مع نظام ري وإنارة',
        specificationsEn: 'Landscaping with irrigation and lighting system',
        priority: 'optional'
      }
    ],
    paymentMilestones: [
      { name: 'دفعة التعاقد', nameEn: 'Contract Payment', percentage: '15' },
      { name: 'بداية الأعمال', nameEn: 'Work Commencement', percentage: '20' },
      { name: 'إنجاز الهيكل الإنشائي', nameEn: 'Structural Completion', percentage: '30' },
      { name: 'إنجاز التشطيبات', nameEn: 'Finishing Completion', percentage: '25' },
      { name: 'التسليم النهائي', nameEn: 'Final Handover', percentage: '10' }
    ],
    specialRequirements: [
      'تصاريح البناء من البلدية',
      'دراسة التربة',
      'التصميم المعماري والإنشائي',
      'أنظمة السلامة ومكافحة الحريق'
    ],
    specialRequirementsEn: [
      'Municipal building permits',
      'Soil study',
      'Architectural and structural design',
      'Safety and fire protection systems'
    ],
    tags: ['فيلا', 'سكني', 'متوسط', 'شامل'],
    tagsEn: ['villa', 'residential', 'medium', 'comprehensive'],
    isPopular: true,
    usageCount: 156,
    rating: 4.8,
    lastUpdated: new Date().toISOString()
  },

  // قالب مول تجاري
  {
    id: 'commercial_mall_template',
    nameAr: 'مركز تسوق تجاري (5000 م²)',
    nameEn: 'Commercial Shopping Mall (5000 m²)',
    category: 'commercial',
    categoryAr: 'مشاريع تجارية',
    categoryEn: 'Commercial Projects',
    descriptionAr: 'قالب متكامل لبناء مركز تسوق تجاري مع جميع المرافق والأنظمة المتقدمة',
    descriptionEn: 'Integrated template for building a commercial shopping mall with all facilities and advanced systems',
    complexity: 'complex',
    estimatedDuration: '18-24 شهر',
    estimatedDurationEn: '18-24 months',
    averageCostPerSqm: { min: 2500, max: 4000, average: 3200 },
    projectDetails: {
      projectType: 'commercial_mall',
      city: 'jeddah',
      profitMargin: '18',
      wastePercentage: '7'
    },
    boqItems: [
      {
        itemName: 'هيكل معدني رئيسي',
        itemNameEn: 'Main Steel Structure',
        quantity: 750,
        unit: 'طن',
        unitEn: 'ton',
        estimatedPrice: 4500,
        category: 'structure',
        specifications: 'هيكل معدني مجلفن مقاوم للحريق مع طلاء واقي',
        specificationsEn: 'Galvanized fire-resistant steel structure with protective coating',
        priority: 'essential'
      },
      {
        itemName: 'واجهات زجاجية متقدمة',
        itemNameEn: 'Advanced Glass Curtain Wall',
        quantity: 1500,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 450,
        category: 'facade',
        specifications: 'زجاج مزدوج عاكس للحرارة مع إطارات ألمنيوم',
        specificationsEn: 'Double glazed heat reflective glass with aluminum frames',
        priority: 'essential'
      },
      {
        itemName: 'نظام تكييف مركزي متطور',
        itemNameEn: 'Advanced Central HVAC System',
        quantity: 100,
        unit: 'طن تبريد',
        unitEn: 'cooling ton',
        estimatedPrice: 8500,
        category: 'hvac',
        specifications: 'نظام تكييف مركزي عالي الكفاءة مع تحكم ذكي',
        specificationsEn: 'High efficiency central HVAC system with smart control',
        priority: 'essential'
      },
      {
        itemName: 'سلالم متحركة',
        itemNameEn: 'Escalators',
        quantity: 6,
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedPrice: 85000,
        category: 'vertical_transport',
        specifications: 'سلالم متحركة بعرض 1.2 متر مع أنظمة أمان متقدمة',
        specificationsEn: '1.2m wide escalators with advanced safety systems',
        priority: 'essential'
      },
      {
        itemName: 'مصاعد كهربائية',
        itemNameEn: 'Electric Elevators',
        quantity: 4,
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedPrice: 120000,
        category: 'vertical_transport',
        specifications: 'مصاعد كهربائية حمولة 1000 كجم مع تحكم ذكي',
        specificationsEn: '1000kg capacity electric elevators with smart control',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة الإنارة المتخصصة',
        itemNameEn: 'Specialized Lighting Systems',
        quantity: 5000,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 85,
        category: 'electrical',
        specifications: 'إنارة LED ذكية مع تحكم في الإضاءة والألوان',
        specificationsEn: 'Smart LED lighting with brightness and color control',
        priority: 'important'
      },
      {
        itemName: 'أنظمة الأمن والمراقبة',
        itemNameEn: 'Security and Surveillance Systems',
        quantity: 1,
        unit: 'نظام متكامل',
        unitEn: 'integrated system',
        estimatedPrice: 250000,
        category: 'security',
        specifications: 'نظام مراقبة متكامل مع كاميرات عالية الدقة وأنظمة إنذار',
        specificationsEn: 'Integrated surveillance system with HD cameras and alarm systems',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة مكافحة الحريق',
        itemNameEn: 'Fire Protection Systems',
        quantity: 5000,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 65,
        category: 'fire_safety',
        specifications: 'نظام رشاشات أوتوماتيكي مع أنظمة إنذار وإخلاء',
        specificationsEn: 'Automatic sprinkler system with alarm and evacuation systems',
        priority: 'essential'
      },
      {
        itemName: 'مواقف سيارات متعددة الطوابق',
        itemNameEn: 'Multi-level Parking',
        quantity: 200,
        unit: 'موقف',
        unitEn: 'parking space',
        estimatedPrice: 8500,
        category: 'parking',
        specifications: 'مواقف سيارات مع أنظمة تهوية وإنارة',
        specificationsEn: 'Parking spaces with ventilation and lighting systems',
        priority: 'important'
      }
    ],
    paymentMilestones: [
      { name: 'دفعة التعاقد', nameEn: 'Contract Payment', percentage: '10' },
      { name: 'بداية الأعمال', nameEn: 'Work Commencement', percentage: '15' },
      { name: 'إنجاز الهيكل المعدني', nameEn: 'Steel Structure Completion', percentage: '25' },
      { name: 'إنجاز الواجهات', nameEn: 'Facade Completion', percentage: '20' },
      { name: 'إنجاز الأنظمة الميكانيكية', nameEn: 'MEP Systems Completion', percentage: '20' },
      { name: 'التسليم النهائي', nameEn: 'Final Handover', percentage: '10' }
    ],
    specialRequirements: [
      'تراخيص تجارية متخصصة',
      'دراسات مرورية وتأثير بيئي',
      'أنظمة إدارة المباني الذكية',
      'متطلبات السلامة التجارية المتقدمة'
    ],
    specialRequirementsEn: [
      'Specialized commercial licenses',
      'Traffic and environmental impact studies',
      'Smart building management systems',
      'Advanced commercial safety requirements'
    ],
    tags: ['مول', 'تجاري', 'معقد', 'متقدم'],
    tagsEn: ['mall', 'commercial', 'complex', 'advanced'],
    isPopular: true,
    usageCount: 89,
    rating: 4.9,
    lastUpdated: new Date().toISOString()
  },

  // قالب مصنع صناعي
  {
    id: 'industrial_factory_template',
    nameAr: 'مصنع صناعي متوسط (2000 م²)',
    nameEn: 'Medium Industrial Factory (2000 m²)',
    category: 'industrial',
    categoryAr: 'مشاريع صناعية',
    categoryEn: 'Industrial Projects',
    descriptionAr: 'قالب شامل لبناء مصنع صناعي مع جميع المتطلبات الصناعية والبيئية',
    descriptionEn: 'Comprehensive template for building an industrial factory with all industrial and environmental requirements',
    complexity: 'complex',
    estimatedDuration: '12-16 شهر',
    estimatedDurationEn: '12-16 months',
    averageCostPerSqm: { min: 1200, max: 2000, average: 1600 },
    projectDetails: {
      projectType: 'industrial_factory',
      city: 'jubail',
      profitMargin: '20',
      wastePercentage: '8'
    },
    boqItems: [
      {
        itemName: 'أرضيات صناعية مقاومة',
        itemNameEn: 'Industrial Resistant Flooring',
        quantity: 2000,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 120,
        category: 'flooring',
        specifications: 'أرضيات إيبوكسي مقاومة للأحمال الثقيلة والمواد الكيميائية',
        specificationsEn: 'Epoxy flooring resistant to heavy loads and chemicals',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة رافعات علوية',
        itemNameEn: 'Overhead Crane Systems',
        quantity: 2,
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedPrice: 180000,
        category: 'equipment',
        specifications: 'رافعات علوية حمولة 10 طن مع أنظمة تحكم متقدمة',
        specificationsEn: '10-ton overhead cranes with advanced control systems',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة تهوية صناعية',
        itemNameEn: 'Industrial Ventilation Systems',
        quantity: 2000,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 95,
        category: 'ventilation',
        specifications: 'أنظمة تهوية صناعية مع فلاتر متقدمة لتنقية الهواء',
        specificationsEn: 'Industrial ventilation systems with advanced air filtration',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة معالجة النفايات',
        itemNameEn: 'Waste Treatment Systems',
        quantity: 1,
        unit: 'نظام متكامل',
        unitEn: 'integrated system',
        estimatedPrice: 320000,
        category: 'environmental',
        specifications: 'نظام معالجة النفايات الصناعية والمياه العادمة',
        specificationsEn: 'Industrial waste and wastewater treatment system',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة السلامة الصناعية',
        itemNameEn: 'Industrial Safety Systems',
        quantity: 1,
        unit: 'نظام متكامل',
        unitEn: 'integrated system',
        estimatedPrice: 150000,
        category: 'safety',
        specifications: 'أنظمة إنذار وطوارئ صناعية مع معدات السلامة',
        specificationsEn: 'Industrial alarm and emergency systems with safety equipment',
        priority: 'essential'
      }
    ],
    paymentMilestones: [
      { name: 'دفعة التعاقد', nameEn: 'Contract Payment', percentage: '15' },
      { name: 'بداية الأعمال الإنشائية', nameEn: 'Construction Start', percentage: '20' },
      { name: 'إنجاز الهيكل الأساسي', nameEn: 'Basic Structure Completion', percentage: '25' },
      { name: 'تركيب المعدات الصناعية', nameEn: 'Industrial Equipment Installation', percentage: '25' },
      { name: 'التسليم والتشغيل التجريبي', nameEn: 'Handover and Trial Operation', percentage: '15' }
    ],
    specialRequirements: [
      'تراخيص صناعية وبيئية',
      'دراسات الأثر البيئي',
      'أنظمة السلامة الصناعية المتقدمة',
      'معايير الجودة الصناعية'
    ],
    specialRequirementsEn: [
      'Industrial and environmental licenses',
      'Environmental impact studies',
      'Advanced industrial safety systems',
      'Industrial quality standards'
    ],
    tags: ['مصنع', 'صناعي', 'بيئي', 'متخصص'],
    tagsEn: ['factory', 'industrial', 'environmental', 'specialized'],
    isPopular: false,
    usageCount: 34,
    rating: 4.6,
    lastUpdated: new Date().toISOString()
  },

  // قالب مستشفى
  {
    id: 'hospital_template',
    nameAr: 'مستشفى عام (3000 م²)',
    nameEn: 'General Hospital (3000 m²)',
    category: 'public',
    categoryAr: 'مشاريع عامة',
    categoryEn: 'Public Projects',
    descriptionAr: 'قالب متكامل لبناء مستشفى عام مع جميع المرافق الطبية والأنظمة المتخصصة',
    descriptionEn: 'Integrated template for building a general hospital with all medical facilities and specialized systems',
    complexity: 'complex',
    estimatedDuration: '20-30 شهر',
    estimatedDurationEn: '20-30 months',
    averageCostPerSqm: { min: 4000, max: 6500, average: 5200 },
    projectDetails: {
      projectType: 'public_hospital',
      city: 'riyadh',
      profitMargin: '12',
      wastePercentage: '6'
    },
    boqItems: [
      {
        itemName: 'غرف عمليات متخصصة',
        itemNameEn: 'Specialized Operating Rooms',
        quantity: 6,
        unit: 'غرفة',
        unitEn: 'room',
        estimatedPrice: 450000,
        category: 'medical',
        specifications: 'غرف عمليات مجهزة بأحدث التقنيات الطبية وأنظمة التعقيم',
        specificationsEn: 'Operating rooms equipped with latest medical technology and sterilization systems',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة الغازات الطبية',
        itemNameEn: 'Medical Gas Systems',
        quantity: 3000,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 180,
        category: 'medical',
        specifications: 'أنظمة توزيع الأوكسجين والغازات الطبية في جميع الأقسام',
        specificationsEn: 'Oxygen and medical gas distribution systems throughout all departments',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة التهوية الطبية',
        itemNameEn: 'Medical Ventilation Systems',
        quantity: 3000,
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedPrice: 220,
        category: 'hvac',
        specifications: 'أنظمة تهوية متخصصة للمناطق المعقمة والعزل',
        specificationsEn: 'Specialized ventilation systems for sterile and isolation areas',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة معالجة النفايات الطبية',
        itemNameEn: 'Medical Waste Treatment Systems',
        quantity: 1,
        unit: 'نظام متكامل',
        unitEn: 'integrated system',
        estimatedPrice: 280000,
        category: 'medical',
        specifications: 'نظام معالجة وتدمير النفايات الطبية الخطرة',
        specificationsEn: 'Hazardous medical waste treatment and disposal system',
        priority: 'essential'
      },
      {
        itemName: 'مصاعد طبية متخصصة',
        itemNameEn: 'Specialized Medical Elevators',
        quantity: 4,
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedPrice: 150000,
        category: 'vertical_transport',
        specifications: 'مصاعد طبية مجهزة لنقل المرضى والمعدات الطبية',
        specificationsEn: 'Medical elevators equipped for patient and medical equipment transport',
        priority: 'essential'
      }
    ],
    paymentMilestones: [
      { name: 'دفعة التعاقد', nameEn: 'Contract Payment', percentage: '10' },
      { name: 'بداية الأعمال الإنشائية', nameEn: 'Construction Start', percentage: '15' },
      { name: 'إنجاز الهيكل الأساسي', nameEn: 'Basic Structure Completion', percentage: '20' },
      { name: 'تركيب الأنظمة الطبية', nameEn: 'Medical Systems Installation', percentage: '25' },
      { name: 'التشطيبات الطبية', nameEn: 'Medical Finishes', percentage: '20' },
      { name: 'التسليم والتشغيل التجريبي', nameEn: 'Handover and Trial Operation', percentage: '10' }
    ],
    specialRequirements: [
      'تراخيص طبية متخصصة',
      'معايير الجودة الطبية الدولية',
      'أنظمة الطوارئ الطبية',
      'متطلبات العزل والتعقيم'
    ],
    specialRequirementsEn: [
      'Specialized medical licenses',
      'International medical quality standards',
      'Medical emergency systems',
      'Isolation and sterilization requirements'
    ],
    tags: ['مستشفى', 'طبي', 'متخصص', 'معقد'],
    tagsEn: ['hospital', 'medical', 'specialized', 'complex'],
    isPopular: false,
    usageCount: 23,
    rating: 4.7,
    lastUpdated: new Date().toISOString()
  },

  // قالب محطة طاقة شمسية
  {
    id: 'solar_power_template',
    nameAr: 'محطة طاقة شمسية (1 ميجاواط)',
    nameEn: 'Solar Power Plant (1 MW)',
    category: 'renewable_energy',
    categoryAr: 'مشاريع الطاقة المتجددة',
    categoryEn: 'Renewable Energy Projects',
    descriptionAr: 'قالب متكامل لإنشاء محطة طاقة شمسية مع جميع المكونات والأنظمة المطلوبة',
    descriptionEn: 'Integrated template for building a solar power plant with all required components and systems',
    complexity: 'complex',
    estimatedDuration: '8-12 شهر',
    estimatedDurationEn: '8-12 months',
    averageCostPerSqm: { min: 150, max: 300, average: 225 },
    projectDetails: {
      projectType: 'renewable_solar',
      city: 'tabuk',
      profitMargin: '18',
      wastePercentage: '4'
    },
    boqItems: [
      {
        itemName: 'ألواح شمسية عالية الكفاءة',
        itemNameEn: 'High Efficiency Solar Panels',
        quantity: 3000,
        unit: 'لوح',
        unitEn: 'panel',
        estimatedPrice: 850,
        category: 'solar',
        specifications: 'ألواح شمسية أحادية البلورة بكفاءة 22% وضمان 25 سنة',
        specificationsEn: 'Monocrystalline solar panels with 22% efficiency and 25-year warranty',
        priority: 'essential'
      },
      {
        itemName: 'محولات طاقة ذكية',
        itemNameEn: 'Smart Power Inverters',
        quantity: 20,
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedPrice: 25000,
        category: 'electrical',
        specifications: 'محولات طاقة ذكية مع أنظمة مراقبة ومتابعة عن بعد',
        specificationsEn: 'Smart power inverters with remote monitoring and tracking systems',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة تتبع الشمس',
        itemNameEn: 'Solar Tracking Systems',
        quantity: 100,
        unit: 'نظام',
        unitEn: 'system',
        estimatedPrice: 15000,
        category: 'mechanical',
        specifications: 'أنظمة تتبع شمسي أحادية المحور لزيادة الكفاءة',
        specificationsEn: 'Single-axis solar tracking systems for increased efficiency',
        priority: 'important'
      },
      {
        itemName: 'شبكة التوصيل الكهربائي',
        itemNameEn: 'Electrical Connection Network',
        quantity: 1,
        unit: 'نظام متكامل',
        unitEn: 'integrated system',
        estimatedPrice: 180000,
        category: 'electrical',
        specifications: 'شبكة توصيل كهربائي مع محطة تحويل للربط بالشبكة العامة',
        specificationsEn: 'Electrical connection network with transformer station for grid connection',
        priority: 'essential'
      },
      {
        itemName: 'أنظمة المراقبة والتحكم',
        itemNameEn: 'Monitoring and Control Systems',
        quantity: 1,
        unit: 'نظام متكامل',
        unitEn: 'integrated system',
        estimatedPrice: 120000,
        category: 'control',
        specifications: 'أنظمة مراقبة ذكية مع تحكم عن بعد وتحليل البيانات',
        specificationsEn: 'Smart monitoring systems with remote control and data analytics',
        priority: 'important'
      }
    ],
    paymentMilestones: [
      { name: 'دفعة التعاقد', nameEn: 'Contract Payment', percentage: '15' },
      { name: 'بداية أعمال التركيب', nameEn: 'Installation Start', percentage: '20' },
      { name: 'تركيب الألواح الشمسية', nameEn: 'Solar Panel Installation', percentage: '30' },
      { name: 'تركيب الأنظمة الكهربائية', nameEn: 'Electrical Systems Installation', percentage: '25' },
      { name: 'التشغيل التجريبي والتسليم', nameEn: 'Trial Operation and Handover', percentage: '10' }
    ],
    specialRequirements: [
      'تراخيص الطاقة المتجددة',
      'دراسات الإشعاع الشمسي',
      'اتفاقيات الربط بالشبكة',
      'معايير السلامة الكهربائية'
    ],
    specialRequirementsEn: [
      'Renewable energy licenses',
      'Solar radiation studies',
      'Grid connection agreements',
      'Electrical safety standards'
    ],
    tags: ['طاقة شمسية', 'متجددة', 'بيئي', 'تقني'],
    tagsEn: ['solar energy', 'renewable', 'environmental', 'technical'],
    isPopular: true,
    usageCount: 67,
    rating: 4.8,
    lastUpdated: new Date().toISOString()
  }
];

// دالة للحصول على القوالب حسب الفئة
export function getTemplatesByCategory(category: string): ProjectTemplate[] {
  return smartProjectTemplates.filter(template => template.category === category);
}

// دالة البحث في القوالب
export function searchTemplates(query: string, lang: 'ar' | 'en' = 'ar'): ProjectTemplate[] {
  const searchTerm = query.toLowerCase();
  return smartProjectTemplates.filter(template => {
    const name = lang === 'ar' ? template.nameAr : template.nameEn;
    const description = lang === 'ar' ? template.descriptionAr : template.descriptionEn;
    const tags = lang === 'ar' ? template.tags : template.tagsEn;
    
    return name.toLowerCase().includes(searchTerm) ||
           description.toLowerCase().includes(searchTerm) ||
           tags.some(tag => tag.toLowerCase().includes(searchTerm));
  });
}

// دالة للحصول على القوالب الشائعة
export function getPopularTemplates(): ProjectTemplate[] {
  return smartProjectTemplates
    .filter(template => template.isPopular)
    .sort((a, b) => b.usageCount - a.usageCount);
}

// دالة للحصول على القوالب الأعلى تقييماً
export function getTopRatedTemplates(): ProjectTemplate[] {
  return smartProjectTemplates
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
}

// دالة لتحديث إحصائيات استخدام القالب
export function updateTemplateUsage(templateId: string): void {
  const template = smartProjectTemplates.find(t => t.id === templateId);
  if (template) {
    template.usageCount++;
    template.lastUpdated = new Date().toISOString();
  }
}