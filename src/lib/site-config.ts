import { SiteConfig, NavLink } from "@/types/site";
import data from "@/data/personal-data.json";
import { FiverrIcon, GithubIcon, LinkedinIcon, MediumIcon, StackOverflowIcon, UpworkIcon, XIcon } from "@/components/icons/icons";

const SITE_URL = "https://devawais.com";

const personalData = data as any;

export const siteConfig: SiteConfig = {
  name: personalData.name,
  shortName: personalData.shortName,
  role: personalData.title || "Mobile App Developer",
  tagline: personalData.subtitle || "Building Clean & Performant Apps",
  bio: personalData.bio || "",

  email: personalData.contact?.email || "mughal963@gmail.com",

  location: personalData.location || "Lahore, Pakistan",
  availability: personalData.availability || "Available for freelance",
  url: SITE_URL,
  description: `${personalData.name} — specializing in Android, Kotlin Multiplatform (KMP), and Flutter app development.`,
  keywords: [
    "Muhammad Awais",
    "Devawais",
    "Android Developer",
    "Mobile Developer",
    "Kotlin Multiplatform",
    "Flutter Developer",
    "Jetpack Compose",
  ],
  expertise: {
    languages: ["Kotlin", "Java", "Dart", "TypeScript"],
    android: ["Jetpack Compose", "Coroutines"],
    multiplatform: ["Compose Multiplatform", "KMP"],
    flutter: ["Flutter", "Bloc", "Dart"],
    architecture: ["MVI", "MVVM", "Clean Architecture"],
  },
  socialBaseUrls: personalData.socialBaseUrls,
  usernames: personalData.usernames,
};

export const socialLinks = [
  {
    id: "github",
    href: `${personalData.socialBaseUrls.github}${personalData.usernames.github}`,
    displayValue: `@${personalData.usernames.github}`,
    icon: GithubIcon,
    label: "GitHub",
    isEmail: false
  },
  {
    id: "linkedin",
    href: `${personalData.socialBaseUrls.linkedin}${personalData.usernames.linkedin}`,
    displayValue: `@${personalData.usernames.linkedin}`,
    icon: LinkedinIcon,
    label: "LinkedIn",
    isEmail: false
  },
  // ...(personalData.usernames.twitter ? [{
  //   id: "twitter",
  //   href: `${personalData.socialBaseUrls.twitter}${personalData.usernames.twitter}`,
  //   displayValue: `@${personalData.usernames.twitter}`,
  //   icon: XIcon,
  //   label: "Twitter",
  //   isEmail: false
  // }] : []),
  ...(personalData.usernames.stackoverflow ? [{
    id: "stackoverflow",
    href: `${personalData.socialBaseUrls.stackoverflow}${personalData.usernames.stackoverflow}`,
    displayValue: `@${personalData.usernames.stackoverflow}`,
    icon: StackOverflowIcon,
    label: "Stack Overflow",
    isEmail: false
  }] : []),
  ...(personalData.usernames.medium ? [{
    id: "medium",
    href: `${personalData.socialBaseUrls.medium}${personalData.usernames.medium}`,
    displayValue: `@${personalData.usernames.medium}`,
    icon: MediumIcon,
    label: "Medium",
    isEmail: false
  }] : []),

  ...(personalData.usernames.fiverr ? [{
    id: "fiverr",
    href: `${personalData.socialBaseUrls.fiverr}${personalData.usernames.fiverr}`,
    displayValue: `@${personalData.usernames.fiverr}`,
    icon: FiverrIcon, // Replace with the actual Fiverr icon if available
    label: "Fiverr",
    isEmail: false
  }] : []),

  // NEW: Add Upwork if username exists
  ...(personalData.usernames.upwork ? [{
    id: "upwork",
    href: `${personalData.socialBaseUrls.upwork}${personalData.usernames.upwork}`,
    displayValue: `@${personalData.usernames.upwork}`,
    icon: UpworkIcon, // Replace with the actual Upwork icon if available
    label: "Upwork",
    isEmail: false
  }] : []),

  // NEW: Add WhatsApp (Special Case: uses phone number from contact object)
  ...(personalData.contact?.whatsapp ? [{
    id: "whatsapp",
    href: `${personalData.socialBaseUrls.whatsapp}${personalData.contact.whatsapp}`,
    displayValue: personalData.contact.whatsapp,
    icon: MediumIcon,
    label: "WhatsApp",
    isEmail: true // This triggers the ObfuscatedContact component you already have!
  }] : [])
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const satisfies NavLink[];

export const siteRoutes = {
  home: "/",
  about: "/about",
  services: "/services",
  projects: "/projects",
  testimonials: "/testimonials",
  blog: "/blog",
  contact: "/contact",
} as const;

export const pageMetaDefaults = {
  home: { slug: "home", keyPrefix: "home" },
  testimonials: { slug: "testimonials", keyPrefix: "testimonials" },
  services: { slug: "services", keyPrefix: "services" },
  about: { slug: "about", keyPrefix: "about" },
  blog: { slug: "blog", keyPrefix: "blog" },
  contact: { slug: "contact", keyPrefix: "contact" },
  projects: { slug: "projects", keyPrefix: "projects" },
} as const;

export type PageKey = keyof typeof pageMetaDefaults;