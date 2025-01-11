import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Place } from '../../types';
import API from '../../services/api';

const PlaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlace = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await API.places.getPlace(id);
        // Преобразуем данные в формат Place
        const formattedPlace = {
          id: parseInt(data.id),
          name: data.name,
          description: data.description || '',
          address: data.address || '',
          phone: data.phone || '',
          isPremium: data.isPremium || false,
          priceLevel: data.priceLevel || 1,
          coordinates: data.coordinates || { lat: 0, lng: 0 },
          mainTag: '', // Нужно будет загрузить категорию отдельно
          rating: 0,
          distance: '0 км',
          imageUrl: data.image || 'https://placehold.co/600x400?text=No+Image',
          tagIds: data.tags_ids || []
        };
        setPlace(formattedPlace);
      } catch (err) {
        setError('Не удалось загрузить информацию о месте');
        console.error('Failed to load place:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlace();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Шапка */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="ml-3 text-lg font-medium">{place.name}</h1>
        </div>
      </div>

      {/* Контент */}
      <div className="pt-14 pb-4">
        {/* Изображение */}
        <div className="relative h-[200px]">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Информация */}
        <div className="px-4 py-4">
          <div className="space-y-4">
            {/* Название и премиум статус */}
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold">{place.name}</h2>
              {place.isPremium && (
                <span className="px-2 py-1 bg-blue-600 text-white text-sm rounded">
                  Premium
                </span>
              )}
            </div>

            {/* Уровень цен */}
            <div className="flex items-center gap-1">
              {Array(3).fill(0).map((_, index) => (
                <span
                  key={index}
                  className={`text-lg ${
                    index < place.priceLevel ? 'text-black' : 'text-gray-300'
                  }`}
                >
                  ₽
                </span>
              ))}
            </div>

            {/* Описание */}
            {place.description && (
              <div>
                <h3 className="text-lg font-medium mb-2">Описание</h3>
                <p className="text-gray-600">{place.description}</p>
              </div>
            )}

            {/* Адрес */}
            {place.address && (
              <div>
                <h3 className="text-lg font-medium mb-2">Адрес</h3>
                <p className="text-gray-600">{place.address}</p>
              </div>
            )}

            {/* Телефон */}
            {place.phone && (
              <div>
                <h3 className="text-lg font-medium mb-2">Телефон</h3>
                <a
                  href={`tel:${place.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {place.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlaceDetails };
