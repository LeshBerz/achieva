import { useTonConnectUI } from '@tonconnect/ui-react';

const IssueToken: React.FC<{ participantId: string }> = ({ participantId }) => {
  const [tonConnectUI] = useTonConnectUI();

  const issueCSBT = async () => {
    if (!tonConnectUI.connected) {
      alert('Подключите wallet сначала');
      return;
    }
    // Заглушка: реальная транзакция через tonConnectUI.sendTransaction({ ... })
    // Параметры: to (контракт cSBT), value, payload для минтинга
    try {
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60 * 5, // 5 мин
        messages: [
          {
            address: 'EQ... ', // Адрес контракта cSBT
            amount: '1000000', // В наноTON
            payload: 'base64 payload for mint' // Для минтинга токена участнику
          }
        ]
      });
      alert('Токен выдан!');
    } catch (error) {
      console.error('Ошибка выдачи:', error);
    }
  };

  return (
    <button onClick={issueCSBT} className="bg-green-500 text-white px-4 py-2 rounded">
      Выдать cSBT участнику {participantId}
    </button>
  );
};

export default IssueToken;