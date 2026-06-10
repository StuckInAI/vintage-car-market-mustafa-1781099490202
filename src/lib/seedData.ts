import { CarListing, AuctionListing, User } from '@/types';
import { getListings, saveListings, getAuctions, saveAuctions, getUsers, saveUsers, generateId } from '@/lib/storage';

const VINTAGE_IMAGES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
  'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80',
  'https://images.unsplash.com/photo-1471443946432-1e02e1e4e7e1?w=800&q=80',
  'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&q=80',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
  'https://images.unsplash.com/photo-1553440569-bcc63803-a83a?w=800&q=80',
  'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
];

function pickImg(i: number): string {
  return VINTAGE_IMAGES[i % VINTAGE_IMAGES.length];
}

export function seedDemoData(): void {
  const users = getUsers();
  if (users.length > 0) return;

  const demoUsers: User[] = [
    { id: 'u1', name: 'Classic Henry', email: 'henry@vccp.com', password: 'pass123', role: 'both', createdAt: new Date().toISOString() },
    { id: 'u2', name: 'Vintage Victoria', email: 'victoria@vccp.com', password: 'pass123', role: 'seller', createdAt: new Date().toISOString() },
    { id: 'u3', name: 'Bidder Bob', email: 'bob@vccp.com', password: 'pass123', role: 'bidder', createdAt: new Date().toISOString() },
  ];
  saveUsers(demoUsers);

  const existingListings = getListings();
  if (existingListings.length === 0) {
    const listings: CarListing[] = [
      {
        id: 'l1', sellerId: 'u1', sellerName: 'Classic Henry',
        make: 'Ford', model: 'Mustang', year: 1969, price: 85000,
        mileage: 42000, condition: 'excellent', fuelType: 'gasoline',
        transmission: 'manual', bodyStyle: 'fastback', driveType: 'rwd',
        color: 'Candy Apple Red', interiorColor: 'Black', engine: '428 Cobra Jet V8',
        horsepower: 335, vin: '9F02H123456', title: '1969 Ford Mustang Fastback - Numbers Matching',
        description: 'Stunning 1969 Mustang Fastback with original 428 Cobra Jet engine. Numbers matching, full restoration completed in 2020. Show quality paint and chrome.',
        features: ['Original Engine', 'Numbers Matching', 'Restored Interior', 'New Suspension', 'Power Steering', 'Air Conditioning'],
        images: [pickImg(0), pickImg(1)], location: 'Detroit, MI', zipCode: '48201',
        phone: '313-555-0101', email: 'henry@vccp.com', status: 'active', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), isAuction: false,
      },
      {
        id: 'l2', sellerId: 'u2', sellerName: 'Vintage Victoria',
        make: 'Chevrolet', model: 'Corvette', year: 1967, price: 125000,
        mileage: 28000, condition: 'excellent', fuelType: 'gasoline',
        transmission: 'manual', bodyStyle: 'convertible', driveType: 'rwd',
        color: 'Sunfire Yellow', interiorColor: 'Black', engine: '427 L71 V8',
        horsepower: 435, vin: '194677S100001', title: '1967 Corvette Sting Ray Convertible - Tri-Power',
        description: 'Extremely rare 1967 Corvette with the 427 Tri-Power engine. One of only 2,101 produced with this configuration. Full frame-off restoration.',
        features: ['Tri-Power Carbs', 'Side Pipes', 'Knock-Off Wheels', 'Numbers Matching', 'NCRS Top Flight Award'],
        images: [pickImg(2), pickImg(3)], location: 'Los Angeles, CA', zipCode: '90001',
        phone: '213-555-0202', email: 'victoria@vccp.com', status: 'active', createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), isAuction: false,
      },
      {
        id: 'l3', sellerId: 'u1', sellerName: 'Classic Henry',
        make: 'Porsche', model: '911', year: 1973, price: 95000,
        mileage: 55000, condition: 'good', fuelType: 'gasoline',
        transmission: 'manual', bodyStyle: 'coupe', driveType: 'rwd',
        color: 'Gulf Orange', interiorColor: 'Tan', engine: '2.4L Flat-6',
        horsepower: 190, vin: '9113100123', title: '1973 Porsche 911 T - European Spec',
        description: 'Original European specification 911T with exceptional provenance. One owner from new until 1995. Well documented service history.',
        features: ['Matching Numbers', 'Original Paint', 'Sportomatic Available', 'Leather Interior', 'Sunroof'],
        images: [pickImg(4), pickImg(5)], location: 'Miami, FL', zipCode: '33101',
        phone: '305-555-0303', email: 'henry@vccp.com', status: 'active', createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), isAuction: false,
      },
      {
        id: 'l4', sellerId: 'u2', sellerName: 'Vintage Victoria',
        make: 'Mercedes-Benz', model: '300SL', year: 1957, price: 850000,
        mileage: 18000, condition: 'excellent', fuelType: 'gasoline',
        transmission: 'manual', bodyStyle: 'roadster', driveType: 'rwd',
        color: 'Silver', interiorColor: 'Red', engine: '3.0L Inline-6',
        horsepower: 240, vin: '1980435009', title: '1957 Mercedes-Benz 300SL Roadster - Concours',
        description: 'Concours-level 1957 300SL Roadster. One of the most desirable of all vintage automobiles. Fully documented with Mercedes-Benz Classic Center certification.',
        features: ['Factory Hardtop', 'Tool Roll', 'Luggage Set', 'Documentation', 'MB Classic Cert', 'Concours Restoration'],
        images: [pickImg(1), pickImg(6)], location: 'New York, NY', zipCode: '10001',
        phone: '212-555-0404', email: 'victoria@vccp.com', status: 'active', createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), isAuction: false,
      },
      {
        id: 'l5', sellerId: 'u1', sellerName: 'Classic Henry',
        make: 'Jaguar', model: 'E-Type', year: 1965, price: 145000,
        mileage: 62000, condition: 'good', fuelType: 'gasoline',
        transmission: 'manual', bodyStyle: 'convertible', driveType: 'rwd',
        color: 'British Racing Green', interiorColor: 'Tan', engine: '4.2L XK Inline-6',
        horsepower: 265, vin: '1E20047', title: '1965 Jaguar E-Type Series 1 4.2 Roadster',
        description: 'Beautiful Series 1 E-Type roadster with desirable 4.2 litre engine. Exceptional example with documented history from new.',
        features: ['Chrome Wire Wheels', 'Hard Top Included', 'Full Tool Roll', 'Rebuilt Engine 2019', 'Overdrive Gearbox'],
        images: [pickImg(7), pickImg(0)], location: 'Chicago, IL', zipCode: '60601',
        phone: '312-555-0505', email: 'henry@vccp.com', status: 'active', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), isAuction: false,
      },
      {
        id: 'l6', sellerId: 'u2', sellerName: 'Vintage Victoria',
        make: 'Ferrari', model: '275 GTB', year: 1966, price: 2800000,
        mileage: 22000, condition: 'excellent', fuelType: 'gasoline',
        transmission: 'manual', bodyStyle: 'coupe', driveType: 'rwd',
        color: 'Rosso Corsa', interiorColor: 'Black', engine: '3.3L V12',
        horsepower: 280, vin: '08073', title: '1966 Ferrari 275 GTB - Matching Numbers',
        description: 'One of the finest examples of the iconic 275 GTB. Fully matching numbers with documented history. Ferrari Classiche certified. A true investment-grade automobile.',
        features: ['Ferrari Classiche Cert', 'Matching Numbers', 'Borrani Wire Wheels', 'Original Interior', 'Full Documentation'],
        images: [pickImg(3), pickImg(5)], location: 'San Francisco, CA', zipCode: '94101',
        phone: '415-555-0606', email: 'victoria@vccp.com', status: 'active', createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), isAuction: false,
      },
    ];
    saveListings(listings);

    const existingAuctions = getAuctions();
    if (existingAuctions.length === 0) {
      const now = Date.now();
      const auctions: AuctionListing[] = [
        {
          id: 'a1',
          carId: 'l1',
          car: listings[0],
          sellerId: 'u1',
          sellerName: 'Classic Henry',
          reservePrice: 80000,
          startingBid: 65000,
          currentBid: 72500,
          highestBidderId: 'u3',
          highestBidderName: 'Bidder Bob',
          bids: [
            { id: generateId(), bidderId: 'u3', bidderName: 'Bidder Bob', amount: 65000, timestamp: new Date(now - 3600000 * 2).toISOString() },
            { id: generateId(), bidderId: 'u3', bidderName: 'Bidder Bob', amount: 72500, timestamp: new Date(now - 3600000).toISOString() },
          ],
          status: 'live',
          startTime: new Date(now - 3600000 * 3).toISOString(),
          endTime: new Date(now + 3600000 * 5).toISOString(),
          durationHours: 8,
          createdAt: new Date(now - 86400000).toISOString(),
        },
        {
          id: 'a2',
          carId: 'l2',
          car: listings[1],
          sellerId: 'u2',
          sellerName: 'Vintage Victoria',
          reservePrice: 120000,
          startingBid: 95000,
          currentBid: 108000,
          highestBidderId: 'u3',
          highestBidderName: 'Bidder Bob',
          bids: [
            { id: generateId(), bidderId: 'u3', bidderName: 'Bidder Bob', amount: 95000, timestamp: new Date(now - 7200000).toISOString() },
            { id: generateId(), bidderId: 'u3', bidderName: 'Bidder Bob', amount: 108000, timestamp: new Date(now - 1800000).toISOString() },
          ],
          status: 'live',
          startTime: new Date(now - 7200000).toISOString(),
          endTime: new Date(now + 3600000 * 2).toISOString(),
          durationHours: 4,
          createdAt: new Date(now - 86400000 * 2).toISOString(),
        },
      ];
      saveAuctions(auctions);
    }
  }
}
