import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  labelEn?: string;
}

interface EnhancedDropdownSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  lang?: 'ar' | 'en';
  className?: string;
  disabled?: boolean;
}

export default function EnhancedDropdownSelect({
  options,
  value,
  onChange,
  placeholder = 'اختر...',
  lang = 'ar',
  className = '',
  disabled = false
}: EnhancedDropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // تصفية الخيارات بناءً على البحث
  const filteredOptions = options.filter(option => {
    const label = lang === 'ar' ? option.label : (option.labelEn || option.label);
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // الحصول على النص المعروض للخيار المحدد
  const getSelectedLabel = () => {
    const selectedOption = options.find(option => option.value === value);
    if (!selectedOption) return placeholder;
    return lang === 'ar' ? selectedOption.label : (selectedOption.labelEn || selectedOption.label);
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* زر القائمة المنسدلة */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          transition-all duration-200 text-left flex items-center justify-between
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/60 cursor-pointer'}
          ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}
        `}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <span className={`text-gray-700 ${!value ? 'text-gray-500' : ''}`}>
          {getSelectedLabel()}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      {/* القائمة المنسدلة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* حقل البحث */}
            <div className="p-3 border-b border-gray-200/50">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'ar' ? 'البحث...' : 'Search...'}
                className="w-full p-2 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* قائمة الخيارات */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === value;
                  const label = lang === 'ar' ? option.label : (option.labelEn || option.label);
                  
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => handleOptionSelect(option.value)}
                      className={`
                        w-full p-3 text-left hover:bg-blue-50 transition-colors duration-150
                        flex items-center justify-between group
                        ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                      `}
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                      <span className="font-medium">{label}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <Check className="w-4 h-4 text-blue-600" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  {lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}