import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { CarListing } from '@/types';
import { CAR_MAKES, YEAR_RANGE } from '@/lib/utils';

export default function SellPage() {
  const { addListing } = useListings();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    make: '', model: '', year: new Date().getFullYear(), price: '',
    mileage: '', condition: 'good', fuelType: 'gasoline',
    transmission: 'manual', bodyStyle: 'coupe', driveType: 'rwd',
    color: '', interiorColor: '', engine: '', horsepower: '',
    vin: '', title: '', description: '', location: '', zipCode: '',
    phone: '', email: '', features: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (key: string, value: string | number) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.make || !form.model || !form.price || !form.title) {
      setError('Please fill in all required fields.');
      return;
    }
    const listing: Omit<CarListing, 'id' | 'createdAt'> = {
      sellerId: auth.user?.id || 'guest',
      sellerName: auth.user?.name || 'Guest Seller',
      make: form.make,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage) || 0,
      condition: form.condition as CarListing['condition'],
      fuelType: form.fuelType as CarListing['fuelType'],
      transmission: form.transmission,
      bodyStyle: form.bodyStyle,
      driveType: form.driveType,
      color: form.color || 'Unknown',
      interiorColor: form.interiorColor || 'Unknown',
      engine: form.engine || 'Unknown',
      horsepower: Number(form.horsepower) || 0,
      vin: form.vin || '',
      title: form.title,
      description: form.description,
      features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
      images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'],
      location: form.location || 'Unknown',
      zipCode: form.zipCode || '',
      phone: form.phone || '',
      email: form.email || auth.user?.email || '',
      status: 'active',
      isAuction: false,
    };
    const id = addListing(listing);
    setSuccess(true);
    setTimeout(() => navigate(`/listings/${id}`), 1500);
  };

  const inputClass = 'w-full px-3 py-2 rounded text-sm';
  const inputStyle = { backgroundColor: '#1a0e00', border: '1px solid #c9a84c33', color: '#f5f0e8' };
  const labelStyle = { color: '#9a7530' };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#c9a84c' }}>Listing Created!</h2>
        <p className="text-sm" style={{ color: '#9a7530' }}>Redirecting to your listing...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>List Your Car</h1>
      <p className="text-sm mb-8" style={{ color: '#9a7530' }}>Fill in the details below to create your listing.</p>

      {error && <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: '#3a0a0a', color: '#ff6b6b', border: '1px solid #ff000033' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
          <h2 className="text-lg font-bold" style={{ color: '#c9a84c' }}>Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Make *</label>
              <select className={inputClass} style={inputStyle} value={form.make} onChange={(e) => set('make', e.target.value)} required>
                <option value="">Select Make</option>
                {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Model *</label>
              <input type="text" className={inputClass} style={inputStyle} value={form.model} onChange={(e) => set('model', e.target.value)} required placeholder="e.g. Mustang" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Year</label>
              <select className={inputClass} style={inputStyle} value={form.year} onChange={(e) => set('year', parseInt(e.target.value))}>
                {YEAR_RANGE.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Price ($) *</label>
              <input type="number" className={inputClass} style={inputStyle} value={form.price} onChange={(e) => set('price', e.target.value)} required placeholder="85000" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Mileage</label>
              <input type="number" className={inputClass} style={inputStyle} value={form.mileage} onChange={(e) => set('mileage', e.target.value)} placeholder="42000" />
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
              <label className="block text-xs mb-1" style={labelStyle}>Color</label>
              <input type="text" className={inputClass} style={inputStyle} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="Candy Apple Red" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Interior Color</label>
              <input type="text" className={inputClass} style={inputStyle} value={form.interiorColor} onChange={(e) => set('interiorColor', e.target.value)} placeholder="Black" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Engine</label>
              <input type="text" className={inputClass} style={inputStyle} value={form.engine} onChange={(e) => set('engine', e.target.value)} placeholder="428 Cobra Jet V8" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Horsepower</label>
              <input type="number" className={inputClass} style={inputStyle} value={form.horsepower} onChange={(e) => set('horsepower', e.target.value)} placeholder="335" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Fuel Type</label>
              <select className={inputClass} style={inputStyle} value={form.fuelType} onChange={(e) => set('fuelType', e.target.value)}>
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Transmission</label>
              <select className={inputClass} style={inputStyle} value={form.transmission} onChange={(e) => set('transmission', e.target.value)}>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="4-speed">4-Speed</option>
                <option value="3-speed">3-Speed</option>
                <option value="semi-auto">Semi-Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Body Style</label>
              <select className={inputClass} style={inputStyle} value={form.bodyStyle} onChange={(e) => set('bodyStyle', e.target.value)}>
                {['sedan','coupe','convertible','wagon','truck','suv','van','roadster','fastback','hardtop'].map((s) => (
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
              <label className="block text-xs mb-1" style={labelStyle}>VIN</label>
              <input type="text" className={inputClass} style={inputStyle} value={form.vin} onChange={(e) => set('vin', e.target.value)} placeholder="9F02H123456" />
            </div>
          </div>
        </div>

        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
          <h2 className="text-lg font-bold" style={{ color: '#c9a84c' }}>Listing Details</h2>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Listing Title *</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="1969 Ford Mustang Fastback - Numbers Matching" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Description</label>
            <textarea rows={4} className={inputClass} style={inputStyle} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe your vehicle in detail..." />
          </div>
          <div>
            <label className="block text-xs mb-1" style={labelStyle}>Features (comma-separated)</label>
            <input type="text" className={inputClass} style={inputStyle} value={form.features} onChange={(e) => set('features', e.target.value)} placeholder="Original Engine, Numbers Matching, Restored Interior" />
          </div>
        </div>

        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
          <h2 className="text-lg font-bold" style={{ color: '#c9a84c' }}>Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Location</label>
              <input type="text" className={inputClass} style={inputStyle} value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Detroit, MI" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>ZIP Code</label>
              <input type="text" className={inputClass} style={inputStyle} value={form.zipCode} onChange={(e) => set('zipCode', e.target.value)} placeholder="48201" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Phone</label>
              <input type="tel" className={inputClass} style={inputStyle} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="313-555-0101" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={labelStyle}>Email</label>
              <input type="email" className={inputClass} style={inputStyle} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3 rounded font-bold text-sm" style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}>
          Create Listing
        </button>
      </form>
    </div>
  );
}
