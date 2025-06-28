import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  onClick?: () => void;
}

export default function GlassCard({ 
  children, 
  className = '', 
  gradient = 'from-white/30 to-white/10',
  onClick 
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        bg-gradient-to-br ${gradient} backdrop-blur-xl
        border border-white/30 rounded-3xl shadow-2xl
        hover:shadow-3xl hover:border-white/40
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}