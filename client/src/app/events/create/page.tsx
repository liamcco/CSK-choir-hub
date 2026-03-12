import { Suspense } from 'react';

import { CreateEventForm } from '@/app/events/create/create-event-form';
import { CreateEventFormSkeleton } from '@/app/events/create/create-event-form-skeleton';

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-sm">
        <Suspense fallback={<CreateEventFormSkeleton />}>
          <CreateEventForm />
        </Suspense>
      </div>
    </div>
  );
}
