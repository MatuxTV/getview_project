"use client";

import { useGeolocation } from "@/src/hooks/useGeolocation";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { LocationEdit } from "lucide-react";
import { Button } from "../ui/button";

export default function LocateButton() {
  const map = useMap();
  const { status, request, error } = useGeolocation(); // Odstránili sme position, keďže ho nepoužívame

  // Poslúchaj na custom event pre flyTo
  useEffect(() => {
    const handleFlyTo = (event: CustomEvent) => {
      const { lat, lng } = event.detail;
      map.flyTo([lat, lng], 16);
    };

    window.addEventListener('geolocation-fly-to', handleFlyTo as EventListener);
    
    return () => {
      window.removeEventListener('geolocation-fly-to', handleFlyTo as EventListener);
    };
  }, [map]);

  const handleLocateClick = () => {
    // Request s flyToPosition: true
    request({ flyToPosition: true });
  };

  return (
    <div className="z-[1000]">
      <Button
        onClick={handleLocateClick}
        className="px-2 py-2 sm:px-3.5 sm:py-2.5 rounded-lg border border-black-1/20 bg-white-1 text-black-1 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm text-sm sm:text-base flex items-center gap-1 sm:gap-2 whitespace-nowrap"
      >
        <LocationEdit className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Moja poloha</span>
        <span className="sm:hidden">GPS</span>
      </Button>
      {status === "denied" && (
        <div className="mt-2 text-xs text-red-700 max-w-[220px]">
          Povolenie zamietnuté. Skús ho povoliť v nastaveniach prehliadača.
        </div>
      )}
      {status === "error" && error && (
        <div className="mt-2 text-xs text-red-700 max-w-[220px]">
          {error}
        </div>
      )}
    </div>
  );
}