'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from '@/lib/validations/auth';

interface AuthFormProps {
  isRegister?: boolean;
}

export default function AuthForm({ isRegister = false }: AuthFormProps) {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      setIsLoading(true);
      if (isRegister) {
        await register(data as RegisterFormData);
        toast.success('Registration successful! Please login.');
      } else {
        await login(data as LoginFormData);
        toast.success('Login successful!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {isRegister ? 'Create an account' : 'Login'}
        </CardTitle>
        <CardDescription className="text-center">
          {isRegister
            ? 'Enter your email to create your account'
            : 'Enter your email to login to your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...registerField('email')}
              type="email"
              placeholder="m@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...registerField('password')}
              type="password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                {...registerField('confirmPassword')}
                type="password"
              />
              {(errors as any).confirmPassword && (
                <p className="text-sm text-red-500">
                  {(errors as any).confirmPassword.message}
                </p>
              )}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground text-center w-full">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <Link
            href={isRegister ? '/login' : '/register'}
            className="text-primary hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
