import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';

export interface Reward {
  id: string;
  title: string;
  description: string;
  tokenId?: string;
  eventId?: string;
  participantId: string;
  issuedAt: string;
}

export class RewardStore {
  rewards: Reward[] = [];
  isLoading = false;
  isWalletConnected = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setRewards(rewards: Reward[]) {
    this.rewards = rewards;
  }

  addReward(reward: Reward) {
    this.rewards.push(reward);
  }

  setWalletConnected(connected: boolean) {
    this.isWalletConnected = connected;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  getLastRewards(count: number = 3) {
    return this.rewards
      .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime())
      .slice(0, count);
  }
}

