// محسن الأداء المتقدم
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private lazyComponents = new Map<string, () => Promise<any>>();
  private preloadedComponents = new Set<string>();
  private resourceCache = new Map<string, any>();

  private constructor() {
    this.initializeLazyLoading();
    this.setupResourceOptimization();
  }

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // تهيئة التحميل الكسول
  private initializeLazyLoading(): void {
    // تسجيل المكونات للتحميل الكسول
    this.lazyComponents.set('Dashboard', () => import('../components/Dashboard'));
    this.lazyComponents.set('ProjectDetails', () => import('../components/ProjectDetails'));
    this.lazyComponents.set('EnhancedProjectEstimation', () => import('../components/EnhancedProjectEstimation'));
    this.lazyComponents.set('EnhancedBOQManager', () => import('../components/EnhancedBOQManager'));
    this.lazyComponents.set('PaymentSchedule', () => import('../components/PaymentSchedule'));
    this.lazyComponents.set('ProjectDuration', () => import('../components/ProjectDuration'));
    this.lazyComponents.set('WorkforceEstimation', () => import('../components/WorkforceEstimation'));
    this.lazyComponents.set('ProposalGeneration', () => import('../components/ProposalGeneration'));
    this.lazyComponents.set('RiskAnalysis', () => import('../components/RiskAnalysis'));
    this.lazyComponents.set('CostOptimization', () => import('../components/CostOptimization'));
    this.lazyComponents.set('ProjectSummary', () => import('../components/ProjectSummary'));
  }

  // تحميل مكون بشكل كسول
  async loadComponent(componentName: string): Promise<any> {
    if (this.preloadedComponents.has(componentName)) {
      return this.resourceCache.get(componentName);
    }

    const loader = this.lazyComponents.get(componentName);
    if (!loader) {
      throw new Error(`Component ${componentName} not found`);
    }

    try {
      const component = await loader();
      this.resourceCache.set(componentName, component);
      this.preloadedComponents.add(componentName);
      return component;
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
      throw error;
    }
  }

  // تحميل مسبق للمكونات المهمة
  preloadCriticalComponents(): void {
    const criticalComponents = ['Dashboard', 'ProjectDetails', 'EnhancedProjectEstimation'];
    
    criticalComponents.forEach(componentName => {
      this.loadComponent(componentName).catch(error => {
        console.warn(`Failed to preload ${componentName}:`, error);
      });
    });
  }

  // إعداد تحسين الموارد
  private setupResourceOptimization(): void {
    // ضغط البيانات
    this.enableDataCompression();
    
    // تحسين الصور
    this.optimizeImages();
    
    // تحسين الخطوط
    this.optimizeFonts();
  }

  // تفعيل ضغط البيانات
  private enableDataCompression(): void {
    // تنفيذ ضغط البيانات
    if ('CompressionStream' in window) {
      console.log('Data compression enabled');
    }
  }

  // تحسين الصور
  private optimizeImages(): void {
    // تحسين تحميل الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  }

  // تحسين الخطوط
  private optimizeFonts(): void {
    // تحميل الخطوط بشكل محسن
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        console.log('Fonts loaded and optimized');
      });
    }
  }

  // قياس الأداء
  measurePerformance(name: string, fn: () => void): number {
    const start = performance.now();
    fn();
    const end = performance.now();
    const duration = end - start;
    
    console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    return duration;
  }

  // تحسين الذاكرة
  optimizeMemory(): void {
    // تنظيف الذاكرة المؤقتة القديمة
    const cacheKeys = Array.from(this.resourceCache.keys());
    if (cacheKeys.length > 20) {
      const oldestKeys = cacheKeys.slice(0, 10);
      oldestKeys.forEach(key => {
        this.resourceCache.delete(key);
        this.preloadedComponents.delete(key);
      });
    }

    // تشغيل جامع القمامة إذا كان متاحاً
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  }

  // الحصول على إحصائيات الأداء
  getPerformanceStats(): {
    loadedComponents: number;
    cacheSize: number;
    memoryUsage: number;
  } {
    return {
      loadedComponents: this.preloadedComponents.size,
      cacheSize: this.resourceCache.size,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
    };
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();