'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">An unexpected error occurred!</h1>
      <p className="mb-8 text-lg">{error.message}</p>
      <button
        onClick={reset}
        className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
      >
        Reload Page
      </button>
    </div>
  );
}
