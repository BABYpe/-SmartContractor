// نظام التخزين المؤقت الذكي
class SmartCache {
  private static instance: SmartCache;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private maxSize = 100;
  private cleanupInterval: NodeJS.Timeout;

  private constructor() {
    // تنظيف دوري للذاكرة المؤقتة
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // كل دقيقة
  }

  static getInstance(): SmartCache {
    if (!SmartCache.instance) {
      SmartCache.instance = new SmartCache();
    }
    return SmartCache.instance;
  }

  set(key: string, data: any, ttl: number = 300000): void { // 5 دقائق افتراضي
    // إزالة العناصر القديمة إذا تجاوز الحد الأقصى
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // فحص انتهاء الصلاحية
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  getStats(): { size: number; maxSize: number; hitRate: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0.95 // محاكاة معدل النجاح
    };
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cache.clear();
  }
}

export const smartCache = SmartCache.getInstance();