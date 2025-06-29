'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Users, MapPin, Building, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { getDestinations, getHotels, getBookings, deleteDestination, deleteHotel } from '@/lib/data';
import { toast } from 'sonner';

export default function AdminPage() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
      return;
    }

    setDestinations(getDestinations());
    setHotels(getHotels());
    setBookings(getBookings());
  }, [isAuthenticated, isAdmin, router]);

  const handleDeleteDestination = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      if (deleteDestination(id)) {
        setDestinations(prev => prev.filter(dest => dest.id !== id));
        toast.success('Destination deleted successfully');
      }
    }
  };

  const handleDeleteHotel = (id: string) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      if (deleteHotel(id)) {
        setHotels(prev => prev.filter(hotel => hotel.id !== id));
        toast.success('Hotel deleted successfully');
      }
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const stats = [
    {
      title: 'Total Destinations',
      value: destinations.length,
      icon: MapPin,
      color: 'text-blue-600'
    },
    {
      title: 'Total Hotels',
      value: hotels.length,
      icon: Building,
      color: 'text-green-600'
    },
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Active Users',
      value: 2, // Mock data
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage destinations, hotels, and bookings</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Management Tabs */}
          <Tabs defaultValue="destinations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            {/* Destinations Tab */}
            <TabsContent value="destinations">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Manage Destinations</CardTitle>
                    <Button onClick={() => router.push('/admin/destinations/new')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Destination
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {destinations.map((destination) => (
                      <div key={destination.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                            <p className="text-gray-600">{destination.location}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{destination.category}</Badge>
                              <span className="text-sm text-gray-500">
                                ${destination.price} • {destination.reviews} reviews
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/destinations/${destination.id}/edit`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteDestination(destination.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hotels Tab */}
            <TabsContent value="hotels">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Manage Hotels</CardTitle>
                    <Button onClick={() => router.push('/admin/hotels/new')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Hotel
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hotels.map((hotel) => (
                      <div key={hotel.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
                            <p className="text-gray-600">{hotel.location}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{hotel.category}</Badge>
                              <span className="text-sm text-gray-500">
                                ${hotel.price}/night • {hotel.reviews} reviews
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/hotels/${hotel.id}/edit`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteHotel(hotel.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.itemName}</h3>
                          <p className="text-gray-600">
                            Booking ID: {booking.id} • User ID: {booking.userId}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              className={
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {booking.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              ${booking.totalPrice} • {booking.guests} guests
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.type === 'hotel' ? 'Hotel' : 'Tour'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}