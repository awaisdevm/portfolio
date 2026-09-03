import { getTranslations } from "next-intl/server";
import HomeView from "@/features/home/components/HomeView";
import { getHomeData } from "@/features/home/data";
import { siteRoutes } from "@/lib/site-config";
import { getLocalizedPath } from "@/lib/utils";
import { Locale, locales } from "@/i18n/config";
import { TranslateFn } from "@/i18n/data-mapper";

export const revalidate = 3600;

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

interface HomeProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomeProps) {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  const translate: TranslateFn = (key: string, options?: any) => t(key, options) as string;
  const homeData = await getHomeData(locale);

  // Path resolution & static texts
  const availabilityText = translate("home.availability");
  const contactPath = getLocalizedPath(siteRoutes.contact, locale);
  const projectsPath = getLocalizedPath(siteRoutes.projects, locale);
  const testimonialsPath = getLocalizedPath("/testimonials", locale);

  // Map process steps cleanly
  const processSteps = homeData.processStepIds.map((step) => ({
    step,
    title: translate(`home.processSteps.${step}.title`),
    body: translate(`home.processSteps.${step}.body`),
  }));

  const fullHomeData = {
    ...homeData,
    availabilityText,
    contactPath,
    projectsPath,
    testimonialsPath,
  };

  return (
    <HomeView
      locale={locale}
      translate={translate}
      homeData={fullHomeData}
      processSteps={processSteps}
    />
  );
}