import { BlogPost, MediumRawFeed } from "../types";

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

/**
 * Optimizes Medium CDN images by requesting scaled 800px width images instead of 4K originals
 */
function optimizeMediumImage(url: string): string {

    if (!url) return "/placeholder.svg";
    // Replace raw medium CDN URLs with responsive optimized size
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
    const feedUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    try {
        const response = await fetch(apiUrl, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            console.warn(`Medium API returned status ${response.status}`);
            return [];
        }

        const data: MediumRawFeed = await response.json();
        if (data.status !== "ok" || !data.items) return [];

        return data.items.map((item) => {
            const content = item.content || item.description || "";
            const rawCategory = item.categories && item.categories.length > 0
                ? item.categories[0]
                : "Android";

            const rawThumb = item.thumbnail || extractThumbnail(content);

            return {
                
                id: item.guid || item.link,
                title: decodeHTMLEntities(item.title),
                publishDate: item.pubDate,
                link: item.link,
                thumbnailUrl: optimizeMediumImage(rawThumb),
                categories: item.categories || [],
                category: rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1),
                excerpt: extractExcerpt(content),
                readTime: calculateReadTime(content),
            };
        });
    } catch (error) {
        console.error("Medium Service Error:", error);
        return [];
    }
}