"use client";

import { Marker, Popup } from "react-leaflet";
import { Button } from "../ui/button";
import { NewMarker } from "@/src/types/places";
import { useCategories } from "@/src/hooks/useCategories";
import L from "leaflet";

interface NewMarkerFormProps {
  newMarker: NewMarker;
  icon: L.DivIcon;
  onUpdate: (marker: NewMarker) => void;
  onSave: () => void;
  onCancel: () => void;
  isDisabled: boolean;
}

export function NewMarkerForm({ 
  newMarker, 
  icon, 
  onUpdate, 
  onSave, 
  onCancel, 
  isDisabled 
}: NewMarkerFormProps) {
  const { categories, loading } = useCategories();

  return (
    <Marker
      position={[newMarker.lat, newMarker.lng] as [number, number]}
      icon={icon}
    >
      <Popup>
        <div className="p-2 min-w-[250px]">
          <h3 className="font-bold text-base mb-2">Nové miesto</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Názov miesta"
              value={newMarker.title}
              onChange={(e) => onUpdate({ ...newMarker, title: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <textarea
              placeholder="Popis (voliteľný)"
              value={newMarker.description}
              onChange={(e) => onUpdate({ ...newMarker, description: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none"
              rows={2}
            />
            
            {/* Výber kategórie */}
            <select
              value={newMarker.categoryId || ""}
              onChange={(e) => onUpdate({ 
                ...newMarker, 
                categoryId: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              disabled={loading}
            >
              <option value="">Bez kategórie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={onSave}
                disabled={isDisabled}
                className="flex-1"
              >
                Uložiť
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Zrušiť
              </Button>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}