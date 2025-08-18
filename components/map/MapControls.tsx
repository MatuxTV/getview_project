"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from 'framer-motion';

interface MapControlsProps {
  isAddingMode: boolean;
  onToggleAddMode: () => void;
}

export function MapControls({ isAddingMode, onToggleAddMode }: MapControlsProps) {
  return (
    <motion.div 
      className="z-[1000]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        layout
        className={`
          rounded-full transition-all duration-500 ease-in-out
          ${isAddingMode ? 'bg-red-50 p-1 border border-red-200' : 'bg-transparent'}
        `}
      >
        <Button
          onClick={onToggleAddMode}
          variant={isAddingMode ? "destructive" : "default"}
          size="sm"
          className={`
            relative overflow-hidden rounded-full border duration-500 ease-in-out
            ${isAddingMode 
              ? 'p-2 text-red-700 border-red-300 bg-red-100 hover:bg-red-200 hover:scale-105' 
              : 'p-3 text-black-1 border-black-1/20 bg-white-1 hover:scale-110 hover:bg-purple-1 hover:border-white-1/20 hover:text-white-1'
            }
          `}
        >
          {/* Animovaný background pre adding mode */}
          <AnimatePresence>
            {isAddingMode && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-20"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.6, ease: "backInOut" }}
              />
            )}
          </AnimatePresence>

          {/* Desktop obsah */}
          <div className="hidden sm:flex items-center gap-2 relative z-10">
            <AnimatePresence mode="wait">
              {isAddingMode ? (
                <motion.div
                  key="adding-desktop"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <X size={16} />
                  </motion.div>
                  <span className="text-xs whitespace-nowrap">Kliknite na mapu</span>
                </motion.div>
              ) : (
                <motion.div
                  key="normal-desktop"
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus size={18} />
                  </motion.div>
                  <span>Pridať miesto</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile obsah */}
          <div className="flex sm:hidden items-center relative z-10">
            <AnimatePresence mode="wait">
              {isAddingMode ? (
                <motion.div
                  key="adding-mobile"
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: "backInOut" }}
                >
                  <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <X size={14} />
                  </motion.div>
                  <span className="text-xs">Zrušiť</span>
                </motion.div>
              ) : (
                <motion.div
                  key="normal-mobile"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: "backInOut" }}
                >
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Plus size={16} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pulzovací efekt pre adding mode */}
          <AnimatePresence>
            {isAddingMode && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
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