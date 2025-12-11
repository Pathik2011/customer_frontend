'use client';

import { useEffect, RefObject } from 'react';

/**
 * A reusable hook that adds "Drag to Scroll" and "Horizontal Wheel Scroll" 
 * capabilities to any container ref.
 */
export const useDraggableScroll = (ref: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Horizontal Wheel Handler (Converts vertical scroll to horizontal)
    let timeoutId: NodeJS.Timeout;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      if (el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        // Temporarily disable snap for smooth wheeling
        el.style.scrollSnapType = 'none'; 
        el.scrollLeft += e.deltaY;
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            // Re-enable snap (if you are using snap-x in CSS)
            el.style.scrollSnapType = 'x mandatory'; 
        }, 150);
      }
    };

    // 2. Mouse Drag Handlers
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
       // Only allow left click (button 0)
       if (e.button !== 0) return; 
       
       e.preventDefault(); 
       el.style.scrollSnapType = 'none';
       isDown = true;
       el.style.cursor = 'grabbing';
       startX = e.pageX - el.offsetLeft;
       scrollLeft = el.scrollLeft;
    };

    const onMouseUpOrLeave = () => {
      if (isDown) {
          isDown = false;
          el.style.cursor = 'grab';
          el.style.scrollSnapType = 'x mandatory';
      }
    };

    const onMouseMove = (e: MouseEvent) => {
       if (!isDown) return;
       e.preventDefault();
       const x = e.pageX - el.offsetLeft;
       const walk = (x - startX) * 1.5; // Scroll speed multiplier
       el.scrollLeft = scrollLeft - walk;
    };

    // Prevent context menu while dragging
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    // Attach Listeners
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseUpOrLeave);
    el.addEventListener('mouseup', onMouseUpOrLeave);
    el.addEventListener('mousemove', onMouseMove);
    // Optional: add context menu prevention if right-click issues occur
    // el.addEventListener('contextmenu', onContextMenu); 

    // Initial cursor style
    el.style.cursor = 'grab';

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseUpOrLeave);
      el.removeEventListener('mouseup', onMouseUpOrLeave);
      el.removeEventListener('mousemove', onMouseMove);
      // el.removeEventListener('contextmenu', onContextMenu);
    };
  }, [ref]);
};