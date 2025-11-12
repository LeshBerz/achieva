import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';
import { IS_MOCK_MODE } from '../../../shared/config/mocks';

export class RewardsVM {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    if (IS_MOCK_MODE) {
      this.loadMockRewards();
    }
  }

  loadMockRewards() {
    const mockRewards = [
      { id: '1', title: 'cSBT #1: Участие в лекции по блокчейну', description: '', participantId: '1', issuedAt: new Date().toISOString() },
      { id: '2', title: 'cSBT #2: Победитель хакатона СПбГУ', description: '', participantId: '1', issuedAt: new Date().toISOString() },
      { id: '3', title: 'cSBT #3: Активный участник мероприятий', description: '', participantId: '1', issuedAt: new Date().toISOString() },
    ];
    this.rootStore.rewardStore.setRewards(mockRewards);
    this.rootStore.rewardStore.setWalletConnected(true);
  }

  async connectWallet() {
    if (this.isLoading) return;

    this.rootStore.rewardStore.setLoading(true);

    try {
      if (IS_MOCK_MODE) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.loadMockRewards();

        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('TON Wallet подключен!');
        }
      } else {
        const response = await fetch('/api/connect-wallet', {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Ошибка подключения кошелька');
        }

        const data = await response.json();
        this.rootStore.rewardStore.setRewards(data.rewards || []);
        this.rootStore.rewardStore.setWalletConnected(true);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';

      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert(`Ошибка: ${errorMessage}`);
      } else {
        alert(`Ошибка: ${errorMessage}`);
      }
    } finally {
      this.rootStore.rewardStore.setLoading(false);
    }
  }

  get rewards() {
    return this.rootStore.rewardStore.rewards;
  }

  get isConnected() {
    return this.rootStore.rewardStore.isWalletConnected;
  }

  get isLoading() {
    return this.rootStore.rewardStore.isLoading;
  }
}

