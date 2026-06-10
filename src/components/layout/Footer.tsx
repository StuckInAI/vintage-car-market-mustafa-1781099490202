import { Link } from 'react-router-dom';
import VCCPLogo from '@/components/ui/VCCPLogo';

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-12 px-4" style={{ backgroundColor: '#0a0500', borderColor: '#c9a84c22' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <VCCPLogo size={48} />
              <div>
                <div className="text-xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>VCCP</div>
                <div className="text-xs" style={{ color: '#9a7530', letterSpacing: '0.1em' }}>VINTAGE CAR COLLECTION PORTAL</div>
              </div>
            </div>
            <p className="text-sm" style={{ color: '#6b5a3a' }}>
              The premier marketplace for vintage and classic automobiles. Buy, sell, and auction the finest vintage cars with confidence.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: '#c9a84c', letterSpacing: '0.1em' }}>MARKETPLACE</h4>
            <ul className="space-y-2">
              {[['Browse Listings', '/listings'], ['Sell Your Car', '/sell'], ['Live Auctions', '/auctions']].map(([label, path]) => (
                <li key={path}><Link to={path} className="text-sm hover:text-yellow-400 transition-colors" style={{ color: '#6b5a3a' }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: '#c9a84c', letterSpacing: '0.1em' }}>ACCOUNT</h4>
            <ul className="space-y-2">
              {[['Sign In', '/auth'], ['Register', '/auth'], ['Create Auction', '/auctions/create']].map(([label, path]) => (
                <li key={label}><Link to={path} className="text-sm hover:text-yellow-400 transition-colors" style={{ color: '#6b5a3a' }}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-xs" style={{ borderColor: '#c9a84c22', color: '#4a3a22' }}>
          © {new Date().getFullYear()} VCCP — Vintage Car Collection Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
