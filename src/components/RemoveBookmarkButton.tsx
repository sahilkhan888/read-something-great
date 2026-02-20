"use client";

export default function RemoveBookmarkButton({
  articleUrl,
}: {
  articleUrl: string;
}) {
  const handleRemove = async () => {
    await fetch(
      `/api/bookmarks?article_url=${encodeURIComponent(articleUrl)}`,
      { method: "DELETE" }
    );
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleRemove}
      className="brutal-button px-3 py-1 text-xs bg-brutal-red text-brutal-black"
    >
      ★ Remove
    </button>
  );
}
