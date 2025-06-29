'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, Space as Spa, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const hotelData = {
  id: 1,
  name: 'Grand Ocean Resort & Spa',
  location: 'Maldives',
  rating: 4.9,
  reviews: 1248,
  price: 450,
  originalPrice: 620,
  category: 'Luxury Resort',
  description: 'Experience paradise in our luxurious overwater villas with crystal-clear lagoon views. This exclusive resort offers world-class amenities, exceptional service, and unforgettable experiences in one of the world\'s most beautiful destinations.',
  images: [
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
  ],
  amenities: [
    { name: 'Private Beach', icon: Waves },
    { name: 'Overwater Spa', icon: Spa },
    { name: 'Fine Dining', icon: Utensils },
    { name: 'Free WiFi', icon: Wifi },
    { name: 'Fitness Center', icon: Dumbbell },
    { name: 'Airport Shuttle', icon: Car }
  ],
  roomTypes: [
    {
      id: 1,
      name: 'Beach Villa',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      price: 350,
      originalPrice: 450,
      features: ['Ocean View', 'Private Terrace', 'King Bed', '85 sqm'],
      description: 'Spacious beachfront villa with direct beach access and stunning ocean views.',
      maxGuests: 2
    },
    {
      id: 2,
      name: 'Overwater Villa',
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      price: 550,
      originalPrice: 720,
      features: ['Overwater', 'Glass Floor', 'Private Deck', '120 sqm'],
      description: 'Iconic overwater villa with glass floor panels and direct lagoon access.',
      maxGuests: 2
    },
    {
      id: 3,
      name: 'Presidential Suite',
      image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
      price: 850,
      originalPrice: 1100,
      features: ['Panoramic View', 'Private Pool', 'Butler Service', '200 sqm'],
      description: 'Luxurious suite with private infinity pool and dedicated butler service.',
      maxGuests: 4
    }
  ],
  reviews: [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Absolutely incredible experience! The overwater villa was a dream come true. The staff went above and beyond to make our honeymoon special.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      date: '2024-01-10',
      comment: 'Perfect resort for a luxury getaway. The spa treatments were amazing and the food was exceptional. Will definitely return!'
    },
    {
      id: 3,
      name: 'Emma Williams',
      rating: 4,
      date: '2024-01-05',
      comment: 'Beautiful location and great facilities. The snorkeling was incredible. Only minor issue was the WiFi speed in some areas.'
    }
  ]
};

export default function HotelDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(hotelData.roomTypes[0]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelData.images.length) % hotelData.images.length);
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
              <Link href="/hotels" className="text-gray-500 hover:text-blue-700 transition-colors">Hotels</Link>
              <Link href="/tours" className="text-gray-500 hover:text-blue-700 transition-colors">Tours</Link>
              <Button className="bg-blue-700 hover:bg-blue-800">Sign In</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/hotels" className="flex items-center text-blue-700 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hotels
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={hotelData.images[currentImageIndex]}
              alt={hotelData.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {hotelData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hotel Info */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotelData.name}</h1>
                    <p className="text-gray-600 flex items-center text-lg">
                      <MapPin className="w-5 h-5 mr-2" />
                      {hotelData.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold ml-1">{hotelData.rating}</span>
                      <span className="text-gray-500 ml-1">({hotelData.reviews} reviews)</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {hotelData.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{hotelData.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotelData.amenities.map((amenity) => (
                    <div key={amenity.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <amenity.icon className="w-5 h-5 text-blue-700" />
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Types</h2>
                <div className="space-y-4">
                  {hotelData.roomTypes.map((room) => (
                    <Card
                      key={room.id}
                      className={`overflow-hidden cursor-pointer transition-all duration-200 ${
                        selectedRoom.id === room.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div className="flex">
                        <div className="relative w-48 h-32">
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{room.name}</h3>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">${room.price}</span>
                                <span className="text-gray-500 line-through">${room.originalPrice}</span>
                              </div>
                              <span className="text-sm text-gray-500">per night</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {room.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
                <div className="space-y-4">
                  {hotelData.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">${selectedRoom.price}</span>
                      <span className="text-lg text-gray-500 line-through">${selectedRoom.originalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500">per night</p>
                    <Badge className="bg-orange-500 hover:bg-orange-600 mt-2">
                      {Math.round(((selectedRoom.originalPrice - selectedRoom.price) / selectedRoom.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="number"
                          min="1"
                          max={selectedRoom.maxGuests}
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Room rate (per night)</span>
                      <span>${selectedRoom.price}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Taxes & fees</span>
                      <span>${Math.round(selectedRoom.price * 0.15)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${selectedRoom.price + Math.round(selectedRoom.price * 0.15)}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-lg py-3">
                    Book Now
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Free cancellation until 24 hours before check-in
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}