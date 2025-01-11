import { Place } from '../types';
import API from './api';

export interface FeedState {
  places: Place[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

export interface FeedResponse {
  items: Array<{
    id: string;
    type: 'place' | 'collection';
    data: {
      name?: string;
      address?: string;
      title?: string | null;
      places?: Array<{
        id: number;
        name: string;
        address: string;
      }>;
      [key: string]: any;
    };
  }>;
  total: number;
}

export const initialFeedState: FeedState = {
  places: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
};

export type FeedAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Place[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET_FEED' };

export const feedReducer = (state: FeedState, action: FeedAction): FeedState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        places: [...state.places, ...action.payload],
        hasMore: action.payload.length > 0,
        page: state.page + 1,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'RESET_FEED':
      return initialFeedState;
    default:
      return state;
  }
};

export const fetchFeed = async (page: number = 1, limit: number = 10): Promise<FeedResponse> => {
  try {
    const response = await API.places.getFeed({ page, limit });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch feed');
  }
};