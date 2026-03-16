import { songModel, tagModel } from '@/db';
import { NotFoundError } from '@/utils/errors';

/**
 * Gets all songs in the database.
 * @returns All songs in the database
 */
export async function getAllSongs() {
  return await songModel.findAll();
}

/**
 * Create new song
 * @param data Data for the new song
 * @returns The created song
 */
export async function createSong(data: { title: string; startingTones?: string }) {
  return await songModel.createSong(data);
}

/**
 * Delete a song by its ID
 * @param songId
 */
export async function deleteSong(songId: string) {
  await songModel.deleteById(songId);
}

/**
 * Get a song by its ID
 * @param songId
 * @returns The song with the given ID
 */
export async function getSongById(songId: string) {
  const song = await songModel.findById(songId);

  if (!song) throw new NotFoundError('Song not found');

  return song;
}

/**
 * Add a tag to a song.
 * @param songId - The ID of the song.
 * @param tagId - The ID of the tag.
 * @returns The result of the operation.
 */
export async function addTag(songId: string, tagId: string) {
  return await tagModel.assignToSong(tagId, songId);
}

/**
 * Remove a tag from a song.
 * @param songId - The ID of the song.
 * @param tagId - The ID of the tag.
 * @returns The result of the operation.
 */
export async function removeTag(songId: string, tagId: string) {
  return await tagModel.removeFromSong(tagId, songId);
}
