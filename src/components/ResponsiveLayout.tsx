import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}

export default function ResponsiveLayout({ children, sidebar, header }: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-collapse sidebar on smaller screens
      if (width < 1024) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header - محسن للأداء */}
      <div className="fixed top-0 left-0 right-0 z-50 will-change-transform">
        {header}
      </div>

      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Sidebar - محسن للظهور على الجوال */}
        <motion.div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 will-change-transform ${
            isMobile ? 'w-full' : sidebarCollapsed ? 'w-20' : 'w-80'
          }`}
          initial={false}
          animate={{
            x: isMobile && sidebarCollapsed ? '-100%' : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {sidebar}
        </motion.div>

        {/* Main Content - محسن للأداء */}
        <motion.div
          className="flex-1 transition-all duration-300 will-change-transform"
          style={{
            marginLeft: isMobile ? 0 : sidebarCollapsed ? '5rem' : '20rem',
          }}
        >
          <div className={`container mx-auto px-4 py-6 ${isMobile ? 'px-2' : ''}`}>
            <div className="will-change-contents">
              {children}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Overlay - محسن */}
      {isMobile && !sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
}