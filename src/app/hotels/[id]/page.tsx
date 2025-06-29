'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, Space as Spa, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { getHotelById, addBooking } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [isBooking, setIsBooking] = useState(false);

  const hotel = getHotelById(params.id as string);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <Link href="/hotels">
            <Button>Back to Hotels</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedRoom && hotel.roomTypes.length > 0) {
    setSelectedRoom(hotel.roomTypes[0]);
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to book this hotel');
      router.push('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (!selectedRoom) {
      toast.error('Please select a room type');
      return;
    }

    setIsBooking(true);

    try {
      const booking = addBooking({
        userId: user!.id,
        type: 'hotel',
        itemId: hotel.id,
        itemName: `${hotel.name} - ${selectedRoom.name}`,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        totalPrice: selectedRoom.price + Math.round(selectedRoom.price * 0.15),
        status: 'confirmed'
      });

      toast.success('Hotel booked successfully!');
      router.push('/bookings');
    } catch (error) {
      toast.error('Failed to book hotel. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

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
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
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
              {hotel.images.map((_, index) => (
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                    <p className="text-gray-600 flex items-center text-lg">
                      <MapPin className="w-5 h-5 mr-2" />
                      {hotel.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold ml-1">{hotel.rating}</span>
                      <span className="text-gray-500 ml-1">({hotel.reviews} reviews)</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {hotel.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{hotel.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Wifi className="w-5 h-5 text-blue-700" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Types</h2>
                <div className="space-y-4">
                  {hotel.roomTypes.map((room) => (
                    <Card
                      key={room.id}
                      className={`overflow-hidden cursor-pointer transition-all duration-200 ${
                        selectedRoom?.id === room.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
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

              {/* Hotel Policies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Policies</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Check-in</h4>
                        <p className="text-gray-600">{hotel.policies.checkIn}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Check-out</h4>
                        <p className="text-gray-600">{hotel.policies.checkOut}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Cancellation</h4>
                        <p className="text-gray-600">{hotel.policies.cancellation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Pets</h4>
                        <p className="text-gray-600">{hotel.policies.pets}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  {selectedRoom && (
                    <>
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-2">{selectedRoom.name}</h3>
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
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Check-in</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="pl-10"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Check-out</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="pl-10"
                              min={checkIn || new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Guests</Label>
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

                      <Button 
                        className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-lg py-3"
                        onClick={handleBooking}
                        disabled={isBooking}
                      >
                        {isBooking ? 'Booking...' : 'Book Now'}
                      </Button>

                      <p className="text-xs text-gray-500 text-center mt-3">
                        Free cancellation until 24 hours before check-in
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}