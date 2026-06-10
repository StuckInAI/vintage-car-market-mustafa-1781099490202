import { Link } from 'react-router-dom';
import { MapPin, Gauge, Calendar, Heart } from 'lucide-react';
import { CarListing } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';

type CarCardProps = { car: CarListing; href?: string };

export default function CarCard({ car, href }: CarCardProps) {
  const link = href || `/listings/${car.id}`;
  const img = car.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80';

  return (
    <Link to={link} className="block rounded-lg overflow-hidden card-hover" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33' }}>
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img src={img} alt={car.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            className="p-1.5 rounded-full"
            style={{ backgroundColor: '#0f0800cc' }}
          >
            <Heart size={16} style={{ color: '#c9a84c' }} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-3 py-1" style={{ background: 'linear-gradient(transparent, #0f0800cc)' }}>
          <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: '#c9a84c', color: '#0f0800' }}>
            {car.condition.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-lg font-bold mb-1" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>
          {formatCurrency(car.price)}
        </div>
        <h3 className="text-sm font-medium mb-2 line-clamp-2" style={{ color: '#f5f0e8' }}>
          {car.year} {car.make} {car.model}
        </h3>
        <div className="flex items-center gap-3 text-xs" style={{ color: '#9a7530' }}>
          <span className="flex items-center gap-1"><Gauge size={12} />{formatMileage(car.mileage)}</span>
          <span className="flex items-center gap-1"><Calendar size={12} />{car.year}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: '#6b5a3a' }}>
          <MapPin size={12} />
          <span>{car.location}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {[car.transmission, car.bodyStyle, car.fuelType].map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#2a1800', color: '#9a7530', border: '1px solid #c9a84c22' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
