import { CarListing, AuctionListing, User } from '@/types';

const KEYS = {
  LISTINGS: 'vccp_listings',
  AUCTIONS: 'vccp_auctions',
  USERS: 'vccp_users',
  CURRENT_USER: 'vccp_current_user',
};

export function getListings(): CarListing[] {
  try {
    const data = localStorage.getItem(KEYS.LISTINGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveListings(listings: CarListing[]): void {
  localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
}

export function getAuctions(): AuctionListing[] {
  try {
    const data = localStorage.getItem(KEYS.AUCTIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAuctions(auctions: AuctionListing[]): void {
  localStorage.setItem(KEYS.AUCTIONS, JSON.stringify(auctions));
}

export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}
