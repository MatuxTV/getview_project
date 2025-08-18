"use client";

import { useGeolocation } from "@/src/hooks/useGeolocation";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { Navigation, Loader2, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from 'framer-motion';

export default function LocateButton() {
  const map = useMap();
  const { status, request, error } = useGeolocation(); 

  //flyTo
  useEffect(() => {
    const handleFlyTo = (event: CustomEvent) => {
      const { lat, lng } = event.detail;
      map.flyTo([lat, lng], 16);
    };

    window.addEventListener('geolocation-fly-to', handleFlyTo as EventListener);
    
    return () => {
      window.removeEventListener('geolocation-fly-to', handleFlyTo as EventListener);
    };
  }, [map]);

  const handleLocateClick = () => {
    request({ flyToPosition: true });
  };

  const getButtonStyles = () => {
    switch (status) {
      case "prompt":
        return "bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300";
      case "granted":
        return "bg-green-100 hover:bg-green-200 text-green-700 border-green-300";
      case "denied":
      case "error":
        return "bg-red-100 hover:bg-red-200 text-red-700 border-red-300";
      default:
        return "bg-white-1 hover:bg-purple-1 text-black-1 border-black-1/20 hover:text-white-1";
    }
  };

  return (
    <motion.div 
      className="z-[1000]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "backInOut" }}
    >
      <motion.div
        layout
        className={`
          rounded-full transition-all duration-500 ease-in-out
          ${status === "granted" ? 'bg-green-50 p-1 border border-green-200' : 'bg-transparent'}
        `}
      >
        <Button
          onClick={handleLocateClick}
          disabled={status === "prompt"}
          className={`
            relative overflow-hidden p-2 rounded-full border duration-500 ease-in-out
            ${getButtonStyles()} hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed
          `}
        >
          {/* Animovaný background pre rôzne stavy */}
          <AnimatePresence>
            {status === "granted" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-20"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.6, ease: "backInOut" }}
              />
            )}
            
            {status === "prompt" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.1, 1] }}
                exit={{ scale: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </AnimatePresence>

          {/* Ikona s animáciami */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {status === "prompt" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 size={20} />
                  </motion.div>
                </motion.div>
              ) : status === "granted" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.5, ease: "backInOut" }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MapPin size={20} />
                  </motion.div>
                </motion.div>
              ) : status === "denied" || status === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [-5, 5, -5],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <AlertTriangle size={20} />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="normal"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.4, ease: "backInOut" }}
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Navigation size={20} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pulzovací efekt pre aktívny stav */}
          <AnimatePresence>
            {status === "granted" && (
              <motion.div
                className="absolute inset-0 border-2 border-green-400 rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
      
    </motion.div>
  );
}