import { Suspense } from 'react';

import { EventsList } from './events-list';
import { EventsListSkeleton } from './events-list-skeleton';

export default function EventsPage() {
  return (
    <div className="mx-auto w-full max-w-xl space-y-4 px-4 py-10">
      <h1 className="text-sm font-medium">Events</h1>
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList />
      </Suspense>
    </div>
  );
}
