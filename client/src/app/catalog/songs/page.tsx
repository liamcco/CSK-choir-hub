import { Suspense } from 'react';

import { SongsList } from './songs-list';
import { SongsListSkeleton } from './songs-list-skeleton';

export default function SongsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10">
      <Suspense fallback={<SongsListSkeleton />}>
        <SongsList />
      </Suspense>
    </div>
  );
}
