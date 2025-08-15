"use client";

import { useGeolocation } from "@/src/hooks/useGeolocation";
import { useMap } from "react-leaflet";

export default function LocateButton() {
  const map = useMap();
  const { status, position, request, error } = useGeolocation();

  // keď príde poloha, preleť na ňu
  if (position) map.flyTo([position.lat, position.lng], 14);

  return (
    <div className="absolute z-[1000] right-3 bottom-3">
      <button
        onClick={request}
        className="px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
        aria-label="Získať moju polohu"
      >
        📍 Moja poloha
      </button>
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