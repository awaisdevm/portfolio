export type Dictionary = Record<string, unknown>;

export type TranslateOptions = {
    returnObjects?: boolean;
    params?: Record<string, string | number>;
};

export type TranslateFn = <T = string>(key: string, options?: TranslateOptions) => T;

export function getNestedValue(obj: Dictionary, path: string): unknown {
    if (!obj || typeof obj !== "object") return undefined;

    return path.split(".").reduce<unknown>((current, part) => {
        if (current && typeof current === "object" && part in (current as object)) {
            return (current as Dictionary)[part];
        }
        return undefined;
    }, obj);
}

export function formatString(template: string, params?: Record<string, string | number>): string {
    if (!params) return template;
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return key in params ? String(params[key]) : match;
    });
}

export function createTranslator(dictionary: Dictionary, fallback?: Dictionary): TranslateFn {
    return function translate<T = string>(key: string, options?: TranslateOptions): T {
        let value = getNestedValue(dictionary, key);

        if (value === undefined && fallback) {
            value = getNestedValue(fallback, key);
        }

        if (value === undefined) {
            return (options?.returnObjects ? undefined : "") as T; // ⚡ Key return karne ki jagah empty string return karega
        }

        if (options?.returnObjects) {
            return value as T;
        }

        if (typeof value !== "string") {
            return key as T;
        }

        return formatString(value, options?.params) as T;
    };
}