import { CreateEventForm } from '@/app/events/create/create-event-form';

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-sm">
        <CreateEventForm />
      </div>
    </div>
  );
}
