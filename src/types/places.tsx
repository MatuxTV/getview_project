export interface Category {
  id: number;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  createdAt: Date | string;
}

export interface Place {
  id: number;
  title: string;
  description: string | null;
  latitude: number;
  longitude: number;
  createdAt: Date | string;
  categoryId?: number | null;
  category?: Category;
  isTemporary?: boolean;
}

export interface NewMarker {
  lat: number;
  lng: number;
  title: string;
  description: string;
  categoryId?: number;
}