'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const destinations = [
  {
    id: 1,
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
    highlights: ['Blue Dome Churches', 'Sunset Cruise', 'Wine Tasting', 'Volcanic Beaches']
  },
  {
    id: 2,
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
    highlights: ['Temple Tours', 'Rice Terraces', 'Traditional Cooking', 'Monkey Forest']
  },
  {
    id: 3,
    name: 'Swiss Alps Hiking',
    location: 'Swiss Alps, Switzerland',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 4.7,
    reviews: 189,
    duration: '8 days',
    groupSize: '10 people',
    price: 1899,
    originalPrice: 2299,
    category: 'Adventure',
    difficulty: 'Challenging',
    highlights: ['Matterhorn Views', 'Cable Car Rides', 'Alpine Lakes', 'Mountain Huts']
  },
  {
    id: 4,
    name: 'Tokyo Urban Explorer',
    location: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg',
    rating: 4.9,
    reviews: 756,
    duration: '6 days',
    groupSize: '20 people',
    price: 1599,
    originalPrice: 1899,
    category: 'Urban',
    difficulty: 'Easy',
    highlights: ['Shibuya Crossing', 'Sushi Making', 'Cherry Blossoms', 'Temples']
  },
  {
    id: 5,
    name: 'Tuscany Wine & Food',
    location: 'Tuscany, Italy',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    rating: 4.8,
    reviews: 423,
    duration: '9 days',
    groupSize: '14 people',
    price: 1799,
    originalPrice: 2199,
    category: 'Culinary',
    difficulty: 'Easy',
    highlights: ['Vineyard Tours', 'Cooking Classes', 'Historic Towns', 'Art Museums']
  },
  {
    id: 6,
    name: 'Maldives Paradise',
    location: 'Maldives',
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    rating: 4.9,
    reviews: 234,
    duration: '5 days',
    groupSize: '8 people',
    price: 2599,
    originalPrice: 3199,
    category: 'Luxury',
    difficulty: 'Easy',
    highlights: ['Overwater Villas', 'Snorkeling', 'Spa Treatments', 'Private Beaches']
  }
];

const categories = ['All', 'Beach', 'Cultural', 'Adventure', 'Urban', 'Culinary', 'Luxury'];
const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || destination.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-700">TravelWise</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-500 hover:text-blue-700 transition-colors">Home</Link>
              <Link href="/destinations" className="text-gray-900 font-medium">Destinations</Link>
              <Link href="/hotels" className="text-gray-500 hover:text-blue-700 transition-colors">Hotels</Link>
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
            <h1 className="text-5xl font-bold mb-4">Explore Destinations</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover amazing places around the world with our curated travel experiences
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search destinations, locations, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === 'All' ? 'All Difficulties' : difficulty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredDestinations.length} destinations found
              </h2>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Duration</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-80 h-64 md:h-auto">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500 hover:bg-orange-600">
                          {Math.round(((destination.originalPrice - destination.price) / destination.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {destination.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {destination.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {destination.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {destination.groupSize}
                        </div>
                        <span className="text-orange-600 font-medium">{destination.difficulty}</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-900 mb-2">Tour Highlights:</p>
                        <div className="flex flex-wrap gap-1">
                          {destination.highlights.slice(0, 3).map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                          {destination.highlights.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{destination.highlights.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">${destination.price}</span>
                            <span className="text-lg text-gray-500 line-through">${destination.originalPrice}</span>
                          </div>
                          <p className="text-sm text-gray-500">{destination.reviews} reviews</p>
                        </div>
                        <Button className="bg-blue-700 hover:bg-blue-800 group">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}