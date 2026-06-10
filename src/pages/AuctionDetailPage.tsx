import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Gavel, Clock, Trophy, TrendingUp } from 'lucide-react';
import { useAuctions } from '@/hooks/useAuctions';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, formatTimeRemaining } from '@/lib/utils';

export default function AuctionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { auctions, placeBid, updateAuctionStatus } = useAuctions();
  const { auth } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [bidResult, setBidResult] = useState<{ success: boolean; error?: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, expired: false });

  const auction = auctions.find((a) => a.id === id);

  useEffect(() => {
    updateAuctionStatus();
    if (!auction) return;
    const interval = setInterval(() => {
      setTimeLeft(formatTimeRemaining(auction.endTime));
      updateAuctionStatus();
    }, 1000);
    setTimeLeft(formatTimeRemaining(auction.endTime));
    return () => clearInterval(interval);
  }, [auction, updateAuctionStatus]);

  if (!auction) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl mb-4" style={{ color: '#c9a84c' }}>Auction Not Found</p>
        <Link to="/auctions" className="text-sm" style={{ color: '#9a7530' }}>← Back to Auctions</Link>
      </div>
    );
  }

  const handleBid = () => {
    if (!auth.isAuthenticated) {
      setBidResult({ success: false, error: 'Please sign in to place a bid' });
      return;
    }
    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) {
      setBidResult({ success: false, error: 'Please enter a valid bid amount' });
      return;
    }
    const result = placeBid(auction.id, auth.user!.id, auth.user!.name, amount);
    setBidResult(result);
    if (result.success) setBidAmount('');
  };

  const img = auction.car.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80';
  const reserveMet = auction.currentBid >= auction.reservePrice;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/auctions" className="flex items-center gap-1 text-sm mb-6" style={{ color: '#9a7530' }}>
        <ArrowLeft size={14} /> Back to Auctions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6" style={{ height: '400px' }}>
            <img src={img} alt={auction.car.title} className="w-full h-full object-cover" />
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
            {auction.car.year} {auction.car.make} {auction.car.model}
          </h1>

          <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#c8bfa8' }}>{auction.car.description}</p>
          </div>

          {/* Bid History */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#c9a84c' }}>Bid History ({auction.bids.length})</h2>
            {auction.bids.length === 0 ? (
              <p className="text-sm" style={{ color: '#6b5a3a' }}>No bids yet. Be the first!</p>
            ) : (
              <div className="space-y-2">
                {[...auction.bids].reverse().map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center py-2 border-b" style={{ borderColor: '#c9a84c11' }}>
                    <div>
                      <span className="text-sm font-medium" style={{ color: '#f5f0e8' }}>{bid.bidderName}</span>
                      <span className="text-xs ml-2" style={{ color: '#9a7530' }}>{new Date(bid.timestamp).toLocaleString()}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: '#c9a84c' }}>{formatCurrency(bid.amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bid Panel */}
        <div>
          <div className="rounded-lg p-6 sticky top-24" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33' }}>
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-bold px-2 py-1 rounded"
                style={{
                  backgroundColor: auction.status === 'live' ? '#c9a84c' : auction.status === 'ended' ? '#6b1a1a' : '#2a3a1a',
                  color: auction.status === 'live' ? '#0f0800' : '#f5f0e8',
                }}
              >
                {auction.status.toUpperCase()}
              </span>
              {reserveMet && (
                <span className="text-xs flex items-center gap-1" style={{ color: '#4aaa4a' }}>
                  <Trophy size={12} /> Reserve Met
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="text-xs mb-1 flex items-center gap-1" style={{ color: '#9a7530' }}><TrendingUp size={10} /> Current Bid</div>
              <div className="text-3xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>{formatCurrency(auction.currentBid)}</div>
              <div className="text-xs mt-1" style={{ color: '#888' }}>{auction.bids.length} total bids</div>
            </div>

            {auction.status === 'live' && !timeLeft.expired && (
              <div className="rounded p-3 mb-4" style={{ backgroundColor: '#0f0800', border: '1px solid #c9a84c22' }}>
                <div className="text-xs mb-1 flex items-center gap-1" style={{ color: '#9a7530' }}><Clock size={10} /> Time Remaining</div>
                <div className="text-2xl font-mono font-bold" style={{ color: '#c9a84c' }}>
                  {String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')}:{String(timeLeft.seconds).padStart(2,'0')}
                </div>
              </div>
            )}

            {auction.status === 'live' && (
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder={`Min bid: ${formatCurrency(auction.currentBid + 1)}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{ backgroundColor: '#0f0800', border: '1px solid #c9a84c33', color: '#f5f0e8' }}
                />
                <button
                  onClick={handleBid}
                  className="w-full py-3 rounded font-bold text-sm flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}
                >
                  <Gavel size={16} /> Place Bid
                </button>
                {bidResult && (
                  <div className="p-3 rounded text-sm" style={{
                    backgroundColor: bidResult.success ? '#1a3a1a' : '#3a0a0a',
                    color: bidResult.success ? '#4aaa4a' : '#ff6b6b',
                    border: `1px solid ${bidResult.success ? '#4aaa4a33' : '#ff000033'}`,
                  }}>
                    {bidResult.success ? '✓ Bid placed successfully!' : bidResult.error}
                  </div>
                )}
              </div>
            )}

            {auction.status === 'ended' && (
              <div className="text-center py-4">
                <div className="text-sm font-bold mb-1" style={{ color: '#9a7530' }}>Auction Ended</div>
                {auction.highestBidderName && (
                  <div className="text-xs" style={{ color: '#6b5a3a' }}>Won by: {auction.highestBidderName}</div>
                )}
              </div>
            )}

            <div className="mt-4 pt-4 border-t" style={{ borderColor: '#c9a84c22' }}>
              <div className="text-xs" style={{ color: '#9a7530' }}>Reserve Price</div>
              <div className="text-sm" style={{ color: reserveMet ? '#4aaa4a' : '#ff6b6b' }}>
                {reserveMet ? '✓ Reserve met' : 'Reserve not yet met'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
