'use client';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Something went wrong!</h1>
      <p className="mb-8 text-lg">{error.message}</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
