import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';

export interface Participant {
  id: string;
  name: string;
  rewardsCount: number;
  engagementScore: number;
  lastActivity: string;
}

export class ParticipantStore {
  participants: Participant[] = [];
  isLoading = false;
  sortBy: 'rewardsCount' | 'engagementScore' = 'engagementScore';
  sortAsc = true;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setParticipants(participants: Participant[]) {
    this.participants = participants;
  }

  setSortBy(field: 'rewardsCount' | 'engagementScore') {
    if (this.sortBy === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortBy = field;
      this.sortAsc = true;
    }
  }

  getSortedParticipants() {
    return [...this.participants].sort((a, b) => {
      if (this.sortBy === 'rewardsCount') {
        return this.sortAsc
          ? a.rewardsCount - b.rewardsCount
          : b.rewardsCount - a.rewardsCount;
      }
      return this.sortAsc
        ? a.engagementScore - b.engagementScore
        : b.engagementScore - a.engagementScore;
    });
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
}

