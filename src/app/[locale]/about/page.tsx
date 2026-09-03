import { getTranslations } from "next-intl/server";
import { getAboutData } from "@/features/about/data";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/lib/utils";
import AboutView from "@/features/about/components/AboutView";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const translate = (key: string, options?: any) => t(key, options);
  const data = await getAboutData(locale);

  const labels = getStandardPageLabels(translate, "about");
  const tagline = translate("about.roleVal");
  const availability = translate("about.availability") || "Available for freelance";

  return (
    <AboutView
      data={data}
      labels={labels}
      tagline={tagline}
      availability={availability}
    />
  );
}