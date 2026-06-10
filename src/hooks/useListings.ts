import { useState, useCallback } from 'react';
import { CarListing } from '@/types';
import { getListings, saveListings, generateId } from '@/lib/storage';

export function useListings() {
  const [listings, setListings] = useState<CarListing[]>(() => getListings());

  const refresh = useCallback(() => {
    setListings(getListings());
  }, []);

  const addListing = useCallback((listing: Omit<CarListing, 'id' | 'createdAt'>): string => {
    const newListing: CarListing = {
      ...listing,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...getListings(), newListing];
    saveListings(updated);
    setListings(updated);
    return newListing.id;
  }, []);

  const updateListing = useCallback((id: string, updates: Partial<CarListing>): void => {
    const current = getListings();
    const updated = current.map((l) => l.id === id ? { ...l, ...updates } : l);
    saveListings(updated);
    setListings(updated);
  }, []);

  return { listings, refresh, addListing, updateListing };
}
