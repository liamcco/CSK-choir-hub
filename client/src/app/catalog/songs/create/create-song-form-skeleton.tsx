import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CreateSongFormSkeleton() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-28" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-52" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-28" />
      </CardContent>
    </Card>
  );
}
