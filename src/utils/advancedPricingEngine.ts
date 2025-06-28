// محرك التسعير المتقدم بالذكاء الاصطناعي
export class AdvancedPricingEngine {
  private static instance: AdvancedPricingEngine;
  private models = new Map<string, any>();
  private trainingData = new Map<string, any[]>();
  private isTraining = false;

  private constructor() {}

  static getInstance(): AdvancedPricingEngine {
    if (!AdvancedPricingEngine.instance) {
      AdvancedPricingEngine.instance = new AdvancedPricingEngine();
    }
    return AdvancedPricingEngine.instance;
  }

  // تدريب النماذج
  async trainModels(): Promise<void> {
    if (this.isTraining) return;
    
    this.isTraining = true;
    
    try {
      // تحميل بيانات التدريب المضغوطة
      await this.loadTrainingData();
      
      // تدريب نموذج التسعير الأساسي
      await this.trainBasicPricingModel();
      
      // تدريب نموذج التنبؤ بالأسعار
      await this.trainPricePredictionModel();
      
      // تدريب نموذج تحليل المخاطر
      await this.trainRiskAnalysisModel();
      
    } finally {
      this.isTraining = false;
    }
  }

  // تحميل بيانات التدريب
  private async loadTrainingData(): Promise<void> {
    const { databaseOptimizer } = await import('./databaseOptimizer');
    
    // بيانات تدريب مضغوطة للتسعير
    const pricingData = await databaseOptimizer.getCompressed('cache', 'pricing_training_data') || 
      this.generateSyntheticPricingData();
    
    this.trainingData.set('pricing', pricingData);
    
    // حفظ البيانات للمرات القادمة
    await databaseOptimizer.saveCompressed('cache', 'pricing_training_data', pricingData);
  }

  // توليد بيانات تدريب اصطناعية
  private generateSyntheticPricingData(): any[] {
    const data = [];
    const categories = ['concrete', 'steel', 'masonry', 'electrical', 'plumbing'];
    const regions = ['riyadh', 'jeddah', 'dammam', 'madinah'];
    
    for (let i = 0; i < 1000; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const basePrice = Math.random() * 500 + 50;
      const seasonalFactor = 0.8 + Math.random() * 0.4;
      const demandFactor = 0.9 + Math.random() * 0.2;
      
      data.push({
        category,
        region,
        basePrice,
        seasonalFactor,
        demandFactor,
        finalPrice: basePrice * seasonalFactor * demandFactor,
        timestamp: Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      });
    }
    
    return data;
  }

  // تدريب نموذج التسعير الأساسي
  private async trainBasicPricingModel(): Promise<void> {
    const data = this.trainingData.get('pricing') || [];
    
    // نموذج انحدار خطي بسيط
    const model = {
      weights: new Map<string, number>(),
      bias: 0,
      trained: true
    };

    // حساب الأوزان للفئات والمناطق
    const categoryWeights = this.calculateCategoryWeights(data);
    const regionWeights = this.calculateRegionWeights(data);
    
    model.weights.set('category', categoryWeights);
    model.weights.set('region', regionWeights);
    
    this.models.set('basic_pricing', model);
  }

  // حساب أوزان الفئات
  private calculateCategoryWeights(data: any[]): Record<string, number> {
    const categoryPrices: Record<string, number[]> = {};
    
    data.forEach(item => {
      if (!categoryPrices[item.category]) {
        categoryPrices[item.category] = [];
      }
      categoryPrices[item.category].push(item.finalPrice);
    });

    const weights: Record<string, number> = {};
    for (const [category, prices] of Object.entries(categoryPrices)) {
      weights[category] = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    }

    return weights;
  }

  // حساب أوزان المناطق
  private calculateRegionWeights(data: any[]): Record<string, number> {
    const regionPrices: Record<string, number[]> = {};
    
    data.forEach(item => {
      if (!regionPrices[item.region]) {
        regionPrices[item.region] = [];
      }
      regionPrices[item.region].push(item.finalPrice);
    });

    const weights: Record<string, number> = {};
    for (const [region, prices] of Object.entries(regionPrices)) {
      weights[region] = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    }

    return weights;
  }

  // تدريب نموذج التنبؤ بالأسعار
  private async trainPricePredictionModel(): Promise<void> {
    const model = {
      trendAnalysis: this.analyzePriceTrends(),
      seasonalPatterns: this.analyzeSeasonalPatterns(),
      volatilityModel: this.buildVolatilityModel(),
      trained: true
    };

    this.models.set('price_prediction', model);
  }

