import type { BOQItem, ConstructionItem } from '../types';

export interface PricingContext {
  region: string;
  quality: 'economy' | 'standard' | 'premium';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  projectSize: 'small' | 'medium' | 'large';
  urgency: 'normal' | 'urgent';
}

export interface PriceData {
  basePrice: number;
  adjustedPrice: number;
  confidence: number;
  lastUpdated: string;
  source: string;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface SearchResult {
  id: string;
  query: string;
  results: ConstructionItem[];
  timestamp: string;
  context: PricingContext;
}

class EnhancedPricingEngine {
  private searchHistory: SearchResult[] = [];
  private priceCache = new Map<string, PriceData>();

  // البحث الذكي مع الحفظ التلقائي
  async smartSearch(
    query: string, 
    context: PricingContext,
    userId?: string
  ): Promise<ConstructionItem[]> {
    try {
      // محاكاة البحث في قاعدة البيانات
      const results = await this.searchDatabase(query, context);
      
      // حفظ البحث تلقائياً
      await this.saveSearchHistory(query, results, context, userId);
      
      // تحديث أسعار النتائج
      const updatedResults = await Promise.all(
        results.map(item => this.updateItemPricing(item, context))
      );

      return updatedResults;
    } catch (error) {
      console.error('Smart search error:', error);
      return [];
    }
  }

  // البحث في قاعدة البيانات
  private async searchDatabase(
    query: string, 
    context: PricingContext
  ): Promise<ConstructionItem[]> {
    // محاكاة البحث - في التطبيق الحقيقي سيتم الاتصال بـ Supabase
    const mockResults: ConstructionItem[] = [
      {
        id: '1',
        code: 'CONC001',
        nameAr: 'خرسانة مسلحة درجة 25',
        nameEn: 'Reinforced Concrete Grade 25',
        category: 'أعمال الخرسانات المسلحة',
        subcategory: 'خرسانة مسلحة',
        unit: 'م3',
        basePrice: 1850,
        specifications: 'خرسانة مسلحة بمقاومة 25 ميجاباسكال',
        laborHours: 12,
        suppliers: ['شركة الخرسانة المتقدمة'],
        regions: {
          riyadh: 1850,
          jeddah: 1998,
          dammam: 1943
        },
        qualityGrades: {
          economy: { price: 1480, description: 'درجة اقتصادية' },
          standard: { price: 1850, description: 'درجة قياسية' },
          premium: { price: 2405, description: 'درجة ممتازة' }
        },
        tags: ['خرسانة', 'مسلحة', 'إنشائي'],
        isActive: true,
        lastUpdated: new Date().toISOString(),
        usageCount: 156,
        rating: 4.8
      }
    ];

    return mockResults.filter(item => 
      item.nameAr.includes(query) || 
      item.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.includes(query))
    );
  }

  // تحديث تسعير البند
  private async updateItemPricing(
    item: ConstructionItem, 
    context: PricingContext
  ): Promise<ConstructionItem> {
    const cacheKey = `${item.id}_${context.region}_${context.quality}`;
    
    // التحقق من الكاش أولاً
    if (this.priceCache.has(cacheKey)) {
      const cachedPrice = this.priceCache.get(cacheKey)!;
      return {
        ...item,
        basePrice: cachedPrice.adjustedPrice
      };
    }

    // حساب السعر المعدل
    const adjustedPrice = this.calculateAdjustedPrice(item, context);
    
    // حفظ في الكاش
    this.priceCache.set(cacheKey, {
      basePrice: item.basePrice,
      adjustedPrice,
      confidence: 0.95,
      lastUpdated: new Date().toISOString(),
      source: 'calculated',
      priceRange: {
        min: adjustedPrice * 0.9,
        max: adjustedPrice * 1.1
      }
    });

    return {
      ...item,
      basePrice: adjustedPrice
    };
  }

  // حساب السعر المعدل
  private calculateAdjustedPrice(
    item: ConstructionItem, 
    context: PricingContext
  ): number {
    let price = item.basePrice;

    // تعديل حسب المنطقة
    const regionMultiplier = this.getRegionMultiplier(context.region);
    price *= regionMultiplier;

    // تعديل حسب الجودة
    const qualityMultiplier = this.getQualityMultiplier(context.quality);
    price *= qualityMultiplier;

    // تعديل حسب الموسم
    const seasonMultiplier = this.getSeasonMultiplier(context.season);
    price *= seasonMultiplier;

    // تعديل حسب حجم المشروع
    const sizeMultiplier = this.getProjectSizeMultiplier(context.projectSize);
    price *= sizeMultiplier;

    // تعديل حسب الاستعجال
    const urgencyMultiplier = this.getUrgencyMultiplier(context.urgency);
    price *= urgencyMultiplier;

    return Math.round(price);
  }

  // معاملات التعديل
  private getRegionMultiplier(region: string): number {
    const multipliers: Record<string, number> = {
      riyadh: 1.0,
      jeddah: 1.08,
      dammam: 1.05,
      makkah: 1.12,
      khobar: 1.06,
      abha: 0.98,
      taif: 1.07,
      tabuk: 1.02,
      hail: 1.00,
      qassim: 1.03
    };
    return multipliers[region] || 1.0;
  }

  private getQualityMultiplier(quality: string): number {
    const multipliers = {
      economy: 0.8,
      standard: 1.0,
      premium: 1.3
    };
    return multipliers[quality as keyof typeof multipliers] || 1.0;
  }

