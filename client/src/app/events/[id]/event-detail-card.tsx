import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getEventById } from '@/lib/api-client';

export async function EventDetailCard({ eventId }: { eventId: number }) {
  const res = await getEventById({ path: { eventId } });

  if (!res.data) {
    return <p>Error loading event details.</p>;
  }

  const event = res.data.event;

  const dateStart = new Date(event.dateStart);
  const dateEnd = new Date(event.dateEnd ?? event.dateStart);

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>{event.place}</CardDescription>
          <CardAction>{event.type}</CardAction>
        </CardHeader>
        <CardContent>
          <p>{dateStart.toLocaleDateString()}</p>
          <p>{dateEnd.toLocaleDateString()}</p>
          <p>{event.description}</p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {event.requiresAttendance && (
            <Accordion>
              <AccordionItem key={'attendees'} value={'attendees'}>
                <AccordionTrigger>
                  {'Närvarande' + ` (${event.attendees?.length || 0})`}
                </AccordionTrigger>
                <AccordionContent>
                  {event.attendees?.map((att) => (
                    <div key={att.userId} className="flex items-center justify-between">
                      <span>
                        {att.status === 'PRESENT' ? '✅ ' : '❌ '}
                        {att.firstName} {att.lastName}
                      </span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {event.requiresRegistration && (
            <Accordion>
              <AccordionItem key={'registrations'} value={'registrations'}>
                <AccordionTrigger>
                  {'Anmälda' + ` (${event.registrations?.length || 0})`}
                </AccordionTrigger>
                <AccordionContent>
                  {event.registrations?.map((reg) => (
                    <div key={reg.userId} className="flex items-center justify-between">
                      <span>
                        {reg.firstName} {reg.lastName}
                      </span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
