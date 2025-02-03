import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import PlaceCard from '../places/PlaceCard';
import type { Category } from '../../types';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await API.categories.getCategories();
        setCategories(data.items);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const searchPlaces = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          limit: 10,
          offset: 0
        };

        if (searchQuery) {
          params.query = searchQuery;
        }

        if (selectedCategory) {
          params.category = selectedCategory;
        }

        const data = await API.search.getPlaces(params);
        console.log('API Response raw data:', JSON.stringify(data, null, 2));
        console.log('First place from API:', JSON.stringify(data.items[0], null, 2));

        // Преобразуем данные в формат, который ожидает PlaceCard
        const defaultImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60';
        const formattedPlaces = data.items.map(place => ({
          id: parseInt(place.id),
          name: place.name || '',
          mainTag: categories.find(cat => cat.id === parseInt(place.category_id))?.name || '',
          description: place.description || '',
          rating: place.rating || 4.5,
          distance: place.distance || '2 км',
          imageUrl: place.main_photo_url || defaultImage,
          isPremium: place.isPremium || false,
          tagIds: (place.PlaceTags || []).map(tag => String(tag.placesItems.id)) || [],
          address: place.address || '',
          priceLevel: place.priceLevel || 1
        }));
        
        console.log('All formatted places:', formattedPlaces);
        setPlaces(formattedPlaces);
      } catch (error) {
        console.error('Failed to search places:', error);
        setPlaces([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchPlaces, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, categories]);

  return (
    <div className="bg-[#FEFEFE] pt-14">
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
                className={`h-[37px] px-4 whitespace-nowrap rounded-[100px] border text-[14px] leading-[16.77px] tracking-[-2%] font-[500] ${
                  isSelected
                    ? 'bg-[#F9F9FE] border-[#1E47F7] text-[#1E47F7]'
                    : 'bg-[#FEFEFE] border-[#969699] text-[#020203]'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Список мест */}
      <div className="pb-28">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-600">Загрузка...</div>
          </div>
        ) : places.length > 0 ? (
          places.map((place) => (
            <PlaceCard
              key={place.id}
              {...place}
              onClick={() => navigate(`/place/${place.id}`)}
            />
          ))
        ) : (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-600">Ничего не найдено</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;