import { TranslateFn } from "@/i18n/translation-core";

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
        // Search inside projects.items.[slug].[cleanKey] OR projects.[slug].[cleanKey]
        const fullKey = namespace ? `${namespace}.${raw.slug}.${cleanKey}` : `${raw.slug}.${cleanKey}`;
        return translate(fullKey, options);
    };

    return {
        ...raw,
        ...buildFields(scopedTranslate, raw),
    };
}

export function withTranslatedList<
    Raw extends { slug: string },
    Fields extends Record<string, unknown>
>(
    rawList: Raw[],
    namespace: string,
    translate: TranslateFn,
    buildFields: (scopedTranslate: TranslateFn) => Fields
): (Raw & Fields)[] {
    return rawList.map((raw) =>
        withTranslatedFields(raw, namespace, translate, buildFields)
    );
}