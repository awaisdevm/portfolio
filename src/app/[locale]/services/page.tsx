import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/lib/utils";
import ServicesView from "@/features/services/components/ServicesView";
import { getLocalizedServices, type RawService } from "@/features/services/configs/services-config";
import rawServices from "@/data/services.json";
import type { Metadata } from "next";
import { resolveLocale } from "@/i18n/config";
import { TranslateFn } from "@/i18n/data-mapper";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(resolveLocale(locale), "services");
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale });
  const translate: TranslateFn = (key: string, options?: any) => t(key, options) as string;
  const labels = getStandardPageLabels(translate, "services");

  const localizedServices = getLocalizedServices(
    translate,
    rawServices as RawService[]
  );

  return <ServicesView labels={labels} services={localizedServices} />;
}