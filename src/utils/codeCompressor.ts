// ضاغط الأكواد المتقدم
export class CodeCompressor {
  private static instance: CodeCompressor;
  private compressionCache = new Map<string, string>();
  private decompressedCache = new Map<string, any>();

  private constructor() {}

  static getInstance(): CodeCompressor {
    if (!CodeCompressor.instance) {
      CodeCompressor.instance = new CodeCompressor();
    }
    return CodeCompressor.instance;
  }

  // ضغط النصوص والبيانات
  compressText(text: string): string {
    if (this.compressionCache.has(text)) {
      return this.compressionCache.get(text)!;
    }

    // خوارزمية ضغط بسيطة وفعالة
    const compressed = this.lzwCompress(text);
    this.compressionCache.set(text, compressed);
    return compressed;
  }

  // إلغاء ضغط النصوص
  decompressText(compressed: string): string {
    return this.lzwDecompress(compressed);
  }

  // خوارزمية LZW للضغط
  private lzwCompress(text: string): string {
    const dictionary: { [key: string]: number } = {};
    let dictSize = 256;
    
    // تهيئة القاموس
    for (let i = 0; i < 256; i++) {
      dictionary[String.fromCharCode(i)] = i;
    }

    let w = '';
    const result: number[] = [];

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const wc = w + c;
      
      if (dictionary[wc] !== undefined) {
        w = wc;
      } else {
        result.push(dictionary[w]);
        dictionary[wc] = dictSize++;
        w = c;
      }
    }

    if (w !== '') {
      result.push(dictionary[w]);
    }

    // Encode the result to handle control characters safely
    const compressedString = result.map(n => String.fromCharCode(n)).join('');
    return encodeURIComponent(compressedString);
  }

  // إلغاء ضغط LZW
  private lzwDecompress(compressed: string): string {
    // Decode the input to handle control characters safely
    const decodedCompressed = decodeURIComponent(compressed);
    
    const dictionary: { [key: number]: string } = {};
    let dictSize = 256;

    // تهيئة القاموس
    for (let i = 0; i < 256; i++) {
      dictionary[i] = String.fromCharCode(i);
    }

    const codes = decodedCompressed.split('').map(c => c.charCodeAt(0));
    let w = String.fromCharCode(codes[0]);
    let result = w;

    for (let i = 1; i < codes.length; i++) {
      const k = codes[i];
      let entry: string;

      if (dictionary[k] !== undefined) {
        entry = dictionary[k];
      } else if (k === dictSize) {
        entry = w + w[0];
      } else {
        throw new Error('Invalid compressed data');
      }

      result += entry;
      dictionary[dictSize++] = w + entry[0];
      w = entry;
    }

    return result;
  }

  // ضغط الكائنات JSON
  compressObject(obj: any): string {
    const jsonString = JSON.stringify(obj);
    return this.compressText(jsonString);
  }

  // إلغاء ضغط الكائنات
  decompressObject(compressed: string): any {
    if (this.decompressedCache.has(compressed)) {
      return this.decompressedCache.get(compressed);
    }

    const jsonString = this.decompressText(compressed);
    const obj = JSON.parse(jsonString);
    this.decompressedCache.set(compressed, obj);
    return obj;
  }

  // تنظيف الذاكرة المؤقتة
  clearCache(): void {
    this.compressionCache.clear();
    this.decompressedCache.clear();
  }

  // إحصائيات الضغط
  getCompressionStats(): {
    cacheSize: number;
    compressionRatio: number;
  } {
    let originalSize = 0;
    let compressedSize = 0;

    for (const [original, compressed] of this.compressionCache) {
      originalSize += original.length;
      compressedSize += compressed.length;
    }

    return {
      cacheSize: this.compressionCache.size,
      compressionRatio: originalSize > 0 ? compressedSize / originalSize : 1
    };
  }
}

export const codeCompressor = CodeCompressor.getInstance();