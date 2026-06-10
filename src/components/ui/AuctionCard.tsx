import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Gavel, Clock, TrendingUp, Trophy } from 'lucide-react';
import { AuctionListing } from '@/types';
import { formatCurrency, formatTimeRemaining } from '@/lib/utils';
import clsx from 'clsx';

type AuctionCardProps = { auction: AuctionListing };

export default function AuctionCard({ auction }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeRemaining(auction.endTime));

  useEffect(() => {
    if (auction.status !== 'live') return;
    const interval = setInterval(() => {
      setTimeLeft(formatTimeRemaining(auction.endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [auction.endTime, auction.status]);

  const img = auction.car.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80';
  const reserveMet = auction.currentBid >= auction.reservePrice;

  return (
    <Link to={`/auctions/${auction.id}`} className="block rounded-lg overflow-hidden card-hover" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33' }}>
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img src={img} alt={auction.car.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 flex gap-2">
          <span
            className={clsx('text-xs font-bold px-2 py-1 rounded flex items-center gap-1')}
            style={{
              backgroundColor: auction.status === 'live' ? '#c9a84c' : auction.status === 'ended' ? '#6b1a1a' : '#2a3a1a',
              color: auction.status === 'live' ? '#0f0800' : '#f5f0e8',
            }}
          >
            {auction.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>}
            {auction.status.toUpperCase()}
          </span>
        </div>
        {reserveMet && (
          <div className="absolute top-2 right-2">
            <span className="text-xs px-2 py-1 rounded flex items-center gap-1" style={{ backgroundColor: '#1a4a1a', color: '#4aaa4a' }}>
              <Trophy size={10} /> Reserve Met
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium mb-2" style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
          {auction.car.year} {auction.car.make} {auction.car.model}
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded p-2" style={{ backgroundColor: '#0f0800' }}>
            <div className="text-xs mb-1 flex items-center gap-1" style={{ color: '#9a7530' }}><TrendingUp size={10} /> Current Bid</div>
            <div className="text-base font-bold" style={{ color: '#c9a84c' }}>{formatCurrency(auction.currentBid)}</div>
          </div>
          <div className="rounded p-2" style={{ backgroundColor: '#0f0800' }}>
            <div className="text-xs mb-1 flex items-center gap-1" style={{ color: '#9a7530' }}><Gavel size={10} /> Bids</div>
            <div className="text-base font-bold" style={{ color: '#f5f0e8' }}>{auction.bids.length}</div>
          </div>
        </div>
        {auction.status === 'live' && !timeLeft.expired && (
          <div className="flex items-center gap-2 rounded p-2" style={{ backgroundColor: '#1a0a00', border: '1px solid #c9a84c33' }}>
            <Clock size={12} style={{ color: '#c9a84c' }} />
            <span className="text-xs" style={{ color: '#9a7530' }}>Ends in:</span>
            <span className="text-sm font-mono font-bold" style={{ color: '#c9a84c' }}>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        )}
        {auction.status === 'ended' && (
          <div className="text-center text-sm py-1" style={{ color: '#6b1a1a' }}>Auction Ended</div>
        )}
      </div>
    </Link>
  );
}
