"use client";

import { Marker, Popup } from "react-leaflet";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HashtagSelector } from "../ui/hashtag-selector";
import { NewMarker } from "@/src/types/places";
import {
  getCategoryConfig,
  availableCategoryIds,
} from "@/src/config/categories";
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
  isDisabled,
}: NewMarkerFormProps) {
  return (
    <Marker
      position={[newMarker.lat, newMarker.lng] as [number, number]}
      icon={icon}
    >
      <Popup closeOnClick={false} autoClose={false} closeOnEscapeKey={false}>
        <div className="p-3 min-w-[280px]" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <h3 className="font-bold text-base mb-3">📍 Nové miesto</h3>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-600 font-medium">
                Názov miesta:
              </label>
              <input
                type="text"
                placeholder="Zadajte názov miesta..."
                value={newMarker.title}
                onChange={(e) =>
                  onUpdate({ ...newMarker, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-600 font-medium">
                Popis:
              </label>
              <textarea
                placeholder="Pridajte popis miesta... (voliteľný)"
                value={newMarker.description}
                onChange={(e) =>
                  onUpdate({ ...newMarker, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={2}
              />
            </div>

            {/* Shadcn Select pre kategórie */}
            <div className="space-y-1">
              <label className="text-xs text-gray-600 font-medium">
                Kategória:
              </label>
              <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} className="relative z-50">
                <Select
                  value={newMarker.categoryId?.toString()}
                  onValueChange={(value) =>
                    onUpdate({ 
                      ...newMarker, 
                      categoryId: value ? Number(value) : undefined 
                    })
                  }
                  disabled={isDisabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vyberte kategóriu" />
                  </SelectTrigger>
                  <SelectContent className="z-[9999] bg-white border shadow-lg" position="popper" sideOffset={4}>
                    <SelectGroup>
                      {availableCategoryIds.map((categoryId) => {
                        const config = getCategoryConfig(categoryId);
                        return (
                          <SelectItem key={categoryId} value={categoryId.toString()}>
                            {config.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Náhľad vybranej kategórie */}
              {newMarker.categoryId && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md text-sm">
                  <div className="flex-shrink-0">
                    {(() => {
                      const config = getCategoryConfig(newMarker.categoryId);
                      const IconComponent = config.icon;
                      return <IconComponent size={16} color={config.color} />;
                    })()}
                  </div>
                  <span className="font-medium">{getCategoryConfig(newMarker.categoryId).name}</span>
                </div>
              )}
            </div>

            {/* Hashtagy sekcia */}
            <HashtagSelector
              selectedHashtagIds={newMarker.hashtagIds || []}
              customHashtags={newMarker.customHashtags || []}
              onHashtagIdsChange={(hashtagIds) =>
                onUpdate({ ...newMarker, hashtagIds })
              }
              onCustomHashtagsChange={(customHashtags) =>
                onUpdate({ ...newMarker, customHashtags })
              }
            />

            <div className="flex gap-2 pt-2">
              <Button
                variant="default"
                size="sm"
                onClick={onSave}
                disabled={isDisabled || !newMarker.title.trim()}
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
