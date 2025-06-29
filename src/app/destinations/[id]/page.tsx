'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Clock, Users, Calendar, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { getDestinationById, addBooking } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [isBooking, setIsBooking] = useState(false);

  const destination = getDestinationById(params.id as string);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <Link href="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = [destination.image, ...Array(4).fill(destination.image)];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to book this tour');
      router.push('/login');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a tour date');
      return;
    }

    setIsBooking(true);

    try {
      const booking = addBooking({
        userId: user!.id,
        type: 'destination',
        itemId: destination.id,
        itemName: destination.name,
        checkIn: selectedDate,
        checkOut: selectedDate,
        guests: parseInt(guests),
        totalPrice: destination.price * parseInt(guests),
        status: 'confirmed'
      });

      toast.success('Tour booked successfully!');
      router.push('/bookings');
    } catch (error) {
      toast.error('Failed to book tour. Please try again.');
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
          <Link href="/destinations" className="flex items-center text-blue-700 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Destinations
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={images[currentImageIndex]}
              alt={destination.name}
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
              {images.map((_, index) => (
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
              {/* Tour Info */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{destination.name}</h1>
                    <p className="text-gray-600 flex items-center text-lg">
                      <MapPin className="w-5 h-5 mr-2" />
                      {destination.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold ml-1">{destination.rating}</span>
                      <span className="text-gray-500 ml-1">({destination.reviews} reviews)</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {destination.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{destination.groupSize}</span>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    {destination.difficulty}
                  </Badge>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">{destination.description}</p>
              </div>

              {/* Tour Highlights */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Highlights</h2>
                <div className="grid grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Information Tabs */}
              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="included">Included</TabsTrigger>
                  <TabsTrigger value="excluded">Excluded</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="itinerary" className="space-y-4">
                  {destination.itinerary.map((day) => (
                    <Card key={day.day}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{day.title}</h3>
                            <p className="text-gray-600 mb-3">{day.description}</p>
                            <div className="space-y-1">
                              {day.activities.map((activity, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                  {activity}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="included">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {destination.included.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="excluded">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {destination.excluded.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="requirements">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {destination.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                            <span>{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">${destination.price}</span>
                      <span className="text-lg text-gray-500 line-through">${destination.originalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500">per person</p>
                    <Badge className="bg-orange-500 hover:bg-orange-600 mt-2">
                      {Math.round(((destination.originalPrice - destination.price) / destination.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Tour Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="pl-10"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="number"
                          min="1"
                          max="20"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Price per person</span>
                      <span>${destination.price}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Number of travelers</span>
                      <span>{guests}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Service fee</span>
                      <span>${Math.round(destination.price * parseInt(guests) * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${destination.price * parseInt(guests) + Math.round(destination.price * parseInt(guests) * 0.1)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-lg py-3"
                    onClick={handleBooking}
                    disabled={isBooking}
                  >
                    {isBooking ? 'Booking...' : 'Book This Tour'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Free cancellation until 48 hours before tour date
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