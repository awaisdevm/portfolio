import { TranslateFn } from "./types";

export function withTranslatedFields<
    Raw extends { slug: string },
    Fields extends Record<string, unknown>
>(
    raw: Raw,
    namespace: string,
    translate: TranslateFn,
    buildFields: (scopedTranslate: TranslateFn, raw: Raw) => Fields
): Raw & Fields {
    const scopedTranslate: TranslateFn = (key: string, options) => {
        const cleanKey = key.startsWith(".") ? key.slice(1) : key;
        const fullKey = namespace ? `${namespace}.${raw.slug}.${cleanKey}` : `${raw.slug}.${cleanKey}`;
        return translate(fullKey, options);
    };

    return {
        ...raw,
        ...buildFields(scopedTranslate, raw), // Note: This is the logic part
    };
}

// ... existing code (getNestedValue, etc.) ...

/** 
 * THE UPDATED LIST FUNCTION
 */
export function withTranslatedList<
    Raw extends { slug: string },
    Fields extends Record<string, unknown>
>(
    rawList: Raw[],
    namespace: string,
    translate: TranslateFn,
    // FIXED: Added 'raw' as the second argument to the callback
    buildFields: (scopedTranslate: TranslateFn, raw: Raw) => Fields 
): (Raw & Fields)[] {
    return rawList.map((raw) =>
        withTranslatedFields(raw, namespace, translate, buildFields)
    );
}