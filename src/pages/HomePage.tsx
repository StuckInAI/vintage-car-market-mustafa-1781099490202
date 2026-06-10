import { Link } from 'react-router-dom';
import { Search, Gavel, Shield, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '@/hooks/useListings';
import { useAuctions } from '@/hooks/useAuctions';
import CarCard from '@/components/ui/CarCard';
import AuctionCard from '@/components/ui/AuctionCard';
import VCCPLogo from '@/components/ui/VCCPLogo';

export default function HomePage() {
  const { listings } = useListings();
  const { auctions } = useAuctions();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const featuredListings = listings.filter((l) => l.status === 'active').slice(0, 3);
  const liveAuctions = auctions.filter((a) => a.status === 'live').slice(0, 3);

  const handleSearch = () => {
    if (search.trim()) navigate(`/listings?search=${encodeURIComponent(search)}`);
    else navigate('/listings');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4" style={{ background: 'linear-gradient(135deg, #0a0500 0%, #1a0e00 40%, #2a1800 60%, #1a0e00 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <VCCPLogo size={100} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif', textShadow: '0 0 40px rgba(201,168,76,0.3)' }}>
            VCCP
          </h1>
          <p className="text-lg md:text-xl mb-2" style={{ color: '#e8c97a', fontFamily: 'Georgia, serif', letterSpacing: '0.2em' }}>
            VINTAGE CAR COLLECTION PORTAL
          </p>
          <p className="text-sm md:text-base mb-10" style={{ color: '#9a7530' }}>
            The world's premier marketplace for vintage and classic automobiles
          </p>

          <div className="flex max-w-xl mx-auto gap-2 mb-8">
            <input
              type="text"
              placeholder="Search by make, model, or keyword..."
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              onKeyDown={(e: any) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-3 rounded-l-lg text-sm outline-none"
              style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c44', borderRight: 'none', color: '#f5f0e8' }}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 rounded-r-lg font-medium flex items-center gap-2 text-sm"
              style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}
            >
              <Search size={16} /> Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/listings" className="px-6 py-2 rounded text-sm font-medium border transition-all hover:bg-yellow-900" style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
              Browse Listings
            </Link>
            <Link to="/auctions" className="px-6 py-2 rounded text-sm font-medium transition-all" style={{ backgroundColor: '#6b1a1a', color: '#f5f0e8' }}>
              Live Auctions
            </Link>
            <Link to="/sell" className="px-6 py-2 rounded text-sm font-medium transition-all" style={{ backgroundColor: '#2a1800', color: '#c9a84c', border: '1px solid #c9a84c44' }}>
              List Your Car
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4" style={{ backgroundColor: '#1a0e00', borderTop: '1px solid #c9a84c22', borderBottom: '1px solid #c9a84c22' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Cars Listed', value: listings.length.toString() },
            { label: 'Live Auctions', value: liveAuctions.length.toString() },
            { label: 'Trusted Sellers', value: '500+' },
            { label: 'Cars Sold', value: '2,400+' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-3xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>{value}</div>
              <div className="text-xs mt-1" style={{ color: '#9a7530', letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Featured Listings</h2>
            <Link to="/listings" className="flex items-center gap-1 text-sm hover:text-yellow-400 transition-colors" style={{ color: '#9a7530' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </section>
      )}

      {/* Live Auctions */}
      {liveAuctions.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: '#120900' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Live Auctions
              </h2>
              <Link to="/auctions" className="flex items-center gap-1 text-sm" style={{ color: '#9a7530' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveAuctions.map((auction) => <AuctionCard key={auction.id} auction={auction} />)}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Why Choose VCCP?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Shield size={32} style={{ color: '#c9a84c' }} />, title: 'Verified Listings', desc: 'Every listing is reviewed for accuracy and authenticity by our expert team.' },
            { icon: <Gavel size={32} style={{ color: '#c9a84c' }} />, title: 'Live Auctions', desc: 'Participate in real-time auctions with live bidding on the finest vintage automobiles.' },
            { icon: <Star size={32} style={{ color: '#c9a84c' }} />, title: 'Collector Community', desc: 'Connect with passionate collectors and enthusiasts from around the world.' },
            { icon: <TrendingUp size={32} style={{ color: '#c9a84c' }} />, title: 'Market Insights', desc: 'Access comprehensive market data and pricing guides for vintage vehicles.' },
            { icon: <Search size={32} style={{ color: '#c9a84c' }} />, title: 'Advanced Search', desc: 'Filter by any parameter — make, model, year, condition, color, and more.' },
            { icon: <Shield size={32} style={{ color: '#c9a84c' }} />, title: 'Secure Transactions', desc: 'Safe and transparent buying and selling experience for all parties.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-lg p-6 text-center" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
              <div className="flex justify-center mb-4">{icon}</div>
              <h3 className="font-bold mb-2" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>{title}</h3>
              <p className="text-sm" style={{ color: '#6b5a3a' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
