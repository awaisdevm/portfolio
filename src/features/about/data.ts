

import { stats } from "@/data";
import expertise from "@/data/expertise.json";
import experiencesMeta from "@/data/experiences.json";
import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";
import type { AboutData } from "./types";
import { withTranslatedList } from "@/i18n/data-mapper";

export const getAboutData = (locale: Locale): AboutData => {
    const translate = getTranslationServer(locale);

    // 1. Ensure numeric 'id' is converted to 'string'
    const normalizedMeta = experiencesMeta.map((item) => ({
        ...item,
        id: String(item.id),
    }));

    // 2. Map translated content with explicit string types
    const experiences = withTranslatedList(
        normalizedMeta,
        "experiencesData",
        translate,
        (t) => {
            const rawAchievements = t<Record<string, string> | string[]>(
                "achievements",
                { returnObjects: true }
            );

            const achievements = Array.isArray(rawAchievements)
                ? rawAchievements
                : typeof rawAchievements === "object" && rawAchievements !== null
                    ? Object.values(rawAchievements)
                    : [];

            return {
                role: (t("role") as string) || "",
                description: (t("description") as string) || "",
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