import { useMemo } from "react";
import { siteConfig, socialLinks } from "@/lib/site-config";
import { LinkedinIcon, GithubIcon, MailIcon } from "@/components/icons";

const iconMap = {
    email: MailIcon,
    github: GithubIcon,
    linkedin: LinkedinIcon,
};

export function useSocialLinks() {
    return useMemo(() => {
        const formattedLinks = socialLinks.map((link) => ({
            label: link.label,
            href: link.href,
            displayValue: link.displayValue,
            isEmail: link.isEmail,
            icon: iconMap[link.id as keyof typeof iconMap] || link.icon,
        }));

        return [
            ...formattedLinks,
            {
                label: "Email",
                href: `mailto:${siteConfig.email}`,
                displayValue: siteConfig.email,
                isEmail: true,
                icon: MailIcon
            }
        ];
    }, []);
}