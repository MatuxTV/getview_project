export interface Place {
  id: number;
  title: string;
  description: string | null;
  latitude: number;
  longitude: number;
  createdAt: Date | string;
  category?: string;
  isTemporary?: boolean;
}

export interface NewMarker {
  lat: number;
  lng: number;
  title: string;
  description: string;
}