import { Context } from 'hono';

import * as bookService from '@/services/bookService';
import { BadRequestError } from '@/utils/errors';

// Get all books
export const getBooks = async (c: Context) => {
  const books = await bookService.getAllBooks();

  return c.json({ books });
};

// Get a book by ID
export const getBookWithId = async (c: Context) => {
  const bookId = c.req.param('bookId');

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const book = await bookService.getBookById(bookId);

  return c.json({ book });
};

// Create a new book
export const createBook = async (c: Context) => {
  const { title } = await c.req.json();

  if (!title) throw new BadRequestError('Title is required');

  const newBook = await bookService.createBook({ title });

  return c.json({ book: newBook }, 201);
};

// Delete a book by ID
export const deleteBook = async (c: Context) => {
  const bookId = c.req.param('bookId');

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const book = await bookService.getBookById(bookId);

  if (!book) throw new BadRequestError('Book not found');

  await bookService.deleteBook(bookId);

  return c.status(204);
};

// Add a song to a book
export const addSongToBook = async (c: Context) => {
  const bookId = c.req.param('bookId');

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const { songId } = await c.req.json();

  if (!songId) throw new BadRequestError('songId is required');

  await bookService.addSongToBook(bookId, songId);

  return c.status(201);
};

// Remove a song from a book
export const removeSongFromBook = async (c: Context) => {
  const bookId = c.req.param('bookId');

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const { songId } = await c.req.json();

  if (!songId) throw new BadRequestError('songId is required');

  await bookService.removeSongFromBook(bookId, songId);

  return c.status(204);
};
