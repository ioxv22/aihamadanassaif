'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('travel_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email: string, pass: string) => {
    // Simulated DB check
    const newUser: User = { 
      id: '1', 
      name: email.split('@')[0], 
      email, 
      role: email.includes('admin') ? 'admin' : 'user' 
    };
    setUser(newUser);
    localStorage.setItem('travel_user', JSON.stringify(newUser));
  };

  const signup = async (name: string, email: string, pass: string) => {
    const newUser: User = { id: Date.now().toString(), name, email, role: 'user' };
    setUser(newUser);
    localStorage.setItem('travel_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travel_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
