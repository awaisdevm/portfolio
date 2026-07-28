"use client";

interface SchemaMarkupProps {
  type?: "Person" | "Article" | "SoftwareApplication" | "WebSite";
  data: Record<string, any> | Record<string, any>[];
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let finalSchema: Record<string, any>;

  if (Array.isArray(data)) {
    finalSchema = {
      "@context": "https://schema.org",
      "@graph": data.map((item) => {
        const { "@context": _, ...cleanItem } = item;
        return cleanItem;
      }),
    };
  } else {
    finalSchema = {
      "@context": "https://schema.org",
      ...(type ? { "@type": type } : {}),
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
    />
  );
}