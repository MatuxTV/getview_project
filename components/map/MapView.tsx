"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import { useGeolocation } from "@/src/hooks/useGeolocation";
import { usePlaces } from "@/src/hooks/usePlaces";
import { useMapIcons } from "@/src/hooks/useMapIcons";
import { NewMarker } from "@/src/types/places";
import { MapClickHandler } from "./MapClickHandler";
import { MapControls } from "./MapControls";
import { PlaceMarker } from "./PlaceMarker";
import { NewMarkerForm } from "./NewMarkerForm";
import LocateButton from "../buttons/locateButton";
import "leaflet/dist/leaflet.css";
import { UserProfile } from "../userProfile";

export default function MapView() {
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [newMarker, setNewMarker] = useState<NewMarker | null>(null);
  const [userPosition, setUserPosition] = useState<{lat: number, lng: number} | null>(null);

  const { position } = useGeolocation();
  const { places, addPlace } = usePlaces();
  const { userLocationIcon, newMarkerIcon, getCategoryIcon } = useMapIcons();
  

  // Sync geolocation position with local state
  useEffect(() => {
    if (position) {
      setUserPosition({ lat: position.lat, lng: position.lng });
    }
  }, [position]);

  // Poslúchaj na geolocation updates a aktualizuj lokálny state
  useEffect(() => {
    const handleLocationUpdate = (event: CustomEvent) => {
      console.log("Location update event received", event.detail);
      setUserPosition({ lat: event.detail.lat, lng: event.detail.lng });
    };

    window.addEventListener('geolocation-fly-to', handleLocationUpdate as EventListener);
    
    return () => {
      window.removeEventListener('geolocation-fly-to', handleLocationUpdate as EventListener);
    };
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setNewMarker({ 
      lat, 
      lng, 
      title: "", 
      description: "", 
      hashtagIds: [], 
      customHashtags: [] 
    });
  };

  const handleSaveMarker = async () => {
    if (!newMarker || !newMarker.title.trim()) return;

    try {
      await addPlace({
        title: newMarker.title,
        description: newMarker.description,
        latitude: newMarker.lat,
        longitude: newMarker.lng,
        categoryId: newMarker.categoryId,
        hashtagIds: newMarker.hashtagIds,
        customHashtags: newMarker.customHashtags,
      });

      setNewMarker(null);
      setIsAddingMode(false);
    } catch (error) {
      console.error("Chyba pri ukladaní:", error);
    }
  };

  const handleCancelMarker = () => {
    setNewMarker(null);
    setIsAddingMode(false);
  };

  const handleToggleAddMode = () => {
    setIsAddingMode(!isAddingMode);
    if (newMarker) setNewMarker(null);
  };

  return (
    <div className="h-screen w-full relative">
      <div className=" absolute top-4 right-4 z-[1000]">
        <UserProfile/>
      </div>
      <MapContainer
        center={
          places.length > 0
            ? ([places[0].latitude, places[0].longitude] as [number, number])
            : ([48.7394, 19.1511] as [number, number]) // Banská Bystrica / Zvolen oblasť
        }
        zoom={11}
        style={{
          height: "100%",
          width: "100%",
          cursor: isAddingMode ? "crosshair" : "grab",
        }}
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; OpenStreetMap, &copy; CartoDB'
        />

        <MapClickHandler
          isAddingMode={isAddingMode}
          onMapClick={handleMapClick}
        />

        {/* User location marker */}
        {userPosition && (
          <>
            {console.log("Rendering user marker at:", [userPosition.lat, userPosition.lng])}
            <Marker
              icon={userLocationIcon}
              position={[userPosition.lat, userPosition.lng] as [number, number]}
            ></Marker>
          </>
        )}

        {/* Existing places */}
        {places.map((place) => (
          <PlaceMarker 
            key={place.id} 
            place={place} 
            icon={getCategoryIcon(place.categoryId)} 
          />
        ))}

        {/* New marker form */}
        {newMarker && (
          <NewMarkerForm
            newMarker={newMarker}
            icon={newMarkerIcon}
            onUpdate={setNewMarker}
            onSave={handleSaveMarker}
            onCancel={handleCancelMarker}
            isDisabled={!newMarker.title.trim()}
          />
        )}
        
        {/* Control buttons - mobile responsive */}
        <div className="bg-white-1/40 rounded-4xl p-4 border-2 flex justify-center items-center absolute bottom-4 right-4 z-[1000] gap-2 sm:flex-row sm:gap-3">
          <LocateButton />
          <MapControls
            isAddingMode={isAddingMode}
            onToggleAddMode={handleToggleAddMode}
          />
        </div>
      </MapContainer>
    </div>
  );
}
