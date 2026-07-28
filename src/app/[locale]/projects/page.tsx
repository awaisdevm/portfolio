

import { getTranslationServer } from "@/i18n/i18n-server";
import { getStandardPageLabels } from "@/lib/utils";
import ProjectsView from "@/features/projects/components/ProjectsView";
import { getProjectsGridConfig } from "@/features/projects/configs/projects-config";
import { getProjectData } from "@/features/projects/data";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { resolveLocale } from "@/i18n/config";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(resolveLocale(locale), "projects");
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const translate =  await getTranslationServer(locale);
  const projects = await getProjectData(locale);
  const labels = getStandardPageLabels(translate, "projects");
  const gridConfig = getProjectsGridConfig(translate);

  return <ProjectsView projects={projects} labels={labels} gridConfig={gridConfig} />;
}