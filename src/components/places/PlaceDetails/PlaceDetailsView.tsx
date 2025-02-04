import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Place } from '../../../types';
import API from '../../../services/api';
import ReviewCard from './ReviewCard';
import { RatingStars } from './RatingStars';
import { tags } from '../../../data/tags';

// Импортируем все иконки
import tagFriends from '/icons/tag_friends.svg';
import tagPets from '/icons/tag_pets.svg';
import tagPartner from '/icons/tag_partner.svg';
import tagFamily from '/icons/tag_family.svg';
import tagSelfDevelopment from '/icons/tag_self_development.svg';
import tagAlone from '/icons/tag_alone.svg';
import tagShopping from '/icons/tag_shopping.svg';
import tagKids from '/icons/tag_kids.svg';
import tagSpa from '/icons/tag_spa.svg';
import tagFood from '/icons/tag_food.svg';
import tagEntertainment from '/icons/tag_entertainment.svg';
import tagCulture from '/icons/tag_culture.svg';
import tagActiveLeisure from '/icons/tag_active_leisure.svg';
import shareIcon from '/icons/share_icon.svg';
import arrowLeft from '/icons/arrow.svg';

// Создаем маппинг иконок
const tagIcons: { [key: string]: string } = {
  "1": tagFriends,
  "2": tagPets,
  "3": tagPartner,
  "4": tagFamily,
  "5": tagSelfDevelopment,
  "6": tagAlone,
  "7": tagShopping,
  "8": tagKids,
  "9": tagSpa,
  "10": tagFood,
  "11": tagEntertainment,
  "12": tagCulture,
  "13": tagActiveLeisure,
};

const PlaceDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [wasHere, setWasHere] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Загружаем категории
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
    const fetchPlace = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const placeData = await API.places.getPlace(id);
        const defaultPlaceImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60';
        
        setPlace({
          ...placeData,
          id: parseInt(placeData.id),
          mainTag: placeData.Category?.name || '',
          name: placeData.name,
          description: placeData.description,
          address: placeData.address,
          imageUrl: placeData.main_photo_url || defaultPlaceImage,
          rating: 4.5,
          distance: '2 км',
          tagIds: (placeData.PlaceTags || []).map(tag => String(tag.placesItems.id)),
          priceLevel: placeData.priceLevel || 1,
          isPremium: placeData.isPremium || false,
          reviews: [],
          images: placeData.photos?.map(photo => photo.url) || []
        });
      } catch (error) {
        console.error('Error fetching place:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id, categories]);

  useEffect(() => {
    if (place?.images) {
      // Предварительная загрузка всех изображений
      place.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [place?.images]);

  useEffect(() => {
    setLoading(false);
  }, [place]);

  if (loading || !place) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/');
  };

  const images = place.images || [place.imageUrl];
  const imageIndex = Math.abs(page % images.length);
  const nextImageIndex = Math.abs((page + 1) % images.length);
  const prevImageIndex = Math.abs((page - 1) % images.length);

  // Расчет средней оценки и количества отзывов
  const reviews = place.reviews || [];
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDotClick = (index: number) => {
    const newDirection = index > imageIndex ? 1 : -1;
    setPage([index, newDirection]);
  };

  const renderPriceLevel = () => {
    return Array(3).fill(0).map((_, index) => (
      <span 
        key={index} 
        className={`text-sm font-medium leading-none ${place.isPremium ? 'text-white' : ''}`}
        style={{ 
          color: place.isPremium 
            ? 'white' 
            : index < (place.priceLevel ?? 0) 
              ? '#1e47f7' 
              : '#9aacfb' 
        }}
      >
        ₽
      </span>
    ));
  };

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'cafe':
        return <Coffee className="w-4 h-4 text-white" />;
      case 'bar':
        return <Wine className="w-4 h-4 text-white" />;
      case 'restaurant':
        return <Users className="w-4 h-4 text-white" />;
      default:
        return null;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      zIndex: 1
    }),
    center: {
      x: 0,
      zIndex: 2
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      zIndex: 0
    })
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Хедер */}
      <header className={`sticky top-0 z-50 ${place.isPremium ? 'bg-[#2846ED]' : 'bg-white'}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={handleBack} className="p-2 -ml-2">
            <img
              src={arrowLeft}
              alt="Back"
              className="w-4 h-4"
              style={{ 
                filter: place.isPremium ? 'brightness(0) invert(1)' : 'none'
              }}
            />
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => console.log('Share clicked')}>
              <img 
                src={shareIcon} 
                alt="Share" 
                className="w-5 h-5"
                style={{ 
                  filter: place.isPremium ? 'brightness(0) invert(1)' : 'none'
                }} 
              />
            </button>
            <button onClick={() => setIsFavorite(!isFavorite)}>
              <motion.svg 
                width="24" 
                height="20" 
                viewBox="0 0 24 20" 
                fill={isFavorite ? (place.isPremium ? '#FFFFFF' : '#1E47F7') : 'none'}
                stroke={place.isPremium ? '#FFFFFF' : (isFavorite ? '#1E47F7' : '#020203')}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                whileTap={{ scale: 0.85 }}
                animate={{
                  scale: isFavorite ? [1, 1.2, 1] : 1,
                  transition: {
                    duration: 0.3,
                    times: [0, 0.5, 1]
                  }
                }}
              >
                <motion.path 
                  d="M9.96566 8.69747C16.6695 -10.4384 35.2939 11.1754 7.42643 19C5.27957 17.4478 1.61955 9.99561 1.15321 7.74154C-0.566122 -0.406456 12.8127 -1.72458 9.96566 8.69747Z"
                  initial={false}
                  animate={{
                    scale: isFavorite ? [1, 1.1, 1] : 1,
                    transition: {
                      duration: 0.3,
                      times: [0, 0.5, 1]
                    }
                  }}
                />
              </motion.svg>
            </button>
          </div>
        </div>
      </header>

      <div className="pb-20">
        {/* Основной блок */}
        <div className={`${place.isPremium ? 'bg-[#2846ED]' : 'bg-white'} rounded-b-2xl`}>
          <div className="h-[46px] flex flex-col justify-between px-4">
            <p className={`text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] ${place.isPremium ? 'text-white/80' : 'text-[#020203]'}`}>
              {place.mainTag}
            </p>
            <h1 className={`text-[24px] font-[500] leading-[28.75px] tracking-[-0.02em] ${place.isPremium ? 'text-white' : 'text-[#020203]'}`}>
              {place.name}
            </h1>
          </div>
          {/* Слайдер изображений */}
          <div className="relative h-72 overflow-hidden rounded-xl mx-4 mb-4">
            {/* Теги над слайдером */}
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-0.5">
              {place.tagIds?.map(tagId => {
                const tag = tags.find(t => String(t.id) === String(tagId));
                return tag ? (
                  <div
                    key={tag.id}
                    className="h-[28px] backdrop-blur-[10px] px-2 py-1 rounded-[100px] flex items-center gap-0.5 bg-[#FEFEFE33]"
                    style={{ 
                      backgroundColor: 'rgba(254, 254, 254, 0.2)',
                      padding: '4px 8px'
                    }}
                  >
                    <img 
                      src={tagIcons[tag.id]} 
                      alt=""
                      className="w-[18px] h-[18px] brightness-0 invert"
                    />
                    <span className="text-[12px] font-[500] leading-[14.38px] tracking-[-0.02em] text-white">
                      {tag.name}
                    </span>
                  </div>
                ) : null;
              })}
            </div>

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                className="absolute inset-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, { offset, velocity }) => {
                  setIsDragging(false);
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px'
                }}
              >
                <img
                  src={images[imageIndex]}
                  alt={place.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
              {isDragging && (
                <>
                  <motion.div
                    className="absolute inset-0"
                    style={{ 
                      x: '-100%',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <img
                      src={images[prevImageIndex]}
                      alt={place.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0"
                    style={{ 
                      x: '100%',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <img
                      src={images[nextImageIndex]}
                      alt={place.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Индикаторы слайдера */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isDragging && handleDotClick(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === imageIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Информация о заведении */}
          <div className="px-4 py-4 flex items-center justify-between gap-4">
            <motion.button
              onClick={() => setWasHere(!wasHere)}
              className={`w-[32vw] min-w-[125px] h-[7.1vw] min-h-[30px] rounded-full text-[2.8vw] min-text-[12px] font-medium leading-[1.2] tracking-[-0.02em] transition-colors whitespace-nowrap
                ${wasHere 
                  ? 'bg-blue-600 text-white' 
                  : place.isPremium
                    ? 'bg-[#2846ED] text-white border border-white'
                    : 'bg-white text-[#020203] border border-[#969699]'
                }`}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: wasHere ? [1, 1.1, 1] : 1,
                transition: {
                  duration: 0.3,
                  times: [0, 0.5, 1]
                }
              }}
            >
              {wasHere ? 'Я здесь был(а)' : 'Я здесь был(а)'}
            </motion.button>
            
            <div className="flex items-center gap-2">
              <div 
                className="h-[5.2vw] min-h-[22px] backdrop-blur-md px-[0.5rem] rounded-[100px] flex items-center gap-1"
                style={{ background: 'rgba(30, 71, 247, 0.08)' }}
              >
                <span className={`text-[2.8vw] min-text-[12px] font-[500] leading-[120%] tracking-[-0.02em] ${place.isPremium ? 'text-white' : 'text-blue-600'}`}>{place.rating}</span>
                <Star className={`w-4 h-4 ${place.isPremium ? 'text-white' : 'text-blue-600'} fill-${place.isPremium ? 'white' : 'blue-600'}`} />
              </div>
              <div 
                className="h-[5.2vw] min-h-[22px] backdrop-blur-md px-[0.5rem] rounded-[100px] flex items-center gap-0.5"
                style={{ background: 'rgba(30, 71, 247, 0.08)' }}
              >
                <span className={`font-medium ${place.isPremium ? 'text-white' : ''}`}>{renderPriceLevel()}</span>
              </div>
              <div 
                className="h-[5.2vw] min-h-[22px] backdrop-blur-md px-[0.5rem] rounded-[100px] flex items-center"
                style={{ background: 'rgba(30, 71, 247, 0.08)' }}
              >
                <span className={`text-[2.8vw] min-text-[12px] font-[500] leading-[120%] tracking-[-0.02em] ${place.isPremium ? 'text-white' : 'text-blue-600'}`}>{place.distance}</span>
              </div>
            </div>
          </div>

          {/* Описание */}
          <p className={`text-[#020203] text-[14px] leading-[15.4px] tracking-[-0.02em] font-normal px-4 py-3 ${place.isPremium ? 'text-white/80' : ''}`}>{place.description}</p>
        </div>

        {/* Дополнительно */}
        <div className={`${place.isPremium ? 'bg-[#2846ED]' : 'bg-white'} rounded-[24px] px-4 py-3 -mt-3`}>
          <h2 className={`text-[16px] font-[500] leading-[19.17px] tracking-[-0.02em] text-[#020203] mb-4 ${place.isPremium ? 'text-white' : ''}`}>Дополнительно</h2>
          
          {/* Построить маршрут */}
          <button 
            className={`w-full flex items-center justify-center py-3 px-4 rounded-[100px] mb-4 ${
              place.isPremium 
                ? 'bg-[#2846ED] text-white border border-white' 
                : 'bg-[#F9F9FE] text-[#1E47F7] border border-[#1E47F7]'
            }`}
          >
            <span>Построить маршрут</span>
          </button>

          {/* Адрес и контакты */}
          <div className="flex flex-col gap-4">
            {/* Адрес */}
            <div className="flex items-start gap-3">
              <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-[100px] ${place.isPremium ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                <MapPin className={`w-6 h-6 ${place.isPremium ? 'text-[#2846ED]' : 'text-[#020203]'}`} />
              </div>
              <span className={`text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] pt-2.5 ${place.isPremium ? 'text-white' : 'text-[#020203]'}`}>{place.address}</span>
            </div>

            {/* Телефон (только для премиум) */}
            {place.phone && (
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-[100px] ${place.isPremium ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  <Phone className={`w-6 h-6 ${place.isPremium ? 'text-[#2846ED]' : 'text-[#020203]'}`} />
                </div>
                <span className={`text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] pt-2.5 ${place.isPremium ? 'text-white' : 'text-[#020203]'}`}>{place.phone}</span>
              </div>
            )}
          </div>

          {/* Социальные сети */}
          <div>
            {place.email && (
              <div className="flex items-center gap-3 py-3">
                <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-[100px] ${place.isPremium ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  <Mail className={`w-6 h-6 ${place.isPremium ? 'text-[#2846ED]' : 'text-[#020203]'}`} />
                </div>
                <a href={`mailto:${place.email}`} className={`text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] ${place.isPremium ? 'text-white' : 'text-[#020203]'}`}>{place.email}</a>
              </div>
            )}
            {place.instagram && (
              <div className="flex items-center gap-3 py-3">
                <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-[100px] ${place.isPremium ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  <Instagram className={`w-6 h-6 ${place.isPremium ? 'text-[#2846ED]' : 'text-[#020203]'}`} />
                </div>
                <a href={`https://instagram.com/${place.instagram}`} className={`text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] ${place.isPremium ? 'text-white' : 'text-[#020203]'}`}>@{place.instagram}</a>
              </div>
            )}
          </div>
        </div>

        {/* Отзывы */}
        <div className={`${place.isPremium ? 'bg-[#2846ED]' : 'bg-white'} rounded-[24px] p-4 -mt-3`}>
          <div className={`text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] mb-4 ${place.isPremium ? 'text-white' : 'text-[#020203]'}`}>
            {reviews.length} отзыва
          </div>
            
          {/* Блок рейтинга */}
          <div className="w-[358px] h-[197px] bg-[#FAFAFA] rounded-xl p-4">
            <div className="flex justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-[40px] font-[500] leading-[47.92px] tracking-[-0.02em] text-[#020203]">
                  {averageRating}
                </span>
                <span className="text-[16px] font-[500] leading-[19.17px] tracking-[-0.02em] text-[#969999] ml-1">из 5</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] text-[#020203]">
                  {reviews.length} отзывов
                </span>
                <div className="w-[80px] h-[16px] flex gap-[2px]">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={index < Math.round(parseFloat(averageRating))
                        ? 'text-[#1E47F7] fill-[#1E47F7]'
                        : 'text-[#969699]'
                      }
                    />
                  ))}
                </div>
                <span className="text-[12px] font-[500] leading-[14.38px] tracking-[-0.02em] text-[#020203] mt-1">394 оценок</span>
              </div>
            </div>
            
            {/* Форма отзыва */}
            <div className="mt-4 flex flex-col items-center">
              <img 
                src="/path/to/avatar.jpg" 
                alt="User avatar" 
                className="w-[32px] h-[32px] rounded-[100px] mb-2 object-cover object-center"
              />
              <span className="text-[14px] font-[400] leading-[16.77px] tracking-[-0.02em] text-[#7D7D80] mb-2">
                Оцените и напишите отзыв
              </span>
              <RatingStars />
            </div>
          </div>

          {/* Список отзывов */}
          <div className="mt-4">
            {place.isPremium ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={review.authorAvatar} 
                      alt={review.authorName} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] text-white">
                        {review.authorName}
                      </p>
                      <p className="text-[12px] font-[400] leading-[14.38px] tracking-[-0.02em] text-white/60">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex gap-[2px] mb-1">
                      {[...Array(5)].map((_, star) => (
                        <Star 
                          key={star}
                          className={`w-3 h-3 text-white fill-white ${
                            star < review.rating ? '' : 'opacity-30'
                          }`}
                        />
                      ))}
                    </div>
                    <h3 className="text-[14px] font-[500] leading-[16.77px] tracking-[-0.02em] mb-1 text-white">
                      {review.title}
                    </h3>
                    <p className="text-[14px] font-[400] leading-[16.77px] tracking-[-0.02em] text-white">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsView;