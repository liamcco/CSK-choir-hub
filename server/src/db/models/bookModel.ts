import { prisma } from '@/db';

/**
 * Create a new song in the database.
 * @param title Title of the book
 */
export async function create(title: string) {
  return prisma.book.create({ data: { title } });
}

/**
 * Delete a book by its ID.
 * @param id Book ID
 */
export async function deleteBook(bookId: string) {
  return prisma.book.delete({ where: { id: bookId } });
}

/**
 * List books
 * @param includeSongs Whether to include associated songs in the result
 */
export async function getAllBooks() {
  return prisma.book.findMany();
}

/**
 * Find a book by its ID.
 * @param bookId Book ID
 */
export async function findById(bookId: string) {
  return prisma.book.findUnique({
    where: { id: bookId },
    include: {
      bookSongs: {
        select: {
          pageStart: true,
          pageEnd: true,
          songId: true,
          song: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Assign a book to a song.
 * @param bookId Book ID
 * @param songId Song ID
 */
export async function addSong(bookId: string, songId: string) {
  return prisma.book.update({
    where: { id: bookId },
    data: {
      bookSongs: {
        create: {
          song: { connect: { id: songId } },
        },
      },
    },
  });
}

/**
 * Remove a song from a book.
 * @param bookId Book ID
 * @param songId Song ID
 */
export async function removeSong(bookId: string, songId: string) {
  return prisma.book.update({
    where: { id: bookId },
    data: {
      bookSongs: {
        delete: {
          bookId_songId: {
            bookId,
            songId,
          },
        },
      },
    },
  });
}
