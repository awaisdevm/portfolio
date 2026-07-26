import { stats, testimonials, rawProjects } from "@/data/index";
import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";
import { withTranslatedList } from "@/i18n/data-mapper";
import { mapToLocalizedProject } from "@/features/projects/data";

export const getHomeData = async (locale: Locale) => {
    const translate = getTranslationServer(locale);

    // 1. Featured Projects mapping (Re-using mapToLocalizedProject for 100% consistency)
    const featuredProjects = rawProjects
        .slice(0, 3)
        .map((raw) => mapToLocalizedProject(raw as any, translate));

    // 2. Featured Testimonials mapping
    const featuredTestimonials = withTranslatedList(
        testimonials.slice(0, 3),
        "testimonialsData",
        translate,
        (t) => ({
            message: String(t("message") ?? ""), // 👈 Is String() cast se TS error completely solve ho jayega!
        })
    );

    return {
        featuredProjects,
        featuredTestimonials,
        stats,
        processStepIds: ["01", "02", "03", "04"] as const,
    };
};