import { makeAutoObservable } from 'mobx';
import { AuthStore } from '../../entities/auth/model/AuthStore';
import { EventStore } from '../../entities/event/model/EventStore';
import { ParticipantStore } from '../../entities/participant/model/ParticipantStore';
import { RewardStore } from '../../entities/reward/model/RewardStore';

export class RootStore {
  authStore: AuthStore;
  eventStore: EventStore;
  participantStore: ParticipantStore;
  rewardStore: RewardStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.eventStore = new EventStore(this);
    this.participantStore = new ParticipantStore(this);
    this.rewardStore = new RewardStore(this);
    makeAutoObservable(this);
  }
}

