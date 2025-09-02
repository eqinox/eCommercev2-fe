'use client';

import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginFormData, RegisterFormData } from '@/lib/validations/auth';
import { authApi } from '@/lib/api';

interface AuthContextType {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    accessToken?: string;
  } | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const login = async (data: LoginFormData) => {
    try {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/');
      router.refresh();
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
      await signOut({ redirect: false });
      router.push('/login');
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        login,
        register,
        logout,
        isLoading: status === 'loading',
      }}
    >
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
