import { Context } from 'hono';

import * as roleService from '@/services/roleService';
import { BadRequestError } from '@/utils/errors';

// Get all roles
export const getRoles = async (c: Context) => {
  const roles = await roleService.getAllRoles();

  return c.json({ roles });
};

// Create role
export const createRole = async (c: Context) => {
  const { name, description } = await c.req.json();

  if (!name) throw new BadRequestError('name not provided');

  const newRole = await roleService.createRole(name, description);

  return c.json({ role: newRole }, 201);
};

// Delete a role by ID
export const deleteRole = async (c: Context) => {
  const roleId = c.req.param('roleId');

  if (!roleId) throw new BadRequestError('Invalid role ID');

  await roleService.deleteRole(roleId);

  return c.status(204);
};

// Assign a user to a role
export const assignUserToRole = async (c: Context) => {
  const userId = c.req.param('userId');
  const roleId = c.req.param('roleId');

  if (!userId || !roleId) throw new BadRequestError('Invalid user ID or role ID');

  await roleService.assignUser(userId, roleId);
};

// Remove a user from a role
export const removeUserFromRole = async (c: Context) => {
  const roleId = c.req.param('roleId');

  if (!roleId) throw new BadRequestError('Invalid role ID');

  await roleService.removeUser(roleId);

  return c.status(204);
};
