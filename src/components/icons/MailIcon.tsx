import { memo } from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export const MailIcon = memo(function MailIcon({ label = "Mail Icon", ...props }: IconProps) {
  return (
    <BaseIcon label={label} {...props}>
      <path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 4.99L4 6zm0 12H4V8l8 5l8-5z" />
    </BaseIcon>
  );
});