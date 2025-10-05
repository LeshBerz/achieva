import { useTonConnectUI } from '@tonconnect/ui-react';
import { IS_MOCK_MODE, mockTonConnectUI } from '../mocks';

const IssueToken: React.FC<{ participantId: string }> = ({ participantId }) => {
  const tonConnectUI = IS_MOCK_MODE ? mockTonConnectUI()[0] : useTonConnectUI()[0];
  // Приводим тип к общему интерфейсу
  const isConnected = IS_MOCK_MODE ? true : (tonConnectUI as any).connected; // Временная типизация

  const issueCSBT = async () => {
    if (IS_MOCK_MODE) {
      console.log(`Mock issuing cSBT to ${participantId}`);
      alert('Mock: Токен выдан!');
      return;
    }

    if (!isConnected) {
      alert('Подключите wallet сначала');
      (tonConnectUI as any).openModal(); // Временная типизация
      return;
    }
    // Реальная транзакция...
  };

  return (
    <button
      onClick={issueCSBT}
      className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 hover:shadow-xl transition transform hover:scale-105"
    >
      Выдать cSBT участнику {participantId} (Mock)
    </button>
  );
};

export default IssueToken;