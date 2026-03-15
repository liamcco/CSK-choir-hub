import { Context } from 'hono';

import * as tagService from '@/services/tagService';
import { BadRequestError } from '@/utils/errors';

// Get all tags
export const getTags = async (c: Context) => {
  const tags = await tagService.getAllTags();

  c.json({ tags });
};

// Create a new tag
export const createTag = async (c: Context) => {
  const { name } = await c.req.json();

  if (!name) throw new BadRequestError('Tag name is required');

  const newTag = await tagService.createTag(name);

  c.status(201);
  return c.json({ tag: newTag });
};

// Delete a tag by ID
export const deleteTag = async (c: Context) => {
  const tagId = c.req.param('id');

  if (!tagId) throw new BadRequestError('Invalid tag ID');

  await tagService.deleteTag(tagId);

  return c.status(204);
};

// Rename tag with ID
export const updateTag = async (c: Context) => {
  const tagId = c.req.param('id');

  if (!tagId) throw new BadRequestError('Invalid tag ID');

  const { name } = await c.req.json();

  if (!name) throw new BadRequestError('Tag name is required');

  const updatedTag = await tagService.updateTag(tagId, name);

  return c.json({ tag: updatedTag });
};
