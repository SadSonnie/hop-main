import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabType } from '../../types';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'главная' as TabType, label: 'Главная', icon: '/src/assets/icons/home.svg' },
    { id: 'поиск' as TabType, label: 'Поиск', icon: '/src/assets/icons/search.svg' },
    { id: 'статьи' as TabType, label: 'Статьи', icon: '/src/assets/icons/articles.svg' },
    { id: 'профиль' as TabType, label: 'Профиль', icon: '/src/assets/icons/profile.svg' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl h-[90px] w-full z-50">
      <div className="flex justify-between items-center h-full container mx-auto px-2 py-1 sm:px-4 sm:py-2">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            layout
            className={`relative flex items-center justify-center ${
              activeTab === tab.id ? 'w-[97px]' : 'w-[40px]'
            } h-[40px] sm:h-[48px] sm:w-[120px]`}
            transition={{ 
              duration: 0.9,
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <button
              onClick={() => onTabChange(tab.id)}
              className="flex items-center justify-center h-full w-full"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 border-[1.5px] border-[#1e47f7] rounded-[100px] -z-10"
                  transition={{ 
                    duration: 0.2,
                    type: "spring",
                    stiffness: 350,
                    damping: 40
                  }}
                />
              )}
              <motion.div 
                className="flex items-center justify-center gap-2"
                layout
                transition={{ duration: 0.1 }}
              >
                <motion.img
                  src={tab.icon}
                  alt={tab.label}
                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                    activeTab === tab.id ? '[filter:invert(23%)sepia(87%)saturate(2526%)hue-rotate(223deg)brightness(97%)contrast(94%)]' : 'text-gray-400'
                  }`}
                  layout
                />
                <AnimatePresence mode="wait">
                  {activeTab === tab.id && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.1 }}
                      className="text-xs font-medium text-[#1e47f7] sm:text-sm whitespace-nowrap overflow-hidden"
                    >
                      {tab.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}

export default BottomNavigation;