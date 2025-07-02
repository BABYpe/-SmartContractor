// Market pricing engine for real-time price updates
interface MarketPrice {
  itemName: string;
  basePrice: number;
  currentPrice: number;
  priceChange: number;
  lastUpdated: string;
  confidence: number;
  sources: string[];
}

interface PriceRange {
  min: number;
  max: number;
  average: number;
}

class MarketPricingEngine {
  private priceCache = new Map<string, MarketPrice>();
  private lastUpdate = new Date();

  constructor() {
    this.initializePricing();
  }

  private initializePricing(): void {
    // Initialize with sample market data
    this.updateMarketPrices();
  }

  // Get market price for an item
  getMarketPrice(itemName: string, city: string = 'riyadh'): number {
    const cacheKey = `${itemName}_${city}`;
    const cached = this.priceCache.get(cacheKey);
    
    if (cached && this.isCacheValid(cached)) {
      return cached.currentPrice;
    }

    // Generate realistic price based on item name
    const basePrice = this.calculateBasePrice(itemName);
    const cityMultiplier = this.getCityMultiplier(city);
    const marketPrice = Math.round(basePrice * cityMultiplier);

    // Cache the result
    this.priceCache.set(cacheKey, {
      itemName,
      basePrice,
      currentPrice: marketPrice,
      priceChange: (Math.random() - 0.5) * 0.1, // ±5% change
      lastUpdated: new Date().toISOString(),
      confidence: 0.85 + Math.random() * 0.1,
      sources: ['السوق المحلي', 'بيانات الموردين']
    });

    return marketPrice;
  }

  // Calculate base price from item name
  private calculateBasePrice(itemName: string): number {
    const lowerName = itemName.toLowerCase();
    
    // Construction materials pricing
    if (lowerName.includes('خرسانة') || lowerName.includes('concrete')) {
      return 280 + Math.random() * 40; // 280-320 SAR/m³
    }
    
    if (lowerName.includes('حديد') || lowerName.includes('steel') || lowerName.includes('تسليح')) {
      return 2700 + Math.random() * 200; // 2700-2900 SAR/ton
    }
    
    if (lowerName.includes('حفر') || lowerName.includes('excavation')) {
      return 45 + Math.random() * 10; // 45-55 SAR/m³
    }
    
    if (lowerName.includes('بناء') || lowerName.includes('بلوك') || lowerName.includes('masonry')) {
      return 85 + Math.random() * 15; // 85-100 SAR/m²
    }
    
    if (lowerName.includes('بلاط') || lowerName.includes('tile') || lowerName.includes('سيراميك')) {
      return 95 + Math.random() * 20; // 95-115 SAR/m²
    }
    
    if (lowerName.includes('دهان') || lowerName.includes('paint')) {
      return 30 + Math.random() * 10; // 30-40 SAR/m²
    }
    
    if (lowerName.includes('كهرباء') || lowerName.includes('electrical')) {
      return 45 + Math.random() * 15; // 45-60 SAR/point
    }
    
    if (lowerName.includes('سباكة') || lowerName.includes('plumbing')) {
      return 25 + Math.random() * 10; // 25-35 SAR/m
    }
    
    if (lowerName.includes('عزل') || lowerName.includes('insulation')) {
      return 32 + Math.random() * 8; // 32-40 SAR/m²
    }
    
    // Default pricing for unknown items
    return 50 + Math.random() * 100;
  }

  // Get city price multiplier
  private getCityMultiplier(city: string): number {
    const multipliers: Record<string, number> = {
      'riyadh': 1.0,
      'jeddah': 1.05,
      'dammam': 1.02,
      'makkah': 1.08,
      'madinah': 1.03,
      'khobar': 1.04,
      'abha': 0.95,
      'taif': 0.98,
      'tabuk': 0.92,
      'hail': 0.90,
      'qassim': 0.93
    };
    
    return multipliers[city] || 1.0;
  }

  // Check if cached price is still valid
  private isCacheValid(price: MarketPrice): boolean {
    const now = new Date();
    const lastUpdate = new Date(price.lastUpdated);
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
    
    return hoursSinceUpdate < 24; // Cache valid for 24 hours
  }

  // Update market prices (simulate market fluctuations)
  private updateMarketPrices(): void {
    // This would typically fetch from external APIs
    // For now, we'll simulate market updates
    this.lastUpdate = new Date();
  }

  // Get price range for an item
  getPriceRange(itemName: string): PriceRange {
    const basePrice = this.calculateBasePrice(itemName);
    const variation = 0.15; // ±15% variation
    
    return {
      min: Math.round(basePrice * (1 - variation)),
      max: Math.round(basePrice * (1 + variation)),
      average: Math.round(basePrice)
    };
  }

  // Update prices for multiple BOQ items
  async updatePricesForItems(items: any[], city: string): Promise<any[]> {
    return items.map(item => {
      const price = this.getMarketPrice(item.itemName, city);
      const priceRange = this.getPriceRange(item.itemName);
      
      return {
        ...item,
        price,
        priceRange,
        loading: false,
        error: false,
        lastUpdated: new Date().toISOString()
      };
    });
  }

  // Get market trends
  getMarketTrends(): Array<{
    category: string;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }> {
    return [
      { category: 'خرسانة ومواد إنشائية', trend: 'up', change: 2.3 },
      { category: 'حديد وصلب', trend: 'up', change: 3.1 },
      { category: 'مواد التشطيب', trend: 'down', change: -1.2 },
      { category: 'أعمال كهروميكانيكية', trend: 'stable', change: 0.5 },
      { category: 'مواد العزل', trend: 'up', change: 1.8 }
    ];
  }

  // Clear price cache
  clearCache(): void {
    this.priceCache.clear();
  }

  // Get cache statistics
  getCacheStats(): {
    size: number;
    hitRate: number;
    lastUpdate: Date;
  } {
    return {
      size: this.priceCache.size,
      hitRate: 0.85, // Simulated hit rate
      lastUpdate: this.lastUpdate
    };
  }
}

export const marketPricingEngine = new MarketPricingEngine();