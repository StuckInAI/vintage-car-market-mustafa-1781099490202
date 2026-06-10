import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Plus, Clock } from 'lucide-react';
import { useAuctions } from '@/hooks/useAuctions';
import { useAuth } from '@/hooks/useAuth';
import AuctionCard from '@/components/ui/AuctionCard';
import { formatCurrency, formatTimeRemaining } from '@/lib/utils';

export default function AuctionPage() {
  const { auctions, updateAuctionStatus } = useAuctions();
  const { auth } = useAuth();

  useEffect(() => {
    updateAuctionStatus();
    const interval = setInterval(updateAuctionStatus, 10000);
    return () => clearInterval(interval);
  }, [updateAuctionStatus]);

  const live = auctions.filter((a) => a.status === 'live');
  const upcoming = auctions.filter((a) => a.status === 'upcoming');
  const ended = auctions.filter((a) => a.status === 'ended');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Live Auctions</h1>
          <p className="text-sm mt-1" style={{ color: '#9a7530' }}>{live.length} auctions currently live</p>
        </div>
        {auth.isAuthenticated && (
          <Link
            to="/auctions/create"
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium"
            style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}
          >
            <Plus size={16} /> Create Auction
          </Link>
        )}
      </div>

      {live.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#c9a84c' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {live.map((auction) => <AuctionCard key={auction.id} auction={auction} />)}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#c9a84c' }}>Upcoming Auctions</h2>
          <div className="space-y-3">
            {upcoming.map((auction) => {
              const timeLeft = formatTimeRemaining(auction.startTime);
              return (
                <Link
                  key={auction.id}
                  to={`/auctions/${auction.id}`}
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1" style={{ color: '#c9a227' }}>
                      {auction.car.year} {auction.car.make} {auction.car.model}
                    </h2>
                    <p className="text-sm mb-4" style={{ color: '#a0a0a0' }}>{auction.car.location || auction.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: '#c9a84c' }}>Starting: {formatCurrency(auction.startingBid)}</div>
                    <div className="text-xs mt-1 flex items-center gap-1" style={{ color: '#888' }}>
                      <Clock size={10} /> Starts in {String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {ended.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#9a7530' }}>Ended Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ended.map((auction) => <AuctionCard key={auction.id} auction={auction} />)}
          </div>
        </section>
      )}

      {auctions.length === 0 && (
        <div className="text-center py-20" style={{ color: '#6b5a3a' }}>
          <div className="text-5xl mb-4"><Gavel size={60} style={{ margin: '0 auto', color: '#c9a84c' }} /></div>
          <p className="text-lg">No auctions yet</p>
          {auth.isAuthenticated && (
            <Link to="/auctions/create" className="mt-4 inline-block text-sm" style={{ color: '#c9a84c' }}>
              Create the first auction →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
