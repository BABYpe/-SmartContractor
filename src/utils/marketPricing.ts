// محرك التسعير المتقدم مع تحديثات السوق الحقيقية
import { enhancedItems, liveMarketNews, type EnhancedItem } from '../data/enhancedDatabase';
import type { BOQItem, MarketInsight, RiskFactor, Optimization } from '../types';

export class MarketPricingEngine {
  private static instance: MarketPricingEngine;
  private cache = new Map<string, any>();
  private lastUpdate = Date.now();
  private updateInterval = 30 * 60 * 1000; // 30 دقيقة

  static getInstance(): MarketPricingEngine {
    if (!MarketPricingEngine.instance) {
      MarketPricingEngine.instance = new MarketPricingEngine();
    }
    return MarketPricingEngine.instance;
  }

  // تحديث أسعار قائمة من البنود
  async updatePricesForItems(items: BOQItem[], region: string = 'riyadh'): Promise<BOQItem[]> {
    const updatedItems: BOQItem[] = [];

    for (const item of items) {
      try {
        const updatedItem = await this.updateItemPrice(item, region);
        updatedItems.push(updatedItem);
      } catch (error) {
        console.error(`Error updating price for ${item.itemName}:`, error);
        updatedItems.push({
          ...item,
          error: true,
          loading: false
        });
      }
    }

    return updatedItems;
  }

  // تحديث سعر بند واحد
  private async updateItemPrice(item: BOQItem, region: string): Promise<BOQItem> {
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    // البحث عن البند في قاعدة البيانات المحسنة
    const dbItem = this.findItemInDatabase(item.itemName);
    
    if (dbItem) {
      const pricing = this.calculateMarketPrice(dbItem, {
        region,
        quantity: item.quantity,
        season: this.getCurrentSeason(),
        marketConditions: this.getCurrentMarketConditions()
      });

      return {
        ...item,
        price: pricing.finalPrice,
        priceRange: {
          min: pricing.priceRange.min,
          max: pricing.priceRange.max,
          average: pricing.priceRange.average
        },
        loading: false,
        error: false,
        lastUpdated: new Date().toISOString(),
        verified: true,
        confidence: pricing.confidence,
        breakdown: pricing.breakdown,
        marketInsights: pricing.insights,
        riskFactors: pricing.risks,
        optimizations: pricing.optimizations
      };
    } else {
      // إذا لم يتم العثور على البند، استخدم تقدير ذكي
      const estimatedPrice = this.estimatePrice(item);
      
      return {
        ...item,
        price: estimatedPrice.price,
        priceRange: estimatedPrice.range,
        loading: false,
        error: false,
        lastUpdated: new Date().toISOString(),
        verified: false,
        confidence: 0.7,
        source: 'ai'
      };
    }
  }

  // البحث عن البند في قاعدة البيانات
  private findItemInDatabase(itemName: string): EnhancedItem | null {
    const searchTerms = itemName.toLowerCase().split(' ');
    
    return enhancedItems.find(dbItem => {
      const itemText = `${dbItem.nameAr} ${dbItem.nameEn} ${dbItem.specifications}`.toLowerCase();
      return searchTerms.some(term => itemText.includes(term));
    }) || null;
  }

  // حساب السعر مع عوامل السوق
  private calculateMarketPrice(item: EnhancedItem, context: {
    region: string;
    quantity: number;
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    marketConditions: 'stable' | 'volatile' | 'rising' | 'falling';
  }): {
    finalPrice: number;
    priceRange: { min: number; max: number; average: number };
    confidence: number;
    breakdown: any;
    insights: MarketInsight[];
    risks: RiskFactor[];
    optimizations: Optimization[];
  } {
    let basePrice = item.currentPrice;
    let finalPrice = basePrice;
    
    const breakdown = {
      basePrice,
      seasonalAdjustment: 0,
      demandAdjustment: 0,
      qualityAdjustment: 0,
      quantityDiscount: 0,
      urgencyPremium: 0,
      supplierAdjustment: 0,
      marketAdjustment: 0,
      riskPremium: 0
    };

    // تعديل إقليمي
    if (item.regionalPrices[context.region as keyof typeof item.regionalPrices]) {
      const regionalPrice = item.regionalPrices[context.region as keyof typeof item.regionalPrices];
      breakdown.marketAdjustment = regionalPrice - basePrice;
      finalPrice = regionalPrice;
    }

    // تعديل موسمي
    const seasonalFactor = item.seasonalFactors[context.season];
    breakdown.seasonalAdjustment = (seasonalFactor - 1) * finalPrice;
    finalPrice *= seasonalFactor;

    // خصم الكمية
    if (context.quantity > 50) {
      const discountRate = Math.min(0.1, (context.quantity - 50) / 500 * 0.05);
      breakdown.quantityDiscount = -finalPrice * discountRate;
      finalPrice *= (1 - discountRate);
    }

    // تعديل حسب ظروف السوق
    switch (context.marketConditions) {
      case 'rising':
        breakdown.demandAdjustment = finalPrice * 0.05;
        finalPrice *= 1.05;
        break;
      case 'falling':
        breakdown.demandAdjustment = -finalPrice * 0.03;
        finalPrice *= 0.97;
        break;
      case 'volatile':
        breakdown.riskPremium = finalPrice * 0.02;
        finalPrice *= 1.02;
        break;
    }

    // حساب نطاق الأسعار
    const priceRange = {
      min: Math.round(finalPrice * 0.9),
      max: Math.round(finalPrice * 1.15),
      average: Math.round(finalPrice)
    };

    // تحديد مستوى الثقة
    const confidence = this.calculateConfidence(item, context);

    // توليد رؤى السوق
    const insights = this.generateMarketInsights(item, context);
    
    // تحديد عوامل المخاطر
    const risks = this.identifyRiskFactors(item, context);
    
    // اقتراحات التحسين
    const optimizations = this.generateOptimizations(item, context);

    return {
      finalPrice: Math.round(finalPrice),
      priceRange,
      confidence,
      breakdown,
      insights,
      risks,
      optimizations
    };
  }

