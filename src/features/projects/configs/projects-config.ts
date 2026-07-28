

import { TranslateFn } from "@/i18n/types";

export const PROJECT_FILTER_KEYS = [
    "android",
    "ios",
    "kmp",
    "cmp",
    "flutter",
] as const;

export type ProjectFilterKey = (typeof PROJECT_FILTER_KEYS)[number];

export interface ProjectsGridConfig {
    allLabel: string;
    filters: { value: string; label: string }[];
    labels: {
        noProjectsFound: string;
        viewProject: string;
        backToAll: string;
        techStack: string;
        ctaPlayStore: string;
        ctaAppStore: string;
        ctaDetails: string;
    };
}

export function getProjectsGridConfig(
    translate: TranslateFn
): ProjectsGridConfig {
    return {
        allLabel: translate("projects.filters.all"),
        filters: PROJECT_FILTER_KEYS.map((key) => ({
            value: key,
            label: translate(`projects.filters.${key}`),
        })),
        labels: {
            noProjectsFound: translate("projects.noProjectsFound"),
            backToAll: translate("projects.backToProjects"),
            viewProject: translate("projects.ctas.details"),
            techStack: translate("projects.techStack"),
            ctaPlayStore: translate("projects.ctas.playStore"),
            ctaAppStore: translate("projects.ctas.appStore"),
            ctaDetails: translate("projects.ctas.details"),
        },
    };
}