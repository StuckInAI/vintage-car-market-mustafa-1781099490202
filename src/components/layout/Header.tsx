import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/hooks/useAuth';
import VCCPLogo from '@/components/ui/VCCPLogo';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Browse Cars', path: '/listings' },
    { label: 'Sell Your Car', path: '/sell' },
    { label: 'Live Auctions', path: '/auctions' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-700" style={{ backgroundColor: '#0f0800', borderColor: '#c9a84c33' }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <VCCPLogo size={48} />
          <div>
            <div className="text-xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}>VCCP</div>
            <div className="text-xs" style={{ color: '#9a7530', letterSpacing: '0.15em' }}>VINTAGE CAR COLLECTION PORTAL</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-yellow-400',
                isActive(link.path) ? 'text-yellow-400' : 'text-yellow-600'
              )}
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {auth.isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm" style={{ color: '#c9a84c' }}>
                <User size={16} />
                <span>{auth.user?.name}</span>
                <ChevronDown size={14} />
              </div>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded border transition-colors"
                style={{ borderColor: '#c9a84c55', color: '#9a7530' }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 rounded text-sm font-medium transition-all"
              style={{ backgroundColor: '#c9a84c', color: '#0f0800', fontFamily: 'Georgia, serif' }}
            >
              Sign In / Register
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: '#c9a84c' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-4" style={{ backgroundColor: '#1a0e00', borderColor: '#c9a84c33' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={clsx('text-sm font-medium', isActive(link.path) ? 'text-yellow-400' : 'text-yellow-600')}
            >
              {link.label}
            </Link>
          ))}
          {auth.isAuthenticated ? (
            <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} className="text-left text-sm" style={{ color: '#9a7530' }}>
              Logout ({auth.user?.name})
            </button>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#c9a84c' }}>
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
