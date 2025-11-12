import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';
import { IS_MOCK_MODE } from '../../../shared/config/mocks';

export class IssueTokenVM {
  isLoading = false;
  isIssued = false;

  constructor(
    private rootStore: RootStore,
    private participantId: string
  ) {
    makeAutoObservable(this);
  }

  async issueCSBT() {
    if (this.isLoading) return;

    this.isLoading = true;

    try {
      if (IS_MOCK_MODE) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Mock issuing cSBT to participant ${this.participantId}`);
        this.isIssued = true;

        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Токен cSBT успешно выдан!');
        } else {
          alert('Токен cSBT успешно выдан!');
        }
      } else {
        const response = await fetch('/api/issue-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participantId: this.participantId,
            tokenType: 'cSBT',
          }),
        });

        if (!response.ok) {
          throw new Error('Ошибка при выдаче токена');
        }

        const data = await response.json();
        this.isIssued = true;

        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert(`Токен выдан! Транзакция: ${data.txHash}`);
        } else {
          alert(`Токен выдан! Транзакция: ${data.txHash}`);
        }
      }
    } catch (error) {
      console.error('Error issuing token:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';

      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert(`Ошибка: ${errorMessage}`);
      } else {
        alert(`Ошибка: ${errorMessage}`);
      }
    } finally {
      this.isLoading = false;
    }
  }
}

