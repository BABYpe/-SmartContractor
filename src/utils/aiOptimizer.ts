import { smartCache } from './smartCache';
import { performanceMonitor } from './performanceMonitor';

// محسن الذكاء الاصطناعي
class AIOptimizer {
  private static instance: AIOptimizer;
  private requestQueue: Array<{ id: string; priority: number; request: () => Promise<any> }> = [];
  private isProcessing = false;
  private maxConcurrent = 3;
  private activeRequests = 0;

  private constructor() {}

  static getInstance(): AIOptimizer {
    if (!AIOptimizer.instance) {
      AIOptimizer.instance = new AIOptimizer();
    }
    return AIOptimizer.instance;
  }

  // تحسين طلبات الذكاء الاصطناعي
  async optimizeRequest<T>(
    id: string,
    request: () => Promise<T>,
    options: {
      priority?: number;
      cache?: boolean;
      cacheTTL?: number;
    } = {}
  ): Promise<T> {
    const { priority = 1, cache = true, cacheTTL = 300000 } = options;

    // فحص التخزين المؤقت أولاً
    if (cache) {
      const cached = smartCache.get(id);
      if (cached) {
        return cached;
      }
    }

    // إضافة إلى قائمة الانتظار
    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        id,
        priority,
        request: async () => {
          try {
            const result = await performanceMonitor.measureFunction(
              `ai_request_${id}`,
              request
            );
            
            if (cache) {
              smartCache.set(id, result, cacheTTL);
            }
            
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });

      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.activeRequests >= this.maxConcurrent) {
      return;
    }

    this.isProcessing = true;

    // ترتيب حسب الأولوية
    this.requestQueue.sort((a, b) => b.priority - a.priority);

    while (this.requestQueue.length > 0 && this.activeRequests < this.maxConcurrent) {
      const item = this.requestQueue.shift();
      if (item) {
        this.activeRequests++;
        item.request().finally(() => {
          this.activeRequests--;
          this.processQueue();
        });
      }
    }

    this.isProcessing = false;
  }

  // تحسين البيانات للذكاء الاصطناعي
  optimizePrompt(prompt: string, context?: any): string {
    let optimizedPrompt = prompt;

    // إضافة السياق إذا كان متوفراً
    if (context) {
      optimizedPrompt = `السياق: ${JSON.stringify(context)}\n\n${prompt}`;
    }

    // تحسين الطول
    if (optimizedPrompt.length > 4000) {
      optimizedPrompt = optimizedPrompt.substring(0, 4000) + '...';
    }

    // إضافة تعليمات التحسين
    optimizedPrompt += '\n\nيرجى تقديم إجابة دقيقة ومفصلة باللغة العربية.';

    return optimizedPrompt;
  }

  // تحليل جودة الاستجابة
  analyzeResponse(response: string): {
    quality: number;
    completeness: number;
    relevance: number;
  } {
    const length = response.length;
    const hasStructure = /#{1,3}|^\d+\.|^-|\*/.test(response);
    const hasNumbers = /\d+/.test(response);
    
    return {
      quality: Math.min(100, (length / 100) * (hasStructure ? 1.2 : 1)),
      completeness: Math.min(100, length / 50),
      relevance: hasNumbers ? 90 : 70
    };
  }

  // إحصائيات الأداء
  getStats(): {
    queueLength: number;
    activeRequests: number;
    cacheStats: any;
    performance: any;
  } {
    return {
      queueLength: this.requestQueue.length,
      activeRequests: this.activeRequests,
      cacheStats: smartCache.getStats(),
      performance: performanceMonitor.getPerformanceReport()
    };
  }
}

export const aiOptimizer = AIOptimizer.getInstance();