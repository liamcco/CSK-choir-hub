import { Suspense } from 'react';

import { EventDetailCard } from './event-detail-card';
import { EventDetailCardSkeleton } from './event-detail-card-skeleton';

export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const eventId = Number.parseInt(params.id, 10);

  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-sm">
        <Suspense fallback={<EventDetailCardSkeleton />}>
          <EventDetailCard eventId={eventId} />
        </Suspense>
      </div>
    </div>
  );
}
