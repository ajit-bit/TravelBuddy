'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Wifi, Car, Utensils, Waves, Dumbbell, Space as Spa } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const hotels = [
  {
    id: 1,
    name: 'Grand Ocean Resort & Spa',
    location: 'Maldives',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    rating: 4.9,
    reviews: 1248,
    price: 450,
    originalPrice: 620,
    category: 'Luxury Resort',
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Beach Access', 'Water Sports'],
    features: ['Overwater Villa', 'Private Beach', 'All-Inclusive'],
    description: 'Experience paradise in our luxurious overwater villas with crystal-clear lagoon views.'
  },
  {
    id: 2,
    name: 'Alpine Mountain Lodge',
    location: 'Swiss Alps, Switzerland',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    rating: 4.7,
    reviews: 892,
    price: 280,
    originalPrice: 380,
    category: 'Mountain Lodge',
    amenities: ['Spa', 'Restaurant', 'WiFi', 'Ski Access', 'Fitness Center', 'Fireplace'],
    features: ['Mountain View', 'Ski-in/Ski-out', 'Pet Friendly'],
    description: 'Cozy mountain retreat with breathtaking Alpine views and direct ski slope access.'
  },
  {
    id: 3,
    name: 'Tokyo Downtown Luxury',
    location: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    rating: 4.8,
    reviews: 2156,
    price: 320,
    originalPrice: 420,
    category: 'City Hotel',
    amenities: ['Restaurant', 'WiFi', 'Fitness Center', 'Bar', 'Concierge', 'Business Center'],
    features: ['City View', 'Metro Access', 'Rooftop Bar'],
    description: 'Modern luxury hotel in the heart of Tokyo with stunning city skyline views.'
  },
  {
    id: 4,
    name: 'Santorini Sunset Villa',
    location: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    rating: 4.9,
    reviews: 743,
    price: 380,
    originalPrice: 480,
    category: 'Boutique Hotel',
    amenities: ['Pool', 'Restaurant', 'WiFi', 'Spa', 'Terrace', 'Bar'],
    features: ['Sunset View', 'Infinity Pool', 'Adults Only'],
    description: 'Exclusive cliffside hotel with iconic blue domes and spectacular sunset views.'
  },
  {
    id: 5,
    name: 'Bali Jungle Retreat',
    location: 'Ubud, Bali',
    image: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg',
    rating: 4.6,
    reviews: 567,
    price: 180,
    originalPrice: 250,
    category: 'Eco Resort',
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Yoga Studio', 'Garden'],
    features: ['Jungle View', 'Eco-Friendly', 'Wellness Programs'],
    description: 'Peaceful jungle sanctuary offering wellness retreats and cultural experiences.'
  },
  {
    id: 6,
    name: 'Tuscany Wine Estate',
    location: 'Tuscany, Italy',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    rating: 4.8,
    reviews: 432,
    price: 250,
    originalPrice: 350,
    category: 'Villa Resort',
    amenities: ['Pool', 'Restaurant', 'WiFi', 'Wine Cellar', 'Cooking Classes', 'Garden'],
    features: ['Vineyard View', 'Wine Tours', 'Historic Property'],
    description: 'Historic villa surrounded by vineyards offering wine tastings and culinary experiences.'
  }
];

const amenityIcons = {
  'Pool': Waves,
  'Spa': Spa,
  'Restaurant': Utensils,
  'WiFi': Wifi,
  'Fitness Center': Dumbbell,
  'Parking': Car
};

const categories = ['All', 'Luxury Resort', 'Mountain Lodge', 'City Hotel', 'Boutique Hotel', 'Eco Resort', 'Villa Resort'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 - $300', min: 150, max: 300 },
  { label: '$300 - $500', min: 300, max: 500 },
  { label: 'Over $500', min: 500, max: Infinity }
];

const amenityFilters = ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Fitness Center', 'Beach Access'];

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || hotel.category === selectedCategory;
    const matchesPrice = hotel.price >= selectedPriceRange.min && hotel.price <= selectedPriceRange.max;
    const matchesAmenities = selectedAmenities.length === 0 || 
                            selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesAmenities;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-700">TravelWise</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-500 hover:text-blue-700 transition-colors">Home</Link>
              <Link href="/destinations" className="text-gray-500 hover:text-blue-700 transition-colors">Destinations</Link>
              <Link href="/hotels" className="text-gray-900 font-medium">Hotels</Link>
              <Link href="/tours" className="text-gray-500 hover:text-blue-700 transition-colors">Tours</Link>
              <Button className="bg-blue-700 hover:bg-blue-800">Sign In</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover amazing hotels, resorts, and unique accommodations worldwide
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search hotels or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Hotel Type</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="text-blue-700"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange.label === range.label}
                          onChange={() => setSelectedPriceRange(range)}
                          className="text-blue-700"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                  <div className="space-y-2">
                    {amenityFilters.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {sortedHotels.length} hotels found
                </h2>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div className="space-y-6">
                {sortedHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row">
                      <div className="relative w-full lg:w-80 h-64 lg:h-auto">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-orange-500 hover:bg-orange-600">
                            {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">{hotel.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                            <p className="text-gray-600 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {hotel.location}
                            </p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {hotel.category}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{hotel.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {hotel.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {hotel.amenities.slice(0, 6).map((amenity) => {
                              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
                              return (
                                <div key={amenity} className="flex items-center text-xs text-gray-600">
                                  {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                                  {amenity}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">${hotel.price}</span>
                              <span className="text-lg text-gray-500 line-through">${hotel.originalPrice}</span>
                              <span className="text-sm text-gray-500">per night</span>
                            </div>
                            <p className="text-sm text-gray-500">{hotel.reviews} reviews</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">View Details</Button>
                            <Button className="bg-blue-700 hover:bg-blue-800">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}