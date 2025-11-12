import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  organizerId?: string;
  location?: string;
  maxParticipants?: number;
  currentParticipants?: number;
}

export class EventStore {
  events: Event[] = [];
  isLoading = false;
  selectedEvent: Event | null = null;
  private _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeAutoObservable(this);
    // Reserved for future use (accessing other stores)
    void this._rootStore;
  }

  setEvents(events: Event[]) {
    this.events = events;
  }

  addEvent(event: Event) {
    this.events.push(event);
  }

  updateEvent(id: string, updates: Partial<Event>) {
    const index = this.events.findIndex(e => e.id === id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...updates };
    }
  }

  deleteEvent(id: string) {
    this.events = this.events.filter(e => e.id !== id);
  }

  setSelectedEvent(event: Event | null) {
    this.selectedEvent = event;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  getUpcomingEvents() {
    const now = new Date();
    return this.events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}

