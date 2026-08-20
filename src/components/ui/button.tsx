import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', isLoading, icon, disabled, ...props }, ref) => {
    const isIconOnly = variant === 'icon' || size === 'icon';

    const baseClasses = "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer";

    const sizeClasses = {
      sm: "h-10 px-5 text-xs tracking-wider",
      md: "h-12 px-7 text-sm",
      lg: "h-14 px-9 text-base",
      icon: "h-11 w-11 p-0",
    }[size];

    const variantClasses = {
      primary: "bg-surface-dark text-white border border-transparent hover:bg-black hover:border-gold-500/30",
      secondary: "bg-surface text-text-primary border border-border hover:border-text-primary hover:bg-surface-hover",
      outline: "border border-text-primary text-text-primary bg-transparent hover:bg-surface-dark hover:text-white hover:border-surface-dark",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-hover/60",
      danger: "bg-danger text-white border border-transparent hover:bg-danger/90",
      icon: "text-text-secondary hover:text-text-primary hover:bg-surface-hover/80",
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
    )
  }
)
Button.displayName = "Button"
