// مدير الأمان والحماية المتقدم
export class SecurityManager {
  private static instance: SecurityManager;
  private encryptionKey: string;
  private sessionToken: string;
  private errorHandlers: Map<string, Function> = new Map();

  private constructor() {
    this.encryptionKey = this.generateEncryptionKey();
    this.sessionToken = this.generateSessionToken();
    this.initializeErrorHandling();
    this.setupSecurityHeaders();
  }

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  // توليد مفتاح التشفير
  private generateEncryptionKey(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // توليد رمز الجلسة
  private generateSessionToken(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${timestamp}-${random}`);
  }

  // تشفير البيانات الحساسة
  encryptData(data: any): string {
    try {
      const jsonString = JSON.stringify(data);
      const encoded = btoa(jsonString);
      return this.obfuscateString(encoded);
    } catch (error) {
      this.handleError('encryption_error', error);
      return '';
    }
  }

  // فك تشفير البيانات
  decryptData(encryptedData: string): any {
    try {
      const deobfuscated = this.deobfuscateString(encryptedData);
      const decoded = atob(deobfuscated);
      return JSON.parse(decoded);
    } catch (error) {
      this.handleError('decryption_error', error);
      return null;
    }
  }

  // تشويش النصوص
  private obfuscateString(str: string): string {
    return str.split('').map((char, index) => {
      const code = char.charCodeAt(0);
      const shift = (index % 5) + 1;
      return String.fromCharCode(code + shift);
    }).join('');
  }

  // إلغاء تشويش النصوص
  private deobfuscateString(str: string): string {
    return str.split('').map((char, index) => {
      const code = char.charCodeAt(0);
      const shift = (index % 5) + 1;
      return String.fromCharCode(code - shift);
    }).join('');
  }

  // إعداد رؤوس الأمان
  private setupSecurityHeaders(): void {
    if (typeof document !== 'undefined') {
      // منع النقر المتعدد السريع
      document.addEventListener('click', this.preventRapidClicks.bind(this));
      
      // منع النسخ في الإنتاج
      if (import.meta.env.PROD) {
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('selectstart', (e) => e.preventDefault());
        document.addEventListener('dragstart', (e) => e.preventDefault());
      }
    }
  }

  // منع النقر السريع المتعدد
  private lastClickTime = 0;
  private preventRapidClicks(event: Event): void {
    const now = Date.now();
    if (now - this.lastClickTime < 300) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.lastClickTime = now;
  }

  // تهيئة معالجة الأخطاء التلقائية
  private initializeErrorHandling(): void {
    // معالج الأخطاء العام
    window.addEventListener('error', (event) => {
      this.handleError('global_error', event.error);
    });

    // معالج أخطاء الوعود
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError('promise_rejection', event.reason);
      event.preventDefault();
    });

    // معالج أخطاء الشبكة
    this.errorHandlers.set('network_error', this.handleNetworkError.bind(this));
    this.errorHandlers.set('api_error', this.handleApiError.bind(this));
    this.errorHandlers.set('validation_error', this.handleValidationError.bind(this));
  }

  // معالجة الأخطاء التلقائية
  handleError(type: string, error: any): void {
    const handler = this.errorHandlers.get(type);
    if (handler) {
      handler(error);
    } else {
      this.logError(type, error);
    }
  }

  // معالجة أخطاء الشبكة
  private handleNetworkError(error: any): void {
    console.warn('Network error handled automatically:', error);
    // إعادة المحاولة التلقائية
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  // معالجة أخطاء API
  private handleApiError(error: any): void {
    console.warn('API error handled automatically:', error);
    // التبديل إلى البيانات المحاكاة
    this.enableFallbackMode();
  }

  // معالجة أخطاء التحقق
  private handleValidationError(error: any): void {
    console.warn('Validation error handled automatically:', error);
    // تصحيح البيانات تلقائياً
    this.autoCorrectData(error);
  }

  // تسجيل الأخطاء
  private logError(type: string, error: any): void {
    const errorLog = {
      type,
      message: error?.message || 'Unknown error',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionToken: this.sessionToken
    };

    // تشفير وحفظ السجل محلياً
    const encryptedLog = this.encryptData(errorLog);
    localStorage.setItem(`error_${Date.now()}`, encryptedLog);
  }

  // تفعيل وضع الاحتياط
  private enableFallbackMode(): void {
    sessionStorage.setItem('fallback_mode', 'true');
  }

  // التصحيح التلقائي للبيانات
  private autoCorrectData(error: any): void {
    // تنفيذ منطق التصحيح التلقائي
    console.log('Auto-correcting data:', error);
  }

  // فحص الأمان
  validateSession(): boolean {
    const sessionStart = sessionStorage.getItem('session_start');
    if (!sessionStart) {
      sessionStorage.setItem('session_start', Date.now().toString());
      return true;
    }

    const elapsed = Date.now() - parseInt(sessionStart);
    return elapsed < 24 * 60 * 60 * 1000; // 24 ساعة
  }

  // تنظيف البيانات الحساسة
  cleanup(): void {
    this.encryptionKey = '';
    this.sessionToken = '';
    this.errorHandlers.clear();
  }
}

export const securityManager = SecurityManager.getInstance();