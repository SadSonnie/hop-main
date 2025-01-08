import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import PlaceCard from '../places/PlaceCard';
import { fetchFeedItems } from '../../services/feedService';
import type { FeedItem, Place } from '../../types';

const categories = [
  { id: 'friends', name: 'С друзьями' },
  { id: 'pets', name: 'С животными' },
  { id: 'partner', name: 'С партнером' },
  { id: 'family', name: 'С семьей' },
  { id: 'self', name: 'Саморазвитие' },
  { id: 'alone', name: 'Одному' },
  { id: 'shopping', name: 'Шоппинг' },
  { id: 'kids', name: 'Для детей' },
  { id: 'beauty', name: 'Бьюти/спа' },
  { id: 'food', name: 'Еда' },
  { id: 'entertainment', name: 'Развлечения' },
  { id: 'culture', name: 'Культура' },
  { id: 'activity', name: 'Активный отдых' }
];

const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const items = await fetchFeedItems();
        const allPlaces = items
          .flatMap(item => {
            if (item.type === 'place') {
              return [item.data as Place];
            } else if (item.type === 'collection') {
              return (item.data as any).places || [];
            }
            return [];
          })
          // Преобразуем строку расстояния в число для сортировки
          .map(place => ({
            ...place,
            distanceNum: parseFloat(place.distance.split(' ')[0])
          }))
          // Сортируем по расстоянию
          .sort((a, b) => a.distanceNum - b.distanceNum);

        setPlaces(allPlaces);
      } catch (error) {
        console.error('Failed to load places:', error);
      }
    };

    loadPlaces();
  }, []);

  return (
    <div className="bg-[#FEFEFE] pt-14 pb-7">
      <div className="px-4 pt-4">
        <div className="relative flex justify-center">
          <input
            type="text"
            placeholder="Введите название"
            className="w-[358px] h-[48px] pl-[52px] pr-3 py-3 bg-[#FEFEFE] rounded-[1000px] border border-[#EBEBF0] text-[16px] leading-[19.17px] tracking-[-2%] font-[400] text-[#969699] placeholder-[#969699] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon 
            className="absolute left-[28px] top-1/2 -translate-y-1/2 text-[#969699]" 
            size={24}
          />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                className={`h-[37px] px-4 whitespace-nowrap rounded-[100px] border border-[#969699] text-[14px] leading-[16.77px] tracking-[-2%] font-[500] ${
                  isSelected
                    ? 'bg-[#F9F9FE] border-[#1E47F7] text-[#1E47F7]'
                    : 'bg-[#FEFEFE] text-[#020203]'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Список мест */}
      <div>
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            {...place}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchView;