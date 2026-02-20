"use client";

import { Article } from "@/lib/types";
import BookmarkButton from "./BookmarkButton";

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  isLoggedIn: boolean;
  onToggleBookmark: () => void;
}

export default function ArticleCard({
  article,
  isBookmarked,
  isLoggedIn,
  onToggleBookmark,
}: ArticleCardProps) {
  return (
    <div className="brutal-card p-0 overflow-hidden flex flex-col">
      {article.image && (
        <div className="w-full h-48 overflow-hidden border-b-3 border-brutal-black">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="brutal-pill px-2 py-1 bg-brutal-blue text-brutal-black inline-block">
            {article.source.name}
          </span>
          <span className="text-xs opacity-60">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 leading-tight">
          {article.title}
        </h3>
        <p className="text-sm opacity-70 mb-4 flex-1 line-clamp-3">
          {article.description}
        </p>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-button px-3 py-1 text-xs bg-brutal-pink text-brutal-black"
          >
            Read →
          </a>
          <BookmarkButton
            isBookmarked={isBookmarked}
            isLoggedIn={isLoggedIn}
            onToggle={onToggleBookmark}
          />
        </div>
      </div>
    </div>
  );
}
