import Parser from "rss-parser";
import { BlogPost } from "../types";

const parser = new Parser({
    customFields: {
        item: [
            ["content:encoded", "contentEncoded"],
            ["dc:creator", "creator"],
        ],
    },
});

function decodeHTMLEntities(text: string): string {
    if (!text) return "";
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ");
}

function extractExcerpt(htmlContent: string, maxLength = 160): string {
    if (!htmlContent) return "";

    let cleanText = htmlContent.replace(/<(style|script|svg)[^>]*>[\s\S]*?<\/\1>/gi, "");
    cleanText = cleanText.replace(/<\/?[^>]+(>|$)/g, " ");
    cleanText = decodeHTMLEntities(cleanText).replace(/\s+/g, " ").trim();
    return cleanText.length > maxLength
        ? `${cleanText.substring(0, maxLength).trim()}...`
        : cleanText;
}

function optimizeMediumImage(url: string): string {
    if (!url) return "/placeholder.svg";
    if (url.includes("cdn-images-1.medium.com")) {
        return url.replace(/\/max\/\d+\//, "/max/800/");
    }
    return url;
}

function extractThumbnail(htmlContent: string): string {
    if (!htmlContent) return "";
    const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : "";
}

function calculateReadTime(htmlContent: string): number {
    if (!htmlContent) return 1;
    const cleanText = htmlContent
        .replace(/<(style|script|svg)[^>]*>[\s\S]*?<\/\1>/gi, "")
        .replace(/<[^>]*>/g, " ");

    const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

export async function fetchMediumBlogs(username: string): Promise<BlogPost[]> {
    if (!username) return [];
    const feedUrl = `https://medium.com/feed/@${username}`;

    try {
        const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
        if (!res.ok) return [];

        const xmlText = await res.text();
        // 1. Use parseString instead of parseStringPromise
        const feed = await parser.parseString(xmlText);

        if (!feed || !feed.items) return [];

        // 2. Add explicit type for item
        return feed.items.map((item: Parser.Item & { contentEncoded?: string }) => {
            const content = item.contentEncoded || item.content || item.summary || "";
            const categories = item.categories || [];
            const rawCategory = categories.length > 0 ? categories[0] : "Android";
            const rawThumb = extractThumbnail(content);

            return {
                id: item.guid || item.link || String(Math.random()),
                title: decodeHTMLEntities(item.title || ""),
                publishDate: item.isoDate || item.pubDate || "",
                link: item.link || "",
                thumbnailUrl: optimizeMediumImage(rawThumb),
                categories,
                category: rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1),
                excerpt: extractExcerpt(content),
                readTime: calculateReadTime(content),
            };
        });
    } catch (error) {
        console.error("Medium Service RSS Parser Error:", error);
        return [];
    }
}