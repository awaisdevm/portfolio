import profileData from "./personal-data.json";
import expertiseData from "./expertise.json";
import statsData from "./stats.json";
import projectsData from "./projects.json";
import servicesData from "./services.json";
import experiencesData from "./experiences.json";
import testimonialsData from "./testimonials.json";

// 1. Export Types directly from imported shapes
export type RawProject = typeof projectsData[number];
export type Service = (typeof servicesData)[number];
export type Experience = (typeof experiencesData)[number];
export type Testimonial = (typeof testimonialsData)[number];

// 2. Export Structured Slices
export const profile = profileData;
export const expertise = expertiseData;
export const stats = statsData;
export const rawProjects: RawProject[] = projectsData;
export const services: Service[] = servicesData;
export const experiences: Experience[] = experiencesData;
export const testimonials: Testimonial[] = testimonialsData;

// 3. Derived Filter Slices
export const platformFilters = Array.from(
    new Set(rawProjects.map((p) => p.platform))
).sort();