import { stats } from "@/data";
import expertise from "@/data/expertise.json";
import experiencesMeta from "@/data/experiences.json";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import type { AboutData } from "./types";
import { withTranslatedList } from "@/i18n/data-mapper";

export const getAboutData = async (locale: Locale): Promise<AboutData> => {
    const t = await getTranslations({ locale });

    const translate = (key: string, options?: any) => {
        try {
            return t(key, options);
        } catch {
            return "";
        }
    };

    // 1. Ensure numeric 'id' is converted to 'string'
    const normalizedMeta = experiencesMeta.map((item) => ({
        ...item,
        id: String(item.id),
    }));

    // 2. Map translated content
    const experiences = withTranslatedList(
        normalizedMeta,
        "experiences.items",
        translate,
        (st, item) => {
            // Slug ko pehle pick karein kyunki translation keys slug par hain (e.g. egora, healthwire)
            const itemKey = item.slug || item.id;
            const rawKey = `experiences.items.${itemKey}.achievements`;

            let achievements: string[] = [];
            try {
                const raw = t.raw(rawKey);
                if (Array.isArray(raw)) {
                    achievements = raw;
                } else if (typeof raw === "object" && raw !== null) {
                    achievements = Object.values(raw);
                }
            } catch {
                achievements = [];
            }

            return {
                role: (st("role") as string) || "",
                description: (st("description") as string) || "",
                achievements,
            };
        }
    );

    return {
        expertiseGroups: [
            { label: "Languages", items: expertise.languages },
            { label: "Android", items: expertise.android },
            { label: "Multiplatform (KMP / CMP)", items: expertise.multiplatform },
            { label: "Flutter", items: expertise.flutter },
            { label: "Architecture", items: expertise.architecture },
            { label: "Tools", items: expertise.tools },
        ],
        experiences,
        stats,
    };
};