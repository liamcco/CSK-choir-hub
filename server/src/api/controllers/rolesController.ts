import { Context } from 'hono';

import * as roleService from '@/services/roleService';
import { BadRequestError } from '@/utils/errors';

import { getTrimmedString, parseOptionalDateTime, requireTrimmedString } from './rbacUtils';

export const getRoles = async (c: Context) => {
  const roles = await roleService.getAllRoles();

  return c.json({ roles });
};

export const createRole = async (c: Context) => {
  const body = await c.req.json();
  const key = requireTrimmedString(body.key, 'Role key is required');
  const name = requireTrimmedString(body.name, 'Role name is required');
  const description = getTrimmedString(body.description);

  const role = await roleService.createRole({ key, name, description });

  return c.json({ role }, 201);
};

export const updateRole = async (c: Context) => {
  const roleId = c.req.param('roleId');

  if (!roleId) throw new BadRequestError('Invalid role ID');

  const body = await c.req.json();
  const key = getTrimmedString(body.key);
  const name = getTrimmedString(body.name);
  const description = body.description === null ? undefined : getTrimmedString(body.description);

  if (!key && !name && description === undefined) {
    throw new BadRequestError('At least one field must be provided');
  }

  const role = await roleService.updateRole(roleId, { key, name, description });

  return c.json({ role });
};

export const deleteRole = async (c: Context) => {
  const roleId = c.req.param('roleId');

  if (!roleId) throw new BadRequestError('Invalid role ID');

  await roleService.deleteRole(roleId);

  return c.status(204);
};

export const assignUserToRole = async (c: Context) => {
  const roleId = c.req.param('roleId');

  if (!roleId) throw new BadRequestError('Invalid role ID');

  const body = await c.req.json();
  const userId = requireTrimmedString(body.userId, 'userId is required');
  const expiresAt = parseOptionalDateTime(body.expiresAt, 'expiresAt');

  await roleService.assignUser(userId, roleId, expiresAt);

  return c.status(204);
};

export const removeUserFromRole = async (c: Context) => {
  const roleId = c.req.param('roleId');
  const userId = c.req.param('userId');

  if (!roleId || !userId) throw new BadRequestError('Invalid role ID or user ID');

  await roleService.removeUser(userId, roleId);

  return c.status(204);
};

export const addPermissionToRole = async (c: Context) => {
  const roleId = c.req.param('roleId');

  if (!roleId) throw new BadRequestError('Invalid role ID');

  const body = await c.req.json();
  const permissionId = requireTrimmedString(body.permissionId, 'permissionId is required');

  await roleService.addPermission(roleId, permissionId);

  return c.status(204);
};

export const removePermissionFromRole = async (c: Context) => {
  const roleId = c.req.param('roleId');
  const permissionId = c.req.param('permissionId');

  if (!roleId || !permissionId) {
    throw new BadRequestError('Invalid role ID or permission ID');
  }

  await roleService.removePermission(roleId, permissionId);

  return c.status(204);
};
