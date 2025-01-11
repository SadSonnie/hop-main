import type { FeedItem, Place, Collection } from '../types';
import API from './api';

interface ApiFeedItem {
  id: string;
  type: 'place' | 'collection';
  name?: string;
  address?: string;
  title?: string;
  description?: string;
  isPremium?: boolean;
  priceLevel?: number;
  phone?: string;
  category_id?: number;
  tags_ids?: number[];
  coordinates?: { lat: number; lng: number };
  places?: Array<{
    id: number;
    name: string;
    address: string;
  }>;
  Category?: {
    name: string;
  };
  main_photo_url?: string;
  PlaceTags?: Array<{
    placesItems: {
      id: number;
    };
  }>;
}

interface ApiFeedResponse {
  items: ApiFeedItem[];
  total: number;
}

const defaultPlaceImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60";
const defaultCollectionImage = "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=60";

const adaptPlace = (apiPlace: ApiFeedItem): Place => {
  console.log('Adapting place:', apiPlace);
  if (!apiPlace) {
    console.error('Invalid place data:', apiPlace);
    return {
      id: 0,
      name: 'Неизвестное место',
      mainTag: '',
      description: '',
      rating: 4.5,
      distance: '2 км',
      imageUrl: defaultPlaceImage,
      isPremium: false,
      tagIds: [],
      address: '',
      priceLevel: 2
    };
  }

  return {
    id: Number(apiPlace.id),
    name: apiPlace.name || '',
    mainTag: apiPlace.Category?.name || '',
    description: apiPlace.description || '',
    rating: 4.5,
    distance: '2 км',
    imageUrl: apiPlace.main_photo_url || defaultPlaceImage,
    isPremium: apiPlace.isPremium || false,
    tagIds: (apiPlace.PlaceTags || []).map(tag => tag.placesItems.id),
    address: apiPlace.address || '',
    priceLevel: apiPlace.priceLevel || 2
  };
};

const adaptCollection = (apiCollection: ApiFeedItem): Collection => {
  console.log('Adapting collection:', apiCollection);
  if (!apiCollection?.data) {
    console.error('Invalid collection data:', apiCollection);
    return {
      id: 0,
      title: '',
      description: '',
      imageUrl: defaultCollectionImage,
      places: []
    };
  }

  return {
    id: Number(apiCollection.id),
    title: apiCollection.data.title || '',
    description: apiCollection.data.description || '',
    imageUrl: defaultCollectionImage,
    places: []  // Места будут загружены в fetchFeedItems
  };
};

export const fetchFeedItems = async (): Promise<FeedItem[]> => {
  try {
    const [response, categoriesResponse] = await Promise.all([
      API.places.getFeed(),
      API.categories.getCategories()
    ]);
    console.log('API response:', response);
    console.log('Categories:', categoriesResponse);
    
    const categories = categoriesResponse.items;
    
    const adaptPlaceWithCategory = (apiPlace: ApiFeedItem): Place => {
      const place = adaptPlace(apiPlace);
      return {
        ...place,
        mainTag: categories.find(cat => cat.id === parseInt(apiPlace.category_id as string))?.name || ''
      };
    };
    
    const feedItems = await Promise.all(
      response.items.map(async (item, index) => {
        if (item.type === 'place') {
          const placeDetails = await API.places.getPlace(item.id);
          console.log('Place details:', placeDetails);
          return {
            id: Number(item.id),
            type: 'place',
            order: index,
            data: adaptPlaceWithCategory(placeDetails)
          };
        } else {
          // Для коллекций получаем полные данные каждого места
          const collection = adaptCollection(item);
          const placesWithDetails = await Promise.all(
            (item.data?.places || []).map(async (place) => {
              const placeDetails = await API.places.getPlace(String(place.id));
              console.log('Collection place details:', placeDetails);
              return adaptPlaceWithCategory(placeDetails);
            })
          );
          
          return {
            id: Number(item.id),
            type: 'collection',
            order: index,
            data: {
              ...collection,
              places: placesWithDetails
            }
          };
        }
      })
    );

    console.log('Processed feed items:', feedItems);
    return feedItems;
  } catch (error) {
    console.error('Error fetching feed:', error);
    return [];
  }
};

export const fetchPlaceById = async (id: number): Promise<Place> => {
  try {
    const response = await API.places.getPlace(String(id));
    if (!response || !response.data) {
      throw new Error('Place not found');
    }
    return adaptPlace(response);
  } catch (error) {
    console.error('Error fetching place:', error);
    throw error;
  }
};