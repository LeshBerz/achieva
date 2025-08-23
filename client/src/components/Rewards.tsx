import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

const Rewards: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [rewards, setRewards] = useState<string[]>([]); // Массив токенов cSBT

  useEffect(() => {
    if (wallet) {
      // Заглушка: fetch баланса cSBT (в будущем: через TON Client или API)
      setRewards(['cSBT #1: Участие в лекции', 'cSBT #2: Победитель хакатона']);
    }
  }, [wallet]);

  const connectWallet = () => {
    tonConnectUI.openModal();
  };

  return (
    <div className="p-4">
      {!wallet ? (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Подключить TON Wallet
        </button>
      ) : (
        <div>
          <h3 className="text-lg font-bold">Ваши награды (cSBT):</h3>
          <ul className="list-disc pl-5">
            {rewards.map((reward, index) => (
              <li key={index}>{reward}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Rewards;