

import { TranslateFn } from "@/i18n/types";
import {
    AndroidIcon,
    ComposeMultiplatformIcon,
    FlutterIcon,
    StackOutlinedIcon,
    type IconProps,
} from "@/components/icons/icons";


export const SERVICES_ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
    android: AndroidIcon,
    compose: ComposeMultiplatformIcon,
    flutter: FlutterIcon,
    architecture: StackOutlinedIcon,
};


export interface RawService {
    id: number;
    slug: string;
    icon: string;
    tech: string[];
}


export interface LocalizedServiceItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    tech: string[];
    iconName: string;
}

export function getLocalizedServices(
    translate: TranslateFn,
    rawServices: RawService[]
): LocalizedServiceItem[] {
    return rawServices.map((service) => ({
        id: String(service.id),
        slug: service.slug,
        title: translate(`services.items.${service.slug}.title`),
        description: translate(`services.items.${service.slug}.description`),
        tech: service.tech,
        iconName: service.icon,
    }));
}