import { stats, testimonials, rawProjects } from "@/data/index";
import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";
import { withTranslatedList } from "@/i18n/data-mapper";

export const getHomeData = async (locale: Locale) => {
    const translate = await getTranslationServer(locale);

    // 1. Automatic Dynamic Project Mapping (No manual fields!)
    const featuredProjects = withTranslatedList(
        rawProjects.slice(0, 3),
        "projects.items",
        translate,
        (scopedT, raw) => ({
            ...raw,
            // scopedT automatic slug resolution kar leta hai
            title: scopedT("title"),
            category: scopedT("category"),
            summary: scopedT("summary"),
            description: scopedT("description"),
            ctaText: scopedT("ctaText"),
            altText: scopedT("altText"),
            highlights: [0, 1, 2].map((id) => scopedT(`highlights.${id}`)),
        })
    );

    // 2. Automatic Testimonials Mapping
    const featuredTestimonials = withTranslatedList(
        testimonials.slice(0, 3),
        "testimonials.items",
        translate,
        (scopedT, raw) => ({
            ...raw,
            name: scopedT("name"),
            role: scopedT("role"),
            project: scopedT("project"),
            message: String(scopedT("message")),
        })
    );

    return {
        featuredProjects,
        featuredTestimonials,
        stats,
        processStepIds: ["01", "02", "03", "04"] as const,
    };
};