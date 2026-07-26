"use server";

export interface GitHubStats {
    followers: number;
    stars: number;
}

interface GitHubUserResponse {
    followers?: number;
}

interface GitHubRepoResponse {
    stargazers_count?: number;
}


export async function getGitHubStatsAction(
    username: string
): Promise<GitHubStats> {
    const fallbackStats: GitHubStats = { followers: 10, stars: 36 };

    if (!username?.trim()) {
        return fallbackStats;
    }

    try {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
        };

        const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
            headers,
            next: { revalidate: 604800 }, // 1 week cache time period to avoid rate limiting
        };

        // Parallel requests for user profile and repos
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, fetchOptions),
            fetch(
                `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
                fetchOptions
            ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
            console.warn(
                `[GitHubService] API returned non-200 status: User (${userRes.status}), Repos (${reposRes.status})`
            );
            return fallbackStats;
        }

        const userData: GitHubUserResponse = await userRes.json();
        const reposData: GitHubRepoResponse[] = await reposRes.json();

        const totalStars = Array.isArray(reposData)
            ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
            : 0;

        return {
            followers: userData.followers || 0,
            stars: totalStars,
        };
    } catch (error) {
        console.error("[GitHubService] Fetching failed, returning fallback:", error);
        return fallbackStats;
    }
}