
"use client";

import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "./BlogCard";
import type { BlogPost } from "../types";
import type { StandardPageLabels } from "@/lib/utils";
import { BookIcon } from "@/components/icons";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { useI18n } from "@/i18n/i18n-client";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface BlogViewProps {
  posts: BlogPost[];
  labels: StandardPageLabels;
}

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================
export default function BlogView({ posts, labels }: BlogViewProps) {
  const { translate } = useI18n();
  const hasPosts = posts && posts.length > 0;

  return (
    <>
      {/* Top Page Header */}
      <PageHeader
        eyebrow={labels.title}
        title={labels.headerTitle}
        description={labels.headerDesc}
      />

      {/* Main Blog Grid Section */}
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          {hasPosts ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <AnimatedSection key={post.id || i} delay={i * 0.06}>
                  {/* Prioritize only the top 3 cards for optimized LCP loading */}
                  <BlogCard post={post} priority={i < 3} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            /* Empty State Layout */
            <div className="card-surface mx-auto flex max-w-md flex-col items-center justify-center p-12 text-center">
              <BookIcon
                size={40}
                className="mb-4 text-muted/50"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-muted">
                {translate("blog.emptyState") || "No articles found at the moment. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}