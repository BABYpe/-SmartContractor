export interface ProjectDetails {
  companyName: string;
  companyLogo: string;
  projectDate: string;
  engineeringDrawings: string;
  city: string;
  area: string;
  projectType: string;
  profitMargin: string;
  wastePercentage: string;
}

export interface BOQItem {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  price: number | null;
  loading: boolean;
  error: boolean;
  source: 'ai' | 'pdf' | 'manual' | 'database';
  specifications?: string;
  laborHours?: number;
  equipmentRequired?: EquipmentRequirement[];
  priceRange?: {
    min: number;
    max: number;
    average: number;
  };
  lastUpdated?: string;
  verified?: boolean;
  confidence?: number;
  breakdown?: PriceBreakdown;
  marketInsights?: MarketInsight[];
  riskFactors?: RiskFactor[];
  optimizations?: Optimization[];
  alternatives?: string[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  categoryEn: string;
  projectDetails: ProjectDetails;
  estimatedCost: number | null;
  costBreakdown: CostBreakdown | null;
  customBoqItems: BOQItem[];
  paymentMilestones: PaymentMilestone[];
  projectDuration: string | null;
  workforceReport: string | null;
  riskAnalysis: string | null;
  costOptimization: string | null;
  technicalProposal: string | null;
  financialProposal: string | null;
  createdAt: string;
  lastUsed: string;
  usageCount: number;
  tags: string[];
  tagsEn: string[];
  isPublic: boolean;
  rating: number;
  complexity: 'simple' | 'medium' | 'complex';
  estimatedDuration: string;
  targetBudget: number;
  thumbnail?: string;
}

export interface ConstructionItem {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: string;
  subcategory: string;
  unit: string;
  basePrice: number;
  priceRange: {
    min: number;
    max: number;
    average: number;
  };
  specifications: string;
  laborHours: number;
  materialCost: number;
  laborCost: number;
  equipmentCost: number;
  suppliers: string[];
  qualityGrades: {
    economy: { multiplier: number; description: string };
    standard: { multiplier: number; description: string };
    premium: { multiplier: number; description: string };
  };
  regionalPrices: {
    riyadh: number;
    jeddah: number;
    dammam: number;
    madinah: number;
  };
  seasonalFactors: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
  lastUpdated: string;
  isActive: boolean;
}

export interface PriceBreakdown {
  basePrice: number;
  seasonalAdjustment: number;
  demandAdjustment: number;
  qualityAdjustment: number;
  quantityDiscount: number;
  urgencyPremium: number;
  supplierAdjustment: number;
  marketAdjustment: number;
  riskPremium: number;
}

export interface MarketInsight {
  type: string;
  message: string;
  impact: 'low' | 'medium' | 'high';
  itemName?: string;
}

export interface RiskFactor {
  type: string;
  level: 'low' | 'medium' | 'high';
  description: string;
  impact: number;
  mitigation: string;
}

export interface Optimization {
  type: string;
  description: string;
  potentialSaving: number;
  effort: 'low' | 'medium' | 'high';
}

export interface EquipmentRequirement {
  id: string;
  name: string;
  type: string;
  capacity: string;
  quantity: number;
  durationDays: number;
  dailyRate: number;
  operatingCostPerHour: number;
  totalCost: number;
  supplier?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'excavator' | 'crane' | 'loader' | 'pump' | 'mixer' | 'compactor' | 'generator' | 'other';
  model: string;
  capacity: string;
  dailyRate: number;
  monthlyRate: number;
  operatingCostPerHour: number;
  fuelConsumption: number;
  suppliers: string[];
  specifications: string;
  availability: boolean;
}

export interface MarketPrice {
  itemId: string;
  itemName: string;
  price: number;
  unit: string;
  supplier: string;
  lastUpdated: string;
  region: string;
  quality: 'standard' | 'premium' | 'economy';
  availability: 'available' | 'limited' | 'out_of_stock';
}

export interface PaymentMilestone {
  name: string;
  percentage: string;
}

export interface CostBreakdown {
  [category: string]: number;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export type Language = 'ar' | 'en';

export interface APIResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface PDFAnalysisResult {
  items: BOQItem[];
  projectInfo?: {
    title: string;
    client: string;
    location: string;
    totalValue?: number;
  };
  confidence: number;
}

export interface PriceUpdateEvent {
  itemId: string;
  oldPrice: number;
  newPrice: number;
  timestamp: string;
  source: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  basePrice: number;
  priceRange: {
    min: number;
    max: number;
    average: number;
  };
  suppliers: Supplier[];
  specifications: MaterialSpecification;
  regionalPrices: { [region: string]: number };
  qualityGrades: QualityGrade[];
  lastUpdated: string;
  marketTrend: 'rising' | 'falling' | 'stable';
  availability: 'high' | 'medium' | 'low';
  seasonalFactor: number;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  deliveryTime: number;
  minOrder: number;
  paymentTerms: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface MaterialSpecification {
  grade: string;
  standard: string;
  dimensions?: string;
  weight?: number;
  strength?: string;
  durability: string;
  fireResistance?: string;
  thermalProperties?: string;
  environmentalImpact: string;
}

export interface QualityGrade {
  grade: string;
  priceMultiplier: number;
  description: string;
  applications: string[];
}

export interface PricingContext {
  projectType: string;
  region: string;
  timeline: 'urgent' | 'normal' | 'flexible';
  qualityRequirement: 'economy' | 'standard' | 'premium';
  estimatedBudget?: number;
}

export interface PricingResult {
  basePrice: number;
  finalPrice: number;
  priceRange: { min: number; max: number; average: number };
  confidence: number;
  material: Material | null;
  breakdown: PriceBreakdown;
  riskFactors: RiskFactor[];
  optimizations: Optimization[];
  alternatives: Material[];
  marketInsights: MarketInsight[];
  lastUpdated: string;
}

export interface ReportSection {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  type: 'text' | 'table' | 'chart' | 'list';
  data?: any;
  order: number;
}

export interface EnhancedReport {
  id: string;
  title: string;
  titleEn: string;
  type: 'technical' | 'financial' | 'risk' | 'optimization' | 'workforce' | 'duration' | 'summary';
  sections: ReportSection[];
  metadata: {
    projectName: string;
    projectType: string;
    city: string;
    area: string;
    estimatedCost: number;
    generatedAt: string;
    language: Language;
    version: string;
  };
  formatting: {
    headerStyle: string;
    tableStyle: string;
    chartStyle: string;
    footerStyle: string;
  };
}