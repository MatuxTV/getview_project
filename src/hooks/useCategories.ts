"use client";

import { useState, useEffect } from "react";
import { Category } from "@/src/types/places";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Chyba pri načítavaní kategórií");
      }
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Neočakávaná chyba");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  }) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Chyba pri vytváraní kategórie");
      }

      const newCategory = await response.json();
      setCategories(prev => [newCategory, ...prev]);
      return newCategory;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Neočakávaná chyba");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    refetch: fetchCategories,
  };
}
