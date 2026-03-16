import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonSongCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="mb-2 h-5 w-40" />
        <Skeleton className="h-3 w-32" />
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-3 w-40" />
      </CardContent>
    </Card>
  );
}

export function SongsListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-7 w-24" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonSongCard key={`song-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
}
