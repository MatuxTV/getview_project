import { Marker, Popup } from "react-leaflet";
import { Place } from "@/src/types/places";
import { getCategoryConfig } from "@/src/config/categories";
import L from "leaflet";
import Image from "next/image";

interface PlaceMarkerProps {
  place: Place;
  icon: L.DivIcon;
}

export function PlaceMarker({ place, icon }: PlaceMarkerProps) {
  const categoryConfig = place.categoryId ? getCategoryConfig(place.categoryId) : null;
  
  return (
    <Marker position={[place.latitude, place.longitude]} icon={icon}>
      <Popup className="custom-popup">
        <div className="p-3 min-w-[280px]">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base text-gray-900 flex-1 pr-2">
              {place.title}
            </h3>
            {categoryConfig && (
              <div className="flex-shrink-0">
                <categoryConfig.icon size={20} color={categoryConfig.color} />
              </div>
            )}
          </div>

          {place.description && (
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {place.description}
            </p>
          )}

          {/* Kategória */}
          {categoryConfig && (
            <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-md">
              <categoryConfig.icon size={16} color={categoryConfig.color} />
              <span className="text-sm font-medium text-gray-700">
                {categoryConfig.name}
              </span>
            </div>
          )}

          {/* Hashtagy */}
          {place.hashtags && place.hashtags.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 mb-2">Hashtagy:</div>
              <div className="flex flex-wrap gap-1">
                {place.hashtags.map((hashtag) => (
                  <span
                    key={hashtag.id}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    #{hashtag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Autor miesta - NOVÉ! */}
          {place.user && (
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="text-xs font-medium text-gray-500 mb-2">Pridal:</div>
              <div className="flex items-center gap-2">
                {place.user.image ? (
                  <Image
                    src={place.user.image}
                    alt={place.user.name || "User"}
                    width={24}
                    height={24}
                    className="rounded-full ring-1 ring-gray-200"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {place.user.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {place.user.name || "Neznámy používateľ"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(place.createdAt).toLocaleDateString('sk-SK')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}