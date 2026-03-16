import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSongById, getTags } from '@/lib/api-client';
import { cn } from '@/utils/ui/utils';

import { AddSongTagForm } from './add-song-tag-form';

export async function SongDetailCard({ songId }: { songId: string }) {
  const [songResponse, tagsResponse] = await Promise.all([
    getSongById({ path: { songId } }),
    getTags(),
  ]);

  if (!songResponse.data?.song) {
    return <p>Error loading song details.</p>;
  }

  const song = songResponse.data.song;
  const allTags = tagsResponse.data?.tags ?? [];
  const assignedTagIds = new Set((song.tags ?? []).map((tag) => tag.id));
  const availableTags = allTags.filter((tag) => !assignedTagIds.has(tag.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/catalog/songs">
          <Button className="w-fit" size="sm" variant="ghost">
            Back to songs
          </Button>
        </Link>
        <Link href="/catalog/songs/create">
          <Button className="w-fit" size="sm">
            Create song
          </Button>
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
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Starting tones
              </p>
              <p>{song.startingTones || 'Not set'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium">Tags</h2>
            {!song.tags || song.tags.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No tags have been assigned to this song.
              </p>
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

          <div className="space-y-3">
            <h2 className="text-sm font-medium">Add tag</h2>
            {tagsResponse.data === undefined ? (
              <p className="text-muted-foreground text-sm">Could not load available tags.</p>
            ) : (
              <AddSongTagForm songId={song.id} availableTags={availableTags} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
