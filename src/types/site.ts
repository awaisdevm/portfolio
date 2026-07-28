export interface Usernames {
    github: string;
    linkedin: string;
    twitter?: string;
    medium?: string;
    stackoverflow?: string;
}
export interface SocialPlatform {
    base: string;
    username: string;
}
export interface SocialBaseUrls {
    github: string;
    linkedin: string;
    twitter: string;
    medium: string;
    stackoverflow: string;
}

export interface Expertise {
    languages: string[];
    android: string[];
    multiplatform: string[];
    flutter: string[];
    architecture: string[];
}

export interface SiteConfig {
    name: string;
    shortName: string;
    role: string;
    tagline: string;
    bio: string;
    email: string;
    location: string;
    availability: string;
    socialBaseUrls: SocialBaseUrls;
    usernames: Usernames;
    expertise: Expertise;
    url: string;
    description: string;
    keywords: string[];
}

export interface NavLink {
    href: string;
    label: string;
}