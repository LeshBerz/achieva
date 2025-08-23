export const initTelegram = () => {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    webApp.ready();
    webApp.expand();
    
    // Синхронизация темы
    const applyTheme = () => {
      const theme = webApp.colorScheme; // 'light' или 'dark'
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    applyTheme();
    webApp.onEvent('themeChanged', applyTheme);
    
    console.log('Telegram WebApp initialized with theme:', webApp.colorScheme);
  } else {
    console.warn('Not running in Telegram');
  }
};