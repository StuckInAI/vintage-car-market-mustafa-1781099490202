export type CarCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'project';
export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'other';
export type TransmissionType = 'automatic' | 'manual' | '4-speed' | '3-speed' | 'semi-auto';
export type BodyStyle = 'sedan' | 'coupe' | 'convertible' | 'wagon' | 'truck' | 'suv' | 'van' | 'roadster' | 'fastback' | 'hardtop';
export type DriveType = 'rwd' | 'fwd' | 'awd' | '4wd';
export type ListingStatus = 'active' | 'sold' | 'pending';
export type AuctionStatus = 'upcoming' | 'live' | 'ended';

export interface CarListing {
  id: string;
  sellerId: string;
  sellerName: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: CarCondition;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyStyle: BodyStyle;
  driveType: DriveType;
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
  status: ListingStatus;
  createdAt: string;
  isAuction: boolean;
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
  status: AuctionStatus;
  startTime: string;
  endTime: string;
  durationHours: number;
  createdAt: string;
}

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
}
