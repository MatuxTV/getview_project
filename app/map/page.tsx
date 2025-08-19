'use client'
import dynamic from "next/dynamic";
import { AuthGuard } from "@/components/auth-guard";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false });

export default function MapPage() {
  return (
    <AuthGuard>
      <div style={{ height: "100vh" }}>
        <MapView />
      </div>
    </AuthGuard>
  );
}