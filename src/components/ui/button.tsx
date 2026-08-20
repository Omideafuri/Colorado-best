import React from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
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

    // Base classes
    const baseClasses = "group relative cursor-pointer overflow-hidden rounded-xl border text-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    // Size classes
    const sizeClasses = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      icon: "h-11 w-11 flex items-center justify-center p-0 rounded-xl",
    }[size];

    // Variant classes
    const variantClasses = {
      primary: "bg-surface border-primary text-text-primary",
      secondary: "bg-background border-slate-700 text-text-secondary hover:text-text-primary",
      outline: "bg-transparent border-slate-700 text-text-primary",
      ghost: "bg-transparent border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary",
      danger: "bg-surface border-danger text-danger",
      icon: "bg-surface border-slate-700 text-text-secondary hover:text-text-primary hover:border-primary",
    }[variant];

    // Dot colors for the hover effect
    const dotColors = {
      primary: "bg-primary",
      secondary: "bg-slate-700",
      outline: "bg-slate-800",
      ghost: "bg-slate-800",
      danger: "bg-danger",
      icon: "bg-primary",
    }[variant];

    // Inner text colors when hovered (since dot expands)
    const hoverTextColors = {
      primary: "text-primary-foreground",
      secondary: "text-white",
      outline: "text-white",
      ghost: "text-white",
      danger: "text-white",
      icon: "text-white",
    }[variant];

    // For icon buttons, we use a simpler interaction (no translating text)
    if (isIconOnly) {
      return (
        <button
          ref={ref}
          disabled={disabled || isLoading}
          className={cn(baseClasses, sizeClasses, variantClasses, "flex items-center justify-center", className)}
          {...props}
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseClasses, sizeClasses, variantClasses, className)}
        {...props}
      >
        <div className="flex h-full w-full items-center justify-center gap-2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <div className={cn("h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]", dotColors)}></div>
          )}
          <span className="inline-block transition-all duration-300 group-hover:-translate-x-12 group-hover:opacity-0">
            {children}
          </span>
        </div>
        <div className={cn("absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100", hoverTextColors)}>
          <span>{children}</span>
          {!isLoading && (icon || <ArrowLeft className="h-4 w-4" />)}
        </div>
      </button>
    )
  }
)
Button.displayName = "Button"
