import React from 'react';
import type { TabType } from '../../types';

interface HeaderProps {
  activeTab: TabType;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const headerTitles = {
    'главная': 'Главная',
    'поиск': 'Поиск',
    'статьи': 'Статьи',
    'профиль': 'Профиль'
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-medium">{headerTitles[activeTab]}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;