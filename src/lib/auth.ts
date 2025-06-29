export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Mock user data - in a real app, this would come from a database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@travelwise.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  }
];

export const authenticateUser = (email: string, password: string): User | null => {
  // Mock authentication - in a real app, this would validate against a database
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password123') {
    return user;
  }
  return null;
};

export const registerUser = (email: string, password: string, name: string): User | null => {
  // Mock registration - in a real app, this would save to a database
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    return null; // User already exists
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role: 'user',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  };
  
  mockUsers.push(newUser);
  return newUser;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};