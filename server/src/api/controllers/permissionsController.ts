import { Context } from 'hono';

import { PermissionEffect } from '@/prisma/generated/client';
import { permissionService } from '@/services';
import { BadRequestError } from '@/utils/errors';

import {
  getTrimmedString,
  parseEnumValue,
  parseOptionalDateTime,
  requireTrimmedString,
} from './rbacUtils';

export const getPermissions = async (c: Context) => {
  const permissions = await permissionService.getAllPermissions();

  return c.json({ permissions });
};

export const createPermission = async (c: Context) => {
  const body = await c.req.json();
  const key = requireTrimmedString(body.key, 'Permission key is required');
  const resource = requireTrimmedString(body.resource, 'Permission resource is required');
  const action = requireTrimmedString(body.action, 'Permission action is required');
  const description = getTrimmedString(body.description);

  const permission = await permissionService.createPermission({
    key,
    resource,
    action,
    description,
  });

  return c.json({ permission }, 201);
};

export const updatePermission = async (c: Context) => {
  const permissionId = c.req.param('permissionId');

  if (!permissionId) throw new BadRequestError('Invalid permission ID');

  const body = await c.req.json();
  const key = getTrimmedString(body.key);
  const resource = getTrimmedString(body.resource);
  const action = getTrimmedString(body.action);
  const description = body.description === null ? undefined : getTrimmedString(body.description);

  if (!key && !resource && !action && description === undefined) {
    throw new BadRequestError('At least one field must be provided');
  }

  const permission = await permissionService.updatePermission(permissionId, {
    key,
    resource,
    action,
    description,
  });

  return c.json({ permission });
};

export const deletePermission = async (c: Context) => {
  const permissionId = c.req.param('permissionId');

  if (!permissionId) throw new BadRequestError('Invalid permission ID');

  await permissionService.deletePermission(permissionId);

  return c.status(204);
};

export const grantUserPermission = async (c: Context) => {
  const permissionId = c.req.param('permissionId');

  if (!permissionId) throw new BadRequestError('Invalid permission ID');

  const body = await c.req.json();
  const userId = requireTrimmedString(body.userId, 'userId is required');
  const effect = parseEnumValue(
    body.effect,
    Object.values(PermissionEffect),
    'effect',
  ) as PermissionEffect;
  const expiresAt = parseOptionalDateTime(body.expiresAt, 'expiresAt');
  const reason = getTrimmedString(body.reason);

  await permissionService.grantUserPermission(permissionId, userId, effect, expiresAt, reason);

  return c.status(204);
};

export const revokeUserPermission = async (c: Context) => {
  const permissionId = c.req.param('permissionId');
  const userId = c.req.param('userId');

  if (!permissionId || !userId) {
    throw new BadRequestError('Invalid permission ID or user ID');
  }

  await permissionService.revokeUserPermission(permissionId, userId);

  return c.status(204);
};
