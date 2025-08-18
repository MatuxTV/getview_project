"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { X, Hash, Plus } from 'lucide-react';
import { Hashtag } from '@/src/types/places';

interface HashtagSelectorProps {
  selectedHashtagIds: number[];
  customHashtags: string[];
  onHashtagIdsChange: (hashtagIds: number[]) => void;
  onCustomHashtagsChange: (customHashtags: string[]) => void;
}

export function HashtagSelector({
  selectedHashtagIds,
  customHashtags,
  onHashtagIdsChange,
  onCustomHashtagsChange,
}: HashtagSelectorProps) {
  const [availableHashtags, setAvailableHashtags] = useState<Hashtag[]>([]);
  const [newHashtagInput, setNewHashtagInput] = useState('');

  // Načítame existujúce hashtagy
  useEffect(() => {
    fetchHashtags();
  }, []);

  const fetchHashtags = async () => {
    try {
      const response = await fetch('/api/hashtags');
      const hashtags = await response.json();
      setAvailableHashtags(hashtags);
    } catch (error) {
      console.error('Error fetching hashtags:', error);
    }
  };

  // Toggle existujúceho hashtagu
  const toggleHashtag = (hashtagId: number) => {
    const newSelection = selectedHashtagIds.includes(hashtagId)
      ? selectedHashtagIds.filter(id => id !== hashtagId)
      : [...selectedHashtagIds, hashtagId];
    onHashtagIdsChange(newSelection);
  };

  // Pridanie vlastného hashtagu
  const addCustomHashtag = () => {
    if (!newHashtagInput.trim()) return;

    let hashtagName = newHashtagInput.trim();
    // Pridáme # ak nie je na začiatku
    if (!hashtagName.startsWith('#')) {
      hashtagName = `#${hashtagName}`;
    }

    // Kontrola či už nie je pridaný
    if (customHashtags.includes(hashtagName)) {
      setNewHashtagInput('');
      return;
    }

    onCustomHashtagsChange([...customHashtags, hashtagName]);
    setNewHashtagInput('');
  };

  // Odstránenie vlastného hashtagu
  const removeCustomHashtag = (hashtag: string) => {
    onCustomHashtagsChange(customHashtags.filter(h => h !== hashtag));
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomHashtag();
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-xs text-gray-600 font-medium">🏷️ Hashtagy:</label>
      
      {/* Existujúce hashtagy */}
      {availableHashtags.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 mb-2">Vyberte existujúce hashtagy:</div>
          <div className="flex flex-wrap gap-1.5">
            {availableHashtags.map((hashtag) => {
              const isSelected = selectedHashtagIds.includes(hashtag.id);
              return (
                <span
                  key={hashtag.id}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs cursor-pointer transition-all hover:scale-105 border ${
                    isSelected 
                      ? "bg-blue-500 text-white border-blue-500" 
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => toggleHashtag(hashtag.id)}
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {hashtag.name.replace('#', '')}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Pridanie vlastného hashtagu */}
      <div>
        <div className="text-xs text-gray-500 mb-2">Alebo vytvorte vlastný hashtag:</div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Hash className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="názov hashtagu"
              value={newHashtagInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewHashtagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={addCustomHashtag}
            disabled={!newHashtagInput.trim()}
            className="h-9 px-3"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Zobrazenie vybraných hashtagov */}
      {(selectedHashtagIds.length > 0 || customHashtags.length > 0) && (
        <div>
          <div className="text-xs text-gray-500 mb-2">Vybrané hashtagy:</div>
          <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 rounded-md border">
            {/* Existujúce vybrané hashtagy */}
            {selectedHashtagIds.map((hashtagId) => {
              const hashtag = availableHashtags.find(h => h.id === hashtagId);
              if (!hashtag) return null;
              return (
                <span key={hashtagId} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  <Hash className="w-3 h-3 mr-1" />
                  {hashtag.name.replace('#', '')}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer hover:text-red-500" 
                    onClick={() => toggleHashtag(hashtagId)}
                  />
                </span>
              );
            })}
            
            {/* Vlastné hashtagy */}
            {customHashtags.map((hashtag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                <Hash className="w-3 h-3 mr-1" />
                {hashtag.replace('#', '')}
                <X 
                  className="w-3 h-3 ml-1 cursor-pointer hover:text-red-500" 
                  onClick={() => removeCustomHashtag(hashtag)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
