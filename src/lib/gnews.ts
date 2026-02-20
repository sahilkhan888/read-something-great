import { GNewsResponse, Topic } from "./types";

export async function fetchTopHeadlines(
  topic: Topic = "general",
  max: number = 10
): Promise<GNewsResponse> {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    console.error("GNEWS_API_KEY is not set");
    return { totalArticles: 0, articles: [] };
  }

  const url = `https://gnews.io/api/v4/top-headlines?topic=${topic}&max=${max}&lang=en&apikey=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`GNews API error: ${res.status} ${res.statusText}`);
      return { totalArticles: 0, articles: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch from GNews:", error);
    return { totalArticles: 0, articles: [] };
  }
}
