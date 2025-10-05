import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useState, useEffect, useMemo } from 'react';
import { IS_MOCK_MODE, mockTonConnectUI, mockTonWallet } from '../mocks';

const Rewards: React.FC = () => {
  const [tonConnectUI] = IS_MOCK_MODE ? mockTonConnectUI() : useTonConnectUI();
  const realWallet = useTonWallet();
  const mockWallet = useMemo(() => mockTonWallet(), []);
  const wallet = IS_MOCK_MODE ? mockWallet : realWallet;
  const [rewards, setRewards] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (wallet) {
      setRewards(['cSBT #1: Участие в лекции', 'cSBT #2: Победитель хакатона']);
      setIsConnected(true);
    }
  }, [wallet]);

  const connectWallet = () => {
    if (IS_MOCK_MODE) {
      console.log('Mock connect');
      setRewards(['cSBT #1: Участие в лекции']);
      setIsConnected(true);
    } else {
      (tonConnectUI as any).openModal();
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 hover:shadow-xl transition transform hover:scale-105 w-full md:w-auto"
        >
          Подключить TON Wallet (Mock)
        </button>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Ваши награды (cSBT):</h3>
          <ul className="space-y-2">
            {rewards.map((reward, index) => (
              <li key={index} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition">
                {reward}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Rewards;