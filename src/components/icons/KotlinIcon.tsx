import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const KotlinIcon = memo(function KotlinIcon({ label = "Kotlin Icon", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M24 24H0V0h24L12 12Z" />
    </BaseIcon>
  );
});
