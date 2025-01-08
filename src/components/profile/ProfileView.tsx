import React from 'react';
import VisitedPlaces from './VisitedPlaces';

const ProfileView = () => {
  return (
    <div className="pb-20 pt-14 bg-[#fefefe]">
      <div className="bg-[#fefefe] p-4">
        <div className="flex items-center">
          <div className="w-[80px] h-[80px] bg-gray-200 rounded-[1000px]"></div>
          <div className="ml-4 h-[33px] flex flex-col justify-between">
            <h2 className="text-[16px] leading-[19.17px] font-[500] tracking-[-2%] text-[#020203]">John Doe</h2>
            <p className="text-[12px] leading-[14.38px] font-[500] tracking-[-2%] text-[#7D7D80]">@johndoe</p>
          </div>
        </div>
      </div>
      
      <VisitedPlaces />
    </div>
  );
};

export default ProfileView;