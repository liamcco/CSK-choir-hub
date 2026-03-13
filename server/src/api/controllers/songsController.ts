import { type NextFunction, type Request, type Response } from 'express';

import * as songService from '@/services/songService';
import { BadRequestError } from '@/utils/errors';

// Get all songs
export const getSongs = async (req: Request, res: Response, next: NextFunction) => {
  const songs = await songService.getAllSongs();

  res.json({ songs });
};

// Create a new song
export const createSong = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  if (!title) return next(new BadRequestError('Song title is required'));

  const newSong = await songService.createSong({ title });

  return res.status(201).json(newSong);
};

// Delete a song by ID
export const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
  const songId = req.params.id;

  if (!songId) throw new BadRequestError('Invalid song ID');

  await songService.deleteSong(songId);

  return res.status(204).send();
};

// Assign a tag to a song
export const assignTagToSong = async (req: Request, res: Response, next: NextFunction) => {
  const songId = req.params.songId;
  const { tagId } = req.body;

  if (!songId || !tagId) {
    throw new BadRequestError('Invalid song ID or tag ID');
  }

  await songService.addTag(songId, tagId);

  return res.status(204).send();
};

// Remove a tag from a song
export const removeTagFromSong = async (req: Request, res: Response, next: NextFunction) => {
  const songId = req.params.songId;
  const { tagId } = req.body;

  if (!songId || !tagId) throw new BadRequestError('Invalid song ID or tag ID');

  await songService.removeTag(songId, tagId);

  return res.status(204).send();
};
