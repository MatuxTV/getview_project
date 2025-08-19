"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function AuthTest() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Načítava sa...</p>;
  }

  if (session) {
    return (
      <div className="p-4 border rounded-lg">
        <p>Prihlásený ako: {session.user?.email}</p>
        <p>ID: {session.user?.id}</p>
        <div className="mt-2 flex gap-2">
          <Link
            href="/map"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Prejsť na mapu
          </Link>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Odhlásiť sa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <p>Nie si prihlásený</p>
      <button
        onClick={() => signIn("google")}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Prihlásiť sa cez Google
      </button>
    </div>
  );
}
