'use client';

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'sage'
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

    const baseClasses = "relative inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A4530C] focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer";

    const sizeClasses = {
      sm: "h-9 px-4 text-xs tracking-wider rounded-full",
      md: "h-11 px-6 text-xs sm:text-sm rounded-full",
      lg: "h-13 px-8 text-sm sm:text-base rounded-full",
      pill: "h-11 px-6 text-xs tracking-wider rounded-full uppercase",
      icon: "h-10 w-10 p-0 rounded-full",
    }[size];

    const variantClasses = {
      primary: "floating-btn-amber",
      secondary: "floating-btn-umber",
      sage: "floating-btn-sage",
      outline: "border border-[#3A230A] text-[#3A230A] bg-transparent hover:bg-[#3A230A] hover:text-[#EEE9C1] hover:-translate-y-0.5 shadow-floating-sm",
      ghost: "text-[#57442D] hover:text-[#2A1A08] hover:bg-[#EEE9C1]/50",
      danger: "bg-[#96383E] text-white border border-transparent hover:bg-[#7A2A30] hover:-translate-y-0.5",
      icon: "text-[#57442D] hover:text-[#2A1A08] hover:bg-[#EEE9C1]/60 border border-[#DFD7B5]",
      pill: "bg-[#FAF8EE] text-[#2A1A08] border border-[#DFD7B5] hover:border-[#A4530C] hover:bg-white hover:-translate-y-0.5 shadow-floating-sm",
      gold: "floating-btn-amber",
      copper: "floating-btn-amber",
      dark: "floating-btn-umber",
      glass: "bg-white/12 backdrop-blur-md text-[#EEE9C1] border border-white/20 hover:bg-white/20 hover:text-white hover:-translate-y-0.5 shadow-floating-sm",
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
