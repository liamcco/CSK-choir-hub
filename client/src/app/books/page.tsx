import { Suspense } from 'react';

import { BooksList } from './books-list';
import { BooksListSkeleton } from './books-list-skeleton';

export default function BooksPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10">
      <Suspense fallback={<BooksListSkeleton />}>
        <BooksList />
      </Suspense>
    </div>
  );
}
