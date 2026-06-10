import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuctions } from '@/hooks/useAuctions';
import { useListings } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { AuctionListing } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function CreateAuctionPage() {
  const { addAuction } = useAuctions();
  const { listings } = useListings();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    carId: '',
    reservePrice: '',
    startingBid: '',
    durationHours: '24',
    startNow: true,
    startDate: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const myListings = listings.filter((l) => l.sellerId === (auth.user?.id || '') && l.status === 'active');
  const selectedCar = listings.find((l) => l.id === form.carId);

  const set = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isAuthenticated) {
      setError('Please sign in to create an auction.');
      return;
    }
    if (!form.carId || !form.reservePrice || !form.startingBid) {
      setError('Please fill in all required fields.');
      return;
    }
    const car = listings.find((l) => l.id === form.carId);
    if (!car) { setError('Car not found.'); return; }

    const now = new Date();
    const startTime = form.startNow ? now.toISOString() : (form.startDate || now.toISOString());
    const endTime = new Date(new Date(startTime).getTime() + parseInt(form.durationHours) * 3600000).toISOString();

    const auction: Omit<AuctionListing, 'id' | 'createdAt'> = {
      carId: form.carId,
      car,
      sellerId: auth.user!.id,
      sellerName: auth.user!.name,
      reservePrice: Number(form.reservePrice),
      startingBid: Number(form.startingBid),
      currentBid: Number(form.startingBid),
      highestBidderId: '',
      highestBidderName: '',
      bids: [],
      status: form.startNow ? 'live' : 'upcoming',
      startTime,
      endTime,
      durationHours: parseInt(form.durationHours),
    };

    const id = addAuction(auction);
    setSuccess(true);
    setTimeout(() => navigate(`/auctions/${id}`), 1500);
  };

  const inputClass = 'w-full px-3 py-2 rounded text-sm';
  const inputStyle = { backgroundColor: '#1a0e00', border: '1px solid #c9a84c33', color: '#f5f0e8' };
  const labelStyle = { color: '#9a7530' };

  if (!auth.isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-xl mb-4" style={{ color: '#c9a84c' }}>Please sign in to create an auction</p>
        <Link to="/auth" className="text-sm" style={{ color: '#9a7530' }}>Sign In →</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔨</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#c9a84c' }}>Auction Created!</h2>
        <p className="text-sm" style={{ color: '#9a7530' }}>Redirecting to your auction...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/auctions" className="flex items-center gap-1 text-sm mb-6" style={{ color: '#9a7530' }}>
        <ArrowLeft size={14} /> Back to Auctions
      </Link>

      <h1 className="text-3xl font-bold mb-2" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Create Auction</h1>
      <p className="text-sm mb-8" style={{ color: '#9a7530' }}>Set up a live auction for your vehicle.</p>

      {error && <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: '#3a0a0a', color: '#ff6b6b', border: '1px solid #ff000033' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
          <h2 className="text-lg font-bold" style={{ color: '#c9a84c' }}>Select Vehicle</h2>
          {myListings.length === 0 ? (
            <div className="text-sm py-4" style={{ color: '#6b5a3a' }}>
              You have no active listings. <Link to="/sell" style={{ color: '#c9a84c' }}>Create one first →</Link>
            </div>
          ) : (
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Vehicle *</label>
              <select className={inputClass} style={inputStyle} value={form.carId} onChange={(e) => set('carId', e.target.value)} required>
                <option value="">Select a vehicle</option>
                {myListings.map((l) => (
                  <option key={l.id} value={l.id}>{l.year} {l.make} {l.model} — {formatCurrency(l.price)}</option>
                ))}
              </select>
              {selectedCar && (
                <div className="mt-2 p-3 rounded" style={{ backgroundColor: '#0f0800', border: '1px solid #c9a84c22' }}>
                  <div className="text-sm font-medium" style={{ color: '#c9a84c' }}>{selectedCar.title}</div>
                  <div className="text-xs mt-1" style={{ color: '#9a7530' }}>{selectedCar.condition} · {selectedCar.mileage.toLocaleString()} mi · {selectedCar.location}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
          <h2 className="text-lg font-bold" style={{ color: '#c9a84c' }}>Auction Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Starting Bid ($) *</label>
              <input type="number" className={inputClass} style={inputStyle} value={form.startingBid} onChange={(e) => set('startingBid', e.target.value)} required placeholder="65000" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Reserve Price ($) *</label>
              <input type="number" className={inputClass} style={inputStyle} value={form.reservePrice} onChange={(e) => set('reservePrice', e.target.value)} required placeholder="80000" />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Duration</label>
            <select className={inputClass} style={inputStyle} value={form.durationHours} onChange={(e) => set('durationHours', e.target.value)}>
              <option value="1">1 hour</option>
              <option value="3">3 hours</option>
              <option value="6">6 hours</option>
              <option value="12">12 hours</option>
              <option value="24">24 hours</option>
              <option value="48">48 hours</option>
              <option value="72">72 hours</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="startNow" checked={form.startNow} onChange={(e) => set('startNow', e.target.checked)} className="w-4 h-4" />
            <label htmlFor="startNow" className="text-sm" style={labelStyle}>Start auction immediately</label>
          </div>
          {!form.startNow && (
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Start Date/Time</label>
              <input type="datetime-local" className={inputClass} style={inputStyle} value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
            </div>
          )}
        </div>

        <button type="submit" className="w-full py-3 rounded font-bold text-sm" style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}>
          Launch Auction
        </button>
      </form>
    </div>
  );
}
