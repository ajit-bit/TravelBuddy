'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { getBookingsByUserId, updateBookingStatus } from '@/lib/data';
import { toast } from 'sonner';

export default function BookingsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      const userBookings = getBookingsByUserId(user.id);
      setBookings(userBookings);
    }
  }, [user, isAuthenticated, router]);

  const handleCancelBooking = (bookingId: string) => {
    const updatedBooking = updateBookingStatus(bookingId, 'cancelled');
    if (updatedBooking) {
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ));
      toast.success('Booking cancelled successfully');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-2">Manage your travel bookings and reservations</p>
          </div>

          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">Start exploring and book your next adventure!</p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => router.push('/destinations')}>
                    Browse Destinations
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/hotels')}>
                    Find Hotels
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{booking.itemName}</CardTitle>
                        <p className="text-gray-600 mt-1">
                          Booking ID: {booking.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-3" />
                          <div>
                            <p className="font-medium">
                              {booking.type === 'hotel' ? 'Check-in' : 'Tour Date'}
                            </p>
                            <p className="text-sm">
                              {new Date(booking.checkIn).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        {booking.type === 'hotel' && (
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-3" />
                            <div>
                              <p className="font-medium">Check-out</p>
                              <p className="text-sm">
                                {new Date(booking.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 mr-3" />
                          <div>
                            <p className="font-medium">
                              {booking.type === 'hotel' ? 'Guests' : 'Travelers'}
                            </p>
                            <p className="text-sm">{booking.guests} people</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Booking Details</h4>
                        <p className="text-sm text-gray-600">
                          Type: {booking.type === 'hotel' ? 'Hotel Reservation' : 'Tour Package'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          Total: ${booking.totalPrice}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {booking.status === 'confirmed' && (
                          <>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel Booking
                            </Button>
                          </>
                        )}
                        {booking.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            Contact Support
                          </Button>
                        )}
                        {booking.status === 'cancelled' && (
                          <Badge variant="secondary" className="w-fit">
                            Cancelled
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}