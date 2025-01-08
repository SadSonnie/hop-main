import React from 'react';
import {
  FriendsIcon,
  PetsIcon,
  PartnerIcon,
  FamilyIcon,
  SelfDevelopmentIcon,
  AloneIcon,
  ShoppingIcon,
  KidsIcon,
  BeautyIcon,
  FoodIcon,
  EntertainmentIcon,
  CultureIcon,
  ActivityIcon
} from './icons';

interface PlaceCategory {
  name: string;
  icon: React.ReactNode;
  count: number;
}

const categories: PlaceCategory[] = [
  {
    name: 'С друзьями',
    icon: <FriendsIcon />,
    count: 15
  },
  {
    name: 'С животными',
    icon: <PetsIcon />,
    count: 8
  },
  {
    name: 'С партнером',
    icon: <PartnerIcon />,
    count: 12
  },
  {
    name: 'С семьей',
    icon: <FamilyIcon />,
    count: 10
  },
  {
    name: 'Саморазвитие',
    icon: <SelfDevelopmentIcon />,
    count: 6
  },
  {
    name: 'Одному',
    icon: <AloneIcon />,
    count: 9
  },
  {
    name: 'Шоппинг',
    icon: <ShoppingIcon />,
    count: 7
  },
  {
    name: 'Для детей',
    icon: <KidsIcon />,
    count: 5
  },
  {
    name: 'Бьюти/спа',
    icon: <BeautyIcon />,
    count: 4
  },
  {
    name: 'Еда',
    icon: <FoodIcon />,
    count: 13
  },
  {
    name: 'Развлечения',
    icon: <EntertainmentIcon />,
    count: 20
  },
  {
    name: 'Культура',
    icon: <CultureIcon />,
    count: 40
  },
  {
    name: 'Активный отдых',
    icon: <ActivityIcon />,
    count: 37
  }
];

const VisitedPlaces: React.FC = () => {
  return (
    <div className="bg-[#fefefe]">
      <div className="p-4">
        <h1 className="text-[16px] leading-[19.17px] tracking-[-2%] text-[#020203] font-[500] mb-2">
          Мой Питер
        </h1>
        <h2 className="text-[14px] leading-[16.77px] tracking-[-2%] text-[#7D7D80] font-[500] mb-4">
          Ваши посещенные локации
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category.name}
              style={{ borderWidth: '0.6px' }}
              className="w-[110px] h-[110px] rounded-[12px] border-[#EBEBF0] bg-[#fefefe] flex flex-col items-center justify-center"
            >
              <div className="text-[#1E47F7] mb-1 text-center">
                {category.icon}
              </div>
              <div className="text-[12px] leading-[14.38px] tracking-[-2%] text-[#020203] font-[500] mb-1 text-center px-2">
                {category.name}
              </div>
              <div className="text-[12px] leading-[14.38px] tracking-[-2%] text-[#1E47F7] font-[500]">
                {category.count} локаций
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitedPlaces;
