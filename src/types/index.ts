export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'seller' | 'bidder' | 'both';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CarListing {
  id: string;
  sellerId: string;
  sellerName: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'project';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'other';
  transmission: string;
  bodyStyle: string;
  driveType: string;
  color: string;
  interiorColor: string;
  engine: string;
  horsepower: number;
  vin: string;
  title: string;
  description: string;
  features: string[];
  images: string[];
  location: string;
  zipCode: string;
  phone: string;
  email: string;
  status: 'active' | 'sold' | 'pending';
  createdAt: string;
  isAuction: boolean;
  trim?: string;
  negotiable?: boolean;
  engineSize?: string;
  cylinders?: string;
  doors?: number;
  sellerContact?: string;
  sellerEmail?: string;
  listingType?: string;
}

export interface Bid {
  id: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface AuctionListing {
  id: string;
  carId: string;
  car: CarListing;
  sellerId: string;
  sellerName: string;
  reservePrice: number;
  startingBid: number;
  currentBid: number;
  highestBidderId: string;
  highestBidderName: string;
  bids: Bid[];
  status: 'upcoming' | 'live' | 'ended';
  startTime: string;
  endTime: string;
  durationHours: number;
  createdAt: string;
  model?: string;
  location?: string;
  currentBidderName?: string;
  listingType?: string;
}

export interface FilterState {
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  mileageMax: string;
  condition: string;
  fuelType: string;
  transmission: string;
  bodyStyle: string;
  driveType: string;
  color: string;
  location: string;
  search: string;
  searchText?: string;
}
