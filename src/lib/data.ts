export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice: number;
  category: string;
  difficulty: string;
  highlights: string[];
  description: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  included: string[];
  excluded: string[];
  requirements: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  category: string;
  amenities: string[];
  features: string[];
  description: string;
  roomTypes: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice: number;
    features: string[];
    description: string;
    maxGuests: number;
  }[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: string;
    smoking: string;
  };
}

export interface Booking {
  id: string;
  userId: string;
  type: 'hotel' | 'destination';
  itemId: string;
  itemName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

// Mock data storage
let destinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini Island Hopping',
    location: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg',
    rating: 4.9,
    reviews: 342,
    duration: '7 days',
    groupSize: '12 people',
    price: 1299,
    originalPrice: 1599,
    category: 'Beach',
    difficulty: 'Easy',
    highlights: ['Blue Dome Churches', 'Sunset Cruise', 'Wine Tasting', 'Volcanic Beaches'],
    description: 'Experience the magic of Santorini with our comprehensive island hopping tour. Discover the iconic blue-domed churches, enjoy breathtaking sunsets, and explore the unique volcanic landscape that makes this Greek island one of the world\'s most romantic destinations.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Santorini',
        description: 'Welcome to the beautiful island of Santorini',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Sunset viewing at Oia']
      },
      {
        day: 2,
        title: 'Fira and Imerovigli',
        description: 'Explore the capital and the balcony of the Aegean',
        activities: ['Fira town tour', 'Cable car ride', 'Imerovigli walk', 'Traditional lunch']
      },
      {
        day: 3,
        title: 'Wine Tasting Tour',
        description: 'Discover Santorini\'s unique wine culture',
        activities: ['Vineyard visits', 'Wine tasting sessions', 'Local cheese pairing', 'Sunset dinner']
      }
    ],
    included: ['Accommodation', 'Daily breakfast', 'Professional guide', 'Transportation', 'Wine tasting'],
    excluded: ['International flights', 'Personal expenses', 'Travel insurance', 'Lunch and dinner (except mentioned)'],
    requirements: ['Valid passport', 'Comfortable walking shoes', 'Sun protection', 'Camera']
  },
  {
    id: '2',
    name: 'Bali Cultural Adventure',
    location: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg',
    rating: 4.8,
    reviews: 528,
    duration: '10 days',
    groupSize: '16 people',
    price: 899,
    originalPrice: 1199,
    category: 'Cultural',
    difficulty: 'Moderate',
    highlights: ['Temple Tours', 'Rice Terraces', 'Traditional Cooking', 'Monkey Forest'],
    description: 'Immerse yourself in the rich culture and natural beauty of Bali. From ancient temples to emerald rice terraces, this adventure offers an authentic glimpse into Balinese life and traditions.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar',
        description: 'Welcome to the Island of Gods',
        activities: ['Airport pickup', 'Hotel check-in', 'Ubud orientation', 'Traditional welcome ceremony']
      },
      {
        day: 2,
        title: 'Ubud Cultural Tour',
        description: 'Explore the cultural heart of Bali',
        activities: ['Monkey Forest Sanctuary', 'Ubud Palace', 'Traditional market', 'Art village visits']
      }
    ],
    included: ['Accommodation', 'Daily breakfast', 'Cultural guide', 'Temple entrance fees', 'Cooking class'],
    excluded: ['International flights', 'Personal expenses', 'Travel insurance', 'Some meals'],
    requirements: ['Valid passport with 6 months validity', 'Modest clothing for temples', 'Comfortable shoes', 'Insect repellent']
  }
];

let hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Ocean Resort & Spa',
    location: 'Maldives',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
    ],
    rating: 4.9,
    reviews: 1248,
    price: 450,
    originalPrice: 620,
    category: 'Luxury Resort',
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Beach Access', 'Water Sports'],
    features: ['Overwater Villa', 'Private Beach', 'All-Inclusive'],
    description: 'Experience paradise in our luxurious overwater villas with crystal-clear lagoon views. This exclusive resort offers world-class amenities, exceptional service, and unforgettable experiences in one of the world\'s most beautiful destinations.',
    roomTypes: [
      {
        id: '1',
        name: 'Beach Villa',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        price: 350,
        originalPrice: 450,
        features: ['Ocean View', 'Private Terrace', 'King Bed', '85 sqm'],
        description: 'Spacious beachfront villa with direct beach access and stunning ocean views.',
        maxGuests: 2
      },
      {
        id: '2',
        name: 'Overwater Villa',
        image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
        price: 550,
        originalPrice: 720,
        features: ['Overwater', 'Glass Floor', 'Private Deck', '120 sqm'],
        description: 'Iconic overwater villa with glass floor panels and direct lagoon access.',
        maxGuests: 2
      }
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation until 24 hours before check-in',
      pets: 'Pets not allowed',
      smoking: 'No smoking in rooms'
    }
  }
];

let bookings: Booking[] = [];

// CRUD operations for destinations
export const getDestinations = (): Destination[] => destinations;

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};

export const addDestination = (destination: Omit<Destination, 'id'>): Destination => {
  const newDestination: Destination = {
    ...destination,
    id: Date.now().toString()
  };
  destinations.push(newDestination);
  return newDestination;
};

export const updateDestination = (id: string, updates: Partial<Destination>): Destination | null => {
  const index = destinations.findIndex(dest => dest.id === id);
  if (index === -1) return null;
  
  destinations[index] = { ...destinations[index], ...updates };
  return destinations[index];
};

export const deleteDestination = (id: string): boolean => {
  const index = destinations.findIndex(dest => dest.id === id);
  if (index === -1) return false;
  
  destinations.splice(index, 1);
  return true;
};

// CRUD operations for hotels
export const getHotels = (): Hotel[] => hotels;

export const getHotelById = (id: string): Hotel | undefined => {
  return hotels.find(hotel => hotel.id === id);
};

export const addHotel = (hotel: Omit<Hotel, 'id'>): Hotel => {
  const newHotel: Hotel = {
    ...hotel,
    id: Date.now().toString()
  };
  hotels.push(newHotel);
  return newHotel;
};

export const updateHotel = (id: string, updates: Partial<Hotel>): Hotel | null => {
  const index = hotels.findIndex(hotel => hotel.id === id);
  if (index === -1) return null;
  
  hotels[index] = { ...hotels[index], ...updates };
  return hotels[index];
};

export const deleteHotel = (id: string): boolean => {
  const index = hotels.findIndex(hotel => hotel.id === id);
  if (index === -1) return false;
  
  hotels.splice(index, 1);
  return true;
};

// Booking operations
export const getBookings = (): Booking[] => bookings;

export const getBookingsByUserId = (userId: string): Booking[] => {
  return bookings.filter(booking => booking.userId === userId);
};

export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  return newBooking;
};

export const updateBookingStatus = (id: string, status: Booking['status']): Booking | null => {
  const index = bookings.findIndex(booking => booking.id === id);
  if (index === -1) return null;
  
  bookings[index].status = status;
  return bookings[index];
};