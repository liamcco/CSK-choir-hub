'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">An unexpected error occurred!</h1>
      <p className="mb-8 text-lg">{error.message}</p>
      <Button onClick={reset}>Reload Page</Button>
    </div>
  );
}
