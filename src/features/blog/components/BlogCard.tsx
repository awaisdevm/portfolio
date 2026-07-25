
"use client";

import { useState } from "react";
import Image from "next/image";
import type { BlogPost } from "../types";
import { formatFullDateTime } from "@/lib/utils";
import { ArrowUpRightIcon, ClockIcon } from "@/components/icons/icons";
import { useI18n } from "@/i18n/i18n-client";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const { translate } = useI18n();
  const fallbackImage = "/images/placeholder.svg";
  const [imgSrc, setImgSrc] = useState(post.thumbnailUrl || fallbackImage);

  return (
    <article className="group relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-border/20 bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:border-border-strong hover:bg-surface/70 hover:shadow-lg">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
      >
        {/* Thumbnail Wrapper */}
        <div className="relative h-40 w-full overflow-hidden bg-surface-sunken">
          <Image
            src={imgSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc(fallbackImage)}
            priority={priority}
          />

          {/* Read Time Badge */}
          {post.readTime && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-border/30 bg-surface-sunken/80 px-3 py-1 text-[11px] font-medium text-foreground backdrop-blur-md">
              <ClockIcon size={12} className="text-primary-light" aria-hidden="true" />
              <span>
                {post.readTime} {translate("blog.minRead") || "min read"}
              </span>
            </div>
          )}
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-1 flex-col p-5">
          {/* Date & Category Row */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <time
              dateTime={new Date(post.publishDate).toISOString()}
              itemProp="datePublished"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted"
            >
              {formatFullDateTime(post.publishDate)}
            </time>
            {post.category && (
              <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-primary-light">
                {post.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 font-display text-base font-bold leading-snug text-heading transition-colors group-hover:text-primary-light">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted">
            {post.excerpt}
          </p>

          {/* Footer Action */}
          <div className="mt-auto flex items-center justify-between border-t border-border/15 pt-3">
            <span className="relative font-mono text-xs font-bold text-primary-light">
              {translate("blog.readArticle") || "Read article"}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowUpRightIcon
              size={16}
              className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </a>
    </article>
  );
}