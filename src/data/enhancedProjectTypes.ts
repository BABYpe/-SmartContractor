// قاعدة بيانات شاملة لأنواع المشاريع مع البنود المرتبطة
export interface ProjectType {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  categoryAr: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  complexity: 'simple' | 'medium' | 'complex' | 'mega';
  estimatedDuration: string;
  estimatedDurationEn: string;
  averageCostPerSqm: {
    min: number;
    max: number;
    average: number;
  };
  requiredBoqItems: string[];
  specialRequirements: string[];
  specialRequirementsEn: string[];
  isActive: boolean;
  icon: string;
  tags: string[];
  tagsEn: string[];
}

export interface ProjectBoqTemplate {
  projectTypeId: string;
  items: Array<{
    itemName: string;
    itemNameEn: string;
    category: string;
    unit: string;
    unitEn: string;
    estimatedQuantityPerSqm: number;
    priority: 'essential' | 'important' | 'optional';
    specifications: string;
    specificationsEn: string;
    laborHours: number;
    equipmentRequired: string[];
  }>;
}

// أنواع المشاريع الشاملة
export const enhancedProjectTypes: ProjectType[] = [
  // 1. مشاريع البناء السكني
  {
    id: 'residential_villa',
    nameAr: 'فلل ومنازل خاصة',
    nameEn: 'Private Villas & Houses',
    category: 'residential',
    categoryAr: 'مشاريع البناء السكني',
    categoryEn: 'Residential Construction Projects',
    description: 'بناء فلل ومنازل خاصة للأفراد والعائلات',
    descriptionEn: 'Construction of private villas and houses for individuals and families',
    complexity: 'medium',
    estimatedDuration: '8-12 شهر',
    estimatedDurationEn: '8-12 months',
    averageCostPerSqm: { min: 1200, max: 2500, average: 1800 },
    requiredBoqItems: ['excavation', 'concrete', 'steel', 'masonry', 'tiles', 'paint', 'electrical', 'plumbing'],
    specialRequirements: ['تصاريح البناء', 'دراسة التربة', 'التصميم المعماري', 'أنظمة السلامة'],
    specialRequirementsEn: ['Building permits', 'Soil study', 'Architectural design', 'Safety systems'],
    isActive: true,
    icon: 'home',
    tags: ['سكني', 'فلل', 'منازل', 'خاص'],
    tagsEn: ['residential', 'villas', 'houses', 'private']
  },
  {
    id: 'residential_compound',
    nameAr: 'مجمعات سكنية',
    nameEn: 'Residential Compounds',
    category: 'residential',
    categoryAr: 'مشاريع البناء السكني',
    categoryEn: 'Residential Construction Projects',
    description: 'تطوير مجمعات سكنية متكاملة مع مرافق مشتركة',
    descriptionEn: 'Development of integrated residential compounds with shared facilities',
    complexity: 'complex',
    estimatedDuration: '18-24 شهر',
    estimatedDurationEn: '18-24 months',
    averageCostPerSqm: { min: 1000, max: 2000, average: 1500 },
    requiredBoqItems: ['excavation', 'concrete', 'steel', 'masonry', 'infrastructure', 'landscaping'],
    specialRequirements: ['تخطيط حضري', 'بنية تحتية مشتركة', 'مرافق ترفيهية', 'أنظمة أمن'],
    specialRequirementsEn: ['Urban planning', 'Shared infrastructure', 'Recreational facilities', 'Security systems'],
    isActive: true,
    icon: 'building',
    tags: ['سكني', 'مجمعات', 'مشترك'],
    tagsEn: ['residential', 'compounds', 'shared']
  },
  {
    id: 'residential_apartments',
    nameAr: 'عمارات سكنية (شقق)',
    nameEn: 'Apartment Buildings',
    category: 'residential',
    categoryAr: 'مشاريع البناء السكني',
    categoryEn: 'Residential Construction Projects',
    description: 'بناء عمارات سكنية متعددة الطوابق',
    descriptionEn: 'Construction of multi-story residential apartment buildings',
    complexity: 'medium',
    estimatedDuration: '12-18 شهر',
    estimatedDurationEn: '12-18 months',
    averageCostPerSqm: { min: 800, max: 1500, average: 1200 },
    requiredBoqItems: ['excavation', 'concrete', 'steel', 'masonry', 'elevators', 'fire_safety'],
    specialRequirements: ['مصاعد', 'أنظمة إطفاء', 'مواقف سيارات', 'مولدات كهرباء'],
    specialRequirementsEn: ['Elevators', 'Fire systems', 'Parking', 'Generators'],
    isActive: true,
    icon: 'building-2',
    tags: ['سكني', 'شقق', 'عمارات'],
    tagsEn: ['residential', 'apartments', 'buildings']
  },

  // 2. مشاريع البناء التجاري
  {
    id: 'commercial_mall',
    nameAr: 'مراكز تسوق ومولات',
    nameEn: 'Shopping Malls & Retail Centers',
    category: 'commercial',
    categoryAr: 'مشاريع البناء التجاري',
    categoryEn: 'Commercial Construction Projects',
    description: 'بناء مراكز تسوق ومولات تجارية',
    descriptionEn: 'Construction of shopping malls and retail centers',
    complexity: 'complex',
    estimatedDuration: '24-36 شهر',
    estimatedDurationEn: '24-36 months',
    averageCostPerSqm: { min: 2000, max: 4000, average: 3000 },
    requiredBoqItems: ['steel_structure', 'glass_facade', 'hvac', 'escalators', 'specialized_lighting'],
    specialRequirements: ['تكييف مركزي', 'سلالم متحركة', 'أنظمة إنذار', 'مواقف متعددة الطوابق'],
    specialRequirementsEn: ['Central HVAC', 'Escalators', 'Alarm systems', 'Multi-level parking'],
    isActive: true,
    icon: 'shopping-bag',
    tags: ['تجاري', 'مولات', 'تسوق'],
    tagsEn: ['commercial', 'malls', 'shopping']
  },
  {
    id: 'commercial_office',
    nameAr: 'مباني المكاتب والأبراج الإدارية',
    nameEn: 'Office Buildings & Administrative Towers',
    category: 'commercial',
    categoryAr: 'مشاريع البناء التجاري',
    categoryEn: 'Commercial Construction Projects',
    description: 'بناء مباني مكاتب وأبراج إدارية',
    descriptionEn: 'Construction of office buildings and administrative towers',
    complexity: 'complex',
    estimatedDuration: '18-30 شهر',
    estimatedDurationEn: '18-30 months',
    averageCostPerSqm: { min: 1800, max: 3500, average: 2500 },
    requiredBoqItems: ['steel_structure', 'curtain_wall', 'high_speed_elevators', 'smart_systems'],
    specialRequirements: ['مصاعد عالية السرعة', 'واجهات زجاجية', 'أنظمة ذكية', 'شبكات اتصالات متقدمة'],
    specialRequirementsEn: ['High-speed elevators', 'Glass facades', 'Smart systems', 'Advanced communication networks'],
    isActive: true,
    icon: 'building-2',
    tags: ['تجاري', 'مكاتب', 'أبراج'],
    tagsEn: ['commercial', 'offices', 'towers']
  },
  {
    id: 'commercial_hotel',
    nameAr: 'فنادق ومنتجعات',
    nameEn: 'Hotels & Resorts',
    category: 'commercial',
    categoryAr: 'مشاريع البناء التجاري',
    categoryEn: 'Commercial Construction Projects',
    description: 'بناء فنادق ومنتجعات سياحية',
    descriptionEn: 'Construction of hotels and tourist resorts',
    complexity: 'complex',
    estimatedDuration: '20-36 شهر',
    estimatedDurationEn: '20-36 months',
    averageCostPerSqm: { min: 2500, max: 5000, average: 3500 },
    requiredBoqItems: ['luxury_finishes', 'kitchen_equipment', 'pool_systems', 'spa_facilities'],
    specialRequirements: ['تشطيبات فاخرة', 'مطابخ تجارية', 'مسابح', 'مرافق سبا', 'أنظمة إدارة فندقية'],
    specialRequirementsEn: ['Luxury finishes', 'Commercial kitchens', 'Swimming pools', 'Spa facilities', 'Hotel management systems'],
    isActive: true,
    icon: 'bed',
    tags: ['فنادق', 'منتجعات', 'سياحة'],
    tagsEn: ['hotels', 'resorts', 'tourism']
  },

  // 3. مشاريع البناء الصناعي
  {
    id: 'industrial_factory',
    nameAr: 'مصانع وورش عمل',
    nameEn: 'Factories & Workshops',
    category: 'industrial',
    categoryAr: 'مشاريع البناء الصناعي',
    categoryEn: 'Industrial Construction Projects',
    description: 'بناء مصانع ووحدات إنتاج صناعية',
    descriptionEn: 'Construction of factories and industrial production units',
    complexity: 'complex',
    estimatedDuration: '12-24 شهر',
    estimatedDurationEn: '12-24 months',
    averageCostPerSqm: { min: 800, max: 2000, average: 1400 },
    requiredBoqItems: ['steel_structure', 'industrial_flooring', 'crane_systems', 'ventilation'],
    specialRequirements: ['أرضيات صناعية', 'أنظمة رافعات', 'تهوية صناعية', 'معالجة نفايات'],
    specialRequirementsEn: ['Industrial flooring', 'Crane systems', 'Industrial ventilation', 'Waste treatment'],
    isActive: true,
    icon: 'factory',
    tags: ['صناعي', 'مصانع', 'إنتاج'],
    tagsEn: ['industrial', 'factories', 'production']
  },
  {
    id: 'industrial_warehouse',
    nameAr: 'مخازن ومستودعات',
    nameEn: 'Warehouses & Storage Facilities',
    category: 'industrial',
    categoryAr: 'مشاريع البناء الصناعي',
    categoryEn: 'Industrial Construction Projects',
    description: 'بناء مخازن ومستودعات للتخزين',
    descriptionEn: 'Construction of warehouses and storage facilities',
    complexity: 'medium',
    estimatedDuration: '8-15 شهر',
    estimatedDurationEn: '8-15 months',
    averageCostPerSqm: { min: 600, max: 1200, average: 900 },
    requiredBoqItems: ['steel_structure', 'loading_docks', 'storage_systems', 'security_systems'],
    specialRequirements: ['أرصفة تحميل', 'أنظمة تخزين', 'أنظمة أمان', 'مكافحة حريق'],
    specialRequirementsEn: ['Loading docks', 'Storage systems', 'Security systems', 'Fire protection'],
    isActive: true,
    icon: 'warehouse',
    tags: ['مخازن', 'تخزين', 'لوجستي'],
    tagsEn: ['warehouses', 'storage', 'logistics']
  },

  // 4. مشاريع البنية التحتية
  {
    id: 'infrastructure_roads',
    nameAr: 'الطرق والجسور والأنفاق',
    nameEn: 'Roads, Bridges & Tunnels',
    category: 'infrastructure',
    categoryAr: 'مشاريع البنية التحتية',
    categoryEn: 'Infrastructure Projects',
    description: 'إنشاء وتطوير شبكات الطرق والجسور والأنفاق',
    descriptionEn: 'Construction and development of road networks, bridges and tunnels',
    complexity: 'complex',
    estimatedDuration: '12-48 شهر',
    estimatedDurationEn: '12-48 months',
    averageCostPerSqm: { min: 200, max: 800, average: 500 },
    requiredBoqItems: ['asphalt', 'concrete_barriers', 'lighting_systems', 'drainage'],
    specialRequirements: ['دراسات مرورية', 'أنظمة صرف', 'إنارة طرق', 'علامات مرورية'],
    specialRequirementsEn: ['Traffic studies', 'Drainage systems', 'Road lighting', 'Traffic signs'],
    isActive: true,
    icon: 'route',
    tags: ['طرق', 'جسور', 'أنفاق', 'بنية تحتية'],
    tagsEn: ['roads', 'bridges', 'tunnels', 'infrastructure']
  },
  {
    id: 'infrastructure_utilities',
    nameAr: 'شبكات المياه والصرف الصحي',
    nameEn: 'Water & Wastewater Networks',
    category: 'infrastructure',
    categoryAr: 'مشاريع البنية التحتية',
    categoryEn: 'Infrastructure Projects',
    description: 'إنشاء شبكات المياه والصرف الصحي',
    descriptionEn: 'Construction of water and wastewater networks',
    complexity: 'complex',
    estimatedDuration: '18-36 شهر',
    estimatedDurationEn: '18-36 months',
    averageCostPerSqm: { min: 150, max: 500, average: 300 },
    requiredBoqItems: ['pipes', 'pumping_stations', 'treatment_plants', 'manholes'],
    specialRequirements: ['محطات ضخ', 'محطات معالجة', 'خزانات مياه', 'أنظمة تحكم'],
    specialRequirementsEn: ['Pumping stations', 'Treatment plants', 'Water tanks', 'Control systems'],
    isActive: true,
    icon: 'droplets',
    tags: ['مياه', 'صرف صحي', 'شبكات'],
    tagsEn: ['water', 'wastewater', 'networks']
  },

  // 5. مشاريع المباني العامة
  {
    id: 'public_hospital',
    nameAr: 'مستشفيات ومراكز صحية',
    nameEn: 'Hospitals & Health Centers',
    category: 'public',
    categoryAr: 'مشاريع المباني العامة',
    categoryEn: 'Public Building Projects',
    description: 'بناء مستشفيات ومراكز رعاية صحية',
    descriptionEn: 'Construction of hospitals and healthcare centers',
    complexity: 'complex',
    estimatedDuration: '24-48 شهر',
    estimatedDurationEn: '24-48 months',
    averageCostPerSqm: { min: 3000, max: 6000, average: 4500 },
    requiredBoqItems: ['medical_equipment', 'specialized_hvac', 'medical_gases', 'isolation_systems'],
    specialRequirements: ['غرف عمليات', 'أنظمة غازات طبية', 'عزل طبي', 'أنظمة طوارئ'],
    specialRequirementsEn: ['Operating rooms', 'Medical gas systems', 'Medical isolation', 'Emergency systems'],
    isActive: true,
    icon: 'hospital',
    tags: ['مستشفيات', 'صحة', 'طبي'],
    tagsEn: ['hospitals', 'health', 'medical']
  },
  {
    id: 'public_school',
    nameAr: 'مدارس وجامعات',
    nameEn: 'Schools & Universities',
    category: 'public',
    categoryAr: 'مشاريع المباني العامة',
    categoryEn: 'Public Building Projects',
    description: 'بناء مؤسسات تعليمية ومدارس وجامعات',
    descriptionEn: 'Construction of educational institutions, schools and universities',
    complexity: 'medium',
    estimatedDuration: '12-24 شهر',
    estimatedDurationEn: '12-24 months',
    averageCostPerSqm: { min: 1500, max: 3000, average: 2200 },
    requiredBoqItems: ['classrooms', 'laboratories', 'sports_facilities', 'libraries'],
    specialRequirements: ['مختبرات', 'مكتبات', 'ملاعب رياضية', 'قاعات متعددة الأغراض'],
    specialRequirementsEn: ['Laboratories', 'Libraries', 'Sports facilities', 'Multi-purpose halls'],
    isActive: true,
    icon: 'graduation-cap',
    tags: ['تعليم', 'مدارس', 'جامعات'],
    tagsEn: ['education', 'schools', 'universities']
  },

  // 6. مشاريع الطاقة المتجددة
  {
    id: 'renewable_solar',
    nameAr: 'محطات الطاقة الشمسية',
    nameEn: 'Solar Power Plants',
    category: 'renewable_energy',
    categoryAr: 'مشاريع الطاقة المتجددة',
    categoryEn: 'Renewable Energy Projects',
    description: 'إنشاء محطات توليد الطاقة الشمسية',
    descriptionEn: 'Construction of solar power generation plants',
    complexity: 'complex',
    estimatedDuration: '12-24 شهر',
    estimatedDurationEn: '12-24 months',
    averageCostPerSqm: { min: 100, max: 300, average: 200 },
    requiredBoqItems: ['solar_panels', 'inverters', 'mounting_systems', 'electrical_infrastructure'],
    specialRequirements: ['ألواح شمسية', 'محولات', 'أنظمة تتبع', 'شبكات كهربائية'],
    specialRequirementsEn: ['Solar panels', 'Inverters', 'Tracking systems', 'Electrical networks'],
    isActive: true,
    icon: 'sun',
    tags: ['طاقة شمسية', 'متجددة', 'بيئة'],
    tagsEn: ['solar energy', 'renewable', 'environment']
  },

  // 7. المشاريع الضخمة (رؤية 2030)
  {
    id: 'mega_neom',
    nameAr: 'مشاريع نيوم (ذا لاين، أوكساجون، تروجينا)',
    nameEn: 'NEOM Projects (The Line, Oxagon, Trojena)',
    category: 'mega_projects',
    categoryAr: 'المشاريع الضخمة',
    categoryEn: 'Mega Projects',
    description: 'مشاريع المدن المستقبلية في نيوم',
    descriptionEn: 'Future city projects in NEOM',
    complexity: 'mega',
    estimatedDuration: '10-20 سنة',
    estimatedDurationEn: '10-20 years',
    averageCostPerSqm: { min: 5000, max: 15000, average: 10000 },
    requiredBoqItems: ['smart_infrastructure', 'sustainable_materials', 'advanced_technology', 'environmental_systems'],
    specialRequirements: ['تقنيات مستقبلية', 'مواد مستدامة', 'أنظمة ذكية', 'حلول بيئية متقدمة'],
    specialRequirementsEn: ['Future technologies', 'Sustainable materials', 'Smart systems', 'Advanced environmental solutions'],
    isActive: true,
    icon: 'zap',
    tags: ['نيوم', 'مستقبلي', 'ذكي', 'مستدام'],
    tagsEn: ['neom', 'futuristic', 'smart', 'sustainable']
  },
  {
    id: 'mega_red_sea',
    nameAr: 'مشروع البحر الأحمر',
    nameEn: 'The Red Sea Project',
    category: 'mega_projects',
    categoryAr: 'المشاريع الضخمة',
    categoryEn: 'Mega Projects',
    description: 'مشروع سياحي فاخر على ساحل البحر الأحمر',
    descriptionEn: 'Luxury tourism project on the Red Sea coast',
    complexity: 'mega',
    estimatedDuration: '8-15 سنة',
    estimatedDurationEn: '8-15 years',
    averageCostPerSqm: { min: 4000, max: 12000, average: 8000 },
    requiredBoqItems: ['marine_construction', 'luxury_resorts', 'environmental_protection', 'renewable_energy'],
    specialRequirements: ['بناء بحري', 'منتجعات فاخرة', 'حماية بيئية', 'طاقة متجددة'],
    specialRequirementsEn: ['Marine construction', 'Luxury resorts', 'Environmental protection', 'Renewable energy'],
    isActive: true,
    icon: 'waves',
    tags: ['البحر الأحمر', 'سياحة', 'فاخر', 'بحري'],
    tagsEn: ['red sea', 'tourism', 'luxury', 'marine']
  },
  {
    id: 'mega_qiddiya',
    nameAr: 'مشروع القدية',
    nameEn: 'Qiddiya Project',
    category: 'mega_projects',
    categoryAr: 'المشاريع الضخمة',
    categoryEn: 'Mega Projects',
    description: 'مدينة ترفيهية ورياضية متكاملة',
    descriptionEn: 'Integrated entertainment and sports city',
    complexity: 'mega',
    estimatedDuration: '10-15 سنة',
    estimatedDurationEn: '10-15 years',
    averageCostPerSqm: { min: 3000, max: 8000, average: 5500 },
    requiredBoqItems: ['entertainment_facilities', 'sports_venues', 'theme_parks', 'hospitality'],
    specialRequirements: ['مرافق ترفيهية', 'ملاعب رياضية', 'مدن ملاهي', 'فنادق ومطاعم'],
    specialRequirementsEn: ['Entertainment facilities', 'Sports venues', 'Theme parks', 'Hotels and restaurants'],
    isActive: true,
    icon: 'gamepad-2',
    tags: ['القدية', 'ترفيه', 'رياضة', 'ملاهي'],
    tagsEn: ['qiddiya', 'entertainment', 'sports', 'theme parks']
  }
];

