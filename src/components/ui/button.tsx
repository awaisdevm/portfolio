
import React, { forwardRef } from "react";
import { Slot } from "./slot";
import { cn } from "@/lib/utils";

type Variant = "ghost" | "solid" | "outline";
type Size = "default" | "icon" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

// ============================================================================
// STYLING CONFIGURATION (Aligned with globals.css Design Tokens)
// ============================================================================
const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  variants: {
    solid:
      "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:scale-[1.02] hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30",
    outline:
      "border border-border-subtle bg-surface/40 text-heading backdrop-blur-sm hover:border-primary/40 hover:bg-surface-elevated hover:text-heading",
    ghost:
      "text-foreground hover:bg-surface-elevated hover:text-heading",
  },
  sizes: {
    default: "px-6 py-3.5 min-h-[44px]",
    sm: "px-4 py-2 text-[11px] min-h-[36px]",
    icon: "h-11 w-11 p-2.5 min-h-[44px] min-w-[44px]",
  },
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonStyles.base,
          buttonStyles.variants[variant],
          buttonStyles.sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";