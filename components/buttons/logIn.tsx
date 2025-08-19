"use client";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
    >
      <span>Pokračovať s Google</span>
    </button>
  );
}