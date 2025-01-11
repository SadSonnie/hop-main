import React, { useEffect, useState } from 'react';
import VisitedPlaces from './VisitedPlaces';
import { getTelegramUser } from '../../utils/telegram';
import type { UserProfile } from '../../types';

const ProfileView = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Получаем данные пользователя из Telegram или тестовые данные
    const user = getTelegramUser();
    if (user) {
      setProfile({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name || '',
        username: user.username || '',
        languageCode: user.language_code || 'en'
      });
    }
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-20 pt-14 bg-[#fefefe]">
      <div className="bg-[#fefefe] p-4">
        <div className="flex items-center">
          <div className="w-[80px] h-[80px] bg-gray-200 rounded-[1000px]"></div>
          <div className="ml-4 h-[33px] flex flex-col justify-between">
            <h2 className="text-[16px] leading-[19.17px] font-[500] tracking-[-2%] text-[#020203]">
              {profile.firstName} {profile.lastName}
            </h2>
            {profile.username && (
              <p className="text-[12px] leading-[14.38px] font-[500] tracking-[-2%] text-[#7D7D80]">
                @{profile.username}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <VisitedPlaces />
    </div>
  );
};

export default ProfileView;