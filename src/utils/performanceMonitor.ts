// مراقب الأداء المبسط والفعال
class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics = new Map<string, number[]>();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // الاحتفاظ بآخر 50 قياس فقط
    if (values.length > 50) {
      values.shift();
    }
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
  } {
    return {
      loadTime: this.getAverageMetric('navigation_load') || 0,
      renderTime: this.getAverageMetric('component_render') || 0,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
    };
  }

  private getAverageMetric(name: string): number | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();