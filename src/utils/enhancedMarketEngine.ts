import { enhancedItems, liveMarketNews, type EnhancedItem, type MarketNews } from '../data/enhancedDatabase';

export class EnhancedMarketEngine {
  private static instance: EnhancedMarketEngine;
  private cache = new Map<string, any>();
  private lastUpdate = Date.now();
  private updateInterval = 30 * 60 * 1000; // 30 دقيقة

  static getInstance(): EnhancedMarketEngine {
    if (!EnhancedMarketEngine.instance) {
      EnhancedMarketEngine.instance = new EnhancedMarketEngine();
    }
    return EnhancedMarketEngine.instance;
  }

  constructor() {
    this.startRealTimeUpdates();
  }

  // بدء التحديثات المباشرة
  private startRealTimeUpdates(): void {
    setInterval(() => {
      this.updateMarketPrices();
      this.generateMarketNews();
    }, this.updateInterval);
  }

  // تحديث الأسعار بناءً على عوامل السوق الحقيقية
  private updateMarketPrices(): void {
    const now = Date.now();
    if (now - this.lastUpdate < this.updateInterval) return;

    enhancedItems.forEach(item => {
      // عوامل التقلب
      const volatilityFactor = this.getVolatilityFactor(item.volatility);
      const seasonalFactor = this.getCurrentSeasonalFactor(item);
      const trendFactor = this.getTrendFactor(item.marketTrend);
      
      // حساب السعر الجديد
      const baseChange = (Math.random() - 0.5) * volatilityFactor;
      const totalChange = baseChange * seasonalFactor * trendFactor;
      
      const newPrice = Math.round(item.currentPrice * (1 + totalChange));
      
      // تحديث السعر والتاريخ
      if (Math.abs(newPrice - item.currentPrice) > 0) {
        item.priceHistory.push({
          date: new Date().toISOString(),
          price: newPrice,
          source: 'real_time_update'
        });
        
        // الاحتفاظ بآخر 10 تحديثات فقط
        if (item.priceHistory.length > 10) {
          item.priceHistory = item.priceHistory.slice(-10);
        }
        
        item.currentPrice = newPrice;
        item.lastUpdated = new Date().toISOString();
        
        // تحديث الأسعار الإقليمية
        Object.keys(item.regionalPrices).forEach(region => {
          const regionalFactor = this.getRegionalFactor(region);
          item.regionalPrices[region as keyof typeof item.regionalPrices] = 
            Math.round(newPrice * regionalFactor);
        });
      }
    });

    this.lastUpdate = now;
    this.cache.clear(); // مسح الكاش لضمان البيانات المحدثة
  }

  private getVolatilityFactor(volatility: string): number {
    switch (volatility) {
      case 'high': return 0.05; // ±5%
      case 'medium': return 0.03; // ±3%
      case 'low': return 0.01; // ±1%
      default: return 0.02;
    }
  }

  private getCurrentSeasonalFactor(item: EnhancedItem): number {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return item.seasonalFactors.spring;
    if (month >= 5 && month <= 7) return item.seasonalFactors.summer;
    if (month >= 8 && month <= 10) return item.seasonalFactors.autumn;
    return item.seasonalFactors.winter;
  }

  private getTrendFactor(trend: string): number {
    switch (trend) {
      case 'rising': return 1.02; // اتجاه صاعد
      case 'falling': return 0.98; // اتجاه هابط
      case 'stable': return 1.0; // مستقر
      default: return 1.0;
    }
  }

  private getRegionalFactor(region: string): number {
    const factors: { [key: string]: number } = {
      riyadh: 1.0,
      jeddah: 1.05,
      dammam: 0.98,
      madinah: 1.02,
      abha: 0.95,
      tabuk: 0.97,
      hail: 0.93,
      qassim: 0.95
    };
    return factors[region] || 1.0;
  }

