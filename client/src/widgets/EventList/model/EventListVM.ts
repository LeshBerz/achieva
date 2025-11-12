import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';
import type { Event } from '../../../entities/event/model/EventStore';

export class EventListVM {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.loadEvents();
  }

  loadEvents() {
    this.rootStore.eventStore.setLoading(true);
    // Mock данные - в будущем заменить на API
    const mockEvents: Event[] = [
      { id: '1', title: 'Лекция по блокчейну', date: '2025-09-01', description: 'Узнай о TON' },
      { id: '2', title: 'Хакатон СПбГУ', date: '2025-09-15', description: 'Разработка мини-приложений' },
    ];
    this.rootStore.eventStore.setEvents(mockEvents);
    this.rootStore.eventStore.setLoading(false);
  }

  get events() {
    return this.rootStore.eventStore.events;
  }

  get isLoading() {
    return this.rootStore.eventStore.isLoading;
  }

  selectEvent(event: Event) {
    this.rootStore.eventStore.setSelectedEvent(event);
  }
}

