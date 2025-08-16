"use client";

import { useMapEvents } from "react-leaflet";

interface MapClickHandlerProps {
  isAddingMode: boolean;
  onMapClick: (lat: number, lng: number) => void;
}

export function MapClickHandler({ isAddingMode, onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      if (isAddingMode) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}