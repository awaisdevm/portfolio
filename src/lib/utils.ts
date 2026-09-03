import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and resolves conflicts using tailwind-merge.
 * Essential for Tailwind CSS v4 dynamic classes.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a human-readable US format.
 * Added a safety check to prevent "Invalid Date" from breaking the UI.
 */
export function formatFullDateTime(dateStr?: string): string {
    if (!dateStr) return "";
    let date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        date = new Date(dateStr.replace(" ", "T"));
    }

    if (isNaN(date.getTime())) {
        console.warn(`[utils] Invalid date string provided: ${dateStr}`);
        return "";
    }

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export interface StandardPageLabels {
    title: string;
    headerTitle: string;
    headerDesc: string;
}

/**
 * Retrieves standardized labels for a specific page from translations.
 * @param translate The next-intl translation function
 * @param pageKey The namespace key in your JSON translation files
 */
export function getStandardPageLabels(
    translate: (key: string) => string,
    pageKey: string
): StandardPageLabels {
    // Using a fallback to prevent empty strings if the key is missing
    const getValue = (subKey: string) => {
        // We use the pageKey to build the full path. 
        // Ensure we don't add an extra dot if pageKey is empty or already ends with one.
        const path = pageKey ? `${pageKey}.${subKey}` : subKey;
        const val = translate(path);
        return val || "";
    };

    return {
        title: getValue('title'),
        headerTitle: getValue('headerTitle'), // FIXED: changed 'headerments' to 'headerTitle'
        headerDesc: getValue('headerDesc'),
    };
}

/**
 * Constructs a localized URL path for Next.js App Router.
 */
export function getLocalizedPath(path: string, locale: string): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
}

/**
 * Extracts initials from a full name (e.g., "John Doe" -> "JD").
 */
export function getInitials(name: string): string {
    if (!name) return "";

    return name
        .trim()
        .split(/\s+/) // Handles multiple spaces between names
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
}