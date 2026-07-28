import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const ArrowUpRightIcon = memo(function ArrowUpRightIcon({ label = "Arrow Up Right", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <path fill="currentColor" d="M18 4.5A1.5 1.5 0 0 1 19.5 6v8a1.5 1.5 0 0 1-3 0V9.621l-9.097 9.097a1.5 1.5 0 0 1-2.12-2.122L14.377 7.5H10a1.5 1.5 0 1 1 0-3z" />
    </BaseIcon>
  );
});