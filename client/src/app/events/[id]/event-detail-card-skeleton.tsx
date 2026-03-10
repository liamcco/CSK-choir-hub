import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function EventDetailCardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-3/5" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-2/5" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
