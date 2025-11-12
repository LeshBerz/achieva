import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';

export class ParticipantsListVM {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.loadParticipants();
  }

  loadParticipants() {
    this.rootStore.participantStore.setLoading(true);
    // Mock данные - в будущем заменить на API
    const mockParticipants = [
      { id: '1', name: 'Иван Иванов', rewardsCount: 5, engagementScore: 85, lastActivity: '2025-09-20' },
      { id: '2', name: 'Мария Петрова', rewardsCount: 3, engagementScore: 92, lastActivity: '2025-09-22' },
      { id: '3', name: 'Алексей Сидоров', rewardsCount: 7, engagementScore: 78, lastActivity: '2025-09-18' },
    ];
    this.rootStore.participantStore.setParticipants(mockParticipants);
    this.rootStore.participantStore.setLoading(false);
  }

  get participants() {
    return this.rootStore.participantStore.getSortedParticipants();
  }

  get isLoading() {
    return this.rootStore.participantStore.isLoading;
  }

  get sortBy() {
    return this.rootStore.participantStore.sortBy;
  }

  toggleSort(field: 'rewardsCount' | 'engagementScore') {
    this.rootStore.participantStore.setSortBy(field);
  }

  handleViewParticipant(_participantId: string, name: string, rewardsCount: number, engagementScore: number) {
    const message = `Участник: ${name}\nНаград: ${rewardsCount}\nВовлеченность: ${engagementScore}%`;
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message);
    } else {
      alert(message);
    }
  }
}

