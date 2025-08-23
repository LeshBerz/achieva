import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const TonProvider = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(
    TonConnectUIProvider,
    {
      manifestUrl: "/tonconnect-manifest.json", // Укажите актуальный путь к manifest
      actionsConfiguration: {
        modals: 'all', // Можно кастомизировать модалки
      },
      children
    }
  );
};

export default TonProvider;

// Для доступа к UI используйте хук: