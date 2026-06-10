import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useListings } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, formatMileage, formatDate } from '@/lib/utils';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { listings } = useListings();
  const { auth } = useAuth();

  const car = listings.find((l) => l.id === id);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl mb-4" style={{ color: '#c9a84c' }}>Listing Not Found</p>
        <Link to="/listings" className="text-sm" style={{ color: '#9a7530' }}>← Back to Listings</Link>
      </div>
    );
  }

  const img = car.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/listings" className="flex items-center gap-1 text-sm mb-6" style={{ color: '#9a7530' }}>
        <ArrowLeft size={14} /> Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6" style={{ height: '400px' }}>
            <img src={img} alt={car.title} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif' }}>{car.title}</h1>
          <div className="text-3xl font-bold mb-4" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>{formatCurrency(car.price)}</div>
          <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#c8bfa8' }}>{car.description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              ['Make', car.make], ['Model', car.model], ['Year', String(car.year)],
              ['Mileage', formatMileage(car.mileage)], ['Condition', car.condition],
              ['Transmission', car.transmission], ['Fuel Type', car.fuelType],
              ['Body Style', car.bodyStyle], ['Drive Type', car.driveType],
              ['Color', car.color], ['Engine', car.engine], ['Horsepower', String(car.horsepower) + ' hp'],
            ].map(([label, value]) => (
              <div key={label} className="rounded p-3" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
                <div className="text-xs mb-1" style={{ color: '#9a7530' }}>{label}</div>
                <div className="text-sm font-medium" style={{ color: '#f5f0e8' }}>{value}</div>
              </div>
            ))}
          </div>
          {car.features && car.features.length > 0 && (
            <div className="rounded-lg p-4" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: '#c9a84c' }}>Features</h2>
              <ul className="grid grid-cols-2 gap-1">
                {car.features.map((f) => (
                  <li key={f} className="text-xs flex items-center gap-1" style={{ color: '#c8bfa8' }}>• {f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <div className="rounded-lg p-6 sticky top-24" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33' }}>
            <div className="text-3xl font-bold mb-4" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>{formatCurrency(car.price)}</div>
            <div className="text-sm mb-1" style={{ color: '#9a7530' }}>Seller: {car.sellerName}</div>
            <div className="text-xs mb-4" style={{ color: '#6b5a3a' }}>Listed: {formatDate(car.createdAt)}</div>
            {car.phone && (
              <div className="mb-2 text-sm" style={{ color: '#c8bfa8' }}>📞 {car.phone}</div>
            )}
            {car.email && (
              <div className="mb-4 text-sm" style={{ color: '#c8bfa8' }}>✉ {car.email}</div>
            )}
            {auth.isAuthenticated ? (
              <button
                className="w-full py-3 rounded font-bold text-sm"
                style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}
              >
                Contact Seller
              </button>
            ) : (
              <Link
                to="/auth"
                className="block text-center w-full py-3 rounded font-bold text-sm"
                style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}
              >
                Sign In to Contact
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
