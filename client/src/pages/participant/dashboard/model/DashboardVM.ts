import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../app/store/RootStore';
import { EventListVM } from '../../../../widgets/EventList/model/EventListVM';
import { RewardsVM } from '../../../../features/reward-view/model/RewardsVM';

export class DashboardVM {
  eventListVM: EventListVM;
  rewardsVM: RewardsVM;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.eventListVM = new EventListVM(rootStore);
    this.rewardsVM = new RewardsVM(rootStore);
  }
}

