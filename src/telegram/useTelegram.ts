declare global {
  interface Window {
    Telegram?: {
      WebApp?: any;
    };
  }
}

export function useTelegram() {
  const isTelegram = !!window.Telegram?.WebApp;
  const tg = isTelegram ? window.Telegram.WebApp : null;
  
  const onClose = () => {
    tg?.close();
  };

  const onToggleButton = () => {
    if (tg?.MainButton?.isVisible) {
      tg.MainButton?.hide();
    } else {
      tg.MainButton?.show();
    }
  };

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
    isTelegram
  };
}
