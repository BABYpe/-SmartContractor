import React from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import type { BOQItem } from '../types';

interface DraggableBOQItemProps {
  item: BOQItem;
  index: number;
  wastePercentage: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<BOQItem>) => void;
  editingItem: string | null;
  lang: 'ar' | 'en';
}

export default function DraggableBOQItem({
  item,
  index,
  wastePercentage,
  onEdit,
  onDelete,
  onUpdate,
  editingItem,
  lang
}: DraggableBOQItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isEditing = editingItem === item.id;
  const totalPrice = item.price ? 
    item.price * item.quantity * (1 + (parseFloat(wastePercentage) / 100 || 0)) : 
    0;

  // محاكاة تغيير السعر للمؤشرات البصرية
  const priceChange = Math.random() > 0.5 ? 
    (Math.random() * 10 - 5) : 0; // تغيير عشوائي بين -5% و +5%

  return (
    <motion.tr
      ref={setNodeRef}
      style={style}
      className={`
        hover:bg-white/10 transition-all duration-200 group
        ${isDragging ? 'opacity-50 shadow-2xl z-50' : ''}
        ${isEditing ? 'bg-blue-50/20 ring-2 ring-blue-500/30' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: isDragging ? 1 : 1.01 }}
    >
      {/* مقبض السحب */}
      <td className="px-2 py-3 text-center">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/20 transition-colors"
        >
          <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </div>
      </td>

      {/* رقم البند */}
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center">
          <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
        </div>
      </td>

      {/* اسم البند */}
      <td className="px-4 py-3 text-right">
        <div className="space-y-1">
          <div className="font-medium text-gray-900 text-sm">
            {item.itemName}
          </div>
          {item.specifications && (
            <div className="text-xs text-gray-600 bg-gray-100/50 rounded px-2 py-1">
              {item.specifications}
            </div>
          )}
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              item.source === 'database' ? 'bg-green-100 text-green-800' :
              item.source === 'ai' ? 'bg-blue-100 text-blue-800' :
              item.source === 'pdf' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.source === 'database' ? 'قاعدة البيانات' :
               item.source === 'ai' ? 'ذكاء اصطناعي' :
               item.source === 'pdf' ? 'PDF' : 'يدوي'}
            </span>
            {item.confidence && (
              <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded-full">
                دقة: {Math.round(item.confidence * 100)}%
              </span>
            )}
          </div>
        </div>
      </td>

      {/* الكمية */}
      <td className="px-4 py-3 text-center">
        {isEditing ? (
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => onUpdate(item.id, { quantity: parseFloat(e.target.value) || 0 })}
            className="w-20 p-2 text-center bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500"
            min="0.01"
            step="0.01"
          />
        ) : (
          <div className="text-sm font-medium">
            {item.quantity.toLocaleString()}
          </div>
        )}
      </td>

      {/* الوحدة */}
      <td className="px-4 py-3 text-center text-sm text-gray-700">
        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
          {item.unit}
        </span>
      </td>

      {/* سعر الوحدة */}
      <td className="px-4 py-3 text-center">
        {item.loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        ) : item.error ? (
          <span className="text-red-600 text-xs">خطأ</span>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <span className="font-semibold text-green-700">
                {item.price ? `${item.price.toLocaleString()}` : '--'}
              </span>
              {item.price && priceChange !== 0 && (
                <div className={`flex items-center ${priceChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {priceChange > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs ml-1">
                    {Math.abs(priceChange).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            {item.priceRange && (
              <div className="text-xs text-gray-500">
                ({item.priceRange.min.toLocaleString()} - {item.priceRange.max.toLocaleString()})
              </div>
            )}
            <div className="text-xs text-gray-600">ريال</div>
          </div>
        )}
      </td>

      {/* التكلفة الإجمالية */}
      <td className="px-4 py-3 text-center">
        {item.loading || item.error ? (
          <span className="text-gray-500">--</span>
        ) : (
          <div className="space-y-1">
            <span className="text-lg font-bold text-green-800">
              {totalPrice > 0 ? `${totalPrice.toLocaleString()}` : '--'}
            </span>
            <div className="text-xs text-gray-600">ريال سعودي</div>
            {totalPrice > 0 && (
              <div className="text-xs text-gray-500">
                شامل الهدر {wastePercentage}%
              </div>
            )}
          </div>
        )}
      </td>

      {/* ساعات العمل */}
      <td className="px-4 py-3 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-700">
            {item.laborHours || 0}
          </span>
          <span className="text-xs text-gray-500">ساعة</span>
        </div>
      </td>

      {/* الحالة */}
      <td className="px-4 py-3 text-center">
        <div className="flex flex-col items-center space-y-1">
          {item.verified ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          )}
          <span className="text-xs text-gray-600">
            {item.verified ? 'مؤكد' : 'مراجعة'}
          </span>
        </div>
      </td>

      {/* الإجراءات */}
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            onClick={() => onEdit(item.id)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all"
            title="تعديل"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all"
            title="حذف"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}