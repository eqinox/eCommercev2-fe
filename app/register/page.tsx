import AuthForm from '@/components/auth-form';

export default function RegisterPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
      <AuthForm isRegister />
    </div>
  );
} 