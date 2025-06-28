// محسن قاعدة البيانات المحلية
export class DatabaseOptimizer {
  private static instance: DatabaseOptimizer;
  private db: IDBDatabase | null = null;
  private dbName = 'SmartContractorDB';
  private version = 1;

  private constructor() {
    this.initializeDB();
  }

  static getInstance(): DatabaseOptimizer {
    if (!DatabaseOptimizer.instance) {
      DatabaseOptimizer.instance = new DatabaseOptimizer();
    }
    return DatabaseOptimizer.instance;
  }

  // تهيئة قاعدة البيانات المحلية
  private async initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // إنشاء متاجر البيانات
        if (!db.objectStoreNames.contains('components')) {
          db.createObjectStore('components', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('translations')) {
          db.createObjectStore('translations', { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains('templates')) {
          db.createObjectStore('templates', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };
    });
  }

  // حفظ البيانات المضغوطة
  async saveCompressed(store: string, key: string, data: any): Promise<void> {
    if (!this.db) await this.initializeDB();

    const compressed = await import('./codeCompressor').then(m => 
      m.codeCompressor.compressObject(data)
    );

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([store], 'readwrite');
      const objectStore = transaction.objectStore(store);
      
      const request = objectStore.put({
        id: key,
        data: compressed,
        timestamp: Date.now()
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // استرجاع البيانات المضغوطة
  async getCompressed(store: string, key: string): Promise<any> {
    if (!this.db) await this.initializeDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([store], 'readonly');
      const objectStore = transaction.objectStore(store);
      
      const request = objectStore.get(key);

      request.onsuccess = async () => {
        if (request.result) {
          const decompressed = await import('./codeCompressor').then(m => 
            m.codeCompressor.decompressObject(request.result.data)
          );
          resolve(decompressed);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  // حفظ مكونات React المضغوطة
  async saveComponent(componentName: string, componentCode: string): Promise<void> {
    await this.saveCompressed('components', componentName, {
      code: componentCode,
      version: '1.0.0'
    });
  }

  // استرجاع مكونات React
  async getComponent(componentName: string): Promise<string | null> {
    const data = await this.getCompressed('components', componentName);
    return data ? data.code : null;
  }

  // حفظ الترجمات المضغوطة
  async saveTranslations(lang: string, translations: Record<string, string>): Promise<void> {
    await this.saveCompressed('translations', lang, translations);
  }

  // استرجاع الترجمات
  async getTranslations(lang: string): Promise<Record<string, string> | null> {
    return await this.getCompressed('translations', lang);
  }

  // حفظ القوالب المضغوطة
  async saveTemplate(templateId: string, template: any): Promise<void> {
    await this.saveCompressed('templates', templateId, template);
  }

  // استرجاع القوالب
  async getTemplate(templateId: string): Promise<any> {
    return await this.getCompressed('templates', templateId);
  }

  // تنظيف البيانات القديمة
  async cleanup(maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<void> {
    if (!this.db) return;

    const stores = ['components', 'translations', 'templates', 'cache'];
    const cutoffTime = Date.now() - maxAge;

    for (const storeName of stores) {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.openCursor();
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          if (cursor.value.timestamp < cutoffTime) {
            cursor.delete();
          }
          cursor.continue();
        }
      };
    }
  }

  // إحصائيات قاعدة البيانات
  async getStats(): Promise<{
    totalSize: number;
    itemCount: number;
    stores: Record<string, number>;
  }> {
    if (!this.db) return { totalSize: 0, itemCount: 0, stores: {} };

    const stores = ['components', 'translations', 'templates', 'cache'];
    const stats = { totalSize: 0, itemCount: 0, stores: {} as Record<string, number> };

    for (const storeName of stores) {
      const count = await this.getStoreCount(storeName);
      stats.stores[storeName] = count;
      stats.itemCount += count;
    }

    return stats;
  }

  private async getStoreCount(storeName: string): Promise<number> {
    return new Promise((resolve) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.count();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(0);
    });
  }
}

export const databaseOptimizer = DatabaseOptimizer.getInstance();