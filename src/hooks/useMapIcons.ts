"use client";

import React, { useMemo } from "react";
import L from "leaflet";
import { renderToStaticMarkup } from 'react-dom/server';
import { DefaultIcon, UserLocationIcon } from "@/public/icons/icons";

export function useMapIcons() {
  const icons = useMemo(() => {
    const userLocationIcon = L.divIcon({
      html: renderToStaticMarkup(React.createElement(UserLocationIcon, { size: 32 })),
      className: 'custom-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const defaultIcon = L.divIcon({
      html: renderToStaticMarkup(React.createElement(DefaultIcon, { size: 32 })),
      className: 'custom-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const newMarkerIcon = L.divIcon({
      html: renderToStaticMarkup(React.createElement(DefaultIcon, { size: 32, color: "#fbbf24" })),
      className: 'custom-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    return {
      userLocationIcon,
      defaultIcon,
      newMarkerIcon,
    };
  }, []);

  return icons;
}