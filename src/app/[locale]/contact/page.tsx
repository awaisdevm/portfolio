

import { getTranslationServer } from "@/i18n/i18n-server";
import { generatePageMetadata } from "@/lib/metadata";
import { getStandardPageLabels } from "@/lib/utils";
import { getContactFormLabels } from "@/features/contact/data"; // Import the resolver

import ContactView from "@/features/contact/components/ContactView";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const translate = getTranslationServer(locale);
  const formLabels = getContactFormLabels(translate);

  const resolvedLocation = translate("aboutData.infoLocation") || "Lahore, Pakistan";
  const labels = getStandardPageLabels(translate, "contact");

  return <ContactView labels={labels} location={resolvedLocation} formLabels={formLabels} />;
}