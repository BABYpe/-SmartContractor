// كاشف البيئة والنشر
export class EnvironmentDetector {
  private static instance: EnvironmentDetector;

  private constructor() {}

  static getInstance(): EnvironmentDetector {
    if (!EnvironmentDetector.instance) {
      EnvironmentDetector.instance = new EnvironmentDetector();
    }
    return EnvironmentDetector.instance;
  }

  // فحص ما إذا كان التطبيق في بيئة الإنتاج
  isProduction(): boolean {
    return import.meta.env.PROD;
  }

  // فحص ما إذا كان التطبيق في بيئة التطوير
  isDevelopment(): boolean {
    return import.meta.env.DEV;
  }

  // فحص ما إذا كان التطبيق منشور على Netlify
  isNetlifyDeployment(): boolean {
    return window.location.hostname.includes('netlify.app') ||
           window.location.hostname.includes('netlify.com');
  }

  // فحص ما إذا كان التطبيق في وضع المعاينة
  isPreview(): boolean {
    return window.location.hostname.includes('preview') ||
           window.location.search.includes('preview=true');
  }

  // الحصول على معلومات البيئة
  getEnvironmentInfo(): {
    environment: 'production' | 'development' | 'preview';
    hostname: string;
    protocol: string;
    isSecure: boolean;
    isNetlify: boolean;
  } {
    return {
      environment: this.isProduction() ? 'production' : 
                   this.isPreview() ? 'preview' : 'development',
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      isSecure: window.location.protocol === 'https:',
      isNetlify: this.isNetlifyDeployment()
    };
  }

  // تطبيق إعدادات البيئة
  applyEnvironmentSettings(): void {
    const envInfo = this.getEnvironmentInfo();

    if (envInfo.environment === 'production') {
      // إعدادات الإنتاج
      this.applyProductionSettings();
    } else if (envInfo.environment === 'development') {
      // إعدادات التطوير
      this.applyDevelopmentSettings();
    }
  }

  // تطبيق إعدادات الإنتاج
  private applyProductionSettings(): void {
    // إزالة console.log في الإنتاج
    if (typeof console !== 'undefined') {
      console.log = () => {};
      console.warn = () => {};
      console.info = () => {};
    }

    // تفعيل الحماية المتقدمة
    this.enableProductionSecurity();
  }

  // تطبيق إعدادات التطوير
  private applyDevelopmentSettings(): void {
    // الاحتفاظ بـ console في التطوير
    console.log('Development mode enabled');
  }

  // تفعيل الحماية في الإنتاج
  private enableProductionSecurity(): void {
    // منع النقر الأيمن
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // منع اختصارات لوحة المفاتيح للمطورين
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
      }
    });

    // منع السحب والإفلات
    document.addEventListener('dragstart', (e) => e.preventDefault());
    
    // منع التحديد
    document.addEventListener('selectstart', (e) => e.preventDefault());
  }

  // فحص الأمان
  performSecurityCheck(): boolean {
    const envInfo = this.getEnvironmentInfo();
    
    // في الإنتاج، تطبيق فحوصات أمان إضافية
    if (envInfo.environment === 'production') {
      // فحص HTTPS
      if (!envInfo.isSecure) {
        console.error('Security warning: Application not served over HTTPS');
        return false;
      }

      // فحص المجال
      if (!this.isValidDomain(envInfo.hostname)) {
        console.error('Security warning: Invalid domain');
        return false;
      }
    }

    return true;
  }

  // فحص صحة المجال
  private isValidDomain(hostname: string): boolean {
    const validDomains = [
      'localhost',
      '127.0.0.1',
      'smartcontractorpro.netlify.app'
    ];

    return validDomains.some(domain => hostname.includes(domain));
  }
}

export const environmentDetector = EnvironmentDetector.getInstance();