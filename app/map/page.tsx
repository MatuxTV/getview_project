'use client'
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function MapPage() {
  return (
    <div style={{ height: "100vh" }}>
      <MapView />
    </div>
  );
}