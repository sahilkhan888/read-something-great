export type Topic =
  | "general"
  | "world"
  | "nation"
  | "business"
  | "technology"
  | "entertainment"
  | "sports"
  | "science"
  | "health";

export const TOPICS: { value: Topic; label: string; color: string }[] = [
  { value: "general", label: "General", color: "bg-brutal-yellow" },
  { value: "world", label: "World", color: "bg-brutal-blue" },
  { value: "nation", label: "Politics", color: "bg-brutal-red" },
  { value: "business", label: "Business", color: "bg-brutal-orange" },
  { value: "technology", label: "Tech", color: "bg-brutal-purple" },
  { value: "entertainment", label: "Entertainment", color: "bg-brutal-pink" },
  { value: "sports", label: "Sports", color: "bg-brutal-blue" },
  { value: "science", label: "Science", color: "bg-brutal-yellow" },
  { value: "health", label: "Health", color: "bg-brutal-pink" },
];

export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface GNewsResponse {
  totalArticles: number;
  articles: Article[];
}

export interface Bookmark {
  id: string;
  user_id: string;
  article_url: string;
  article_title: string;
  article_description: string | null;
  article_image: string | null;
  article_source: string | null;
  article_published_at: string | null;
  created_at: string;
}
