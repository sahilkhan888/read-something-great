"use client";

import { useState, useEffect } from "react";
import { Article, Bookmark, Topic } from "@/lib/types";
import TopicSelector from "./TopicSelector";
import ArticleCard from "./ArticleCard";
import LoadingCard from "./LoadingCard";

interface ArticleFeedProps {
  initialArticles: Article[];
  initialBookmarks: Bookmark[];
  isLoggedIn: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ArticleFeed({
  initialArticles,
  initialBookmarks,
  isLoggedIn,
}: ArticleFeedProps) {
  const [topic, setTopic] = useState<Topic>("general");
  const [articles, setArticles] = useState<Article[]>(
    shuffleArray(initialArticles)
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [loading, setLoading] = useState(false);

  const bookmarkedUrls = new Set(bookmarks.map((b) => b.article_url));

  useEffect(() => {
    // Skip initial load since we have server-fetched data
    if (topic === "general" && articles.length > 0) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles?topic=${topic}`);
        const data = await res.json();
        setArticles(shuffleArray(data.articles || []));
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const handleTopicChange = (newTopic: Topic) => {
    setTopic(newTopic);
    if (newTopic !== topic) {
      setArticles([]);
    }
  };

  const toggleBookmark = async (article: Article) => {
    if (!isLoggedIn) return;

    const isCurrentlyBookmarked = bookmarkedUrls.has(article.url);

    if (isCurrentlyBookmarked) {
      // Optimistic remove
      setBookmarks((prev) =>
        prev.filter((b) => b.article_url !== article.url)
      );
      try {
        await fetch(
          `/api/bookmarks?article_url=${encodeURIComponent(article.url)}`,
          { method: "DELETE" }
        );
      } catch {
        // Revert on error
        const res = await fetch("/api/bookmarks");
        const data = await res.json();
        setBookmarks(data);
      }
    } else {
      // Optimistic add
      const tempBookmark: Bookmark = {
        id: crypto.randomUUID(),
        user_id: "",
        article_url: article.url,
        article_title: article.title,
        article_description: article.description,
        article_image: article.image,
        article_source: article.source.name,
        article_published_at: article.publishedAt,
        created_at: new Date().toISOString(),
      };
      setBookmarks((prev) => [tempBookmark, ...prev]);
      try {
        await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            article_url: article.url,
            article_title: article.title,
            article_description: article.description,
            article_image: article.image,
            article_source: article.source.name,
            article_published_at: article.publishedAt,
          }),
        });
      } catch {
        // Revert on error
        setBookmarks((prev) =>
          prev.filter((b) => b.id !== tempBookmark.id)
        );
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <TopicSelector selectedTopic={topic} onSelectTopic={handleTopicChange} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="brutal-card p-8 text-center">
          <p className="text-lg font-bold">No articles found</p>
          <p className="text-sm opacity-60 mt-2">
            Try a different topic or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.url}
              article={article}
              isBookmarked={bookmarkedUrls.has(article.url)}
              isLoggedIn={isLoggedIn}
              onToggleBookmark={() => toggleBookmark(article)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
