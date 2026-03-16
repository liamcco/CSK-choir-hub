import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSongs } from '@/lib/api-client';
import { cn } from '@/utils/ui/utils';

function formatTagSummary(tags?: Array<{ name: string }>) {
  if (!tags || tags.length === 0) {
    return 'No tags';
  }

  return tags.map((tag) => tag.name).join(', ');
}

export async function SongsList() {
  const response = await getSongs();

  if (response.data === undefined) {
    return <p>Could not load songs.</p>;
  }

  const songs = response.data.songs ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Songs</h1>
          <p className="text-muted-foreground text-sm">
            Browse the song catalog and open individual songs for details.
          </p>
        </div>
        <Link href="/songs/create">
          <Button className="w-fit" size="sm">
            Create song
          </Button>
        </Link>
      </div>

      {songs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No songs found</CardTitle>
            <CardDescription>Create the first song to start building the catalog.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {songs.map((song) => (
            <Link key={song.id} href={`/songs/${song.id}`}>
              <Card className="hover:bg-muted/30 transition-colors">
                <CardHeader>
                  <CardTitle>{song.title}</CardTitle>
                  <CardDescription>{song.startingTones || 'No starting tones set'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-xs">
                  <p className="break-all">{song.id}</p>
                  <p className="text-muted-foreground">{formatTagSummary(song.tags)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
