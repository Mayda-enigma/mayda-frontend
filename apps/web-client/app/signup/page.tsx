import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Signup is currently handled by restaurant staff.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Please ask a manager to create your account, or{' '}
          <Link href="/login" className="underline underline-offset-2">sign in</Link>
          {' '}if you already have one.
        </p>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/login">Go to sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
