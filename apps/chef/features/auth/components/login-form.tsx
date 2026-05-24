'use client';

import { type FormEvent, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '../api/mutations';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent } from '@/shared/ui/card';
import Image from 'next/image';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useLogin();

  useEffect(() => {
    if (login.isSuccess) {
      const next = searchParams.get('next') || '/';
      router.push(next);
    }
  }, [login.isSuccess, router, searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="/LogoAdmin.svg"
                alt="Mayda"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-primary">Mayda Chef</h1>
            <p className="text-sm text-muted-foreground mt-1">Connectez-vous à votre espace</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Entrez votre email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">Mot de passe</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Entrez votre mot de passe"
              />
            </div>
            {login.error && (
              <p className="text-sm text-destructive">
                {login.error instanceof Error ? login.error.message : 'Échec de la connexion'}
              </p>
            )}
            <Button type="submit" disabled={login.isPending} className="w-full bg-primary hover:bg-primary/90">
              {login.isPending ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
