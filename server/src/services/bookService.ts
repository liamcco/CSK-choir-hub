import { bookModel } from '@/db';
import { NotFoundError } from '@/utils/errors';

export async function getAllBooks() {
  return await bookModel.findAll();
}

export async function getBookById(bookId: string) {
  const book = await bookModel.findById(bookId);

  if (!book) throw new NotFoundError('Book not found');

  return book;
}

export async function createBook(data: { title: string }) {
  return await bookModel.create(data);
}

export async function deleteBook(bookId: string) {
  await bookModel.deleteById(bookId);
}

export async function addSongToBook(bookId: string, songId: string) {
  return await bookModel.addSong(bookId, songId);
}

export async function removeSongFromBook(bookId: string, songId: string) {
  return await bookModel.removeSong(bookId, songId);
}