  private getSeasonMultiplier(season: string): number {
    const multipliers = {
      spring: 1.0,
      summer: 1.05, // زيادة في الصيف بسبب الطلب
      autumn: 0.98,
      winter: 1.02
    };
    return multipliers[season as keyof typeof multipliers] || 1.0;
  }

  private getProjectSizeMultiplier(size: string): number {
    const multipliers = {
      small: 1.1, // مشاريع صغيرة أغلى نسبياً
      medium: 1.0,
      large: 0.95 // خصم للمشاريع الكبيرة
    };
    return multipliers[size as keyof typeof multipliers] || 1.0;
  }

  private getUrgencyMultiplier(urgency: string): number {
    const multipliers = {
      normal: 1.0,
      urgent: 1.15 // زيادة للمشاريع المستعجلة
    };
    return multipliers[urgency as keyof typeof multipliers] || 1.0;
  }

  // حفظ تاريخ البحث
  private async saveSearchHistory(
    query: string,
    results: ConstructionItem[],
    context: PricingContext,
    userId?: string
  ): Promise<void> {
    const searchResult: SearchResult = {
      id: crypto.randomUUID(),
      query,
      results,
      timestamp: new Date().toISOString(),
      context
    };

    this.searchHistory.push(searchResult);

    // في التطبيق الحقيقي، سيتم حفظ البيانات في Supabase
    if (userId) {
      try {
        // محاكاة حفظ في قاعدة البيانات
        console.log('Saving search history:', {
          userId,
          query,
          resultsCount: results.length,
          context
        });
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    }
  }

  // الحفظ التلقائي للمشروع
  async autoSaveProject(
    projectData: any,
    userId: string,
    trigger: 'auto' | 'manual' | 'periodic' = 'auto'
  ): Promise<void> {
    try {
      const autoSaveData = {
        id: crypto.randomUUID(),
        userId,
        projectName: projectData.name || `مشروع ${new Date().toLocaleDateString('ar-SA')}`,
        projectData,
        estimatedCost: projectData.estimatedCost,
        projectType: projectData.projectType,
        city: projectData.city,
        area: projectData.area,
        saveTrigger: trigger,
        lastAccessed: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      // في التطبيق الحقيقي، سيتم حفظ البيانات في Supabase
      console.log('Auto-saving project:', autoSaveData);

      // محاكاة تخزين محلي مؤقت
      const savedProjects = JSON.parse(
        localStorage.getItem('autoSavedProjects') || '[]'
      );
      savedProjects.push(autoSaveData);
      
      // الاحتفاظ بآخر 10 مشاريع فقط
      if (savedProjects.length > 10) {
        savedProjects.shift();
      }
      
      localStorage.setItem('autoSavedProjects', JSON.stringify(savedProjects));
    } catch (error) {
      console.error('Error auto-saving project:', error);
    }
  }

  // استرجاع المشاريع المحفوظة تلقائياً
  async getAutoSavedProjects(userId: string): Promise<any[]> {
    try {
      // في التطبيق الحقيقي، سيتم استرجاع البيانات من Supabase
      const savedProjects = JSON.parse(
        localStorage.getItem('autoSavedProjects') || '[]'
      );
      
      return savedProjects.filter((project: any) => project.userId === userId);
    } catch (error) {
      console.error('Error retrieving auto-saved projects:', error);
      return [];
    }
  }

  // تحديث الأسعار بشكل دوري
  async updatePricesPeriodically(): Promise<void> {
    try {
      // محاكاة تحديث الأسعار من مصادر خارجية
      console.log('Starting periodic price update...');
      
      // تنظيف الكاش القديم
      this.priceCache.clear();
      
      // في التطبيق الحقيقي، سيتم:
      // 1. جلب البيانات من APIs خارجية
      // 2. تحديث قاعدة البيانات
      // 3. إرسال إشعارات للمستخدمين عن التغييرات المهمة
      
      console.log('Price update completed');
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  }

  // تحليل اتجاهات السوق
  async analyzeMarketTrends(category: string, region: string): Promise<any> {
    try {
      // محاكاة تحليل اتجاهات السوق
      const trends = {
        category,
        region,
        priceChangePercentage: Math.random() * 10 - 5, // تغيير بين -5% و +5%
        volumeChangePercentage: Math.random() * 20 - 10,
        marketSentiment: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)],
        keyFactors: [
          'تقلبات أسعار المواد الخام',
          'زيادة الطلب على المشاريع السكنية',
          'تحسن الظروف الاقتصادية'
        ],
        analysisDate: new Date().toISOString()
      };

      return trends;
    } catch (error) {
      console.error('Error analyzing market trends:', error);
      return null;
    }
  }

  // الحصول على إحصائيات الاستخدام
  getUsageStatistics(): any {
    return {
      totalSearches: this.searchHistory.length,
      cacheSize: this.priceCache.size,
      lastUpdate: new Date().toISOString(),
      popularCategories: this.getPopularCategories(),
      regionDistribution: this.getRegionDistribution()
    };
  }

  private getPopularCategories(): string[] {
    const categoryCount = new Map<string, number>();
    
    this.searchHistory.forEach(search => {
      search.results.forEach(item => {
        const count = categoryCount.get(item.category) || 0;
        categoryCount.set(item.category, count + 1);
      });
    });

    return Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category]) => category);
  }

  private getRegionDistribution(): Record<string, number> {
    const regionCount = new Map<string, number>();
    
    this.searchHistory.forEach(search => {
      const region = search.context.region;
      const count = regionCount.get(region) || 0;
      regionCount.set(region, count + 1);
    });

    return Object.fromEntries(regionCount);
  }
}

export const enhancedPricingEngine = new EnhancedPricingEngine();