'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPressProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const AnimatedPress: React.FC<AnimatedPressProps> = ({ 
  children, 
  className = "", 
  onClick 
}) => {
  return (
    <motion.div
      // 1. The Animation Logic
      whileHover={{ y: -5 }}          // Moves up 5px on hover
      whileTap={{ scale: 0.95 }}      // Shrinks to 95% size on click
      transition={{ type: "spring", stiffness: 300, damping: 15 }} // Bouncy physics
      
      // 2. Styling
      className={`cursor-pointer ${className}`} // Merges your custom classes
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPress;