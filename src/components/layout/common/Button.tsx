import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
  variant = "default",
  size = "md",
  type = "button",
}) => {
  // Base styles
  const baseStyles =
    "rounded-[40px] flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

  // Size variants
  const sizeStyles = {
    sm: "w-max h-max min-w-8 min-h-8 p-2",
    md: "w-max h-max min-w-10 min-h-10 p-[10px]",
    lg: "w-max h-max min-w-12 min-h-12 p-3",
  };

  // Color variants
  const variantStyles = {
    default: {
      enabled:
        "bg-[#F3F3F5] text-primary hover:bg-gray-200 focus:ring-gray-300",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50",
    },
    primary: {
      enabled: "bg-primary text-white hover:bg-green-700 focus:ring-primary/50",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50",
    },
    secondary: {
      enabled:
        "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
      disabled:
        "bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed opacity-50",
    },
  };

  // Combine styles
  const buttonStyles = cn(
    baseStyles,
    sizeStyles[size],
    disabled ? variantStyles[variant].disabled : variantStyles[variant].enabled,
    className
  );

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
