import type { ComponentType } from "react";

export interface ContactOption {
    icon: ComponentType<{ className?: string }>;
    label: string;
    value: string;
    meta: string;
    themeStyles: {
        iconColor: string;
        glow: string;
    };
    href: string;
    isObfuscated: boolean;
    obfuscateType: "email" | "phone";
}


export interface ContactFormLabels {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    buttonSend: string;
}