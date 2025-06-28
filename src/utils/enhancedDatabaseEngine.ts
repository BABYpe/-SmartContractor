// محرك قاعدة البيانات المحسن للمشاريع والبنود
import { enhancedItems, type EnhancedItem } from '../data/enhancedDatabase';
import { enhancedProjectTypes, projectBoqTemplates, getProjectBoqTemplate, type ProjectType } from '../data/enhancedProjectTypes';
import type { BOQItem, ConstructionItem } from '../types';

export class EnhancedDatabaseEngine {
  private static instance: EnhancedDatabaseEngine;
  private cache = new Map<string, any>();
  private lastUpdate = Date.now();

  static getInstance(): EnhancedDatabaseEngine {
    if (!EnhancedDatabaseEngine.instance) {
      EnhancedDatabaseEngine.instance = new EnhancedDatabaseEngine();
    }
    return EnhancedDatabaseEngine.instance;
  }

  // البحث المتقدم في البنود
  advancedSearch(params: {
    query?: string;
    category?: string;
    subcategory?: string;
    priceRange?: { min: number; max: number };
    projectType?: string;
    region?: string;
    sortBy?: 'name' | 'price' | 'category' | 'lastUpdated';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
  }): ConstructionItem[] {
    const cacheKey = `search_${JSON.stringify(params)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let results = enhancedItems.filter(item => item.isActive);

    // تطبيق المرشحات
    if (params.query) {
      const searchTerms = params.query.toLowerCase().split(' ');
      results = results.filter(item => {
        const searchText = `${item.nameAr} ${item.nameEn} ${item.specifications}`.toLowerCase();
        return searchTerms.some(term => searchText.includes(term));
      });
    }

    if (params.category) {
      results = results.filter(item => item.category === params.category);
    }

    if (params.subcategory) {
      results = results.filter(item => item.subcategory === params.subcategory);
    }

    if (params.priceRange) {
      results = results.filter(item => 
        item.currentPrice >= params.priceRange!.min && 
        item.currentPrice <= params.priceRange!.max
      );
    }

    if (params.projectType) {
      results = results.filter(item => 
        item.projectTypes.includes(params.projectType!)
      );
    }

    // الترتيب
    if (params.sortBy) {
      results.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (params.sortBy) {
          case 'name':
            aValue = a.nameAr;
            bValue = b.nameAr;
            break;
          case 'price':
            aValue = a.currentPrice;
            bValue = b.currentPrice;
            break;
          case 'category':
            aValue = a.category;
            bValue = b.category;
            break;
          case 'lastUpdated':
            aValue = new Date(a.lastUpdated);
            bValue = new Date(b.lastUpdated);
            break;
          default:
            return 0;
        }

        if (params.sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
      });
    }

    // تحديد العدد
    if (params.limit) {
      results = results.slice(0, params.limit);
    }

    // تحويل إلى ConstructionItem
    const constructionItems: ConstructionItem[] = results.map(item => ({
      id: item.id,
      code: item.code,
      nameAr: item.nameAr,
      nameEn: item.nameEn,
      category: item.category,
      subcategory: item.subcategory,
      unit: item.unit,
      basePrice: item.basePrice,
      priceRange: {
        min: Math.min(...Object.values(item.regionalPrices)),
        max: Math.max(...Object.values(item.regionalPrices)),
        average: item.currentPrice
      },
      specifications: item.specifications,
      laborHours: item.laborHours,
      materialCost: item.currentPrice * 0.6, // تقدير 60% مواد
      laborCost: item.currentPrice * 0.3, // تقدير 30% عمالة
      equipmentCost: item.currentPrice * 0.1, // تقدير 10% معدات
      suppliers: item.suppliers,
      qualityGrades: item.qualityGrades,
      regionalPrices: item.regionalPrices,
      seasonalFactors: item.seasonalFactors,
      lastUpdated: item.lastUpdated,
      isActive: item.isActive
    }));

    this.cache.set(cacheKey, constructionItems);
    setTimeout(() => this.cache.delete(cacheKey), 300000); // 5 دقائق
    return constructionItems;
  }

  // الحصول على الفئات
  getCategories(): string[] {
    const categories = new Set(enhancedItems.map(item => item.category));
    return Array.from(categories).sort();
  }

  // الحصول على الفئات الفرعية
  getSubcategories(category: string): string[] {
    const subcategories = new Set(
      enhancedItems
        .filter(item => item.category === category)
        .map(item => item.subcategory)
    );
    return Array.from(subcategories).sort();
  }

  // حساب السعر مع العوامل المختلفة
  calculatePrice(item: EnhancedItem, context: {
    region?: string;
    quality?: 'economy' | 'standard' | 'premium';
    season?: 'spring' | 'summer' | 'autumn' | 'winter';
    quantity?: number;
    urgency?: 'normal' | 'urgent';
  }): {
    basePrice: number;
    adjustedPrice: number;
    breakdown: {
      regional: number;
      quality: number;
      seasonal: number;
      quantity: number;
      urgency: number;
    };
  } {
    const basePrice = item.currentPrice;
    let adjustedPrice = basePrice;
    
    const breakdown = {
      regional: 1.0,
      quality: 1.0,
      seasonal: 1.0,
      quantity: 1.0,
      urgency: 1.0
    };

    // تعديل إقليمي
    if (context.region && item.regionalPrices[context.region as keyof typeof item.regionalPrices]) {
      const regionalPrice = item.regionalPrices[context.region as keyof typeof item.regionalPrices];
      breakdown.regional = regionalPrice / basePrice;
      adjustedPrice = regionalPrice;
    }

    // تعديل الجودة
    if (context.quality && item.qualityGrades[context.quality]) {
      breakdown.quality = item.qualityGrades[context.quality].multiplier;
      adjustedPrice *= breakdown.quality;
    }

    // تعديل موسمي
    if (context.season && item.seasonalFactors[context.season]) {
      breakdown.seasonal = item.seasonalFactors[context.season];
      adjustedPrice *= breakdown.seasonal;
    }

    // خصم الكمية
    if (context.quantity && context.quantity > 100) {
      const discountRate = Math.min(0.15, (context.quantity - 100) / 1000 * 0.05);
      breakdown.quantity = 1 - discountRate;
      adjustedPrice *= breakdown.quantity;
    }

    // علاوة الاستعجال
    if (context.urgency === 'urgent') {
      breakdown.urgency = 1.15;
      adjustedPrice *= breakdown.urgency;
    }

    return {
      basePrice,
      adjustedPrice: Math.round(adjustedPrice),
      breakdown
    };
  }

  // تحويل بند من قاعدة البيانات إلى BOQ
  convertToBOQItem(item: ConstructionItem, quantity: number, context: {
    region?: string;
    quality?: 'economy' | 'standard' | 'premium';
    season?: 'spring' | 'summer' | 'autumn' | 'winter';
  }): BOQItem {
    const enhancedItem = enhancedItems.find(ei => ei.id === item.id);
    if (!enhancedItem) {
      throw new Error('Item not found in enhanced database');
    }

    const pricing = this.calculatePrice(enhancedItem, { ...context, quantity });

    return {
      id: crypto.randomUUID(),
      itemName: item.nameAr,
      quantity,
      unit: item.unit,
      price: pricing.adjustedPrice,
      loading: false,
      error: false,
      source: 'database',
      specifications: item.specifications,
      laborHours: item.laborHours,
      priceRange: item.priceRange,
      lastUpdated: new Date().toISOString(),
      verified: true,
      confidence: 0.95,
      breakdown: {
        basePrice: pricing.basePrice,
        seasonalAdjustment: (pricing.breakdown.seasonal - 1) * pricing.basePrice,
        demandAdjustment: 0,
        qualityAdjustment: (pricing.breakdown.quality - 1) * pricing.basePrice,
        quantityDiscount: (1 - pricing.breakdown.quantity) * pricing.basePrice,
        urgencyPremium: (pricing.breakdown.urgency - 1) * pricing.basePrice,
        supplierAdjustment: 0,
        marketAdjustment: (pricing.breakdown.regional - 1) * pricing.basePrice,
        riskPremium: 0
      }
    };
  }

  // الحصول على قالب BOQ لنوع مشروع
  getProjectBoqTemplate(projectTypeId: string): BOQItem[] {
    const template = getProjectBoqTemplate(projectTypeId);
    if (!template) return [];

    return template.items.map(templateItem => {
      // البحث عن البند في قاعدة البيانات
      const dbItem = enhancedItems.find(item => 
        item.nameAr.includes(templateItem.itemName) || 
        item.nameEn.includes(templateItem.itemNameEn)
      );

      return {
        id: crypto.randomUUID(),
        itemName: templateItem.itemName,
        quantity: templateItem.estimatedQuantityPerSqm,
        unit: templateItem.unit,
        price: dbItem ? dbItem.currentPrice : null,
        loading: false,
        error: false,
        source: 'database',
        specifications: templateItem.specifications,
        laborHours: templateItem.laborHours,
        lastUpdated: new Date().toISOString(),
        verified: true,
        confidence: 0.9
      };
    });
  }

  // الحصول على إحصائيات قاعدة البيانات
  getDatabaseStats(): {
    totalItems: number;
    itemsByCategory: { [category: string]: number };
    itemsBySubcategory: { [subcategory: string]: number };
    priceRanges: { min: number; max: number; average: number };
    lastUpdate: string;
  } {
    const totalItems = enhancedItems.length;
    
    const itemsByCategory: { [category: string]: number } = {};
    const itemsBySubcategory: { [subcategory: string]: number } = {};
    let totalPrice = 0;
    let minPrice = Infinity;
    let maxPrice = 0;

    enhancedItems.forEach(item => {
      // إحصائيات الفئات
      itemsByCategory[item.category] = (itemsByCategory[item.category] || 0) + 1;
      itemsBySubcategory[item.subcategory] = (itemsBySubcategory[item.subcategory] || 0) + 1;
      
      // إحصائيات الأسعار
      totalPrice += item.currentPrice;
      minPrice = Math.min(minPrice, item.currentPrice);
      maxPrice = Math.max(maxPrice, item.currentPrice);
    });

    return {
      totalItems,
      itemsByCategory,
      itemsBySubcategory,
      priceRanges: {
        min: minPrice,
        max: maxPrice,
        average: Math.round(totalPrice / totalItems)
      },
      lastUpdate: new Date().toISOString()
    };
  }

  // البحث في أنواع المشاريع
  searchProjectTypes(query: string, lang: 'ar' | 'en' = 'ar'): ProjectType[] {
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

  // الحصول على أنواع المشاريع حسب الفئة
  getProjectTypesByCategory(category: string): ProjectType[] {
    return enhancedProjectTypes.filter(type => type.category === category && type.isActive);
  }

  // مسح الكاش
  clearCache(): void {
    this.cache.clear();
  }
}

export const databaseEngine = EnhancedDatabaseEngine.getInstance();