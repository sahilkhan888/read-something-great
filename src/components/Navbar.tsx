import { createClient } from "@/lib/supabase/server";
import AuthButton from "./AuthButton";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="bg-brutal-yellow border-b-3 border-brutal-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="font-bold text-lg tracking-tight">
          READ SOMETHING GREAT
        </a>
        <div className="flex items-center gap-4">
          {user && (
            <a
              href="/bookmarks"
              className="brutal-button px-3 py-2 text-xs bg-brutal-white text-brutal-black"
            >
              ★ Bookmarks
            </a>
          )}
          <AuthButton
            isLoggedIn={!!user}
            userEmail={user?.email}
          />
        </div>
      </div>
    </nav>
  );
}