// قوالب بنود الأعمال لكل نوع مشروع
export const projectBoqTemplates: ProjectBoqTemplate[] = [
  {
    projectTypeId: 'residential_villa',
    items: [
      {
        itemName: 'أعمال الحفر والردم',
        itemNameEn: 'Excavation and Backfill',
        category: 'earthworks',
        unit: 'متر مكعب',
        unitEn: 'cubic meter',
        estimatedQuantityPerSqm: 0.8,
        priority: 'essential',
        specifications: 'حفر أساسات بعمق 1.5 متر في تربة عادية',
        specificationsEn: 'Foundation excavation 1.5m deep in normal soil',
        laborHours: 2,
        equipmentRequired: ['excavator', 'dump_truck']
      },
      {
        itemName: 'خرسانة مسلحة للأساسات',
        itemNameEn: 'Reinforced Concrete for Foundations',
        category: 'concrete',
        unit: 'متر مكعب',
        unitEn: 'cubic meter',
        estimatedQuantityPerSqm: 0.3,
        priority: 'essential',
        specifications: 'خرسانة مقاومة 25 ميجاباسكال مع حديد تسليح',
        specificationsEn: '25 MPa concrete with reinforcement steel',
        laborHours: 4,
        equipmentRequired: ['concrete_mixer', 'pump']
      },
      {
        itemName: 'بناء جدران بلوك أسمنتي',
        itemNameEn: 'Concrete Block Masonry',
        category: 'masonry',
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedQuantityPerSqm: 2.5,
        priority: 'essential',
        specifications: 'بلوك أسمنتي مقاس 20×20×40 سم',
        specificationsEn: 'Concrete blocks 20×20×40 cm',
        laborHours: 1.5,
        equipmentRequired: ['crane', 'mixer']
      },
      {
        itemName: 'تركيب بلاط أرضيات',
        itemNameEn: 'Floor Tile Installation',
        category: 'finishes',
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedQuantityPerSqm: 1.0,
        priority: 'important',
        specifications: 'بلاط بورسلين 60×60 سم درجة أولى',
        specificationsEn: 'First grade porcelain tiles 60×60 cm',
        laborHours: 1.2,
        equipmentRequired: ['tile_cutter', 'mixer']
      },
      {
        itemName: 'أعمال دهان داخلي',
        itemNameEn: 'Interior Painting',
        category: 'finishes',
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedQuantityPerSqm: 3.0,
        priority: 'important',
        specifications: 'دهان أكريليك عالي الجودة 3 طبقات',
        specificationsEn: 'High quality acrylic paint 3 coats',
        laborHours: 0.5,
        equipmentRequired: ['spray_gun', 'scaffolding']
      },
      {
        itemName: 'تمديدات كهربائية',
        itemNameEn: 'Electrical Installation',
        category: 'electrical',
        unit: 'نقطة',
        unitEn: 'point',
        estimatedQuantityPerSqm: 0.8,
        priority: 'essential',
        specifications: 'نقاط إنارة ومقابس شاملة الكابلات',
        specificationsEn: 'Lighting and socket points including cables',
        laborHours: 1.0,
        equipmentRequired: ['cable_puller', 'tester']
      },
      {
        itemName: 'تمديدات سباكة',
        itemNameEn: 'Plumbing Installation',
        category: 'plumbing',
        unit: 'متر طولي',
        unitEn: 'linear meter',
        estimatedQuantityPerSqm: 2.0,
        priority: 'essential',
        specifications: 'أنابيب PPR للمياه الباردة والساخنة',
        specificationsEn: 'PPR pipes for hot and cold water',
        laborHours: 0.8,
        equipmentRequired: ['welding_machine', 'pipe_cutter']
      }
    ]
  },
  {
    projectTypeId: 'commercial_mall',
    items: [
      {
        itemName: 'هيكل معدني',
        itemNameEn: 'Steel Structure',
        category: 'structure',
        unit: 'طن',
        unitEn: 'ton',
        estimatedQuantityPerSqm: 0.15,
        priority: 'essential',
        specifications: 'هيكل معدني مجلفن مقاوم للحريق',
        specificationsEn: 'Galvanized fire-resistant steel structure',
        laborHours: 8,
        equipmentRequired: ['crane', 'welding_equipment']
      },
      {
        itemName: 'واجهات زجاجية',
        itemNameEn: 'Glass Curtain Wall',
        category: 'facade',
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedQuantityPerSqm: 0.3,
        priority: 'essential',
        specifications: 'زجاج مزدوج عاكس للحرارة',
        specificationsEn: 'Double glazed heat reflective glass',
        laborHours: 2.5,
        equipmentRequired: ['crane', 'glass_sucker']
      },
      {
        itemName: 'نظام تكييف مركزي',
        itemNameEn: 'Central HVAC System',
        category: 'hvac',
        unit: 'طن تبريد',
        unitEn: 'cooling ton',
        estimatedQuantityPerSqm: 0.02,
        priority: 'essential',
        specifications: 'نظام تكييف مركزي عالي الكفاءة',
        specificationsEn: 'High efficiency central HVAC system',
        laborHours: 12,
        equipmentRequired: ['crane', 'specialized_tools']
      },
      {
        itemName: 'سلالم متحركة',
        itemNameEn: 'Escalators',
        category: 'vertical_transport',
        unit: 'وحدة',
        unitEn: 'unit',
        estimatedQuantityPerSqm: 0.001,
        priority: 'important',
        specifications: 'سلالم متحركة بعرض 1.2 متر',
        specificationsEn: '1.2m wide escalators',
        laborHours: 40,
        equipmentRequired: ['crane', 'specialized_installation']
      }
    ]
  },
  {
    projectTypeId: 'infrastructure_roads',
    items: [
      {
        itemName: 'تسوية وتمهيد الطريق',
        itemNameEn: 'Road Grading and Preparation',
        category: 'earthworks',
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedQuantityPerSqm: 1.0,
        priority: 'essential',
        specifications: 'تسوية وضغط التربة حسب المواصفات',
        specificationsEn: 'Soil grading and compaction per specifications',
        laborHours: 0.2,
        equipmentRequired: ['grader', 'compactor']
      },
      {
        itemName: 'طبقة الأساس الحصوي',
        itemNameEn: 'Granular Base Course',
        category: 'pavement',
        unit: 'متر مكعب',
        unitEn: 'cubic meter',
        estimatedQuantityPerSqm: 0.3,
        priority: 'essential',
        specifications: 'طبقة أساس حصوي مدرج سماكة 30 سم',
        specificationsEn: 'Graded granular base course 30cm thick',
        laborHours: 0.3,
        equipmentRequired: ['paver', 'compactor']
      },
      {
        itemName: 'طبقة الأسفلت',
        itemNameEn: 'Asphalt Layer',
        category: 'pavement',
        unit: 'متر مربع',
        unitEn: 'square meter',
        estimatedQuantityPerSqm: 1.0,
        priority: 'essential',
        specifications: 'أسفلت ساخن سماكة 7 سم',
        specificationsEn: 'Hot mix asphalt 7cm thick',
        laborHours: 0.4,
        equipmentRequired: ['paver', 'roller']
      },
      {
        itemName: 'إنارة الطرق',
        itemNameEn: 'Street Lighting',
        category: 'lighting',
        unit: 'عمود',
        unitEn: 'pole',
        estimatedQuantityPerSqm: 0.01,
        priority: 'important',
        specifications: 'أعمدة إنارة LED بارتفاع 12 متر',
        specificationsEn: '12m high LED street lighting poles',
        laborHours: 4,
        equipmentRequired: ['crane', 'electrical_tools']
      }
    ]
  }
];

