import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // تحسين البناء للإنتاج
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
          utils: ['react-hot-toast']
        },
      },
    },
    // تحسين حجم الحزمة
    chunkSizeWarningLimit: 1000,
    // تفعيل ضغط gzip
    reportCompressedSize: true,
  },
  server: {
    // تحسين الخادم المحلي
    hmr: {
      overlay: false,
    },
    // تحسين الأداء
    fs: {
      strict: false,
    },
  },
  // تحسين CSS
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
  // تحسين الأصول
  assetsInclude: ['**/*.woff2', '**/*.woff'],
  // تحسين الذاكرة
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});