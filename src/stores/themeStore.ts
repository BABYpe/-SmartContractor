import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'auto';
export type FontSize = 'small' | 'medium' | 'large';
export type Density = 'compact' | 'comfortable' | 'spacious';

interface ThemeState {
  theme: Theme;
  fontSize: FontSize;
  density: Density;
  reducedMotion: boolean;
  highContrast: boolean;
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
  setDensity: (density: Density) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setHighContrast: (highContrast: boolean) => void;
  applyTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      fontSize: 'medium',
      density: 'comfortable',
      reducedMotion: false,
      highContrast: false,
      
      setTheme: (theme) => {
        set({ theme });
        get().applyTheme();
      },
      
      setFontSize: (fontSize) => {
        set({ fontSize });
        get().applyTheme();
      },
      
      setDensity: (density) => {
        set({ density });
        get().applyTheme();
      },
      
      setReducedMotion: (reducedMotion) => {
        set({ reducedMotion });
        get().applyTheme();
      },
      
      setHighContrast: (highContrast) => {
        set({ highContrast });
        get().applyTheme();
      },
      
      applyTheme: () => {
        const { theme, fontSize, density, reducedMotion, highContrast } = get();
        const root = document.documentElement;
        
        // تطبيق الثيم
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          // auto - اعتماد على تفضيلات النظام
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
        
        // تطبيق حجم الخط
        root.classList.remove('font-small', 'font-medium', 'font-large');
        root.classList.add(`font-${fontSize}`);
        
        // تطبيق الكثافة
        root.classList.remove('density-compact', 'density-comfortable', 'density-spacious');
        root.classList.add(`density-${density}`);
        
        // تطبيق تقليل الحركة
        if (reducedMotion) {
          root.classList.add('reduce-motion');
        } else {
          root.classList.remove('reduce-motion');
        }
        
        // تطبيق التباين العالي
        if (highContrast) {
          root.classList.add('high-contrast');
        } else {
          root.classList.remove('high-contrast');
        }
      }
    }),
    {
      name: 'theme-settings',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.applyTheme();
        }
      }
    }
  )
);