  // حساب مستوى الثقة
  private calculateConfidence(item: EnhancedItem, context: any): number {
    let confidence = 0.8; // ثقة أساسية

    // زيادة الثقة للبنود المحدثة حديثاً
    const daysSinceUpdate = (Date.now() - new Date(item.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 7) confidence += 0.1;
    else if (daysSinceUpdate > 30) confidence -= 0.1;

    // تقليل الثقة للأسواق المتقلبة
    if (item.volatility === 'high') confidence -= 0.1;
    else if (item.volatility === 'low') confidence += 0.05;

    // تعديل حسب توفر الموردين
    if (item.suppliers.length > 3) confidence += 0.05;
    else if (item.suppliers.length < 2) confidence -= 0.1;

    return Math.max(0.5, Math.min(0.95, confidence));
  }

  // توليد رؤى السوق
  private generateMarketInsights(item: EnhancedItem, context: any): MarketInsight[] {
    const insights: MarketInsight[] = [];

    // رؤى الاتجاه
    if (item.marketTrend === 'rising') {
      insights.push({
        type: 'trend',
        message: `أسعار ${item.nameAr} في اتجاه صاعد. يُنصح بالشراء المبكر.`,
        impact: 'medium',
        itemName: item.nameAr
      });
    } else if (item.marketTrend === 'falling') {
      insights.push({
        type: 'trend',
        message: `أسعار ${item.nameAr} في اتجاه هابط. قد يكون من المفيد التأجيل.`,
        impact: 'low',
        itemName: item.nameAr
      });
    }

    // رؤى الموسم
    const currentSeason = this.getCurrentSeason();
    const seasonalFactor = item.seasonalFactors[currentSeason];
    if (seasonalFactor > 1.05) {
      insights.push({
        type: 'seasonal',
        message: `الموسم الحالي يؤثر على زيادة أسعار ${item.nameAr} بنسبة ${((seasonalFactor - 1) * 100).toFixed(1)}%`,
        impact: 'medium'
      });
    }

    // رؤى الكمية
    if (context.quantity > 100) {
      insights.push({
        type: 'quantity',
        message: `الكمية الكبيرة تؤهلك لخصم على ${item.nameAr}`,
        impact: 'low'
      });
    }

    return insights;
  }

  // تحديد عوامل المخاطر
  private identifyRiskFactors(item: EnhancedItem, context: any): RiskFactor[] {
    const risks: RiskFactor[] = [];

    // مخاطر التقلب
    if (item.volatility === 'high') {
      risks.push({
        type: 'price_volatility',
        level: 'high',
        description: `أسعار ${item.nameAr} متقلبة بشدة`,
        impact: 15,
        mitigation: 'تأمين العقود بأسعار ثابتة'
      });
    }

    // مخاطر التوريد
    if (item.suppliers.length < 2) {
      risks.push({
        type: 'supply_risk',
        level: 'medium',
        description: `عدد محدود من الموردين لـ ${item.nameAr}`,
        impact: 10,
        mitigation: 'البحث عن موردين بديلين'
      });
    }

    // مخاطر الموسم
    const seasonalFactor = item.seasonalFactors[this.getCurrentSeason()];
    if (seasonalFactor > 1.1) {
      risks.push({
        type: 'seasonal_risk',
        level: 'medium',
        description: 'ارتفاع أسعار موسمي',
        impact: 8,
        mitigation: 'التخطيط للشراء في مواسم أخرى'
      });
    }

    return risks;
  }

  // توليد اقتراحات التحسين
  private generateOptimizations(item: EnhancedItem, context: any): Optimization[] {
    const optimizations: Optimization[] = [];

    // تحسين الكمية
    if (context.quantity < 50 && context.quantity > 10) {
      optimizations.push({
        type: 'quantity',
        description: `زيادة الكمية إلى 50 وحدة للحصول على خصم`,
        potentialSaving: item.currentPrice * context.quantity * 0.05,
        effort: 'low'
      });
    }

    // تحسين التوقيت
    const bestSeason = Object.entries(item.seasonalFactors)
      .reduce((min, [season, factor]) => factor < min[1] ? [season, factor] : min);
    
    if (bestSeason[1] < 0.95) {
      optimizations.push({
        type: 'timing',
        description: `الشراء في ${this.getSeasonName(bestSeason[0])} يوفر ${((1 - bestSeason[1]) * 100).toFixed(1)}%`,
        potentialSaving: item.currentPrice * context.quantity * (1 - bestSeason[1]),
        effort: 'medium'
      });
    }

    // تحسين الجودة
    if (item.qualityGrades.economy.multiplier < 0.9) {
      optimizations.push({
        type: 'quality',
        description: `استخدام الدرجة الاقتصادية يوفر ${((1 - item.qualityGrades.economy.multiplier) * 100).toFixed(1)}%`,
        potentialSaving: item.currentPrice * context.quantity * (1 - item.qualityGrades.economy.multiplier),
        effort: 'low'
      });
    }

    return optimizations;
  }

  // تقدير السعر للبنود غير الموجودة في قاعدة البيانات
  private estimatePrice(item: BOQItem): { price: number; range: { min: number; max: number; average: number } } {
    // خوارزمية تقدير بسيطة بناءً على نوع البند والوحدة
    let basePrice = 50; // سعر افتراضي

    // تعديل حسب نوع البند
    const itemName = item.itemName.toLowerCase();
    
    if (itemName.includes('خرسانة') || itemName.includes('concrete')) {
      basePrice = 280;
    } else if (itemName.includes('حديد') || itemName.includes('steel')) {
      basePrice = 2700;
    } else if (itemName.includes('بلاط') || itemName.includes('tile')) {
      basePrice = 95;
    } else if (itemName.includes('دهان') || itemName.includes('paint')) {
      basePrice = 32;
    } else if (itemName.includes('كهرباء') || itemName.includes('electrical')) {
      basePrice = 45;
    } else if (itemName.includes('سباكة') || itemName.includes('plumbing')) {
      basePrice = 24;
    }

    // تعديل حسب الوحدة
    if (item.unit.includes('طن') || item.unit.includes('ton')) {
      basePrice *= 10;
    } else if (item.unit.includes('م³') || item.unit.includes('cubic')) {
      basePrice *= 3;
    }

    // إضافة تقلب عشوائي
    const randomFactor = 0.8 + Math.random() * 0.4; // ±20%
    const finalPrice = Math.round(basePrice * randomFactor);

    return {
      price: finalPrice,
      range: {
        min: Math.round(finalPrice * 0.85),
        max: Math.round(finalPrice * 1.25),
        average: finalPrice
      }
    };
  }

  // الحصول على الموسم الحالي
  private getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }

  // الحصول على ظروف السوق الحالية
  private getCurrentMarketConditions(): 'stable' | 'volatile' | 'rising' | 'falling' {
    // تحليل الأخبار الأخيرة لتحديد اتجاه السوق
    const recentNews = liveMarketNews.slice(0, 5);
    let risingCount = 0;
    let fallingCount = 0;

    recentNews.forEach(news => {
      if (news.priceChange > 2) risingCount++;
      else if (news.priceChange < -2) fallingCount++;
    });

    if (risingCount > fallingCount + 1) return 'rising';
    if (fallingCount > risingCount + 1) return 'falling';
    if (Math.abs(risingCount - fallingCount) <= 1 && recentNews.length > 3) return 'volatile';
    return 'stable';
  }

  // الحصول على اسم الموسم
  private getSeasonName(season: string): string {
    const seasonNames: { [key: string]: string } = {
      spring: 'الربيع',
      summer: 'الصيف',
      autumn: 'الخريف',
      winter: 'الشتاء'
    };
    return seasonNames[season] || season;
  }

  // مسح الكاش
  clearCache(): void {
    this.cache.clear();
  }
}

export const marketPricingEngine = MarketPricingEngine.getInstance();