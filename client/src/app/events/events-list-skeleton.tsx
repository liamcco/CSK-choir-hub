import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonEventCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="mb-2 h-4 w-40" />
        <Skeleton className="h-3 w-28" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-xs">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-24" />
      </CardContent>
    </Card>
  );
}

export function EventsListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonEventCard key={`event-skeleton-${index}`} />
      ))}
    </div>
  );
}
