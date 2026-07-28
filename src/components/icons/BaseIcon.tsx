// src/components/icons/BaseIcon.tsx
import React, { memo } from "react";

export interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
  label?: string;
}

export const BaseIcon = memo(function BaseIcon({
  label = "icon",
  viewBox = "0 0 24 24",
  size = "1em",
  className,
  children,
  width,
  height,
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      role="img"
      aria-label={label}
      aria-hidden={!label}
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      {children}
    </svg>
  );
});
