import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const FlutterIcon = memo(function FlutterIcon({ label = "Flutter Icon", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <path fill="currentColor" d="M5.9 15.375L2.5 12l11-11h6.775zM13.5 23l-5.925-5.925L13.5 11.15h6.775l-5.925 5.925L20.275 23z" />
    </BaseIcon>
  );
});