  // توليد أخبار السوق التلقائية
  private generateMarketNews(): void {
    const significantChanges = enhancedItems.filter(item => {
      if (item.priceHistory.length < 2) return false;
      const lastPrice = item.priceHistory[item.priceHistory.length - 2].price;
      const currentPrice = item.currentPrice;
      const changePercent = Math.abs((currentPrice - lastPrice) / lastPrice) * 100;
      return changePercent > 3; // تغيير أكثر من 3%
    });

    significantChanges.forEach(item => {
      const lastPrice = item.priceHistory[item.priceHistory.length - 2].price;
      const changePercent = ((item.currentPrice - lastPrice) / lastPrice) * 100;
      const isIncrease = changePercent > 0;
      
      const news: MarketNews = {
        id: `auto_${Date.now()}_${item.id}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('ar-SA'),
        titleAr: `${isIncrease ? 'ارتفاع' : 'انخفاض'} سعر ${item.nameAr} بنسبة ${Math.abs(changePercent).toFixed(1)}%`,
        titleEn: `${item.nameEn} price ${isIncrease ? 'increases' : 'decreases'} by ${Math.abs(changePercent).toFixed(1)}%`,
        contentAr: `شهد سعر ${item.nameAr} ${isIncrease ? 'ارتفاعاً' : 'انخفاضاً'} ملحوظاً بنسبة ${Math.abs(changePercent).toFixed(1)}% ليصل إلى ${item.currentPrice} ريال لكل ${item.unit}.`,
        contentEn: `${item.nameEn} price has ${isIncrease ? 'increased' : 'decreased'} significantly by ${Math.abs(changePercent).toFixed(1)}% to reach ${item.currentPrice} SAR per ${item.unit}.`,
        impact: Math.abs(changePercent) > 5 ? 'high' : 'medium',
        category: item.category,
        affectedItems: [item.id],
        priceChange: changePercent,
        source: 'Market Analysis System',
        isBreaking: Math.abs(changePercent) > 5
      };

      liveMarketNews.unshift(news);
      
      // الاحتفاظ بآخر 20 خبر فقط
      if (liveMarketNews.length > 20) {
        liveMarketNews.splice(20);
      }
    });
  }

  // البحث المتقدم
  searchItems(query: string, filters?: {
    category?: string;
    subcategory?: string;
    region?: string;
    priceRange?: { min: number; max: number };
    projectTypes?: string[];
  }): EnhancedItem[] {
    const cacheKey = `search_${query}_${JSON.stringify(filters)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let results = enhancedItems.filter(item => item.isActive);

    // البحث النصي
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(item => {
        const searchText = `${item.nameAr} ${item.nameEn} ${item.specifications}`.toLowerCase();
        return searchTerms.some(term => searchText.includes(term));
      });
    }

    // تطبيق المرشحات
    if (filters) {
      if (filters.category) {
        results = results.filter(item => item.category === filters.category);
      }
      if (filters.subcategory) {
        results = results.filter(item => item.subcategory === filters.subcategory);
      }
      if (filters.priceRange) {
        results = results.filter(item => 
          item.currentPrice >= filters.priceRange!.min && 
          item.currentPrice <= filters.priceRange!.max
        );
      }
      if (filters.projectTypes && filters.projectTypes.length > 0) {
        results = results.filter(item => 
          filters.projectTypes!.some(type => item.projectTypes.includes(type))
        );
      }
    }

    // ترتيب النتائج حسب الصلة
    results.sort((a, b) => {
      if (query.trim()) {
        const aRelevance = this.calculateRelevance(a, query);
        const bRelevance = this.calculateRelevance(b, query);
        return bRelevance - aRelevance;
      }
      return a.nameAr.localeCompare(b.nameAr);
    });

    this.cache.set(cacheKey, results);
    setTimeout(() => this.cache.delete(cacheKey), 300000); // 5 دقائق
    return results;
  }

  private calculateRelevance(item: EnhancedItem, query: string): number {
    const queryLower = query.toLowerCase();
    let score = 0;

    // تطابق في الاسم العربي
    if (item.nameAr.toLowerCase().includes(queryLower)) score += 10;
    if (item.nameAr.toLowerCase().startsWith(queryLower)) score += 5;

    // تطابق في الاسم الإنجليزي
    if (item.nameEn.toLowerCase().includes(queryLower)) score += 8;
    if (item.nameEn.toLowerCase().startsWith(queryLower)) score += 4;

    // تطابق في المواصفات
    if (item.specifications.toLowerCase().includes(queryLower)) score += 3;

    // تطابق في الكود
    if (item.code.toLowerCase().includes(queryLower)) score += 15;

    return score;
  }

  // الحصول على السعر الحالي
  getCurrentPrice(itemId: string, region: string = 'riyadh'): number {
    const item = enhancedItems.find(i => i.id === itemId);
    if (!item) return 0;
    
    return item.regionalPrices[region as keyof typeof item.regionalPrices] || item.currentPrice;
  }

  // الحصول على أخبار السوق
  getMarketNews(lang: 'ar' | 'en' = 'ar', limit: number = 10): MarketNews[] {
    return liveMarketNews.slice(0, limit).map(news => ({
      ...news,
      title: lang === 'ar' ? news.titleAr : news.titleEn,
      content: lang === 'ar' ? news.contentAr : news.contentEn
    }));
  }

  // الحصول على إحصائيات السوق
  getMarketStatistics(): {
    totalItems: number;
    priceChanges: { rising: number; falling: number; stable: number };
    averageVolatility: string;
    lastUpdate: string;
  } {
    const totalItems = enhancedItems.length;
    let rising = 0, falling = 0, stable = 0;

    enhancedItems.forEach(item => {
      if (item.priceHistory.length >= 2) {
        const lastPrice = item.priceHistory[item.priceHistory.length - 2].price;
        const currentPrice = item.currentPrice;
        const change = ((currentPrice - lastPrice) / lastPrice) * 100;
        
        if (change > 1) rising++;
        else if (change < -1) falling++;
        else stable++;
      }
    });

    const volatilityCounts = enhancedItems.reduce((acc, item) => {
      acc[item.volatility] = (acc[item.volatility] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const averageVolatility = Object.keys(volatilityCounts).reduce((a, b) => 
      volatilityCounts[a] > volatilityCounts[b] ? a : b
    );

    return {
      totalItems,
      priceChanges: { rising, falling, stable },
      averageVolatility,
      lastUpdate: new Date().toISOString()
    };
  }

  // الحصول على توقعات الأسعار
  getPriceForecast(itemId: string, days: number = 30): Array<{ date: string; predictedPrice: number }> {
    const item = enhancedItems.find(i => i.id === itemId);
    if (!item || item.priceHistory.length < 3) return [];

    const forecast: Array<{ date: string; predictedPrice: number }> = [];
    const recentPrices = item.priceHistory.slice(-5).map(h => h.price);
    
    // حساب الاتجاه العام
    const trend = this.calculateTrend(recentPrices);
    const volatility = this.getVolatilityFactor(item.volatility);
    
    let currentPrice = item.currentPrice;
    
    for (let i = 1; i <= days; i++) {
      const randomFactor = (Math.random() - 0.5) * volatility;
      const trendFactor = trend * (i / days) * 0.1; // تأثير الاتجاه يزيد مع الوقت
      
      currentPrice = currentPrice * (1 + trendFactor + randomFactor);
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i);
      
      forecast.push({
        date: futureDate.toISOString().split('T')[0],
        predictedPrice: Math.round(currentPrice)
      });
    }

    return forecast;
  }

  private calculateTrend(prices: number[]): number {
    if (prices.length < 2) return 0;
    
    let totalChange = 0;
    for (let i = 1; i < prices.length; i++) {
      totalChange += (prices[i] - prices[i-1]) / prices[i-1];
    }
    
    return totalChange / (prices.length - 1);
  }
}

export const enhancedMarketEngine = EnhancedMarketEngine.getInstance();