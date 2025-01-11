import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaceCard from './PlaceCard';
import CollectionCard from './CollectionCard';
import { fetchFeed } from '../../services/feedService';
import type { Place, Collection } from '../../types';

interface FeedItem {
  id: string;
  type: 'place' | 'collection';
  data: Place | Collection;
}

const PlacesList: React.FC = () => {
  const navigate = useNavigate();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFeed();
        console.log('Feed API Response:', response);
        setFeedItems(response.items);
      } catch (error) {
        console.error('Failed to load feed:', error);
        setError('Failed to load feed items');
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, []);

  const handlePlaceClick = (placeId: string | number) => {
    navigate(`/place/${placeId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60';

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {feedItems.map(item => (
        item.type === 'place' ? (
          <PlaceCard
            key={item.id}
            place={{
              id: parseInt(item.id),
              name: item.data.name || '',
              address: item.data.address || '',
              mainTag: '',
              imageUrl: item.data.image || defaultImage,
              rating: item.data.rating || 0,
              distance: item.data.distance || '0 км',
              tagIds: item.data.tags_ids?.map(String) || [],
              priceLevel: item.data.priceLevel || 1,
              isPremium: item.data.isPremium || false
            }}
            onClick={() => handlePlaceClick(item.id)}
          />
        ) : (
          <CollectionCard
            key={item.id}
            collection={{
              id: parseInt(item.id),
              title: item.data.title || 'Без названия',
              places: item.data.places?.map(place => ({
                id: place.id,
                name: place.name,
                address: place.address,
                imageUrl: place.imageUrl || defaultImage
              })) || []
            }}
            onPlaceClick={handlePlaceClick}
          />
        )
      ))}
    </div>
  );
};

export default PlacesList;