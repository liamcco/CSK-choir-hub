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
import { getBookById } from '@/lib/api-client';
import { cn } from '@/utils/ui/utils';

function formatBookDateTime(value: string) {
  return new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatPageRange(pageStart?: number, pageEnd?: number) {
  if (pageStart === undefined && pageEnd === undefined) {
    return 'No page range';
  }

  if (pageStart !== undefined && pageEnd !== undefined) {
    return `Pages ${pageStart}-${pageEnd}`;
  }

  if (pageStart !== undefined) {
    return `From page ${pageStart}`;
  }

  return `To page ${pageEnd}`;
}

export async function BookDetailCard({ bookId }: { bookId: string }) {
  const response = await getBookById({ path: { bookId } });

  if (!response.data?.book) {
    return <p>Error loading book details.</p>;
  }

  const book = response.data.book;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link href="catalog/books">
          <Button className="w-fit" size="sm" variant="ghost">
            Back to books
          </Button>
        </Link>
        <Link href="catalog/books/create">
          <Button className="w-fit" size="sm">
            Create book
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-1">
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.bookSongs.length} songs in this book</CardDescription>
          </div>
          <CardAction className="text-muted-foreground text-xs">
            Updated {formatBookDateTime(book.updatedAt)}
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 rounded-none border p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Book ID</p>
              <p className="break-all">{book.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Created</p>
              <p>{formatBookDateTime(book.createdAt)}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium">Contents</h2>
            {book.bookSongs.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No songs have been added to this book yet.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {book.bookSongs.map((bookSong, index) => (
                  <div
                    key={`${bookSong.songId}-${index}`}
                    className="flex flex-col gap-2 border p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-xs uppercase tracking-wide">
                        Song ID
                      </p>
                      <p className="break-all font-medium">{bookSong.songId}</p>
                    </div>
                    <p className="text-muted-foreground">
                      {formatPageRange(bookSong.pageStart, bookSong.pageEnd)}
                    </p>
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
