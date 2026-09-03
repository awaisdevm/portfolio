import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const HomeIcon = memo(function HomeIcon({ label = "Home", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        points="9 22 9 12 15 12 15 22"
      />
    </BaseIcon>
  );
});