// فئات المشاريع
export const projectCategories = {
  residential: {
    nameAr: 'مشاريع البناء السكني',
    nameEn: 'Residential Construction Projects',
    icon: 'home',
    color: 'blue'
  },
  commercial: {
    nameAr: 'مشاريع البناء التجاري',
    nameEn: 'Commercial Construction Projects',
    icon: 'building',
    color: 'green'
  },
  industrial: {
    nameAr: 'مشاريع البناء الصناعي',
    nameEn: 'Industrial Construction Projects',
    icon: 'factory',
    color: 'orange'
  },
  infrastructure: {
    nameAr: 'مشاريع البنية التحتية',
    nameEn: 'Infrastructure Projects',
    icon: 'route',
    color: 'purple'
  },
  public: {
    nameAr: 'مشاريع المباني العامة',
    nameEn: 'Public Building Projects',
    icon: 'hospital',
    color: 'red'
  },
  renewable_energy: {
    nameAr: 'مشاريع الطاقة المتجددة',
    nameEn: 'Renewable Energy Projects',
    icon: 'sun',
    color: 'yellow'
  },
  mega_projects: {
    nameAr: 'المشاريع الضخمة',
    nameEn: 'Mega Projects',
    icon: 'zap',
    color: 'indigo'
  }
};

// دالة للحصول على قالب BOQ لنوع مشروع معين
export function getProjectBoqTemplate(projectTypeId: string): ProjectBoqTemplate | null {
  return projectBoqTemplates.find(template => template.projectTypeId === projectTypeId) || null;
}

// دالة للحصول على أنواع المشاريع حسب الفئة
export function getProjectTypesByCategory(category: string): ProjectType[] {
  return enhancedProjectTypes.filter(type => type.category === category && type.isActive);
}

// دالة البحث في أنواع المشاريع
export function searchProjectTypes(query: string, lang: 'ar' | 'en' = 'ar'): ProjectType[] {
  const searchTerm = query.toLowerCase();
  return enhancedProjectTypes.filter(type => {
    const name = lang === 'ar' ? type.nameAr : type.nameEn;
    const description = lang === 'ar' ? type.description : type.descriptionEn;
    const tags = lang === 'ar' ? type.tags : type.tagsEn;
    
    return name.toLowerCase().includes(searchTerm) ||
           description.toLowerCase().includes(searchTerm) ||
           tags.some(tag => tag.toLowerCase().includes(searchTerm));
  });
}