  // تحليل اتجاهات الأسعار
  private analyzePriceTrends(): Record<string, number> {
    const data = this.trainingData.get('pricing') || [];
    const trends: Record<string, number> = {};

    // تحليل بسيط للاتجاهات
    const categories = [...new Set(data.map(item => item.category))];
    
    categories.forEach(category => {
      const categoryData = data.filter(item => item.category === category)
        .sort((a, b) => a.timestamp - b.timestamp);
      
      if (categoryData.length > 1) {
        const firstPrice = categoryData[0].finalPrice;
        const lastPrice = categoryData[categoryData.length - 1].finalPrice;
        trends[category] = (lastPrice - firstPrice) / firstPrice;
      } else {
        trends[category] = 0;
      }
    });

    return trends;
  }

  // تحليل الأنماط الموسمية
  private analyzeSeasonalPatterns(): Record<string, Record<string, number>> {
    const data = this.trainingData.get('pricing') || [];
    const patterns: Record<string, Record<string, number>> = {};

    data.forEach(item => {
      const month = new Date(item.timestamp).getMonth();
      const season = this.getSeasonFromMonth(month);
      
      if (!patterns[item.category]) {
        patterns[item.category] = {};
      }
      
      if (!patterns[item.category][season]) {
        patterns[item.category][season] = 0;
      }
      
      patterns[item.category][season] += item.seasonalFactor;
    });

    // حساب المتوسطات
    for (const category of Object.keys(patterns)) {
      for (const season of Object.keys(patterns[category])) {
        const count = data.filter(item => 
          item.category === category && 
          this.getSeasonFromMonth(new Date(item.timestamp).getMonth()) === season
        ).length;
        
        if (count > 0) {
          patterns[category][season] /= count;
        }
      }
    }

    return patterns;
  }

  // الحصول على الموسم من الشهر
  private getSeasonFromMonth(month: number): string {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }

  // بناء نموذج التقلبات
  private buildVolatilityModel(): Record<string, number> {
    const data = this.trainingData.get('pricing') || [];
    const volatility: Record<string, number> = {};

    const categories = [...new Set(data.map(item => item.category))];
    
    categories.forEach(category => {
      const categoryPrices = data
        .filter(item => item.category === category)
        .map(item => item.finalPrice);
      
      if (categoryPrices.length > 1) {
        const mean = categoryPrices.reduce((sum, price) => sum + price, 0) / categoryPrices.length;
        const variance = categoryPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / categoryPrices.length;
        volatility[category] = Math.sqrt(variance) / mean;
      } else {
        volatility[category] = 0.1; // تقلب افتراضي
      }
    });

    return volatility;
  }

  // تدريب نموذج تحليل المخاطر
  private async trainRiskAnalysisModel(): Promise<void> {
    const model = {
      riskFactors: this.identifyRiskFactors(),
      riskScoring: this.buildRiskScoringModel(),
      mitigation: this.buildMitigationStrategies(),
      trained: true
    };

    this.models.set('risk_analysis', model);
  }

  // تحديد عوامل المخاطر
  private identifyRiskFactors(): Record<string, number> {
    return {
      market_volatility: 0.3,
      seasonal_demand: 0.2,
      supply_chain: 0.25,
      economic_factors: 0.15,
      regulatory_changes: 0.1
    };
  }

  // بناء نموذج تسجيل المخاطر
  private buildRiskScoringModel(): any {
    return {
      calculateRisk: (factors: Record<string, number>) => {
        const weights = this.identifyRiskFactors();
        let totalRisk = 0;
        
        for (const [factor, value] of Object.entries(factors)) {
          if (weights[factor]) {
            totalRisk += weights[factor] * value;
          }
        }
        
        return Math.min(Math.max(totalRisk, 0), 1);
      }
    };
  }

  // بناء استراتيجيات التخفيف
  private buildMitigationStrategies(): Record<string, string[]> {
    return {
      high_volatility: [
        'استخدام عقود أسعار ثابتة',
        'تنويع الموردين',
        'زيادة المخزون الاستراتيجي'
      ],
      supply_chain_risk: [
        'تطوير موردين محليين',
        'إنشاء شراكات طويلة المدى',
        'تحسين التنبؤ بالطلب'
      ],
      seasonal_demand: [
        'تخطيط الإنتاج الموسمي',
        'تطوير منتجات بديلة',
        'تحسين إدارة المخزون'
      ]
    };
  }

