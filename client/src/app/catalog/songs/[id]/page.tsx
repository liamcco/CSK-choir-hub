import { Suspense } from 'react';

import { SongDetailCard } from './song-detail-card';
import { SongDetailCardSkeleton } from './song-detail-card-skeleton';

export default async function SongDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const songId = params.id;

  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-2xl">
        <Suspense fallback={<SongDetailCardSkeleton />}>
          <SongDetailCard songId={songId} />
        </Suspense>
      </div>
    </div>
  );
}
