"use client";

interface AuthButtonProps {
  isLoggedIn: boolean;
  userEmail?: string | null;
}

export default function AuthButton({ isLoggedIn, userEmail }: AuthButtonProps) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs hidden sm:inline">{userEmail}</span>
        <a
          href="/auth/logout"
          className="brutal-button px-3 py-2 text-xs bg-brutal-red text-brutal-black"
        >
          Logout
        </a>
      </div>
    );
  }

  return (
    <a
      href="/auth/login"
      className="brutal-button px-3 py-2 text-xs bg-brutal-blue text-brutal-black"
    >
      Sign in with Google
    </a>
  );
}
