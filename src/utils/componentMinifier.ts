// مصغر المكونات والأكواد
export class ComponentMinifier {
  private static instance: ComponentMinifier;
  private minifiedComponents = new Map<string, string>();

  private constructor() {}

  static getInstance(): ComponentMinifier {
    if (!ComponentMinifier.instance) {
      ComponentMinifier.instance = new ComponentMinifier();
    }
    return ComponentMinifier.instance;
  }

  // تصغير كود JavaScript/TypeScript
  minifyCode(code: string): string {
    if (this.minifiedComponents.has(code)) {
      return this.minifiedComponents.get(code)!;
    }

    let minified = code
      // إزالة التعليقات
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      // إزالة المسافات الزائدة
      .replace(/\s+/g, ' ')
      // إزالة المسافات حول العمليات
      .replace(/\s*([{}();,:])\s*/g, '$1')
      // إزالة الأسطر الفارغة
      .replace(/\n\s*\n/g, '\n')
      .trim();

    this.minifiedComponents.set(code, minified);
    return minified;
  }

  // تصغير CSS
  minifyCSS(css: string): string {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      .replace(/;\s*}/g, '}')
      .trim();
  }

  // تصغير HTML
  minifyHTML(html: string): string {
    return html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  // ضغط الترجمات
  compressTranslations(translations: Record<string, string>): Record<string, string> {
    const compressed: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(translations)) {
      // استخدام مفاتيح مختصرة للترجمات الشائعة
      const shortKey = this.generateShortKey(key);
      compressed[shortKey] = value;
    }

    return compressed;
  }

  // توليد مفاتيح مختصرة
  private generateShortKey(originalKey: string): string {
    // خوارزمية بسيطة لتوليد مفاتيح قصيرة
    const hash = this.simpleHash(originalKey);
    return hash.toString(36).substring(0, 6);
  }

  // دالة هاش بسيطة
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // تحسين الصور (تحويل إلى WebP إذا كان مدعوماً)
  optimizeImage(imageUrl: string): string {
    if (this.supportsWebP()) {
      return imageUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return imageUrl;
  }

  // فحص دعم WebP
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // ضغط البيانات JSON
  compressJSON(data: any): string {
    // إزالة المسافات والخصائص الفارغة
    const cleaned = this.removeEmptyProperties(data);
    return JSON.stringify(cleaned);
  }

  // إزالة الخصائص الفارغة
  private removeEmptyProperties(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.removeEmptyProperties(item));
    }
    
    if (obj !== null && typeof obj === 'object') {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && value !== '') {
          cleaned[key] = this.removeEmptyProperties(value);
        }
      }
      return cleaned;
    }
    
    return obj;
  }

  // إحصائيات التصغير
  getMinificationStats(): {
    componentsMinified: number;
    averageReduction: number;
  } {
    let totalOriginal = 0;
    let totalMinified = 0;

    for (const [original, minified] of this.minifiedComponents) {
      totalOriginal += original.length;
      totalMinified += minified.length;
    }

    return {
      componentsMinified: this.minifiedComponents.size,
      averageReduction: totalOriginal > 0 ? 
        ((totalOriginal - totalMinified) / totalOriginal) * 100 : 0
    };
  }

  // تنظيف الذاكرة المؤقتة
  clearCache(): void {
    this.minifiedComponents.clear();
  }
}

export const componentMinifier = ComponentMinifier.getInstance();