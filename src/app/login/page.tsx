'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { authenticateUser } from '@/lib/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = authenticateUser(email, password);
      if (user) {
        // Check if admin login is required but user is not admin
        if (isAdminLogin && user.role !== 'admin') {
          setError('Admin access required. Please use admin credentials.');
          setIsLoading(false);
          return;
        }
        
        login(user);
        toast.success('Welcome back!');
        
        // Redirect based on user role and login type
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLogin(true);
    setEmail('admin@travelwise.com');
    setPassword('');
    setError('');
  };

  const handleUserLogin = () => {
    setIsAdminLogin(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-blue-700">
              TravelBuddy
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isAdminLogin ? 'Admin Login' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isAdminLogin 
                ? 'Sign in to access the admin panel' 
                : 'Sign in to your account to continue your journey'
              }
            </p>
          </div>

          {/* Login Type Toggle */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={!isAdminLogin ? "default" : "outline"}
              onClick={handleUserLogin}
              className="flex-1"
            >
              User Login
            </Button>
            <Button
              type="button"
              variant={isAdminLogin ? "default" : "outline"}
              onClick={handleAdminLogin}
              className="flex-1"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Login
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isAdminLogin ? 'Admin Sign In' : 'Sign In'}</CardTitle>
              <CardDescription>
                {isAdminLogin 
                  ? 'Enter your admin credentials to access the dashboard'
                  : 'Enter your credentials to access your account'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className={`w-full ${isAdminLogin ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800'}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : (isAdminLogin ? 'Admin Sign In' : 'Sign in')}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p><strong>Admin:</strong> admin@travelwise.com / password123</p>
                  <p><strong>User:</strong> user@example.com / password123</p>
                </div>
              </div>

              {!isAdminLogin && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don t have an account?{' '}
                    <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                      Sign up
                    </Link>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <Image
          src="https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg"
          alt="Travel destination"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h3 className="text-4xl font-bold mb-4">
              {isAdminLogin ? 'Admin Dashboard' : 'Start Your Journey'}
            </h3>
            <p className="text-xl opacity-90">
              {isAdminLogin 
                ? 'Manage destinations, hotels, and bookings with ease'
                : 'Discover amazing destinations and create unforgettable memories'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}