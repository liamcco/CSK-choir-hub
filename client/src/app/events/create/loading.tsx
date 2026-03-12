import { CreateEventFormSkeleton } from './create-event-form-skeleton';

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-sm">
        <CreateEventFormSkeleton />
      </div>
    </div>
  );
}
