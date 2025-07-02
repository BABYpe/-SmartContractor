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
  lastUpdated?: string;
  verified?: boolean;
  confidence?: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface PaymentMilestone {
  name: string;
  percentage: string;
}

export interface CostBreakdown {
  [category: string]: number;
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

export interface ConstructionItem {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: string;
  subcategory: string;
  unit: string;
  basePrice: number;
  specifications: string;
  laborHours: number;
  suppliers: string[];
  regions: {
    [key: string]: number;
  };
  qualityGrades: {
    economy: { price: number; description: string };
    standard: { price: number; description: string };
    premium: { price: number; description: string };
  };
  tags: string[];
  isActive: boolean;
  lastUpdated: string;
  usageCount: number;
  rating: number;
}