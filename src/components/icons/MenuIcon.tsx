import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const MenuIcon = memo(function MenuIcon({ label = "Menu Icon", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
    </BaseIcon>
  );
});