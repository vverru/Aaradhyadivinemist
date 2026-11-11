'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, name?: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('aaradhya_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default guest customer for seamless test experience
        const defaultCustomer: UserProfile = {
          id: 'cust-demo-1',
          email: 'devotee@aaradhyadivinemist.com',
          name: 'Priyanka Sharma',
          phone: '+91 98765 12345',
          role: 'customer',
          createdAt: new Date().toISOString(),
        };
        setUser(defaultCustomer);
        localStorage.setItem('aaradhya_user', JSON.stringify(defaultCustomer));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const login = (email: string, name = 'Valued Customer', role: 'customer' | 'admin' = 'customer') => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('aaradhya_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aaradhya_user');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('aaradhya_user', JSON.stringify(updated));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
