export const IS_MOCK_MODE = true; // Переключи на false, когда интеграции заработают

// Mock для Telegram
export const mockTelegram = {
  WebApp: {
    ready: () => console.log('Mock Telegram ready'),
    expand: () => console.log('Mock expand'),
    colorScheme: 'light',
  },
};

// Mock хуки для TON Connect
export const mockTonConnectUI = () => [
  {
    connected: true,
    openModal: () => console.log('Mock open TON modal'),
    sendTransaction: async (tx: any) => {
      console.log('Mock transaction sent:', tx);
      return { boc: 'mock-boc' };
    },
  },
  () => {},
];

export const mockTonWallet = () => ({
  address: 'EQ_mock_wallet_address',
  balance: '1000',
});

export const mockTonAddress = () => 'EQ_mock_address (user-friendly)';

