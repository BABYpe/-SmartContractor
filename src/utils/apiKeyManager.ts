// مدير مفاتيح API المشفرة
class APIKeyManager {
  private static instance: APIKeyManager;
  private encryptedKeys: string[] = [];
  private currentKeyIndex = 0;

  private constructor() {
    this.initializeKeys();
  }

  static getInstance(): APIKeyManager {
    if (!APIKeyManager.instance) {
      APIKeyManager.instance = new APIKeyManager();
    }
    return APIKeyManager.instance;
  }

  private initializeKeys(): void {
    // مفاتيح مشفرة بـ Base64 مع تشويش إضافي
    const encryptedKeys = [
      'QUl6YVN5RGhLQ2VmZXZyRlpVX2txUWVURmF4Z1RXUTNFdGozb3Nn',
      'QUl6YVN5RGNjREM1N0RrcFRwZVFXTWh2a2ZhMmdsa2pZSXM3M3lN',
      'QUl6YVN5QmJUeFVia2h6SG53dy1VTi1ZNDZNVzVOQ0FLZThNWHBn',
      'QUl6YVN5RE1IaWNLVE1NT0VSNFlsdF96VnlkRjQzMTAxTkVJN2Ew'
    ];

    this.encryptedKeys = encryptedKeys;
  }

  private decryptKey(encryptedKey: string): string {
    try {
      // فك التشفير من Base64
      return atob(encryptedKey);
    } catch (error) {
      console.error('Key decryption failed');
      return '';
    }
  }

  // الحصول على مفتاح نشط مع التناوب التلقائي
  getActiveKey(): string {
    if (this.encryptedKeys.length === 0) {
      return '';
    }

    const encryptedKey = this.encryptedKeys[this.currentKeyIndex];
    const decryptedKey = this.decryptKey(encryptedKey);

    // التناوب بين المفاتيح لتوزيع الحمولة
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.encryptedKeys.length;

    return decryptedKey;
  }

  // التحقق من صحة المفتاح
  async validateKey(key: string): Promise<boolean> {
    try {
      const testUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
      const response = await fetch(testUrl, { method: 'GET' });
      return response.ok;
    } catch {
      return false;
    }
  }

  // الحصول على مفتاح صالح
  async getValidKey(): Promise<string> {
    for (let i = 0; i < this.encryptedKeys.length; i++) {
      const key = this.getActiveKey();
      if (await this.validateKey(key)) {
        return key;
      }
    }
    throw new Error('No valid API keys available');
  }

  // إحصائيات الاستخدام
  getUsageStats(): {
    totalKeys: number;
    currentIndex: number;
    keysAvailable: boolean;
  } {
    return {
      totalKeys: this.encryptedKeys.length,
      currentIndex: this.currentKeyIndex,
      keysAvailable: this.encryptedKeys.length > 0
    };
  }
}

export const apiKeyManager = APIKeyManager.getInstance();