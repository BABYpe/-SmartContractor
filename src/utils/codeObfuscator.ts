// مشوش الأكواد للحماية
export class CodeObfuscator {
  private static instance: CodeObfuscator;
  private obfuscationMap = new Map<string, string>();
  private reverseMap = new Map<string, string>();

  private constructor() {
    this.initializeObfuscation();
  }

  static getInstance(): CodeObfuscator {
    if (!CodeObfuscator.instance) {
      CodeObfuscator.instance = new CodeObfuscator();
    }
    return CodeObfuscator.instance;
  }

  // تهيئة التشويش
  private initializeObfuscation(): void {
    const sensitiveKeys = [
      'API_KEY',
      'SECRET_KEY',
      'DATABASE_URL',
      'ENCRYPTION_KEY',
      'SESSION_TOKEN',
      'USER_DATA',
      'PRICING_DATA',
      'CALCULATION_LOGIC'
    ];

    sensitiveKeys.forEach(key => {
      const obfuscated = this.generateObfuscatedKey(key);
      this.obfuscationMap.set(key, obfuscated);
      this.reverseMap.set(obfuscated, key);
    });
  }

  // توليد مفتاح مشوش
  private generateObfuscatedKey(original: string): string {
    const hash = this.simpleHash(original);
    const timestamp = Date.now().toString(36);
    return `_${hash}_${timestamp}`.substring(0, 16);
  }

  // دالة هاش بسيطة
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // تحويل إلى 32 بت
    }
    return Math.abs(hash).toString(36);
  }

  // تشويش النص
  obfuscateString(text: string): string {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(code + 1);
    }).join('');
  }

  // إلغاء تشويش النص
  deobfuscateString(obfuscatedText: string): string {
    return obfuscatedText.split('').map(char => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(code - 1);
    }).join('');
  }

  // تشويش الكائن
  obfuscateObject(obj: any): any {
    const obfuscated: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const obfuscatedKey = this.obfuscationMap.get(key) || key;
      
      if (typeof value === 'string') {
        obfuscated[obfuscatedKey] = this.obfuscateString(value);
      } else if (typeof value === 'object' && value !== null) {
        obfuscated[obfuscatedKey] = this.obfuscateObject(value);
      } else {
        obfuscated[obfuscatedKey] = value;
      }
    }
    
    return obfuscated;
  }

  // إلغاء تشويش الكائن
  deobfuscateObject(obfuscatedObj: any): any {
    const deobfuscated: any = {};
    
    for (const [obfuscatedKey, value] of Object.entries(obfuscatedObj)) {
      const originalKey = this.reverseMap.get(obfuscatedKey) || obfuscatedKey;
      
      if (typeof value === 'string') {
        deobfuscated[originalKey] = this.deobfuscateString(value);
      } else if (typeof value === 'object' && value !== null) {
        deobfuscated[originalKey] = this.deobfuscateObject(value);
      } else {
        deobfuscated[originalKey] = value;
      }
    }
    
    return deobfuscated;
  }

  // حماية الدوال الحساسة
  protectFunction(fn: Function, name: string): Function {
    const protectedName = this.generateObfuscatedKey(name);
    
    return function(...args: any[]) {
      try {
        // فحص الجلسة قبل التنفيذ
        if (!CodeObfuscator.instance.validateExecution()) {
          throw new Error('Unauthorized execution');
        }
        
        return fn.apply(this, args);
      } catch (error) {
        console.error(`Protected function ${protectedName} failed:`, error);
        throw error;
      }
    };
  }

  // التحقق من صحة التنفيذ
  private validateExecution(): boolean {
    // فحص البيئة
    if (typeof window === 'undefined') return false;
    
    // فحص أدوات المطور
    if (this.isDevToolsOpen()) return false;
    
    // فحص المصدر
    if (this.isFromUntrustedSource()) return false;
    
    return true;
  }

  // فحص فتح أدوات المطور
  private isDevToolsOpen(): boolean {
    const threshold = 160;
    return window.outerHeight - window.innerHeight > threshold ||
           window.outerWidth - window.innerWidth > threshold;
  }

  // فحص المصدر غير الموثوق
  private isFromUntrustedSource(): boolean {
    const trustedDomains = ['localhost', 'smartcontractorpro.netlify.app'];
    const currentDomain = window.location.hostname;
    return !trustedDomains.some(domain => currentDomain.includes(domain));
  }

  // تنظيف البيانات الحساسة
  cleanup(): void {
    this.obfuscationMap.clear();
    this.reverseMap.clear();
  }
}

export const codeObfuscator = CodeObfuscator.getInstance();