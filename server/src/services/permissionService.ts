import { permissionModel, userModel } from '@/db';
import { type PermissionEffect } from '@/prisma/generated/client';
import { ConflictError, NotFoundError } from '@/utils/errors';

import { mapRoleSummary, mapUserSummary } from './rbacMappers';

export async function getAllPermissions() {
  const permissions = await permissionModel.findAll();

  return permissions.map((permission) => ({
    id: permission.id,
    key: permission.key,
    resource: permission.resource,
    action: permission.action,
    description: permission.description ?? null,
    roles: permission.rolePermissions.map((assignment) => mapRoleSummary(assignment.role)),
    users: permission.userPermissions.map((grant) => ({
      ...mapUserSummary(grant.user),
      effect: grant.effect,
      grantedAt: grant.grantedAt.toISOString(),
      expiresAt: grant.expiresAt?.toISOString() ?? null,
      reason: grant.reason ?? null,
    })),
  }));
}

export async function createPermission(data: {
  key: string;
  resource: string;
  action: string;
  description?: string;
}) {
  const existingPermission = await permissionModel.findByKey(data.key);

  if (existingPermission) {
    throw new ConflictError('A permission with that key already exists');
  }

  const createdPermission = await permissionModel.create(data);

  return {
    id: createdPermission.id,
    key: createdPermission.key,
    resource: createdPermission.resource,
    action: createdPermission.action,
    description: createdPermission.description ?? null,
    roles: [],
    users: [],
  };
}

export async function updatePermission(
  permissionId: string,
  data: { key?: string; resource?: string; action?: string; description?: string },
) {
  const existingPermission = await permissionModel.findById(permissionId);

  if (!existingPermission) throw new NotFoundError('Permission not found');

  if (data.key && data.key !== existingPermission.key) {
    const permissionWithKey = await permissionModel.findByKey(data.key);

    if (permissionWithKey) {
      throw new ConflictError('A permission with that key already exists');
    }
  }

  const updatedPermission = await permissionModel.update(permissionId, data);

  return {
    id: updatedPermission.id,
    key: updatedPermission.key,
    resource: updatedPermission.resource,
    action: updatedPermission.action,
    description: updatedPermission.description ?? null,
    roles: updatedPermission.rolePermissions.map((assignment) => mapRoleSummary(assignment.role)),
    users: updatedPermission.userPermissions.map((grant) => ({
      ...mapUserSummary(grant.user),
      effect: grant.effect,
      grantedAt: grant.grantedAt.toISOString(),
      expiresAt: grant.expiresAt?.toISOString() ?? null,
      reason: grant.reason ?? null,
    })),
  };
}

export async function deletePermission(permissionId: string) {
  const permission = await permissionModel.findById(permissionId);

  if (!permission) throw new NotFoundError('Permission not found');

  await permissionModel.deleteById(permissionId);
}

export async function grantUserPermission(
  permissionId: string,
  userId: string,
  effect: PermissionEffect,
  expiresAt?: Date,
  reason?: string,
) {
  const permission = await permissionModel.findById(permissionId);
  const user = await userModel.findById(userId);

  if (!permission) throw new NotFoundError('Permission not found');
  if (!user) throw new NotFoundError('User not found');

  await permissionModel.grantUser(userId, permissionId, effect, expiresAt, reason);
}

export async function revokeUserPermission(permissionId: string, userId: string) {
  const permission = await permissionModel.findById(permissionId);
  const user = await userModel.findById(userId);

  if (!permission) throw new NotFoundError('Permission not found');
  if (!user) throw new NotFoundError('User not found');

  await permissionModel.revokeUser(userId, permissionId);
}
