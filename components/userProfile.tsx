"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import Image from "next/image";
import { Pin } from "lucide-react";

export function UserProfile() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-lg border animate-pulse">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="relative">
      {/* Main Profile Card */}

      {/* Profilová fotka */}
      <div
        className="relative flex items-center p-2  rounded-lg shadow-lg border cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={40}
            height={40}
            className="rounded-full ring-2 ring-blue-500/40"
            priority
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {session.user.name?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
        )}
        <div className="m-2">
          <div className="text-black-1/80 font-medium">
            Ahoj {session.user.name?.split(" ")[0]}!
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="p-4 absolute top-full right-0 mt-2 w-64 bg-white/50 rounded-lg shadow-lg border py-2 z-10">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="font-medium text-black-1">{session.user.name}</div>
            <div className="text-sm text-black-1/50">{session.user.email}</div>
          </div>

          <div className="py-1">
            <Button
              className="bg-white-1 border-2 w-full px-4 py-2 text-left text-sm text-black-1 hover:bg-gray-50 flex items-center gap-2"
              onClick={() => {
                /* TODO: Moje miesta */
              }}
            >
              <Pin />
              Moje miesta
            </Button>
          </div>

          <div className="border-t border-gray-100 py-1">
            <Button
              className=" bg-white-1 border-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Odhlásiť sa
            </Button>
          </div>
        </div>
      )}

      {/* Overlay pre zatvorenie dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
