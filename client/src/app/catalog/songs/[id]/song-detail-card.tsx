import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSongById } from '@/lib/api-client';
import { cn } from '@/utils/ui/utils';

export async function SongDetailCard({ songId }: { songId: string }) {
  const response = await getSongById({ path: { songId } });

  if (!response.data?.song) {
    return <p>Error loading song details.</p>;
  }

  const song = response.data.song;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/songs" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'w-fit')}>
          Back to songs
        </Link>
        <Link href="/songs/create" className={cn(buttonVariants({ size: 'sm' }), 'w-fit')}>
          Create song
        </Link>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-1">
            <CardTitle>{song.title}</CardTitle>
            <CardDescription>{song.startingTones || 'No starting tones set'}</CardDescription>
          </div>
          <CardAction className="text-muted-foreground text-xs">
            {song.tags?.length ?? 0} tags
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 rounded-none border p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Song ID</p>
              <p className="break-all">{song.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Starting tones</p>
              <p>{song.startingTones || 'Not set'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium">Tags</h2>
            {!song.tags || song.tags.length === 0 ? (
              <p className="text-muted-foreground text-sm">No tags have been assigned to this song.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {song.tags.map((tag) => (
                  <div key={tag.id} className="border px-3 py-1 text-xs font-medium">
                    {tag.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
