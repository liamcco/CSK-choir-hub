import { Suspense } from 'react';

import { CreateBookForm } from './create-book-form';
import { CreateBookFormSkeleton } from './create-book-form-skeleton';

export default function CreateBookPage() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-sm">
        <Suspense fallback={<CreateBookFormSkeleton />}>
          <CreateBookForm />
        </Suspense>
      </div>
    </div>
  );
}
