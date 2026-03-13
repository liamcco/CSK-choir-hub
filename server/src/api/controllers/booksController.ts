import { type NextFunction, type Request, type Response } from 'express';

import * as bookService from '@/services/bookService';
import { BadRequestError } from '@/utils/errors';

// Get all books
export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getAllBooks();

    return res.json({ books });
  } catch (error) {
    return next(error);
  }
};

// Get a book by ID
export const getBookWithId = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const book = await bookService.getBookById(bookId);

  return res.json({ book });
};

// Create a new book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  if (!title) throw new BadRequestError('Title is required');

  const newBook = await bookService.createBook({ title });

  return res.status(201).json({ book: newBook });
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const book = await bookService.getBookById(bookId);

  if (!book) throw new BadRequestError('Book not found');

  await bookService.deleteBook(bookId);

  return res.status(204).send();
};

// Add a song to a book
export const addSongToBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const { songId } = req.body;

  if (!songId) throw new BadRequestError('songId is required');

  await bookService.addSongToBook(bookId, songId);

  return res.status(201).send();
};

// Remove a song from a book
export const removeSongFromBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  if (!bookId) throw new BadRequestError('Invalid book ID');

  const { songId } = req.body;

  if (!songId) throw new BadRequestError('songId is required');

  await bookService.removeSongFromBook(bookId, songId);

  return res.status(204).send();
};
