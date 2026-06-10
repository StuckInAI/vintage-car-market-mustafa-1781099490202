import { FilterState, CarListing } from '@/types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

export function formatTimeRemaining(endTime: string): { hours: number; minutes: number; seconds: number; expired: boolean } {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const diff = end - now;
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { hours, minutes, seconds, expired: false };
}

export function applyFilters(listings: CarListing[], filters: FilterState): CarListing[] {
  return listings.filter((car) => {
    if (filters.search) {
      const s = filters.search.toLowerCase();
      const matched = car.make.toLowerCase().includes(s) ||
        car.model.toLowerCase().includes(s) ||
        car.title.toLowerCase().includes(s) ||
        car.description.toLowerCase().includes(s);
      if (!matched) return false;
    }
    if (filters.make && car.make !== filters.make) return false;
    if (filters.model && !car.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
    if (filters.yearMin && car.year < parseInt(filters.yearMin)) return false;
    if (filters.yearMax && car.year > parseInt(filters.yearMax)) return false;
    if (filters.priceMin && car.price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && car.price > parseInt(filters.priceMax)) return false;
    if (filters.mileageMax && car.mileage > parseInt(filters.mileageMax)) return false;
    if (filters.condition && car.condition !== filters.condition) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.bodyStyle && car.bodyStyle !== filters.bodyStyle) return false;
    if (filters.driveType && car.driveType !== filters.driveType) return false;
    if (filters.color && !car.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
    if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  });
}

export const CAR_MAKES = [
  'Alfa Romeo', 'Aston Martin', 'Auburn', 'Austin-Healey', 'Bentley', 'BMW',
  'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Cord',
  'Datsun', 'De Tomaso', 'Dodge', 'Duesenberg', 'Ferrari', 'Fiat',
  'Ford', 'Hudson', 'Jaguar', 'Jensen', 'Lamborghini', 'Lancia',
  'Lincoln', 'Lotus', 'Maserati', 'Mercedes-Benz', 'MG', 'Morgan',
  'Oldsmobile', 'Packard', 'Plymouth', 'Pontiac', 'Porsche',
  'Rolls-Royce', 'Shelby', 'Studebaker', 'Triumph', 'Tucker', 'Volkswagen'
];

export const YEAR_RANGE = Array.from({ length: 80 }, (_, i) => 1940 + i).reverse();
