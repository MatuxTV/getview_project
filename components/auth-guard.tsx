"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // stále sa načítava

    if (!session) {
      // Presmeruj na hlavnú stránku s chybovou správou
      router.push('/?error=authentication-required');
      return;
    }
  }, [session, status, router]);

  // Zobraz loading počas načítavania
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Ak nie je prihlásený, nezobrazuj nič (prebieha presmerovanie)
  if (!session) {
    return null;
  }

  // Ak je prihlásený, zobraz obsah
  return <>{children}</>;
}
