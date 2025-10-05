export const IS_MOCK_MODE = true; // Переключи на false, когда интеграции заработают

// Mock для Telegram
export const mockTelegram = {
  WebApp: {
    ready: () => console.log('Mock Telegram ready'),
    expand: () => console.log('Mock expand'),
    colorScheme: 'light', // 'light' или 'dark' для тестирования
    // onEvent: (event: string, callback: () => void) => console.log(`Mock event: ${event}`),
    // Добавь больше методов по мере нужды
  },
};

// Mock хуки для TON Connect
export const mockTonConnectUI = () => [
  {
    connected: true,
    openModal: () => console.log('Mock open TON modal'),
    sendTransaction: async (tx: any) => {
      console.log('Mock transaction sent:', tx);
      return { boc: 'mock-boc' }; // Mock успешный ответ
    },
  },
  () => {}, // setOptions mock
];

export const mockTonWallet = () => ({
  address: 'EQ_mock_wallet_address',
  balance: '1000',
  // Добавь больше свойств
});

// Mock для useTonAddress
export const mockTonAddress = () => 'EQ_mock_address (user-friendly)';