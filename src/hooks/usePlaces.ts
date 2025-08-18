"use client";

import { useState, useEffect } from "react";
import { Place, AddPlaceRequest } from "@/src/types/places";

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await fetch("/api/places");
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error("Chyba pri načítaní miest:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPlace = async (place: AddPlaceRequest) => {
    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(place), // Backend automaticky pridá timestamps
      });

      if (response.ok) {
        const savedPlace = await response.json();
        setPlaces(prev => [...prev, savedPlace]);
        return savedPlace;
      }
    } catch (error) {
      console.error("Chyba pri pridávaní miesta:", error);
      throw error;
    }
  };

  return {
    places,
    loading,
    addPlace
  };
}