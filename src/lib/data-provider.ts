import { getTranslationServer } from "@/i18n/i18n-server";
import { Locale } from "@/i18n/config";
import { withTranslatedList, withTranslatedFields } from "@/i18n/data-mapper";

import rawProjects from "@/data/projects.json";
import rawTestimonials from "@/data/testimonials.json";
import rawExperiences from "@/data/experiences.json";
import rawServices from "@/data/services.json";

export function getLocalizedPortfolioData(locale: Locale) {
    const t = getTranslationServer(locale);

    // 1. Projects: Using List + Field mapping
     const projects = withTranslatedList(rawProjects, "projectsData", t, (scopedT, project) => ({
        title: scopedT("title"),
        category: scopedT("category"),
        summary: scopedT("summary"),
        description: scopedT("description"),
        ctaText: scopedT("ctaText"),
        altText: scopedT("altText"),
        highlights: [0, 1, 2].map((id) => scopedT(`highlights.${id}`)),
    }));

    // 2. Testimonials: Simple Mapping
    const testimonials = withTranslatedList(rawTestimonials, "testimonialsData", t, (scopedT, item) => ({
        message: scopedT("message"),
    }));

    // 3. Experiences: Using List + Field mapping
    const experiences = withTranslatedList(rawExperiences, "experiencesData", t, (scopedT, exp) => ({
        role: scopedT("role"),
        description: scopedT("description"),
        achievements: [0, 1, 2].map((id) => scopedT(`achievements.${id}`)),
    }));

    // 4. Services: Simple Mapping
    
    const services = withTranslatedList(rawServices, "servicesData", t, (scopedT, service) => ({
        title: scopedT("title"),
        description: scopedT("description"),
    }));

    return {
        projects,
        testimonials,
        experiences,
        services,
    };
}