

import { fetchMediumBlogs } from "@/features/blog/services/medium-service";
import BlogView from "@/features/blog/components/BlogView";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getTranslationServer } from "@/i18n/i18n-server";
import { getStandardPageLabels } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import personalData from "@/data/personal-data.json";

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "blog");
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const translate = await  getTranslationServer(locale);
  const labels = getStandardPageLabels(translate, "blog");


  const mediumUsername = personalData.usernames?.medium;
  const posts = await fetchMediumBlogs(mediumUsername);

  return <BlogView posts={posts} labels={labels} />;
}