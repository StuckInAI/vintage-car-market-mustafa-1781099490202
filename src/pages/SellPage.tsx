import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '@/hooks/useListings';
import { useAuctions } from '@/hooks/useAuctions';
import { useAuth } from '@/hooks/useAuth';
import { CarListing, AuctionListing } from '@/types';
import { generateId } from '@/lib/utils';

export default function SellPage() {
  const navigate = useNavigate();
  const { addListing } = useListings();
  const { addAuction } = useAuctions();
  const { auth } = useAuth();

  const [listingType, setListingType] = useState<'sale' | 'auction'>('sale');
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    trim: '',
    vin: '',
    mileage: 0,
    condition: 'good',
    transmission: 'manual',
    fuelType: 'gasoline',
    bodyStyle: 'sedan',
    driveType: 'rwd',
    color: '',
    interiorColor: '',
    engine: '',
    horsepower: 0,
    price: 0,
    description: '',
    location: '',
    zipCode: '',
    phone: '',
    email: auth.user?.email || '',
    features: '',
    images: '',
    // auction fields
    reservePrice: 0,
    startingBid: 0,
    durationHours: 24,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (key: string, value: string | number) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!auth.isAuthenticated || !auth.user) {
      setError('Please sign in to create a listing.');
      return;
    }

    const imageList = form.images.split('\n').map((s) => s.trim()).filter(Boolean);
    const featureList = form.features.split('\n').map((s) => s.trim()).filter(Boolean);

    const base = {
      make: form.make,
      model: form.model,
      year: Number(form.year),
      trim: form.trim,
      vin: form.vin,
      mileage: Number(form.mileage),
      condition: form.condition,
      transmission: form.transmission,
      fuelType: form.fuelType,
      bodyStyle: form.bodyStyle,
      driveType: form.driveType,
      color: form.color,
      interiorColor: form.interiorColor,
      engine: form.engine,
      horsepower: Number(form.horsepower),
      price: Number(form.price),
      description: form.description,
      location: form.location,
      zipCode: form.zipCode,
      phone: form.phone,
      email: form.email,
      features: featureList,
      images: imageList,
      title: `${form.year} ${form.make} ${form.model}${form.trim ? ' ' + form.trim : ''}`,
      status: 'active' as const,
      isAuction: listingType === 'auction',
      sellerId: auth.user.id,
      sellerName: auth.user.name,
    };

    if (listingType === 'sale') {
      const listing: CarListing = {
        ...base,
        id: generateId(),
        createdAt: new Date().toISOString(),
        listingType: 'sale',
      };
      addListing(listing);
      setSuccess('Listing created successfully!');
      setTimeout(() => navigate('/listings'), 1500);
    } else {
      const now = new Date();
      const endTime = new Date(now.getTime() + form.durationHours * 3600000);
      const carListing: CarListing = {
        ...base,
        id: generateId(),
        createdAt: new Date().toISOString(),
        listingType: 'auction',
      };
      const auction: Omit<AuctionListing, 'id' | 'createdAt'> = {
        carId: carListing.id,
        car: carListing,
        sellerId: auth.user.id,
        sellerName: auth.user.name,
        reservePrice: Number(form.reservePrice),
        startingBid: Number(form.startingBid),
        currentBid: Number(form.startingBid),
        highestBidderId: '',
        highestBidderName: '',
        bids: [],
        status: 'live',
        startTime: now.toISOString(),
        endTime: endTime.toISOString(),
        durationHours: Number(form.durationHours),
      };
      addAuction(auction);
      setSuccess('Auction created successfully!');
      setTimeout(() => navigate('/auctions'), 1500);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded text-sm';
  const inputStyle = { backgroundColor: '#1a0e00', border: '1px solid #c9a84c33', color: '#f5f0e8' };
  const labelStyle = { color: '#9a7530' };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Sell Your Car</h1>
      <p className="text-sm mb-8" style={{ color: '#9a7530' }}>List your vintage automobile for sale or auction.</p>

      {!auth.isAuthenticated && (
        <div className="mb-6 p-4 rounded" style={{ backgroundColor: '#3a1a00', border: '1px solid #c9a84c44', color: '#c9a84c' }}>
          Please <a href="/auth" style={{ textDecoration: 'underline' }}>sign in</a> to create a listing.
        </div>
      )}

      <div className="flex rounded overflow-hidden mb-8" style={{ border: '1px solid #c9a84c33' }}>
        <button
          type="button"
          className="flex-1 py-2 text-sm transition-colors"
          style={{ backgroundColor: listingType === 'sale' ? '#c9a84c' : 'transparent', color: listingType === 'sale' ? '#0f0800' : '#9a7530' }}
          onClick={() => setListingType('sale')}
        >For Sale</button>
        <button
          type="button"
          className="flex-1 py-2 text-sm transition-colors"
          style={{ backgroundColor: listingType === 'auction' ? '#c9a84c' : 'transparent', color: listingType === 'auction' ? '#0f0800' : '#9a7530' }}
          onClick={() => setListingType('auction')}
        >Auction</button>
      </div>

      {error && <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: '#3a0a0a', color: '#ff6b6b', border: '1px solid #ff000033' }}>{error}</div>}
      {success && <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: '#1a3a1a', color: '#4aaa4a', border: '1px solid #4aaa4a33' }}>{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22', borderRadius: '8px', padding: '2rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Make *</label>
            <input required type="text" className={inputClass} style={inputStyle} value={form.make} onChange={(e) => set('make', e.target.value)} placeholder="e.g. Ford" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Model *</label>
            <input required type="text" className={inputClass} style={inputStyle} value={form.model} onChange={(e) => set('model', e.target.value)} placeholder="e.g. Mustang" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Year *</label>
            <input required type="number" className={inputClass} style={inputStyle} value={form.year} onChange={(e) => set('year', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Trim</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.trim} onChange={(e) => set('trim', e.target.value)} placeholder="e.g. GT, Cobra" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>VIN</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.vin} onChange={(e) => set('vin', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Mileage</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.mileage} onChange={(e) => set('mileage', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Condition</label>
            <select className={inputClass} style={inputStyle} value={form.condition} onChange={(e) => set('condition', e.target.value)}>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="project">Project Car</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Transmission</label>
            <select className={inputClass} style={inputStyle} value={form.transmission} onChange={(e) => set('transmission', e.target.value)}>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
              <option value="4-speed">4-Speed</option>
              <option value="3-speed">3-Speed</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Fuel Type</label>
            <select className={inputClass} style={inputStyle} value={form.fuelType} onChange={(e) => set('fuelType', e.target.value)}>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Body Style</label>
            <select className={inputClass} style={inputStyle} value={form.bodyStyle} onChange={(e) => set('bodyStyle', e.target.value)}>
              {['sedan','coupe','convertible','wagon','truck','suv','roadster','fastback','hardtop'].map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Drive Type</label>
            <select className={inputClass} style={inputStyle} value={form.driveType} onChange={(e) => set('driveType', e.target.value)}>
              <option value="rwd">RWD</option>
              <option value="fwd">FWD</option>
              <option value="awd">AWD</option>
              <option value="4wd">4WD</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Color</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="e.g. Candy Apple Red" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Interior Color</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.interiorColor} onChange={(e) => set('interiorColor', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Engine</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.engine} onChange={(e) => set('engine', e.target.value)} placeholder="e.g. 428 Cobra Jet V8" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Horsepower</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.horsepower} onChange={(e) => set('horsepower', e.target.value)} />
          </div>
          {listingType === 'sale' && (
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Asking Price ($) *</label>
              <input required type="number" className={inputClass} style={inputStyle} value={form.price} onChange={(e) => set('price', e.target.value)} />
            </div>
          )}
        </div>

        {listingType === 'auction' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Starting Bid ($) *</label>
              <input required type="number" className={inputClass} style={inputStyle} value={form.startingBid} onChange={(e) => set('startingBid', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Reserve Price ($) *</label>
              <input required type="number" className={inputClass} style={inputStyle} value={form.reservePrice} onChange={(e) => set('reservePrice', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Duration (hours)</label>
              <select className={inputClass} style={inputStyle} value={form.durationHours} onChange={(e) => set('durationHours', e.target.value)}>
                {[6, 12, 24, 48, 72, 168].map((h) => (
                  <option key={h} value={h}>{h}h</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs mb-1" style={labelStyle}>Description</label>
          <textarea rows={5} className={inputClass} style={inputStyle} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe the vehicle's history, condition, and notable features..." />
        </div>

        <div>
          <label className="block text-xs mb-1" style={labelStyle}>Features (one per line)</label>
          <textarea rows={4} className={inputClass} style={inputStyle} value={form.features} onChange={(e) => set('features', e.target.value)} placeholder="Original Engine&#10;Numbers Matching&#10;Restored Interior" />
        </div>

        <div>
          <label className="block text-xs mb-1" style={labelStyle}>Image URLs (one per line)</label>
          <textarea rows={3} className={inputClass} style={inputStyle} value={form.images} onChange={(e) => set('images', e.target.value)} placeholder="https://example.com/image1.jpg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Location *</label>
            <input required type="text" className={inputClass} style={inputStyle} value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="City, State" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>ZIP Code</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.zipCode} onChange={(e) => set('zipCode', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Phone</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Contact Email</label>
            <input type="email" className={inputClass} style={inputStyle} value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded font-bold text-sm"
          style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}
        >
          {listingType === 'sale' ? 'Create Listing' : 'Create Auction'}
        </button>
      </form>
    </div>
  );
}
