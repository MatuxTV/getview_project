"use client";

import { useSession } from "next-auth/react";
import { GoogleSignInButton } from "@/components/buttons/logIn";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeroProps {
  showAuthError?: boolean;
}

export function Hero({ showAuthError = false }: HeroProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Presmeruj na mapu po úspešnom prihlásení
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/map");
    }
  }, [status, session, router]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        
        {/* Authentication error message */}
        {showAuthError && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md w-full text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <strong className="font-bold">Prihlásenie vyžadované!</strong>
            </div>
            <p className="text-sm">Pre prístup na mapu sa musíš najprv prihlásiť pomocou Google účtu.</p>
          </div>
        )}

        {/* Hero content */}
        <div className="text-center py-5 max-w-4xl mx-auto">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
              GetView
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Subtitle */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-700 mb-6 leading-relaxed">
            Objavuj a zdieľaj <span className="font-semibold text-blue-600">krásne miesta</span> okolo seba
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Pridávaj svoje obľúbené miesta na interaktívnu mapu, označuj ich hashtagmi a nechaj sa inšpirovať miestami od ostatných používateľov.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {status === "loading" ? (
              <div className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-500 rounded-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
                Načítava sa...
              </div>
            ) : session ? (
              // Ak je používateľ prihlásený, zobraz loading (prebieha presmerovanie)
              <div className="flex items-center gap-2 px-8 py-4 bg-green-100 text-green-700 rounded-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                Presmerovávam na mapu...
              </div>
            ) : (
              <>
                <GoogleSignInButton />
                <p className="text-sm text-gray-500 px-4">
                  Bezplatná registrácia cez Google účet
                </p>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pridávaj miesta</h3>
              <p className="text-sm text-gray-600">Jednoduchým klikom na mapu pridáš svoje obľúbené miesto</p>
            </div>

            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Používaj hashtagy</h3>
              <p className="text-sm text-gray-600">Kategorizuj miesta pomocou hashtagov pre ľahšie vyhľadávanie</p>
            </div>

            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Zdieľaj s ostatnými</h3>
              <p className="text-sm text-gray-600">Objavuj miesta pridané inými používateľmi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
