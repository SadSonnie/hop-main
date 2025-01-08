import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import PlacesList from './components/places/PlacesList';
import SearchView from './components/search/SearchView';
import ArticlesView from './components/articles/ArticlesView';
import ProfileView from './components/profile/ProfileView';
import PlaceDetailsView from './components/places/PlaceDetails/PlaceDetailsView';
import BottomNavigation from './components/layout/BottomNavigation';
import type { TabType } from './types';
import { useTelegram } from './telegram/useTelegram';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('главная');
  const location = useLocation();
  const showMainHeader = !location.pathname.includes('/place/');
  const { tg, isTelegram } = useTelegram();

  useEffect(() => {
    if (isTelegram && tg) {
      tg.ready();
      // Устанавливаем цвет фона
      tg.setBackgroundColor('#FEFEFE');
      // Устанавливаем основной цвет
      tg.setHeaderColor('#1E47F7');
    }
  }, [tg, isTelegram]);

  const renderContent = () => {
    switch (activeTab) {
      case 'поиск':
        return <SearchView />;
      case 'статьи':
        return <ArticlesView />;
      case 'профиль':
        return <ProfileView />;
      default:
        return <PlacesList />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50">
      <div className="flex flex-col h-full">
        {showMainHeader && <Header activeTab={activeTab} />}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/place/:id" element={<PlaceDetailsView />} />
            <Route path="/*" element={renderContent()} />
          </Routes>
        </main>
        {showMainHeader && <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FEFEFE]">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;