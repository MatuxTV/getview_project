"use client";

import { Button } from "../ui/button";

interface MapControlsProps {
  isAddingMode: boolean;
  onToggleAddMode: () => void;
}

export function MapControls({ isAddingMode, onToggleAddMode }: MapControlsProps) {
  return (
    <div className="z-[1000] bg-white rounded-lg shadow-lg p-1.5 sm:p-2">
      <Button
        onClick={onToggleAddMode}
        variant={isAddingMode ? "destructive" : "default"}
        size="sm"
        className="w-full text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap"
      >
        <span className="hidden sm:inline">
          {isAddingMode ? "Zrušiť pridávanie" : "Pridať miesto"}
        </span>
        <span className="sm:hidden">
          {isAddingMode ? "Zrušiť" : "Pridať"}
        </span>
      </Button>
      
      {isAddingMode && (
        <p className="text-xs text-gray-600 mt-1.5 sm:mt-2 max-w-[140px] sm:max-w-[200px] leading-tight">
          <span className="hidden sm:inline">Kliknite na mapu pre pridanie nového miesta</span>
          <span className="sm:hidden">Kliknite na mapu</span>
        </p>
      )}
    </div>
  );
}