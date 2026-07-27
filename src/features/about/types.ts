export interface ExpertiseGroup {
    label: string;
    items: string[];
}

export interface Experience {
    id: string;
    slug: string;
    company: string;
    duration: string;
    role: string;
    description: string;
    achievements: string[];
}

export interface Stats {
    yearsExperience: string;
    projectsCompleted: string;
    clientsSatisfied: string;
    appsOnStores: string;
    followers:string
}

export interface AboutData {
    expertiseGroups: ExpertiseGroup[];
    experiences: Experience[];
    stats: Stats;
}