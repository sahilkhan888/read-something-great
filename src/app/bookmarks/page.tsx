import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Bookmark } from "@/lib/types";
import RemoveBookmarkButton from "@/components/RemoveBookmarkButton";

export default async function BookmarksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const bookmarks: Bookmark[] = data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Your
          <span className="bg-brutal-pink px-2 ml-2 border-3 border-brutal-black inline-block rotate-1">
            Bookmarks
          </span>
        </h1>
        <p className="text-lg opacity-60 mt-4">
          Articles you&apos;ve saved for later.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="brutal-card p-8 text-center">
          <p className="text-xl font-bold mb-2">No bookmarks yet</p>
          <p className="opacity-60 mb-4">
            Start saving articles from the home page!
          </p>
          <a
            href="/"
            className="brutal-button px-6 py-3 bg-brutal-yellow text-brutal-black inline-block"
          >
            Browse Articles
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="brutal-card p-0 overflow-hidden flex flex-col">
              {bookmark.article_image && (
                <div className="w-full h-48 overflow-hidden border-b-3 border-brutal-black">
                  <img
                    src={bookmark.article_image}
                    alt={bookmark.article_title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {bookmark.article_source && (
                    <span className="brutal-pill px-2 py-1 bg-brutal-blue text-brutal-black inline-block">
                      {bookmark.article_source}
                    </span>
                  )}
                  {bookmark.article_published_at && (
                    <span className="text-xs opacity-60">
                      {new Date(bookmark.article_published_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2 leading-tight">
                  {bookmark.article_title}
                </h3>
                {bookmark.article_description && (
                  <p className="text-sm opacity-70 mb-4 flex-1 line-clamp-3">
                    {bookmark.article_description}
                  </p>
                )}
                <div className="flex items-center justify-between gap-2 mt-auto">
                  <a
                    href={bookmark.article_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-button px-3 py-1 text-xs bg-brutal-pink text-brutal-black"
                  >
                    Read →
                  </a>
                  <RemoveBookmarkButton articleUrl={bookmark.article_url} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
