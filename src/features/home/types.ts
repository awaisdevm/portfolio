import { TranslateFn } from "@/i18n/types";
import type { Project } from "@/features/projects/data";

/** 
 * The Final, UI-Ready Data Structure.
 * This is the ONLY object the components ever see. 
 * No raw keys, no unformatted strings, no path resolution needed.
 */
export interface HomeViewModel {
  // 1. Hero Section Data
  hero: {
    availabilityText: string;
    contactPath: string;
    projectsPath: string;
    heading1: string;
    heading2: string;
    description: string;
    buttonStartText: string;
    buttonViewText: string;
    stats: {
      experience: string;
      completed: string;
      stores: string;
    };
  };

  // 2. Projects Section Data
  projects: {
    items: any[]; // These are already mapped to LocalizedProject
    path: string;
  };

  // 3. Process Section Data
  processSteps: Array<{
    step: string;
    title: string;
    body: string;
  }>;

  // 4. Testimonials Section Data
  testimonials: {
    items: any[];
    path: string;
    title: string; // feedbackTitle
    subtitle: string; // feedbackSubtitle
    allLinkText: string; // allTestimonialsLink
    allLinkHref: string;
  };
}