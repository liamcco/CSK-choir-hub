import { Suspense } from 'react';

import { BookDetailCard } from './book-detail-card';
import { BookDetailCardSkeleton } from './book-detail-card-skeleton';

export default async function BookDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const bookId = params.id;

  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-2xl">
        <Suspense fallback={<BookDetailCardSkeleton />}>
          <BookDetailCard bookId={bookId} />
        </Suspense>
      </div>
    </div>
  );
}
