export type DestinationCategory = 'semua' | 'alam' | 'agrowisata' | 'menginap';

export interface Destination {
  id: string;
  name: string;
  category: Exclude<DestinationCategory, 'semua'>;
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  openHours: string;
  ticketPrice: number;
  distanceFromGate: string;
  facilities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TourPackage {
  id: string;
  name: string;
  duration: string;
  pricePerPerson: number;
  minGuests: number;
  recommendedFor: string;
  summary: string;
  includes: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  imageAlt: string;
}

export interface VisitorReview {
  id: string;
  visitorName: string;
  city: string;
  packageName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  visitDate: string;
  verified?: boolean;
}

export interface ReviewInput {
  visitorName: string;
  city: string;
  packageName: string;
  rating: number;
  comment: string;
}

export interface BookingMessagePayload {
  packageName: string;
  visitDate: string;
  guests: number;
  customerName: string;
  notes?: string;
  totalPrice: number;
  discountPercent: number;
}
