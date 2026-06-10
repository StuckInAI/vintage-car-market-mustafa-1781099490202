import { useState } from 'react';
import { useListings } from '@/hooks/useListings';
import { FilterState } from '@/types';
import { applyFilters } from '@/lib/utils';
import CarCard from '@/components/ui/CarCard';
import FilterPanel from '@/components/ui/FilterPanel';

const defaultFilters: FilterState = {
  make: '', model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '',
  mileageMax: '', condition: '', fuelType: '', transmission: '', bodyStyle: '',
  driveType: '', color: '', location: '', search: '',
};

export default function BrowsePage() {
  const { listings } = useListings();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [searchText, setSearchText] = useState('');

  const activeFilters: FilterState = { ...filters, search: searchText };
  const filtered = applyFilters(listings, activeFilters);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>Browse Classic Cars</h1>
        <p className="text-sm" style={{ color: '#9a7530' }}>{filtered.length} listings found</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by make, model, or keyword..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-3 rounded text-sm"
          style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33', color: '#f5f0e8' }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
        </div>
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#6b5a3a' }}>
              <p className="text-lg">No listings match your filters</p>
              <button onClick={() => { setFilters(defaultFilters); setSearchText(''); }} className="mt-4 text-sm" style={{ color: '#c9a84c' }}>Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
