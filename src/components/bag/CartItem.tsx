
'use client';

import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdate?: () => void;
  readonly?: boolean;
  onRemove?: () => void; // [!code ++] New prop to trigger parent modal
}

const CartItem = ({ item, onUpdate, readonly = false, onRemove }: CartItemProps) => {
  const router = useRouter();
  const { addToCart, removeFromCart } = useCart();

  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const lastSyncedQty = useRef(item.quantity);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const isLiquid = ['ML', 'L', 'LIT'].includes(item.uom.toUpperCase());
  const unitType = isLiquid ? 'bottle' : 'pack';
  const displaySize = `${quantity} ${unitType}(${item.size}${item.uom})`;

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (readonly) return;
    let newQty = quantity;
    if (type === 'dec' && quantity > 1) newQty = quantity - 1;
    if (type === 'inc') newQty = quantity + 1;

    if (newQty !== quantity) {
      setQuantity(newQty);

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(async () => {
        const delta = newQty - lastSyncedQty.current;

        if (delta !== 0) {
           setIsUpdating(true);
           try {
             await addToCart(item.product_variant_id, delta);
             lastSyncedQty.current = newQty;
             if (onUpdate) onUpdate();
           } catch (err) {
             console.error("Cart Item update failed", err);
             setQuantity(lastSyncedQty.current);
           } finally {
             setIsUpdating(false);
           }
        }
      }, 1000);
    }
  };

  const handleRemove = async () => {
    if (readonly || isRemoving) return;

    // [!code ++] If parent provided a handler (Popup), call it and stop here.
    if (onRemove) {
        onRemove();
        return;
    }

    // [!code note] Original logic runs only if no onRemove prop exists
    setIsRemoving(true);
    try {
      await removeFromCart(item.product_variant_id);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to remove item", error);
      setIsRemoving(false);
    }
  };

  const containerOpacity = isRemoving ? 'opacity-50 pointer-events-none' : 'opacity-100';

  const handleNavigate = () => {
    router.push(`/shop/${item.product_id}`);
  };

  return (
    <div className={`
      relative shrink-0 font-jakarta bg-white border border-[#E0E2E7] rounded-[12px] transition-opacity duration-200
      w-full max-w-[369px] mx-auto h-[155px]
      md:max-w-none md:mx-0 md:h-[261px]
      cursor-default
      ${containerOpacity}
    `}>

      {/* --- Image Section --- */}
      <div 
        onClick={handleNavigate}
        className="
          absolute bg-[#F3F3F5] flex items-center justify-center
          top-[4px] left-[4px] w-[116px] h-[147px] rounded-[8px]
          md:top-[8px] md:left-[8px] md:w-[232px] md:h-[245px]
          cursor-pointer hover:opacity-90 transition-opacity
      ">
         <div className="relative w-[60%] h-[80%]">
            <img 
                src={item.product_front_image_url || "https://placehold.co/80x160?text=No+Image"} 
                alt={item.product_name} 
                className="w-full h-full object-contain mix-blend-multiply" 
            />
         </div>
      </div>

      {/* Details Section */}
      <div className="
        absolute flex flex-col items-start
        left-[132px] top-[12px] right-[12px]
        md:left-[272px] md:top-[32px] md:right-auto
      ">
          <h3 
            onClick={handleNavigate}
            className="
              font-bold text-gray-900 leading-tight truncate w-full 
              text-[14px] pr-6 
              md:text-lg md:w-[400px] md:pr-0
              cursor-pointer hover:text-emerald-700 transition-colors
            " 
            title={item.product_name}
          >
            {item.product_name}
          </h3>

          <p className="text-gray-500 font-medium mt-[4px] text-[12px] md:text-sm md:mt-[10px]">
            {item.brand_name}
          </p>

          <p className="text-gray-500 mt-[4px] text-[12px] md:text-sm md:mt-[32px]">
            Size: <span className="text-gray-900 font-semibold">{displaySize}</span>
          </p>

          {/* Quantity Controls / Display */}
          <div className="mt-auto pt-3 md:mt-[28px] md:pt-0">

            {readonly ? (
                <div className="text-sm font-bold text-gray-900 mt-2">
                    Qty: {quantity < 10 ? `0${quantity}` : quantity}
                </div>
            ) : (
                <>
                    <p className="hidden md:block text-sm font-bold text-gray-900 mb-[6px]">Quantity</p>
                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-[8px] md:rounded-[12px] w-[90px] h-[32px] md:w-[126px] md:h-[42px]">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleQuantity('dec'); }}
                              disabled={isUpdating || quantity <= 1}
                              className="w-8 md:w-10 h-full flex items-center justify-center text-red-500 hover:bg-gray-50 rounded-l-[8px] md:rounded-l-[12px] transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <Minus size={14} className="md:w-[18px] md:h-[18px]" /> 
                            </button>

                            <span className="font-bold text-gray-900 text-xs md:text-base cursor-default">
                              {quantity < 10 ? `0${quantity}` : quantity}
                            </span>

                            <button 
                              onClick={(e) => { e.stopPropagation(); handleQuantity('inc'); }}
                              disabled={isUpdating}
                              className="w-8 md:w-10 h-full flex items-center justify-center text-[#003C22] hover:bg-gray-50 rounded-r-[8px] md:rounded-r-[12px] transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <Plus size={14} className="md:w-[18px] md:h-[18px]" />
                            </button>
                        </div>

                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                          className="
                            w-[40px] h-[40px] rounded-[60px] 
                            flex items-center justify-center 
                            bg-[#FB212F1A] hover:bg-[#fb212f2f] transition-colors
                            p-[10px]
                            md:hidden
                            cursor-pointer
                          "
                        >
                          <img 
                            src="/icons/close-circle.svg" 
                            alt="Remove" 
                            className="w-full h-full"
                          />
                        </button>
                    </div>
                </>
            )}
          </div>
      </div>

      {/* Price (Right Side) */}
      <div className="absolute flex flex-col items-end gap-1 bottom-[12px] right-[12px] md:top-8 md:right-8 md:bottom-auto">
          <p className="font-bold text-[#003C22] text-[16px] md:text-2xl">
            ₹{item.discounted_price.toFixed(2)}
          </p>

          {item.discount > 0 ? (
              <p className="text-[10px] md:text-sm text-gray-400 line-through">₹{item.price.toFixed(2)}</p>
          ) : (
              <p className="text-[10px] md:text-sm invisible select-none">&nbsp;</p>
          )}
      </div>

      {/* Desktop Remove Button (Hide if readonly) */}
      {!readonly && (
          <div className="hidden md:flex absolute right-8 top-8 flex-col items-end h-full pointer-events-none">
             <div className="h-[120px]"></div>
             <button 
               onClick={(e) => { e.stopPropagation(); handleRemove(); }}
               className="
                 pointer-events-auto p-2 rounded-full transition-colors
                 hover:bg-[#FB212F1A]
                 cursor-pointer
               "
             >
                <img 
                    src="/icons/close-circle.svg" 
                    alt="Remove" 
                    className="w-6 h-6"
                />
             </button>
          </div>
      )}

    </div>
  );
};

export default CartItem;