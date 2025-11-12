import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../app/store/RootStore';
import { ParticipantsListVM } from '../../../../widgets/ParticipantsList/model/ParticipantsListVM';
import { IssueTokenVM } from '../../../../features/reward-issue/model/IssueTokenVM';

export class OrganizerDashboardVM {
  participantsListVM: ParticipantsListVM;
  issueTokenVMs: Map<string, IssueTokenVM> = new Map();
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.participantsListVM = new ParticipantsListVM(rootStore);
    this.initializeIssueTokenVMs();
  }

  private initializeIssueTokenVMs() {
    // Создаем VM для каждого участника
    this.participantsListVM.participants.forEach(participant => {
      if (!this.issueTokenVMs.has(participant.id)) {
        this.issueTokenVMs.set(
          participant.id,
          new IssueTokenVM(this.rootStore, participant.id)
        );
      }
    });
  }

  getIssueTokenVM(participantId: string): IssueTokenVM {
    if (!this.issueTokenVMs.has(participantId)) {
      this.issueTokenVMs.set(
        participantId,
        new IssueTokenVM(this.rootStore, participantId)
      );
    }
    return this.issueTokenVMs.get(participantId)!;
  }
}

