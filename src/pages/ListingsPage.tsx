import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SortAsc } from 'lucide-react';
import { useListings } from '@/hooks/useListings';
import CarCard from '@/components/ui/CarCard';
import FilterPanel from '@/components/ui/FilterPanel';
import { FilterState, CarListing } from '@/types';
import { applyFilters, formatCurrency, formatMileage, CAR_MAKES } from '@/lib/utils';
import clsx from 'clsx';

const EMPTY_FILTERS: FilterState = {
  make: '', model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '',
  mileageMax: '', condition: '', fuelType: '', transmission: '', bodyStyle: '',
  driveType: '', color: '', location: '', search: '',
};

type SortKey = 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | 'mileage_asc' | 'newest';

function sortListings(listings: CarListing[], sort: SortKey): CarListing[] {
  const arr = [...listings];
  switch (sort) {
    case 'price_asc': return arr.sort((a, b) => a.price - b.price);
    case 'price_desc': return arr.sort((a, b) => b.price - a.price);
    case 'year_desc': return arr.sort((a, b) => b.year - a.year);
    case 'year_asc': return arr.sort((a, b) => a.year - b.year);
    case 'mileage_asc': return arr.sort((a, b) => a.mileage - b.mileage);
    case 'newest': return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    default: return arr;
  }
}

export default function ListingsPage() {
  const { listings } = useListings();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...EMPTY_FILTERS,
    search: searchParams.get('search') || '',
  }));
  const [sort, setSort] = useState<SortKey>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [groupBy, setGroupBy] = useState<'none' | 'make' | 'year'>('none');

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setFilters((f) => ({ ...f, search: s }));
  }, [searchParams]);

  const activeListings = listings.filter((l) => l.status === 'active');
  const filtered = sortListings(applyFilters(activeListings, filters), sort);

  const grouped: Record<string, CarListing[]> = {};
  if (groupBy !== 'none') {
    filtered.forEach((car) => {
      const key = groupBy === 'make' ? car.make : String(car.year);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(car);
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Browse Vintage Cars</h1>
        <p className="text-sm" style={{ color: '#9a7530' }}>{filtered.length} vehicles found</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search make, model, description..."
          value={filters.search}
          onChange={(e: any) => setFilters((f) => ({ ...f, search: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg text-sm"
          style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33', color: '#f5f0e8' }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(EMPTY_FILTERS)} />
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: '#9a7530' }}>Group by:</span>
              {(['none', 'make', 'year'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGroupBy(g)}
                  className={clsx('text-xs px-3 py-1 rounded transition-colors', groupBy === g ? 'text-dark' : '')}
                  style={{
                    backgroundColor: groupBy === g ? '#c9a84c' : '#1a0e00',
                    color: groupBy === g ? '#0f0800' : '#9a7530',
                    border: '1px solid #c9a84c33',
                  }}
                >
                  {g === 'none' ? 'None' : g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SortAsc size={14} style={{ color: '#9a7530' }} />
              <select
                value={sort}
                onChange={(e: any) => setSort(e.target.value)}
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33', color: '#f5f0e8' }}
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest</option>
                <option value="year_asc">Year: Oldest</option>
                <option value="mileage_asc">Lowest Mileage</option>
              </select>
              <button onClick={() => setViewMode('grid')} style={{ color: viewMode === 'grid' ? '#c9a84c' : '#6b5a3a' }}><Grid size={18} /></button>
              <button onClick={() => setViewMode('list')} style={{ color: viewMode === 'list' ? '#c9a84c' : '#6b5a3a' }}><List size={18} /></button>
            </div>
          </div>

          {/* Make Quick Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CAR_MAKES.slice(0, 10).map((make) => (
              <button
                key={make}
                onClick={() => setFilters((f) => ({ ...f, make: f.make === make ? '' : make }))}
                className="text-xs px-3 py-1 rounded-full transition-colors"
                style={{
                  backgroundColor: filters.make === make ? '#c9a84c' : '#1a0e00',
                  color: filters.make === make ? '#0f0800' : '#9a7530',
                  border: '1px solid #c9a84c33',
                }}
              >
                {make}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#6b5a3a' }}>
              <div className="text-4xl mb-4">🚗</div>
              <p className="text-lg">No vehicles match your search criteria</p>
              <p className="text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : groupBy !== 'none' ? (
            Object.keys(grouped).sort().map((group) => (
              <div key={group} className="mb-8">
                <h3 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif', borderColor: '#c9a84c33' }}>
                  {group} ({grouped[group].length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {grouped[group].map((car) => <CarCard key={car.id} car={car} />)}
                </div>
              </div>
            ))
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((car) => (
                <a key={car.id} href={`/listings/${car.id}`} className="flex gap-4 rounded-lg p-3 card-hover" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c22' }}>
                  <img src={car.images?.[0]} alt={car.title} className="w-32 h-24 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: '#c9a84c' }}>{formatCurrency(car.price)}</div>
                    <div className="text-sm font-medium" style={{ color: '#f5f0e8' }}>{car.year} {car.make} {car.model}</div>
                    <div className="text-xs mt-1" style={{ color: '#9a7530' }}>{formatMileage(car.mileage)} · {car.condition} · {car.location}</div>
                    <div className="text-xs mt-1 line-clamp-1" style={{ color: '#6b5a3a' }}>{car.description}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
