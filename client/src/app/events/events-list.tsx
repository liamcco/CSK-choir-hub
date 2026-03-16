import { cookies } from 'next/headers';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getEvents } from '@/lib/api-client';
import type { Auth } from '@/lib/api-client/client';
import { formatEventDateRange } from '@/utils/date-utils';

export async function EventsList() {
  const response = await getEvents({
    auth: async (auth: Auth) => {
      return (await cookies()).get('better-auth-session-token')?.value;
    },
  });

  if (response.data === undefined) {
    return <p>Could not load events.</p>;
  }

  const events = response.data.events;

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.place}</CardDescription>
            </CardHeader>
            <CardContent className="text-xs">
              <p>{formatEventDateRange(event.dateStart, event.dateEnd)}</p>
              <p>{event.type}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
