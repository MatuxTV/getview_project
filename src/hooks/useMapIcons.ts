"use client";

import React, { useMemo } from "react";
import L from "leaflet";
import { renderToStaticMarkup } from 'react-dom/server';
import { DefaultIcon, NewPlaceIcon, UserLocationIcon } from "@/public/icons/icons";
import { getCategoryConfig } from "@/src/config/categories";

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
      html: renderToStaticMarkup(React.createElement(NewPlaceIcon, { size: 32 })),
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

  // Funkcia na vytvorenie ikony pre špecifickú kategóriu
  const getCategoryIcon = useMemo(() => {
    return (categoryId?: number | null, size: number = 32) => {
      const config = getCategoryConfig(categoryId);
      return L.divIcon({
        html: renderToStaticMarkup(React.createElement(config.icon, { 
          size, 
          color: config.color 
        })),
        className: 'custom-icon',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
      });
    };
  }, []);

  return {
    ...icons,
    getCategoryIcon,
  };
}