  // التنبؤ بالسعر
  async predictPrice(itemCategory: string, region: string, quantity: number): Promise<{
    predictedPrice: number;
    confidence: number;
    factors: Record<string, number>;
  }> {
    const basicModel = this.models.get('basic_pricing');
    const predictionModel = this.models.get('price_prediction');
    
    if (!basicModel || !predictionModel) {
      throw new Error('Models not trained yet');
    }

    // حساب السعر الأساسي
    const categoryWeight = basicModel.weights.get('category')[itemCategory] || 100;
    const regionWeight = basicModel.weights.get('region')[region] || 1;
    
    // تطبيق العوامل الموسمية
    const currentSeason = this.getSeasonFromMonth(new Date().getMonth());
    const seasonalFactor = predictionModel.seasonalPatterns[itemCategory]?.[currentSeason] || 1;
    
    // تطبيق عامل الكمية
    const quantityFactor = this.calculateQuantityDiscount(quantity);
    
    // حساب السعر النهائي
    const predictedPrice = categoryWeight * regionWeight * seasonalFactor * quantityFactor;
    
    // حساب مستوى الثقة
    const volatility = predictionModel.volatilityModel[itemCategory] || 0.1;
    const confidence = Math.max(0.5, 1 - volatility);
    
    return {
      predictedPrice,
      confidence,
      factors: {
        base: categoryWeight,
        region: regionWeight,
        seasonal: seasonalFactor,
        quantity: quantityFactor,
        volatility
      }
    };
  }

  // حساب خصم الكمية
  private calculateQuantityDiscount(quantity: number): number {
    if (quantity > 1000) return 0.9;
    if (quantity > 500) return 0.95;
    if (quantity > 100) return 0.98;
    return 1;
  }

  // تحليل المخاطر
  async analyzeRisk(projectData: any): Promise<{
    riskScore: number;
    riskFactors: Record<string, number>;
    recommendations: string[];
  }> {
    const riskModel = this.models.get('risk_analysis');
    
    if (!riskModel) {
      throw new Error('Risk analysis model not trained');
    }

    // تحليل عوامل المخاطر
    const riskFactors = {
      market_volatility: this.assessMarketVolatility(projectData),
      seasonal_demand: this.assessSeasonalRisk(projectData),
      supply_chain: this.assessSupplyChainRisk(projectData),
      economic_factors: this.assessEconomicRisk(projectData),
      regulatory_changes: this.assessRegulatoryRisk(projectData)
    };

    // حساب نقاط المخاطر
    const riskScore = riskModel.riskScoring.calculateRisk(riskFactors);
    
    // توليد التوصيات
    const recommendations = this.generateRiskRecommendations(riskFactors, riskModel.mitigation);

    return {
      riskScore,
      riskFactors,
      recommendations
    };
  }

  // تقييم تقلبات السوق
  private assessMarketVolatility(projectData: any): number {
    const predictionModel = this.models.get('price_prediction');
    if (!predictionModel) return 0.5;

    const volatility = predictionModel.volatilityModel[projectData.category] || 0.1;
    return Math.min(volatility * 5, 1); // تحويل إلى نطاق 0-1
  }

  // تقييم المخاطر الموسمية
  private assessSeasonalRisk(projectData: any): number {
    const currentMonth = new Date().getMonth();
    const season = this.getSeasonFromMonth(currentMonth);
    
    // المخاطر أعلى في الصيف والشتاء
    if (season === 'summer' || season === 'winter') return 0.7;
    return 0.3;
  }

  // تقييم مخاطر سلسلة التوريد
  private assessSupplyChainRisk(projectData: any): number {
    // تقييم بسيط بناءً على المنطقة ونوع المشروع
    const regionRisk: Record<string, number> = {
      riyadh: 0.2,
      jeddah: 0.3,
      dammam: 0.25,
      madinah: 0.4
    };

    return regionRisk[projectData.region] || 0.3;
  }

  // تقييم المخاطر الاقتصادية
  private assessEconomicRisk(projectData: any): number {
    // تقييم ثابت للمخاطر الاقتصادية
    return 0.3;
  }

  // تقييم المخاطر التنظيمية
  private assessRegulatoryRisk(projectData: any): number {
    // مخاطر أقل للمشاريع السكنية، أعلى للصناعية
    const typeRisk: Record<string, number> = {
      residential: 0.2,
      commercial: 0.3,
      industrial: 0.5,
      infrastructure: 0.4
    };

    return typeRisk[projectData.projectType] || 0.3;
  }

  // توليد توصيات المخاطر
  private generateRiskRecommendations(
    riskFactors: Record<string, number>, 
    mitigationStrategies: Record<string, string[]>
  ): string[] {
    const recommendations: string[] = [];
    
    // تحديد أعلى المخاطر
    const sortedRisks = Object.entries(riskFactors)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    sortedRisks.forEach(([riskType, value]) => {
      if (value > 0.5) {
        const strategies = mitigationStrategies[riskType] || [];
        recommendations.push(...strategies);
      }
    });

    return [...new Set(recommendations)]; // إزالة التكرار
  }

  // إحصائيات النماذج
  getModelStats(): {
    trainedModels: number;
    trainingDataSize: number;
    lastTrainingTime: number;
  } {
    return {
      trainedModels: this.models.size,
      trainingDataSize: Array.from(this.trainingData.values())
        .reduce((sum, data) => sum + data.length, 0),
      lastTrainingTime: Date.now()
    };
  }
}

export const advancedPricingEngine = AdvancedPricingEngine.getInstance();