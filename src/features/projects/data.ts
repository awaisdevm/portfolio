import { rawProjects } from "@/data";
import { getTranslationServer } from "@/i18n/i18n-server";
import type { Locale } from "@/i18n/config";
import { withTranslatedFields } from "@/i18n/data-mapper";
import { TranslateFn } from "@/i18n/types";

export interface RawProject {
    id: number;
    slug: string;
    platform: string;
    image: string;
    url?: string;
    isOnPlayStore: boolean;
    isOnAppStore: boolean;
    themeColor?: string;
    iosUrl?: string;
    tech: string[];
    technology?: string;
    updatedAt?: string;
}


export interface Project extends RawProject {
    title: string;
    summary: string;
    category: string;
    altText: string;
}


export function mapToLocalizedProject(
    raw: RawProject,
    translate: TranslateFn
): Project {
    return withTranslatedFields(raw, "projects.items", translate, (st) => {
        const title = (st("title") ?? "") as string;
        const summary = (st("summary") ?? "") as string;
        const category = (st("category") ?? "") as string;
        const fetchedAlt = st("altText");
        const altText = (fetchedAlt && typeof fetchedAlt === "string" && fetchedAlt.length > 0)
            ? fetchedAlt
            : `${title || "Project"} preview by Muhammad Awais`;
        return {
            title,
            summary,
            category,
            altText,
        };
    }) as Project;

}


export async function getProjectData(locale: Locale): Promise<Project[]> {
    const translate = await  getTranslationServer(locale);
    return (rawProjects as RawProject[]).map((raw) =>
        mapToLocalizedProject(raw, translate)
    );
}