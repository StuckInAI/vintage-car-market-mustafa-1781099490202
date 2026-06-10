import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState } from '@/types';
import { CAR_MAKES, YEAR_RANGE } from '@/lib/utils';
import clsx from 'clsx';

type FilterPanelProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
};

const EMPTY_FILTERS: FilterState = {
  make: '', model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '',
  mileageMax: '', condition: '', fuelType: '', transmission: '', bodyStyle: '',
  driveType: '', color: '', location: '', search: '',
};

export default function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const set = (key: keyof FilterState, value: string) => onChange({ ...filters, [key]: value });

  const selectClass = "w-full rounded px-3 py-2 text-sm border";
  const selectStyle = { backgroundColor: '#1a0e00', borderColor: '#c9a84c33', color: '#f5f0e8' };

  return (
    <div className="rounded-lg" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4"
      >
        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#c9a84c' }}>
          <Filter size={16} /> Filters
        </span>
        {expanded ? <ChevronUp size={16} style={{ color: '#c9a84c' }} /> : <ChevronDown size={16} style={{ color: '#c9a84c' }} />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Make</label>
            <select className={clsx(selectClass)} style={selectStyle} value={filters.make} onChange={(e: any) => set('make', e.target.value)}>
              <option value="">All Makes</option>
              {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Model</label>
            <input
              type="text" placeholder="Any model"
              className={clsx(selectClass)} style={selectStyle}
              value={filters.model} onChange={(e: any) => set('model', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Year From</label>
              <select className={clsx(selectClass)} style={selectStyle} value={filters.yearMin} onChange={(e: any) => set('yearMin', e.target.value)}>
                <option value="">Any</option>
                {YEAR_RANGE.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Year To</label>
              <select className={clsx(selectClass)} style={selectStyle} value={filters.yearMax} onChange={(e: any) => set('yearMax', e.target.value)}>
                <option value="">Any</option>
                {YEAR_RANGE.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Price Min</label>
              <input type="number" placeholder="$0" className={clsx(selectClass)} style={selectStyle} value={filters.priceMin} onChange={(e: any) => set('priceMin', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Price Max</label>
              <input type="number" placeholder="No limit" className={clsx(selectClass)} style={selectStyle} value={filters.priceMax} onChange={(e: any) => set('priceMax', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Max Mileage</label>
            <input type="number" placeholder="No limit" className={clsx(selectClass)} style={selectStyle} value={filters.mileageMax} onChange={(e: any) => set('mileageMax', e.target.value)} />
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Condition</label>
            <select className={clsx(selectClass)} style={selectStyle} value={filters.condition} onChange={(e: any) => set('condition', e.target.value)}>
              <option value="">All Conditions</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="project">Project Car</option>
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Body Style</label>
            <select className={clsx(selectClass)} style={selectStyle} value={filters.bodyStyle} onChange={(e: any) => set('bodyStyle', e.target.value)}>
              <option value="">All Styles</option>
              {['sedan','coupe','convertible','wagon','truck','suv','van','roadster','fastback','hardtop'].map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Fuel Type</label>
            <select className={clsx(selectClass)} style={selectStyle} value={filters.fuelType} onChange={(e: any) => set('fuelType', e.target.value)}>
              <option value="">All Fuel Types</option>
              {['gasoline','diesel','electric','hybrid','other'].map((f) => (
                <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Transmission</label>
            <select className={clsx(selectClass)} style={selectStyle} value={filters.transmission} onChange={(e: any) => set('transmission', e.target.value)}>
              <option value="">All</option>
              {['automatic','manual','4-speed','3-speed','semi-auto'].map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Drive Type</label>
            <select className={clsx(selectClass)} style={selectStyle} value={filters.driveType} onChange={(e: any) => set('driveType', e.target.value)}>
              <option value="">All</option>
              <option value="rwd">RWD</option>
              <option value="fwd">FWD</option>
              <option value="awd">AWD</option>
              <option value="4wd">4WD</option>
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Color</label>
            <input type="text" placeholder="Any color" className={clsx(selectClass)} style={selectStyle} value={filters.color} onChange={(e: any) => set('color', e.target.value)} />
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#9a7530' }}>Location</label>
            <input type="text" placeholder="City or State" className={clsx(selectClass)} style={selectStyle} value={filters.location} onChange={(e: any) => set('location', e.target.value)} />
          </div>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-2 rounded text-sm transition-colors"
            style={{ border: '1px solid #c9a84c33', color: '#9a7530' }}
          >
            <X size={14} /> Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
