"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import LocateButton from "../components/buttons/locateButton";
import { useGeolocation } from "@/src/hooks/useGeolocation";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function MapView() {
  const [places, setPlaces] = useState<
    Array<{
      id: number;
      title: string;
      description: string | null;
      latitude: number;
      longitude: number;
    }>
  >([]);
  const { position } = useGeolocation(); // pasívne sledovanie poslednej polohy (ak už bola získaná)

  useEffect(() => {
    fetch("/api/places")
      .then((r) => r.json())
      .then(setPlaces)
      .catch(console.error);
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={
          places.length > 0
            ? ([places[0].latitude, places[0].longitude] as [number, number])
            : ([48.15, 17.1] as [number, number])
        }
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={[position.lat, position.lng] as [number, number]}>
            <Popup className=" bg-red-500">Tu si</Popup>
          </Marker>
        )}

        {places.map((p) => (
          <Marker
            key={p.id}
            position={[p.latitude, p.longitude] as [number, number]}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-base mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {p.description ?? "—"}
                </p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Kliknuté na miesto: ${p.title}`);
                    // Tu môžete pridať logiku pre zobrazenie detailov
                  }}
                >
                  Viac informácií
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        <LocateButton />
      </MapContainer>
    </div>
  );
}
