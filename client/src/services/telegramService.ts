// src/services/telegramService.ts
import { mockTelegramEnv, isTMA } from '@telegram-apps/bridge'; // Новый импорт
import { retrieveLaunchParams } from '@telegram-apps/sdk'; // Если используешь это

export const initTelegram = async () => {
  try {
    // Проверяем, является ли окружение Telegram Mini App
    const isInTelegram = await isTMA({ timeout: 100 }); // Асинхронная проверка с таймаутом 100 мс

    if (!isInTelegram) {
      console.warn('Running outside Telegram - using mock environment');
      
      // Имитируем Telegram-окружение для dev
      mockTelegramEnv({
        themeParams: {
          accentTextColor: '#6ab2f2',
          bgColor: '#17212b',
          buttonColor: '#5288c1',
          buttonTextColor: '#ffffff',
          destructiveTextColor: '#ec3942',
          headerBgColor: '#17212b',
          hintColor: '#708499',
          linkColor: '#6ab3f3',
          secondaryBgColor: '#232e3c',
          sectionBgColor: '#17212b',
          sectionHeaderTextColor: '#6ab3f3',
          subtitleTextColor: '#708499',
          textColor: '#f5f5f5',
        },
        initData: {
          user: {
            id: 99281932,
            firstName: 'TestUser',
            lastName: 'Dev',
            username: 'test_dev',
            languageCode: 'ru',
            isPremium: true,
            allowsWriteToPm: true,
          },
          hash: 'mock_hash_1234567890',
          authDate: new Date(),
          startParam: 'debug',
          chatType: 'sender',
          chatInstance: 'mock_instance_123',
        },
        initDataRaw: 'user=%7B%22id%22%3A99281932%2C%22first_name%22%3A%22TestUser%22%2C%22last_name%22%3A%22Dev%22%2C%22username%22%3A%22test_dev%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&hash=mock_hash_1234567890&auth_date=1716922846&start_param=debug&chat_type=sender&chat_instance=mock_instance_123',
        version: '7.2',
        platform: 'ios', // Или 'android', 'tdesktop' для теста
      });
    }

    // Теперь инициализируем SDK безопасно
    const launchParams = retrieveLaunchParams(); // Если используешь это
    const webApp = window.Telegram?.WebApp;

    if (webApp) {
      webApp.ready();
      webApp.expand();

      // Синхронизация темы (теперь с mock это работает)
      const applyTheme = () => {
        const theme = webApp.colorScheme || 'light'; // Fallback на light
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
      console.warn('Telegram WebApp not available even after mock');
    }
  } catch (error) {
    console.error('Ошибка инициализации Telegram SDK:', error);
  }
};