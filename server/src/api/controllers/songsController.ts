import { Context } from 'hono';

import * as songService from '@/services/songService';
import { BadRequestError } from '@/utils/errors';

// Get all songs
export const getSongs = async (c: Context) => {
  const songs = await songService.getAllSongs();

  return c.json({ songs });
};

// Get a song by ID
export const getSongById = async (c: Context) => {
  const songId = c.req.param('songId');

  if (!songId) throw new BadRequestError('Invalid song ID');

  const song = await songService.getSongById(songId);

  return c.json({ song });
};

// Create a new song
export const createSong = async (c: Context) => {
  const { title, startingTones } = await c.req.json();

  if (!title) throw new BadRequestError('Song title is required');

  const newSong = await songService.createSong({ title, startingTones });

  return c.json(newSong, 201);
};

// Delete a song by ID
export const deleteSong = async (c: Context) => {
  const songId = c.req.param('songId');

  if (!songId) throw new BadRequestError('Invalid song ID');

  await songService.deleteSong(songId);

  return c.status(204);
};

// Assign a tag to a song
export const assignTagToSong = async (c: Context) => {
  const songId = c.req.param('songId');
  const { tagId } = await c.req.json();

  if (!songId || !tagId) {
    throw new BadRequestError('Invalid song ID or tag ID');
  }

  await songService.addTag(songId, tagId);

  return c.status(204);
};

// Remove a tag from a song
export const removeTagFromSong = async (c: Context) => {
  const songId = c.req.param('songId');
  const { tagId } = await c.req.json();

  if (!songId || !tagId) throw new BadRequestError('Invalid song ID or tag ID');

  await songService.removeTag(songId, tagId);

  return c.status(204);
};
