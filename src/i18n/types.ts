export type Dictionary = Record<string, unknown>;

export type TranslateOptions = {
    returnObjects?: boolean;
    params?: Record<string, string | number>;
    /** 'key' -> returns key if not found | 'empty' -> returns "" if not found */
    safetyMode?: 'key' | 'empty';
};

export type TranslateFn = <T = string>(key: string, options?: TranslateOptions) => T;