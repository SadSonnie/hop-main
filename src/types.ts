export interface Review {
  id: number;
  authorName: string;
  authorAvatar: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  photos?: string[];
}

export interface Place {
  id: number;
  name: string;
  mainTag: string;
  description: string;
  rating: number;
  distance: string;
  imageUrl: string;
  images?: string[];
  isPremium?: boolean;
  priceLevel?: number;
  tagIds?: string[];
  address?: string;
  phone?: string;
  reviews?: Review[];
}

export interface Collection {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  places: Place[];
}

export interface FeedItem {
  id: number;
  type: 'place' | 'collection';
  order: number;
  data: Place | Collection;
}

export type TabType = 'главная' | 'поиск' | 'статьи' | 'профиль';