export const isTelegramWebView = (): boolean => {
  if (typeof window === 'undefined') return false;

  return !!(
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initData
  );
};

export const getTelegramTheme = () => {
  if (!isTelegramWebView() || !window.Telegram || !window.Telegram.WebApp) {
    return null;
  }
  return window.Telegram.WebApp.colorScheme; // 'light' | 'dark'
};

// TypeScript types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        colorScheme: 'light' | 'dark';
        ready: () => void;
        expand: () => void;
      };
    };
  }
}
