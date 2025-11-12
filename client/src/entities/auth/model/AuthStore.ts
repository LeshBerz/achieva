import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../app/store/RootStore';

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  role: 'participant' | 'organizer' | 'admin';
  qrCode?: string;
  telegramId?: number;
  walletAddress?: string;
}

export class AuthStore {
  user: User | null = null;
  isAuthenticated = false;
  isLoading = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setWalletAddress(address: string) {
    if (this.user) {
      this.user.walletAddress = address;
    }
  }
}

