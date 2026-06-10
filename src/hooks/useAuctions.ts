import { useState, useCallback } from 'react';
import { AuctionListing, Bid } from '@/types';
import { getAuctions, saveAuctions, generateId } from '@/lib/storage';

export function useAuctions() {
  const [auctions, setAuctions] = useState<AuctionListing[]>(() => getAuctions());

  const refresh = useCallback(() => {
    setAuctions(getAuctions());
  }, []);

  const addAuction = useCallback((auction: Omit<AuctionListing, 'id' | 'createdAt'>): string => {
    const newAuction: AuctionListing = {
      ...auction,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...getAuctions(), newAuction];
    saveAuctions(updated);
    setAuctions(updated);
    return newAuction.id;
  }, []);

  const placeBid = useCallback((
    auctionId: string,
    bidderId: string,
    bidderName: string,
    amount: number
  ): { success: boolean; error?: string } => {
    const current = getAuctions();
    const auction = current.find((a) => a.id === auctionId);
    if (!auction) return { success: false, error: 'Auction not found' };
    if (auction.status !== 'live') return { success: false, error: 'Auction is not live' };
    if (amount <= auction.currentBid) return { success: false, error: `Bid must be higher than current bid of $${auction.currentBid.toLocaleString()}` };
    if (amount < auction.startingBid) return { success: false, error: `Bid must be at least $${auction.startingBid.toLocaleString()}` };
    const newBid: Bid = { id: generateId(), bidderId, bidderName, amount, timestamp: new Date().toISOString() };
    const updated = current.map((a) => a.id === auctionId ? {
      ...a,
      currentBid: amount,
      highestBidderId: bidderId,
      highestBidderName: bidderName,
      bids: [...a.bids, newBid],
    } : a);
    saveAuctions(updated);
    setAuctions(updated);
    return { success: true };
  }, []);

  const updateAuctionStatus = useCallback(() => {
    const current = getAuctions();
    const now = new Date();
    let changed = false;
    const updated = current.map((a) => {
      const end = new Date(a.endTime);
      const start = new Date(a.startTime);
      if (a.status === 'upcoming' && now >= start) {
        changed = true;
        return { ...a, status: 'live' as const };
      }
      if (a.status === 'live' && now >= end) {
        changed = true;
        return { ...a, status: 'ended' as const };
      }
      return a;
    });
    if (changed) {
      saveAuctions(updated);
      setAuctions(updated);
    }
  }, []);

  return { auctions, refresh, addAuction, placeBid, updateAuctionStatus };
}
