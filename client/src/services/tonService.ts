import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { IS_MOCK_MODE } from '../mocks';

const RealTonProvider = ({ children }: { children: React.ReactNode }) => {
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

const MockTonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
};

export default IS_MOCK_MODE ? MockTonProvider : RealTonProvider;

// export default TonProvider;