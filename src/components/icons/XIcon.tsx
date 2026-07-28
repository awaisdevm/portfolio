import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const XIcon = memo(function XIcon({ label = "X Icon", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z" />
    </BaseIcon>
  );
});

