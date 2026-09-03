"use client";

import { useState } from "react";
import Image from "next/image";
import type { BlogPost } from "../types";
import { formatFullDateTime } from "@/lib/utils";
import { ArrowUpRightIcon, ClockIcon } from "@/components/icons";
import { useTranslations } from "next-intl";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const t = useTranslations();
  const fallbackImage = "/placeholder.svg";
  const [imgSrc, setImgSrc] = useState(post.thumbnailUrl || fallbackImage);

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border/20 bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:border-border-strong hover:bg-surface/70 hover:shadow-lg">
      <a
        href={post.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${post.title} - ${t("blog.readArticle") || "Read article"}`}
        className="flex h-full flex-col focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-sunken">
          <Image
            src={imgSrc}
            alt={post.title || "Blog post thumbnail"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc(fallbackImage)}
            priority={priority}
          />

          {post.readTime && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-border/30 bg-surface-sunken/90 px-3 py-1 text-[11px] font-medium text-foreground backdrop-blur-md shadow-sm">
              <ClockIcon size={12} className="text-primary-light" aria-hidden="true" />
              <span>
                {post.readTime} {t("blog.minRead") || "min read"}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <time
              dateTime={post.publishDate ? new Date(post.publishDate).toISOString() : undefined}
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

          <h2 className="mb-2 font-display text-base font-bold leading-snug text-heading transition-colors group-hover:text-primary-light">
            {post.title}
          </h2>

          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border/15 pt-3">
            <span className="relative font-mono text-xs font-bold text-primary-light">
              {t("blog.readArticle") || "Read article"}
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