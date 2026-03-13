import { type NextFunction, type Request, type Response } from 'express';

import * as tagService from '@/services/tagService';
import { BadRequestError } from '@/utils/errors';

// Get all tags
export const getTags = async (req: Request, res: Response, next: NextFunction) => {
  const tags = await tagService.getAllTags();

  res.json({ tags });
};

// Create a new tag
export const createTag = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) throw new BadRequestError('Tag name is required');

  const newTag = await tagService.createTag(name);

  return res.status(201).json({ tag: newTag });
};

// Delete a tag by ID
export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.id;

  if (!tagId) throw new BadRequestError('Invalid tag ID');

  await tagService.deleteTag(tagId);

  return res.status(204).send();
};

// Rename tag with ID
export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.id;

  if (!tagId) throw new BadRequestError('Invalid tag ID');

  const { name } = req.body;

  if (!name) throw new BadRequestError('Tag name is required');

  const updatedTag = await tagService.updateTag(tagId, name);

  return res.json({ tag: updatedTag });
};
