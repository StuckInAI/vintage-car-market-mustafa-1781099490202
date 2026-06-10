import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, Phone, Mail, Calendar, Gauge, Fuel, Settings, Car, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useListings } from '@/hooks/useListings';
import { formatCurrency, formatMileage } from '@/lib/utils';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { listings } = useListings();
  const [imgIndex, setImgIndex] = useState(0);

  const car = listings.find((l) => l.id === id);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl mb-4" style={{ color: '#c9a84c' }}>Listing Not Found</p>
        <Link to="/listings" className="text-sm" style={{ color: '#9a7530' }}>← Back to Listings</Link>
      </div>
    );
  }

  const images = car.images?.length ? car.images : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/listings" className="flex items-center gap-1 text-sm mb-6" style={{ color: '#9a7530' }}>
        <ArrowLeft size={14} /> Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images + Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
            <img src={images[imgIndex]} alt={car.title} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full"
                  style={{ backgroundColor: '#0f0800bb' }}
                >
                  <ChevronLeft size={20} style={{ color: '#c9a84c' }} />
                </button>
                <button
                  onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full"
                  style={{ backgroundColor: '#0f0800bb' }}
                >
                  <ChevronRight size={20} style={{ color: '#c9a84c' }} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setImgIndex(i)} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: i === imgIndex ? '#c9a84c' : '#ffffff55' }} />
                  ))}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)} className="flex-shrink-0 rounded overflow-hidden" style={{ border: `2px solid ${i === imgIndex ? '#c9a84c' : 'transparent'}` }}>
                  <img src={img} alt="" className="w-20 h-16 object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Price */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif' }}>{car.title}</h1>
            <div className="text-3xl font-bold mb-2" style={{ color: '#c9a84c' }}>{formatCurrency(car.price)}</div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#9a7530' }}>
              <MapPin size={14} /><span>{car.location}</span>
              <span>·</span>
              <span className="capitalize">{car.condition} condition</span>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Vehicle Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: <Calendar size={14} />, label: 'Year', value: car.year.toString() },
                { icon: <Car size={14} />, label: 'Make', value: car.make },
                { icon: <Car size={14} />, label: 'Model', value: car.model },
                { icon: <Gauge size={14} />, label: 'Mileage', value: formatMileage(car.mileage) },
                { icon: <Settings size={14} />, label: 'Transmission', value: car.transmission },
                { icon: <Fuel size={14} />, label: 'Fuel Type', value: car.fuelType },
                { icon: <Car size={14} />, label: 'Body Style', value: car.bodyStyle },
                { icon: <Car size={14} />, label: 'Drive Type', value: car.driveType.toUpperCase() },
                { icon: <Car size={14} />, label: 'Engine', value: car.engine },
                { icon: <Car size={14} />, label: 'Horsepower', value: `${car.horsepower} hp` },
                { icon: <Car size={14} />, label: 'Color', value: car.color },
                { icon: <Car size={14} />, label: 'Interior', value: car.interiorColor },
              ].map(({ icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-1 text-xs mb-1" style={{ color: '#9a7530' }}>{icon}<span>{label}</span></div>
                  <div className="text-sm font-medium" style={{ color: '#f5f0e8' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* VIN */}
          <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
            <span className="text-xs" style={{ color: '#9a7530' }}>VIN: </span>
            <span className="text-sm font-mono" style={{ color: '#f5f0e8' }}>{car.vin}</span>
          </div>

          {/* Description */}
          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Description</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#c8bfa8' }}>{car.description}</p>
          </div>

          {/* Features */}
          {car.features?.length > 0 && (
            <div className="rounded-lg p-6" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Features & Options</h2>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm" style={{ color: '#c8bfa8' }}>
                    <span style={{ color: '#c9a84c' }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Contact */}
        <div className="space-y-4">
          <div className="rounded-lg p-6 sticky top-24" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33' }}>
            <h3 className="font-bold mb-1" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Contact Seller</h3>
            <p className="text-sm mb-4" style={{ color: '#9a7530' }}>{car.sellerName}</p>
            <div className="space-y-3">
              <a href={`tel:${car.phone}`} className="flex items-center gap-3 p-3 rounded w-full text-sm" style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}>
                <Phone size={16} /> {car.phone}
              </a>
              <a href={`mailto:${car.email}`} className="flex items-center gap-3 p-3 rounded w-full text-sm border" style={{ borderColor: '#c9a84c44', color: '#c9a84c' }}>
                <Mail size={16} /> {car.email}
              </a>
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: '#c9a84c22' }}>
              <div className="text-xs" style={{ color: '#9a7530' }}>Listed on</div>
              <div className="text-sm" style={{ color: '#f5f0e8' }}>{new Date(car.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: '#c9a84c22' }}>
              <div className="text-xs mb-2" style={{ color: '#9a7530' }}>Listing ID</div>
              <div className="text-xs font-mono" style={{ color: '#6b5a3a' }}>{car.id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
