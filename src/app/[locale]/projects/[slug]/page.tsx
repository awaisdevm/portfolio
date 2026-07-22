import { rawProjects } from "@/data";
import { buildSharedFields } from "@/lib/seo";
import { Locale, locales } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const resolvedLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const project = rawProjects.find((p) => p.slug === slug);

    if (!project) return {};

    const title = `${project.slug} | Project Portfolio`;
    const description = project.tech || "Project deep-dive and technical architecture details.";
    const dynamicPath = `/projects/${slug}`;

    return {
        ...buildSharedFields(resolvedLocale, dynamicPath, title, description.toString()),
        title,
    };
}

export async function generateStaticParams() {
    return locales.flatMap((locale) =>
        rawProjects.map((p) => ({
            locale,
            slug: p.slug,
        }))
    );
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = rawProjects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto py-20 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{project.slug}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{project.tech.join(", ")}</p>
            {/* Aap baad mein yahan apna poora detailing UI feature design kar sakte hain */}
        </div>
    );
}
