'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { addHotel } from '@/lib/data';
import { toast } from 'sonner';

export default function NewHotelPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: '',
    images: [''],
    rating: 4.5,
    reviews: 0,
    price: 0,
    originalPrice: 0,
    category: '',
    amenities: [''],
    features: [''],
    description: '',
    roomTypes: [{
      id: '1',
      name: '',
      image: '',
      price: 0,
      originalPrice: 0,
      features: [''],
      description: '',
      maxGuests: 2
    }],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation until 24 hours before check-in',
      pets: 'Pets not allowed',
      smoking: 'No smoking in rooms'
    }
  });

  if (!isAuthenticated || !isAdmin) {
    router.push('/');
    return null;
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: any, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        images: formData.images.filter(img => img.trim()),
        amenities: formData.amenities.filter(a => a.trim()),
        features: formData.features.filter(f => f.trim()),
        roomTypes: formData.roomTypes.map(room => ({
          ...room,
          features: room.features.filter(f => f.trim())
        }))
      };

      addHotel(cleanedData);
      toast.success('Hotel added successfully!');
      router.push('/admin');
    } catch (error) {
      toast.error('Failed to add hotel');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link href="/admin" className="flex items-center text-blue-700 hover:text-blue-800 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Add New Hotel</h1>
            <p className="text-gray-600 mt-2">Create a new hotel listing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Hotel Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Main Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://images.pexels.com/..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Luxury Resort">Luxury Resort</SelectItem>
                        <SelectItem value="Mountain Lodge">Mountain Lodge</SelectItem>
                        <SelectItem value="City Hotel">City Hotel</SelectItem>
                        <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
                        <SelectItem value="Eco Resort">Eco Resort</SelectItem>
                        <SelectItem value="Villa Resort">Villa Resort</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price per night ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value))}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formData.amenities.map((amenity, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={amenity}
                        onChange={(e) => handleArrayChange('amenities', index, e.target.value)}
                        placeholder="Enter amenity"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('amenities', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('amenities')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Amenity
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-blue-700 hover:bg-blue-800">
                {isLoading ? 'Adding...' : 'Add Hotel'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}