import type { Place, Review, Collection, UserProfile, Article, Category } from '../types';
import { getTelegramWebData } from '../utils/telegram';

// Интерфейсы для запросов
interface GetFeedParams {
  page?: number;
  limit?: number;
  sort?: 'newest' | 'popular' | 'nearest';
}

interface SearchParams {
  query: string;
  tags?: string[];
  priceLevel?: number;
  isPremium?: boolean;
}

interface SearchPlacesParams {
  query?: string;
  category?: number;
  limit?: number;
  offset?: number;
}

interface SearchPlacesResponse {
  items: Array<{
    id: number;
    name: string;
    address?: string;
    description?: string;
    isPremium?: boolean;
    priceLevel?: number;
    coordinates?: { lat: number; lng: number };
    phone?: string;
    [key: string]: any; // для других возможных полей
  }>;
}

// Базовые настройки API
const BASE_URL = 'https://back.hoptesthop.ru'; // Используем HTTP для локальной разработки

// Вспомогательные функции для запросов с авторизацией
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer tgWebAppData=${getTelegramWebData()}`
});

const GET = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const response = await fetch(`${BASE_URL}${url}${queryString}`, {
    method: 'GET',
    headers: getHeaders()
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const POST = async <T>(url: string, data: Record<string, any>): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const PUT = async <T>(url: string, data: Record<string, any>): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const DELETE = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// API endpoints
const API = {
  // Места
  places: {
    getFeed: (params?: GetFeedParams): Promise<Place[]> => 
      GET('/api/feed', params),

    getPlace: (id: string): Promise<Place> => 
      GET(`/api/places/${id}`),

    search: (params: SearchParams): Promise<Place[]> => 
      GET('/api/places/search', params),

    addToFavorites: (placeId: number): Promise<void> => 
      POST(`/api/places/${placeId}/favorite`, {}),

    removeFromFavorites: (placeId: number): Promise<void> => 
      DELETE(`/api/places/${placeId}/favorite`),

    addReview: (placeId: number, review: Omit<Review, 'id' | 'date'>): Promise<Review> => 
      POST(`/api/places/${placeId}/reviews`, review)
  },

  // Подборки
  collections: {
    getCollections: (): Promise<Collection[]> => 
      GET('/api/collections'),
    
    getCollection: (id: number): Promise<Collection> => 
      GET(`/api/collections/${id}`),
    
    createCollection: (data: Omit<Collection, 'id'>): Promise<Collection> => 
      POST('/api/collections', data),
    
    addPlace: (collectionId: number, placeId: number): Promise<void> => 
      POST(`/api/collections/${collectionId}/places`, { placeId }),
    
    removePlace: (collectionId: number, placeId: number): Promise<void> => 
      DELETE(`/api/collections/${collectionId}/places/${placeId}`)
  },

  // Профиль
  profile: {
    getProfile: (): Promise<UserProfile> => 
      GET('/api/profile'),
    
    updateProfile: (data: Partial<UserProfile>): Promise<UserProfile> => 
      PUT('/api/profile', data),
    
    getFavorites: (): Promise<Place[]> => 
      GET('/api/profile/favorites'),
    
    getReviews: (): Promise<Review[]> => 
      GET('/api/profile/reviews')
  },

  // Категории
  categories: {
    getCategories: (): Promise<{ items: Category[] }> => GET('/api/categories'),
  },

  // Поиск
  search: {
    getPlaces: (params: SearchPlacesParams): Promise<SearchPlacesResponse> => 
      GET('/api/search', params),
  },

  // Статьи
  articles: {
    getArticles: (): Promise<Article[]> => 
      GET('/api/articles'),
    
    getArticle: (id: number): Promise<Article> => 
      GET(`/api/articles/${id}`)
  }
};

export default API;
