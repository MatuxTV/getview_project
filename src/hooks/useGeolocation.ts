"use client";

import { useState, useCallback, useEffect } from "react";

type Geo = { lat: number; lng: number; timestamp: number };
type Status = "idle" | "prompt" | "granted" | "denied" | "error";

const CACHE_KEY = "user-geolocation";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minút v milisekundách

export function useGeolocation() {
  const [status, setStatus] = useState<Status>("idle");
  const [position, setPosition] = useState<Geo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCachedPosition = useCallback((): Geo | null => {
    if (typeof window === "undefined") return null;
    
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      
      const data = JSON.parse(cached) as Geo;
      const now = Date.now();
      
      // Skontroluj či nie je cache príliš starý
      if (now - data.timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      
      return data;
    } catch {
      return null;
    }
  }, []);

  const setCachedPosition = useCallback((pos: Geo) => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(pos));
    } catch {
      // Ignoruj ak localStorage nie je dostupný
    }
  }, []);

  // Načítaj z cache pri prvom načítaní
  useEffect(() => {
    const cached = getCachedPosition();
    if (cached) {
      setPosition(cached);
      setStatus("granted");
    }
  }, [getCachedPosition]);

  const request = useCallback(() => {
    // Najprv skús načítať z cache
    const cached = getCachedPosition();
    if (cached) {
      setPosition(cached);
      setStatus("granted");
      setError(null);
      return;
    }

    if (!("geolocation" in navigator)) {
      setStatus("error");
      setError("Geolokácia nie je podporovaná v tomto prehliadači.");
      return;
    }

    setStatus("prompt");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition: Geo = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: Date.now()
        };
        
        setStatus("granted");
        setPosition(newPosition);
        setError(null);
        setCachedPosition(newPosition);
      },
      (err) => {
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [getCachedPosition, setCachedPosition]);

  const clearCache = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CACHE_KEY);
    }
    setPosition(null);
    setStatus("idle");
    setError(null);
  }, []);

  return { status, position, error, request, clearCache };
}