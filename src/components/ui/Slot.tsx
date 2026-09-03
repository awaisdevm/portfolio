
import { cloneElement, isValidElement, forwardRef } from "react";
import type { HTMLAttributes, ReactElement, Ref } from "react";
import { cn } from "@/lib/utils";

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Minimal Radix-style Slot: merges the props passed to `<Component asChild>`
 * onto its single child element instead of rendering a wrapper node.
 * Eliminates the need for external `@radix-ui/react-slot` dependency.
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!isValidElement(children)) {
      return null;
    }

    const child = children as ReactElement<{
      className?: string;
      ref?: Ref<HTMLElement>;
    }>;

    return cloneElement(child, {
      ...props,
      ...child.props,
      ref: ref ? ref : child.props.ref,
      className: cn(className, child.props.className),
    });
  }
);

Slot.displayName = "Slot";