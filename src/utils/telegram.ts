declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe: {
          query_id: string;
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          auth_date: number;
          hash: string;
        };
      };
    };
  }
}

// Development mock data
const MOCK_TG_DATA = {
  query_id: 'AAHdF9XYZ',
  user: {
    id: 12345678,
    first_name: 'Danila',
    last_name: 'Olegovich',
    username: 'somename',
    language_code: 'ru'
  },
  auth_date: 1673371229,
  hash: 'abc123xyz456'
};

export const getTelegramWebData = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    // We're in Telegram Web App
    return window.Telegram.WebApp.initData;
  }
  
  // We're in development/testing environment
  return `query_id=${MOCK_TG_DATA.query_id}&user=${encodeURIComponent(JSON.stringify(MOCK_TG_DATA.user))}&auth_date=${MOCK_TG_DATA.auth_date}&hash=${MOCK_TG_DATA.hash}`;
};

export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  
  return MOCK_TG_DATA.user;
};

export const isTelegramWebApp = () => {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
};
