import { EventDetailCardSkeleton } from './event-detail-card-skeleton';

export default async function EventDetailPageLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-sm">
        <EventDetailCardSkeleton />
      </div>
    </div>
  );
}
