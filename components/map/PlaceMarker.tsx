"use client";

import { Marker, Popup } from "react-leaflet";
import { Button } from "../ui/button";
import { Place } from "@/src/types/places";
import L from "leaflet";
import { Calendar } from "lucide-react";

interface PlaceMarkerProps {
  place: Place;
  icon: L.DivIcon;
}

function formatDate(dateInput: string | Date): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  return new Intl.DateTimeFormat('sk-SK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function getRelativeTime(dateInput: string | Date): string {
  const now = new Date();
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'práve teraz';
  if (diffInMinutes < 60) return `pred ${diffInMinutes} min`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `pred ${diffInHours} h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `pred ${diffInDays} dňami`;
  
  return formatDate(dateInput);
}

export function PlaceMarker({ place, icon }: PlaceMarkerProps) {
  return (
    <Marker
      position={[place.latitude, place.longitude] as [number, number]}
      icon={icon}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <h3 className="font-bold text-base mb-1">{place.title}</h3>
          
          {place.description && (
            <p className="text-sm text-gray-600 mb-2">
              {place.description}
            </p>
          )}

          {/* Kategória */}
          {place.category && (
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: place.category.color || '#666' }}
              ></span>
              <span className="text-xs font-medium text-gray-700">
                {place.category.name}
              </span>
            </div>
          )}
          
          {/* Timestamp informácie */}
          <div className="text-xs text-gray-500 mb-3 space-y-1">
            <div className="flex items-center gap-1">
              <span><Calendar /></span>
              <span>Pridané: {getRelativeTime(place.createdAt)}</span>
            </div>
          </div>
          
        </div>
      </Popup>
    </Marker>
  );
}