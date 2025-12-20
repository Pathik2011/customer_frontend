'use client';

import React from 'react';
import { X, Trash2 } from 'lucide-react';

interface RemoveItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemImage: string;
  itemSize?: string;
}

const RemoveItemModal = ({ isOpen, onClose, onConfirm, itemName, itemImage, itemSize }: RemoveItemModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-end md:items-center">
      
      {/* 1. Dark Overlay (Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* 2. Modal Content */}
      <div className="
        relative w-full md:w-[400px] bg-white 
        rounded-t-2xl md:rounded-2xl 
        shadow-2xl overflow-hidden 
        animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-200
        font-jakarta
      ">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#013220]">Remove Item</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center text-center">
          
          {/* Product Thumbnail */}
          <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-200 p-2 mb-4 relative">
             <img 
               src={itemImage} 
               alt={itemName} 
               className="w-full h-full object-contain"
             />
             <div className="absolute -bottom-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full border border-white">
                <Trash2 size={14} />
             </div>
          </div>

          <h4 className="text-gray-900 font-bold text-lg leading-tight mb-1">
            Remove this item?
          </h4>
          <p className="text-gray-500 text-sm mb-6">
            Are you sure you want to remove <span className="font-semibold text-gray-800">"{itemName}" {itemSize && `(${itemSize})`}</span> from your bag?
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              onClick={onClose}
              className="py-3 rounded-lg border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="py-3 rounded-lg bg-red-600 font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
            >
              Yes, Remove
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RemoveItemModal;