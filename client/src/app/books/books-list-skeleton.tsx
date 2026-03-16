import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonBookCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="mb-2 h-5 w-40" />
        <Skeleton className="h-3 w-52" />
      </CardHeader>
      <CardContent className="grid gap-2 text-xs sm:grid-cols-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-28" />
      </CardContent>
    </Card>
  );
}

export function BooksListSkeleton({ count = 4 }: { count?: number }) {
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
          <SkeletonBookCard key={`book-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
}
