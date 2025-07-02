// Enhanced database engine for construction items management
import { enhancedItems, type EnhancedItem } from '../data/enhancedDatabase';
import type { BOQItem } from '../types';

interface SearchOptions {
  query?: string;
  category?: string;
  subcategory?: string;
  priceRange?: { min: number; max: number };
  sortBy?: 'name' | 'price' | 'category' | 'updated';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

interface PricingContext {
  region: string;
  quality: 'economy' | 'standard' | 'premium';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

class EnhancedDatabaseEngine {
  private items: EnhancedItem[] = enhancedItems;
  private cache = new Map<string, any>();

  constructor() {
    console.log(`Enhanced Database Engine initialized with ${this.items.length} items`);
  }

  // البحث المتقدم في قاعدة البيانات
  advancedSearch(options: SearchOptions): EnhancedItem[] {
    let results = [...this.items];

    // تطبيق فلتر البحث النصي
    if (options.query) {
      const query = options.query.toLowerCase();
      results = results.filter(item =>
        item.nameAr.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.specifications.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.subcategory.toLowerCase().includes(query)
      );
    }

    // تطبيق فلتر الفئة
    if (options.category) {
      results = results.filter(item => item.category === options.category);
    }

    // تطبيق فلتر الفئة الفرعية
    if (options.subcategory) {
      results = results.filter(item => item.subcategory === options.subcategory);
    }

    // تطبيق فلتر نطاق السعر
    if (options.priceRange) {
      results = results.filter(item =>
        item.currentPrice >= options.priceRange!.min &&
        item.currentPrice <= options.priceRange!.max
      );
    }

    // تطبيق الترتيب
    if (options.sortBy) {
      results.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (options.sortBy) {
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
          case 'updated':
            aValue = new Date(a.lastUpdated);
            bValue = new Date(b.lastUpdated);
            break;
          default:
            aValue = a.nameAr;
            bValue = b.nameAr;
        }

        if (options.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        } else {
          return aValue > bValue ? 1 : -1;
        }
      });
    }

    // تطبيق الحد الأقصى للنتائج
    if (options.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  // حساب السعر المعدل حسب السياق
  calculatePrice(item: EnhancedItem, context: PricingContext): {
    basePrice: number;
    adjustedPrice: number;
    factors: {
      regional: number;
      quality: number;
      seasonal: number;
    };
  } {
    const basePrice = item.currentPrice;
    const regionalPrice = item.regionalPrices[context.region as keyof typeof item.regionalPrices] || basePrice;
    const qualityMultiplier = item.qualityGrades[context.quality].multiplier;
    const seasonalFactor = item.seasonalFactors[context.season];

    const adjustedPrice = Math.round(regionalPrice * qualityMultiplier * seasonalFactor);

    return {
      basePrice,
      adjustedPrice,
      factors: {
        regional: regionalPrice / basePrice,
        quality: qualityMultiplier,
        seasonal: seasonalFactor
      }
    };
  }

  // تحويل عنصر قاعدة البيانات إلى بند BOQ
  convertToBOQItem(item: EnhancedItem, quantity: number, context: PricingContext): BOQItem {
    const pricing = this.calculatePrice(item, context);

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
      lastUpdated: new Date().toISOString(),
      verified: true,
      confidence: 0.95
    };
  }

  // الحصول على الفئات
  getCategories(): string[] {
    const categories = new Set(this.items.map(item => item.category));
    return Array.from(categories);
  }

  // الحصول على الفئات الفرعية
  getSubcategories(category: string): string[] {
    const subcategories = new Set(
      this.items
        .filter(item => item.category === category)
        .map(item => item.subcategory)
    );
    return Array.from(subcategories);
  }

  // الحصول على إحصائيات قاعدة البيانات
  getDatabaseStats(): {
    totalItems: number;
    itemsByCategory: Record<string, number>;
    averagePrice: number;
    lastUpdate: string;
  } {
    const cacheKey = 'database_stats';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const itemsByCategory: Record<string, number> = {};
    let totalPrice = 0;

    this.items.forEach(item => {
      itemsByCategory[item.category] = (itemsByCategory[item.category] || 0) + 1;
      totalPrice += item.currentPrice;
    });

    const stats = {
      totalItems: this.items.length,
      itemsByCategory,
      averagePrice: Math.round(totalPrice / this.items.length),
      lastUpdate: new Date().toISOString()
    };

    // تخزين في الكاش لمدة 5 دقائق
    this.cache.set(cacheKey, stats);
    setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);

    return stats;
  }

  // البحث بالكود
  getItemByCode(code: string): EnhancedItem | undefined {
    return this.items.find(item => item.code === code);
  }

  // البحث بالمعرف
  getItemById(id: string): EnhancedItem | undefined {
    return this.items.find(item => item.id === id);
  }

  // الحصول على البنود المشابهة
  getSimilarItems(item: EnhancedItem, limit: number = 5): EnhancedItem[] {
    return this.items
      .filter(i => 
        i.id !== item.id && 
        (i.category === item.category || i.subcategory === item.subcategory)
      )
      .sort((a, b) => {
        // ترتيب حسب التشابه في السعر والفئة
        const aPriceScore = Math.abs(a.currentPrice - item.currentPrice);
        const bPriceScore = Math.abs(b.currentPrice - item.currentPrice);
        return aPriceScore - bPriceScore;
      })
      .slice(0, limit);
  }

  // الحصول على البنود الأكثر استخداماً
  getPopularItems(limit: number = 10): EnhancedItem[] {
    // محاكاة البيانات الشائعة
    return this.items
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  }

  // تحديث سعر بند
  updateItemPrice(itemId: string, newPrice: number): boolean {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.currentPrice = newPrice;
      item.lastUpdated = new Date().toISOString();
      this.cache.clear(); // مسح الكاش عند التحديث
      return true;
    }
    return false;
  }

  // إضافة بند جديد
  addItem(item: Omit<EnhancedItem, 'id' | 'lastUpdated'>): EnhancedItem {
    const newItem: EnhancedItem = {
      ...item,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString()
    };

    this.items.push(newItem);
    this.cache.clear(); // مسح الكاش عند الإضافة
    
    return newItem;
  }

  // حذف بند
  deleteItem(itemId: string): boolean {
    const index = this.items.findIndex(i => i.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.cache.clear(); // مسح الكاش عند الحذف
      return true;
    }
    return false;
  }

  // تصدير البيانات
  exportData(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = [
        'الكود', 'الاسم العربي', 'الاسم الإنجليزي', 'الفئة', 'الفئة الفرعية',
        'الوحدة', 'السعر الحالي', 'المواصفات', 'ساعات العمل'
      ];
      
      const rows = this.items.map(item => [
        item.code,
        item.nameAr,
        item.nameEn,
        item.category,
        item.subcategory,
        item.unit,
        item.currentPrice.toString(),
        item.specifications,
        item.laborHours.toString()
      ]);

      return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    }

    return JSON.stringify(this.items, null, 2);
  }

  // مسح الكاش
  clearCache(): void {
    this.cache.clear();
  }

  // إعادة تحميل البيانات
  reload(): void {
    this.items = [...enhancedItems];
    this.cache.clear();
  }
}

export const databaseEngine = new EnhancedDatabaseEngine();