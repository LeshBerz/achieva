import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { IS_MOCK_MODE } from '../mocks';

const RealTonProvider = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(
    TonConnectUIProvider,
    {
      manifestUrl: "/tonconnect-manifest.json",
      actionsConfiguration: {
        modals: 'all',
      },
      children: children
    }
  );
};

const MockTonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return React.createElement(React.Fragment, {}, children);
};

export default IS_MOCK_MODE ? MockTonProvider : RealTonProvider;