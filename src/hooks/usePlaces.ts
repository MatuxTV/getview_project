import { useState, useEffect } from 'react';
import { Place } from '@/src/types/places';

interface CreatePlaceData {
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  categoryId?: number;
  hashtagIds?: number[];
  customHashtags?: string[];
  // userId sa pridá automaticky v API
}

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaces = async () => {
    try {
      const response = await fetch('/api/places');
      if (response.ok) {
        const data = await response.json();
        setPlaces(data);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const addPlace = async (placeData: CreatePlaceData): Promise<Place | null> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(placeData),
      });

      if (response.ok) {
        const newPlace = await response.json();
        setPlaces(prev => [...prev, newPlace]);
        return newPlace;
      } else {
        const error = await response.json();
        console.error('Failed to create place:', error);
        return null;
      }
    } catch (error) {
      console.error('Error creating place:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return {
    places,
    isLoading,
    addPlace,
    refetchPlaces: fetchPlaces,
  };
}