import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBooks } from '@/lib/api-client';
import { cn } from '@/utils/ui/utils';

function formatBookDate(value: string) {
  return new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

export async function BooksList() {
  const response = await getBooks();

  if (response.data === undefined) {
    return <p>Could not load books.</p>;
  }

  const books = response.data.books ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Books</h1>
          <p className="text-muted-foreground text-sm">
            Browse the choir&apos;s song books and open each book for its contents.
          </p>
        </div>
        <Link href="/books/create">
          <Button className="w-fit" size="sm">
            Create new book
          </Button>
        </Link>
      </div>

      {books.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No books found</CardTitle>
            <CardDescription>Create the first book to start organizing songs.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <Card className="hover:bg-muted/30 transition-colors">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>{book.id}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1 text-xs sm:grid-cols-2">
                  <p>Created {formatBookDate(book.createdAt)}</p>
                  <p>Updated {formatBookDate(book.updatedAt)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
