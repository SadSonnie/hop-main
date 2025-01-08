import React from 'react';
import { Users, Cat, Heart, Users2, Brain, User, ShoppingBag, Baby, Scissors, Utensils, Gamepad2 } from 'lucide-react';

const iconProps = {
  size: 40,
  className: "text-[#1E47F7]",
  strokeWidth: 1.5
};

export const FriendsIcon = () => <Users {...iconProps} />;
export const PetsIcon = () => <Cat {...iconProps} />;
export const PartnerIcon = () => <Heart {...iconProps} />;
export const FamilyIcon = () => <Users2 {...iconProps} />;
export const SelfDevelopmentIcon = () => <Brain {...iconProps} />;
export const AloneIcon = () => <User {...iconProps} />;
export const ShoppingIcon = () => <ShoppingBag {...iconProps} />;
export const KidsIcon = () => <Baby {...iconProps} />;
export const BeautyIcon = () => <Scissors {...iconProps} />;
export const FoodIcon = () => <Utensils {...iconProps} />;
export const EntertainmentIcon = () => <Gamepad2 {...iconProps} />;

export const CultureIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1E47F7]">
    <path d="M8 32V12L32 8V28M8 32H32M8 32L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V32M16 11.5V32M20 11V32M24 10.5V32M28 10V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ActivityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1E47F7]">
    <path d="M20 8C23.3137 8 26 10.6863 26 14C26 17.3137 23.3137 20 20 20C16.6863 20 14 17.3137 14 14C14 10.6863 16.6863 8 20 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 20V32M14 26H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
