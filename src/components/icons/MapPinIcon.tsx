import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const MapPinIcon = memo(function MapPinIcon({ label = "Map Pin Icon", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </g>
    </BaseIcon>
  );
});