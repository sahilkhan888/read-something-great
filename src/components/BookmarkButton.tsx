"use client";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  isLoggedIn: boolean;
  onToggle: () => void;
}

export default function BookmarkButton({
  isBookmarked,
  isLoggedIn,
  onToggle,
}: BookmarkButtonProps) {
  const handleClick = () => {
    if (!isLoggedIn) {
      window.location.href = "/auth/login";
      return;
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className={`brutal-button px-3 py-1 text-xs ${
        isBookmarked
          ? "bg-brutal-yellow text-brutal-black"
          : "bg-white text-brutal-black"
      }`}
    >
      {isBookmarked ? "★ Saved" : "☆ Save"}
    </button>
  );
}
