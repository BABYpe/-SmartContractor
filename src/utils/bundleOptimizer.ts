import React from 'react';

// محسن الحزم والتجميع
export class BundleOptimizer {
  private static instance: BundleOptimizer;
  private loadedModules = new Set<string>();
  private moduleCache = new Map<string, any>();
  private dependencyGraph = new Map<string, string[]>();

  private constructor() {}

  static getInstance(): BundleOptimizer {
    if (!BundleOptimizer.instance) {
      BundleOptimizer.instance = new BundleOptimizer();
    }
    return BundleOptimizer.instance;
  }

  // تحميل المكونات بشكل ديناميكي
  async loadComponent(componentName: string): Promise<any> {
    if (this.moduleCache.has(componentName)) {
      return this.moduleCache.get(componentName);
    }

    try {
      // محاولة تحميل من قاعدة البيانات المحلية أولاً
      const { databaseOptimizer } = await import('./databaseOptimizer');
      const cachedComponent = await databaseOptimizer.getComponent(componentName);
      
      if (cachedComponent) {
        const module = this.executeCode(cachedComponent);
        this.moduleCache.set(componentName, module);
        return module;
      }

      // تحميل من الملفات إذا لم يوجد في قاعدة البيانات
      const module = await this.dynamicImport(componentName);
      this.moduleCache.set(componentName, module);
      this.loadedModules.add(componentName);

      // حفظ في قاعدة البيانات للمرات القادمة
      // Fix: Use module.default.toString() instead of module.toString()
      if (module.default && typeof module.default === 'function') {
        await databaseOptimizer.saveComponent(componentName, module.default.toString());
      }

      return module;
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
      throw error;
    }
  }

  // تنفيذ الكود المضغوط
  private executeCode(code: string): any {
    try {
      // إنشاء دالة آمنة لتنفيذ الكود
      const func = new Function('React', 'return ' + code);
      return func(React);
    } catch (error) {
      console.error('Failed to execute code:', error);
      throw error;
    }
  }

  // استيراد ديناميكي محسن
  private async dynamicImport(componentName: string): Promise<any> {
    const importMap: Record<string, () => Promise<any>> = {
      'Dashboard': () => import('../components/Dashboard'),
      'ProjectDetails': () => import('../components/ProjectDetails'),
      'EnhancedProjectEstimation': () => import('../components/EnhancedProjectEstimation'),
      'EnhancedBOQManager': () => import('../components/EnhancedBOQManager'),
      'PaymentSchedule': () => import('../components/PaymentSchedule'),
      'ProjectDuration': () => import('../components/ProjectDuration'),
      'WorkforceEstimation': () => import('../components/WorkforceEstimation'),
      'ProposalGeneration': () => import('../components/ProposalGeneration'),
      'RiskAnalysis': () => import('../components/RiskAnalysis'),
      'CostOptimization': () => import('../components/CostOptimization'),
      'ProjectSummary': () => import('../components/ProjectSummary'),
      'ClientManagement': () => import('../components/ClientManagement'),
      'FinancialReports': () => import('../components/FinancialReports'),
      'ProjectTemplates': () => import('../components/ProjectTemplates'),
      'Settings': () => import('../components/Settings')
    };

    const loader = importMap[componentName];
    if (!loader) {
      throw new Error(`Component ${componentName} not found`);
    }

    return await loader();
  }

  // تحليل التبعيات
  analyzeDependencies(componentName: string): string[] {
    if (this.dependencyGraph.has(componentName)) {
      return this.dependencyGraph.get(componentName)!;
    }

    // تحليل بسيط للتبعيات
    const dependencies = this.extractDependencies(componentName);
    this.dependencyGraph.set(componentName, dependencies);
    return dependencies;
  }

  // استخراج التبعيات من الكود
  private extractDependencies(componentName: string): string[] {
    // منطق بسيط لاستخراج التبعيات
    const commonDependencies: Record<string, string[]> = {
      'Dashboard': ['SmartDashboard', 'RealTimeMarketDashboard'],
      'EnhancedProjectEstimation': ['EnhancedDropdownSelect', 'AnimatedButton'],
      'EnhancedBOQManager': ['GlassCard', 'AnimatedButton'],
      'PaymentSchedule': ['GlassCard', 'AnimatedButton'],
      'ProjectDuration': ['GlassCard', 'AnimatedButton'],
      'WorkforceEstimation': ['GlassCard', 'AnimatedButton'],
      'ProposalGeneration': ['GlassCard', 'AnimatedButton'],
      'RiskAnalysis': ['GlassCard', 'AnimatedButton'],
      'CostOptimization': ['GlassCard', 'AnimatedButton'],
      'ProjectSummary': ['GlassCard', 'AnimatedButton']
    };

    return commonDependencies[componentName] || [];
  }

  // تحميل مسبق للمكونات المهمة
  async preloadCriticalComponents(): Promise<void> {
    const criticalComponents = ['Dashboard', 'ProjectDetails', 'EnhancedProjectEstimation'];
    
    const loadPromises = criticalComponents.map(component => 
      this.loadComponent(component).catch(error => {
        console.warn(`Failed to preload ${component}:`, error);
      })
    );

    await Promise.allSettled(loadPromises);
  }

  // تنظيف الذاكرة
  cleanup(): void {
    // إزالة المكونات غير المستخدمة
    const unusedComponents = Array.from(this.moduleCache.keys())
      .filter(component => !this.loadedModules.has(component));

    unusedComponents.forEach(component => {
      this.moduleCache.delete(component);
      this.dependencyGraph.delete(component);
    });
  }

  // إحصائيات التحسين
  getOptimizationStats(): {
    loadedModules: number;
    cachedModules: number;
    memoryUsage: number;
  } {
    return {
      loadedModules: this.loadedModules.size,
      cachedModules: this.moduleCache.size,
      memoryUsage: this.calculateMemoryUsage()
    };
  }

  // حساب استخدام الذاكرة
  private calculateMemoryUsage(): number {
    let totalSize = 0;
    
    for (const [key, value] of this.moduleCache) {
      totalSize += key.length;
      totalSize += JSON.stringify(value).length;
    }

    return totalSize;
  }
}

export const bundleOptimizer = BundleOptimizer.getInstance();