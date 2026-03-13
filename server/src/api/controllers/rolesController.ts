import { type NextFunction, type Request, type Response } from 'express';

import * as roleService from '@/services/roleService';
import { BadRequestError } from '@/utils/errors';

// Get all roles
export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  const roles = await roleService.getAllRoles();

  res.json({ roles });
};

// Create role
export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;

  if (!name) throw new BadRequestError('name not provided');

  const newRole = await roleService.createRole(name, description);

  return res.status(201).json({ role: newRole });
};

// Delete a role by ID
export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  const roleId = req.params.id;

  if (!roleId) throw new BadRequestError('Invalid role ID');

  await roleService.deleteRole(roleId);

  return res.status(204).send();
};

// Assign a user to a role
export const assignUserToRole = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const roleId = req.params.roleId;

  if (!userId || !roleId) throw new BadRequestError('Invalid user ID or role ID');

  await roleService.assignUser(userId, roleId);

  return res.status(204).send();
};

// Remove a user from a role
export const removeUserFromRole = async (req: Request, res: Response, next: NextFunction) => {
  const roleId = req.params.roleId;

  if (!roleId) throw new BadRequestError('Invalid role ID');

  await roleService.removeUser(roleId);

  return res.status(204).send();
};
