import React from 'react';
import type { Collection } from '../../types';

interface CollectionCardProps {
  collection: Collection;
  onPlaceClick: (id: string | number) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onPlaceClick }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{collection.title}</h3>
        <div className="grid grid-cols-2 gap-2">
          {collection.places.map(place => (
            <div
              key={place.id}
              onClick={() => onPlaceClick(place.id)}
              className="cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={place.imageUrl || defaultImage}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-1">
                <h4 className="text-sm font-medium truncate">{place.name}</h4>
                {place.address && (
                  <p className="text-xs text-gray-500 truncate">{place.address}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;