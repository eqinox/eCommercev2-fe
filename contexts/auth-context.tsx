'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { LoginFormData, RegisterFormData } from '@/lib/validations/auth';
import { saveSession, getSession, clearSession } from '@/lib/session';

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  user: { access_token: string; user: User } | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ access_token: string; user: User } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // First check session storage
      const sessionUser = getSession();
      if (sessionUser) {
        setUser({ access_token: '', user: sessionUser }); // We don't store access token in session for security
        setIsLoading(false);
        return;
      }

      // If no session, try to get current user from API
      const user = await authApi.getCurrentUser();
      setUser(user);
      if (user?.user) {
        saveSession(user.user);
      }
    } catch (error) {
      setUser(null);
      clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    try {
      const user = await authApi.login(data);
      setUser(user);
      if (user?.user) {
        saveSession(user.user);
      }
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      await authApi.register(data);
      router.push('/login');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      clearSession();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
