'use client';

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'danger' 
  | 'icon' 
  | 'pill' 
  | 'gold' 
  | 'copper' 
  | 'dark'
  | 'glass';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'pill';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', isLoading, icon, disabled, ...props }, ref) => {

    const baseClasses = "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B35817] focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer";

    const sizeClasses = {
      sm: "h-9 px-4 text-xs tracking-wider rounded-full",
      md: "h-11 px-6 text-xs sm:text-sm rounded-full",
      lg: "h-13 px-8 text-sm sm:text-base rounded-full",
      pill: "h-11 px-6 text-xs tracking-wider rounded-full uppercase",
      icon: "h-10 w-10 p-0 rounded-full",
    }[size];

    const variantClasses = {
      primary: "bg-[#B35817] text-white border border-transparent hover:bg-[#94460E] hover:shadow-copper-glow",
      secondary: "bg-[#14182E] text-[#FAF8F4] border border-white/15 hover:bg-[#1B203D] hover:shadow-lapis-glow",
      outline: "border border-[#14182E] text-[#14182E] bg-transparent hover:bg-[#14182E] hover:text-[#FAF8F4]",
      ghost: "text-[#4A453E] hover:text-[#161412] hover:bg-[#F3EFE6]",
      danger: "bg-[#96383E] text-white border border-transparent hover:bg-[#7A2A30]",
      icon: "text-[#4A453E] hover:text-[#14182E] hover:bg-[#F3EFE6] border border-[#E8E2D7]",
      pill: "bg-[#FAF8F4] text-[#14182E] border border-[#E8E2D7] hover:border-[#14182E] hover:bg-[#14182E] hover:text-white",
      gold: "bg-[#B35817] text-white font-medium border border-transparent hover:bg-[#94460E] hover:shadow-copper-glow",
      copper: "bg-[#B35817] text-white font-medium border border-transparent hover:bg-[#94460E] hover:shadow-copper-glow",
      dark: "bg-[#0C0E1A] text-white border border-white/15 hover:bg-[#14182E] hover:shadow-lg",
      glass: "bg-white/10 backdrop-blur-md text-[#EBD8C1] border border-white/15 hover:bg-white/20 hover:text-white",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseClasses, sizeClasses, variantClasses, className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <span className="inline-flex items-center gap-2">
            {icon}
            {children}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
