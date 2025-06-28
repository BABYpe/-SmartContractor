// مراقب الأداء الذكي
class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics = new Map<string, number[]>();
  private observers: PerformanceObserver[] = [];

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers(): void {
    // مراقبة أوقات التحميل
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(`${entry.entryType}_${entry.name}`, entry.duration);
        }
      });

      observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
      this.observers.push(observer);
    }
  }

  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // الاحتفاظ بآخر 100 قياس فقط
    if (values.length > 100) {
      values.shift();
    }
  }

  getMetric(name: string): { avg: number; min: number; max: number } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { avg, min, max };
  }

  getAllMetrics(): Record<string, { avg: number; min: number; max: number }> {
    const result: Record<string, { avg: number; min: number; max: number }> = {};
    
    for (const [name] of this.metrics) {
      const metric = this.getMetric(name);
      if (metric) {
        result[name] = metric;
      }
    }

    return result;
  }

  // قياس أداء دالة
  async measureFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_error`, duration);
      throw error;
    }
  }

  // تحليل الأداء العام
  getPerformanceReport(): {
    loadTime: number;
    renderTime: number;
    memoryUsage: number;
    cacheHitRate: number;
  } {
    return {
      loadTime: this.getMetric('navigation_load')?.avg || 0,
      renderTime: this.getMetric('component_render')?.avg || 0,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      cacheHitRate: 0.95 // محاكاة
    };
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();