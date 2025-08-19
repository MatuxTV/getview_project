export interface Place {
  id: number;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  categoryId?: number;
  userId: string; // Pridáme userId
  user?: {        // Pridáme user info
    id: string;
    name?: string;
    email: string;
    image?: string;
  };
  hashtags?: Array<{
    id: number;
    name: string;
  }>;
}

export interface NewMarker {
  lat: number;
  lng: number;
  title: string;
  description: string;
  categoryId?: number;
  hashtagIds?: number[];
  customHashtags?: string[];
  // userId sa pridá automaticky v API na základe session
}

export interface CreatePlaceInput {
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  categoryId?: number;
  hashtagIds?: number[];
  customHashtags?: string[];
  userId: string; // Pridáme userId
}
export interface Hashtag {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}