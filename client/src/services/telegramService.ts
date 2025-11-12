import { mockTelegramEnv } from '@telegram-apps/bridge';

export const initTelegram = async () => {
  try {
    // Простая проверка наличия Telegram WebApp
    const isInTelegram = !!window.Telegram?.WebApp;

    if (!isInTelegram) {
      console.warn('Running outside Telegram - using mock environment');
      
      // Исправленные mock параметры с tgWebAppPlatform
      mockTelegramEnv({
        launchParams: new URLSearchParams({
          user: JSON.stringify({
            id: 99281932,
            firstName: 'TestUser',
            lastName: 'Dev',
            username: 'test_dev',
            languageCode: 'ru',
            isPremium: true,
            allowsWriteToPm: true,
          }),
          hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
          auth_date: '1716922846',
          start_param: 'debug',
          chat_type: 'sender',
          chat_instance: '8428209589180549439',
          tgWebAppPlatform: 'web',
          tgWebAppThemeParams: JSON.stringify({
            bg_color: '#ffffff',
            text_color: '#000000',
            hint_color: '#999999',
            link_color: '#2481cc',
            button_color: '#2481cc',
            button_text_color: '#ffffff',
            secondary_bg_color: '#f1f1f1',
          }),
        }).toString(),
      });
    }

    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      webApp.ready();
      webApp.expand();

      const applyTheme = () => {
        const theme = webApp.colorScheme || 'light';
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
      console.warn('Telegram WebApp not available');
    }
  } catch (error) {
    console.error('Ошибка инициализации Telegram SDK:', error);
  }
};