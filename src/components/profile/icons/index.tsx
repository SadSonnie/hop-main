import React from 'react';

import tagActiveLeisure from '../../../assets/icons/tag_active_leisure.svg';
import tagAlone from '../../../assets/icons/tag_alone.svg';
import tagCulture from '../../../assets/icons/tag_culture.svg';
import tagEntertainment from '../../../assets/icons/tag_entertainment.svg';
import tagFamily from '../../../assets/icons/tag_family.svg';
import tagFood from '../../../assets/icons/tag_food.svg';
import tagFriends from '../../../assets/icons/tag_friends.svg';
import tagKids from '../../../assets/icons/tag_kids.svg';
import tagPartner from '../../../assets/icons/tag_partner.svg';
import tagPets from '../../../assets/icons/tag_pets.svg';
import tagSelfDevelopment from '../../../assets/icons/tag_self_development.svg';
import tagShopping from '../../../assets/icons/tag_shopping.svg';
import tagSpa from '../../../assets/icons/tag_spa.svg';

const iconProps = {
  width: 40,
  height: 40,
  className: "text-[#1E47F7]"
};

export const FriendsIcon = () => <img src={tagFriends} alt="Friends" {...iconProps} />;
export const PetsIcon = () => <img src={tagPets} alt="Pets" {...iconProps} />;
export const PartnerIcon = () => <img src={tagPartner} alt="Partner" {...iconProps} />;
export const FamilyIcon = () => <img src={tagFamily} alt="Family" {...iconProps} />;
export const SelfDevelopmentIcon = () => <img src={tagSelfDevelopment} alt="Self Development" {...iconProps} />;
export const AloneIcon = () => <img src={tagAlone} alt="Alone" {...iconProps} />;
export const ShoppingIcon = () => <img src={tagShopping} alt="Shopping" {...iconProps} />;
export const KidsIcon = () => <img src={tagKids} alt="Kids" {...iconProps} />;
export const BeautyIcon = () => <img src={tagSpa} alt="Beauty/Spa" {...iconProps} />;
export const FoodIcon = () => <img src={tagFood} alt="Food" {...iconProps} />;
export const EntertainmentIcon = () => <img src={tagEntertainment} alt="Entertainment" {...iconProps} />;
export const CultureIcon = () => <img src={tagCulture} alt="Culture" {...iconProps} />;
export const ActivityIcon = () => <img src={tagActiveLeisure} alt="Active Leisure" {...iconProps} />;
