import { createClient } from "@/lib/supabase/server";
import { fetchTopHeadlines } from "@/lib/gnews";
import { Bookmark } from "@/lib/types";
import ArticleFeed from "@/components/ArticleFeed";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const gnewsData = await fetchTopHeadlines("general", 10);

  let bookmarks: Bookmark[] = [];
  if (user) {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    bookmarks = data || [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
          Read Something
          <span className="bg-brutal-yellow px-2 ml-2 border-3 border-brutal-black inline-block -rotate-1">
            Great
          </span>
        </h1>
        <p className="text-lg opacity-60 mt-4">
          Discover interesting articles, every day.
        </p>
      </div>

      <ArticleFeed
        initialArticles={gnewsData.articles}
        initialBookmarks={bookmarks}
        isLoggedIn={!!user}
      />
    </div>
  );
}
