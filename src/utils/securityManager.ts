// Security Manager for handling data encryption and error management
class SecurityManager {
  private static instance: SecurityManager;

  private constructor() {}

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  // Encrypt sensitive data (placeholder implementation)
  encryptData(data: any): string {
    try {
      // In a real implementation, this would use proper encryption
      // For now, we'll just stringify the data
      return btoa(JSON.stringify(data));
    } catch (error) {
      console.error('Encryption failed:', error);
      return JSON.stringify(data);
    }
  }

  // Decrypt data (placeholder implementation)
  decryptData(encryptedData: string): any {
    try {
      // In a real implementation, this would use proper decryption
      return JSON.parse(atob(encryptedData));
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }

  // Handle and log errors securely
  handleError(context: string, error: any): void {
    try {
      // Log error without exposing sensitive information
      const sanitizedError = {
        context,
        message: error?.message || 'Unknown error',
        timestamp: new Date().toISOString(),
        type: error?.name || 'Error'
      };

      console.error('Security Manager Error:', sanitizedError);

      // In a real implementation, this would send to a secure logging service
      // For now, we'll just log to console
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  }

  // Validate input data
  validateInput(data: any, rules: Record<string, any> = {}): boolean {
    try {
      // Basic validation - in real implementation would be more comprehensive
      if (data === null || data === undefined) {
        return false;
      }

      // Apply custom validation rules if provided
      for (const [key, rule] of Object.entries(rules)) {
        if (rule.required && !data[key]) {
          return false;
        }
        if (rule.type && typeof data[key] !== rule.type) {
          return false;
        }
      }

      return true;
    } catch (error) {
      this.handleError('input_validation', error);
      return false;
    }
  }

  // Sanitize data for safe output
  sanitizeData(data: any): any {
    try {
      if (typeof data === 'string') {
        // Basic HTML/script sanitization
        return data
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
      }

      if (typeof data === 'object' && data !== null) {
        const sanitized: any = Array.isArray(data) ? [] : {};
        for (const [key, value] of Object.entries(data)) {
          sanitized[key] = this.sanitizeData(value);
        }
        return sanitized;
      }

      return data;
    } catch (error) {
      this.handleError('data_sanitization', error);
      return data;
    }
  }

  // Generate secure random tokens
  generateToken(length: number = 32): string {
    try {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
          result += chars[array[i] % chars.length];
        }
      } else {
        // Fallback for environments without crypto API
        for (let i = 0; i < length; i++) {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      return result;
    } catch (error) {
      this.handleError('token_generation', error);
      return Math.random().toString(36).substring(2, 15);
    }
  }

  // Check if environment is secure (HTTPS)
  isSecureEnvironment(): boolean {
    try {
      return typeof window !== 'undefined' && 
             (window.location.protocol === 'https:' || 
              window.location.hostname === 'localhost' ||
              window.location.hostname === '127.0.0.1');
    } catch (error) {
      this.handleError('environment_check', error);
      return false;
    }
  }

  // Rate limiting helper
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  checkRateLimit(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    try {
      const now = Date.now();
      const record = this.rateLimitMap.get(identifier);

      if (!record || now > record.resetTime) {
        this.rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
        return true;
      }

      if (record.count >= maxRequests) {
        return false;
      }

      record.count++;
      return true;
    } catch (error) {
      this.handleError('rate_limit_check', error);
      return true; // Allow on error to prevent blocking legitimate requests
    }
  }

  // Clean up rate limit records periodically
  cleanupRateLimits(): void {
    try {
      const now = Date.now();
      for (const [key, record] of this.rateLimitMap.entries()) {
        if (now > record.resetTime) {
          this.rateLimitMap.delete(key);
        }
      }
    } catch (error) {
      this.handleError('rate_limit_cleanup', error);
    }
  }
}

// Export singleton instance
export const securityManager = SecurityManager.getInstance();

// Export class for testing purposes
export { SecurityManager };