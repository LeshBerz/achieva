import { useTonConnectUI } from '@tonconnect/ui-react';
import { IS_MOCK_MODE, mockTonConnectUI } from '../mocks';

const IssueToken: React.FC<{ participantId: string }> = ({ participantId }) => {
  let tonConnectUI;
  if (IS_MOCK_MODE) {
    tonConnectUI = mockTonConnectUI()[0];
  } else {
    [tonConnectUI] = useTonConnectUI();
  }

  const issueCSBT = async () => {
    if (IS_MOCK_MODE) {
      console.log(`Mock issuing cSBT to ${participantId}`);
      alert('Mock: Токен выдан!');
      return;
    }

    if (!tonConnectUI.connected) {
      alert('Подключите wallet сначала');
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