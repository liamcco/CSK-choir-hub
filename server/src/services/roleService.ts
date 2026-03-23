import { permissionModel, roleModel, userModel } from '@/db';
import { ConflictError, NotFoundError } from '@/utils/errors';

import { mapPermissionSummary, mapUserSummary } from './rbacMappers';

export async function getAllRoles() {
  const roles = await roleModel.findAll();

  return roles.map((role) => ({
    id: role.id,
    key: role.key,
    name: role.name,
    description: role.description ?? null,
    createdAt: role.createdAt.toISOString(),
    updatedAt: role.updatedAt.toISOString(),
    users: role.userRoles.map((assignment) => ({
      ...mapUserSummary(assignment.user),
      grantedAt: assignment.grantedAt.toISOString(),
      expiresAt: assignment.expiresAt?.toISOString() ?? null,
    })),
    permissions: role.rolePermissions.map((assignment) =>
      mapPermissionSummary(assignment.permission),
    ),
  }));
}

export async function createRole(data: { key: string; name: string; description?: string }) {
  const existingRole = await roleModel.findByKey(data.key);

  if (existingRole) {
    throw new ConflictError('A role with that key already exists');
  }

  const createdRole = await roleModel.create(data);

  return {
    id: createdRole.id,
    key: createdRole.key,
    name: createdRole.name,
    description: createdRole.description ?? null,
    createdAt: createdRole.createdAt.toISOString(),
    updatedAt: createdRole.updatedAt.toISOString(),
    users: [],
    permissions: [],
  };
}

export async function updateRole(
  roleId: string,
  data: { key?: string; name?: string; description?: string },
) {
  const existingRole = await roleModel.findById(roleId);

  if (!existingRole) throw new NotFoundError('Role not found');

  if (data.key && data.key !== existingRole.key) {
    const roleWithKey = await roleModel.findByKey(data.key);

    if (roleWithKey) {
      throw new ConflictError('A role with that key already exists');
    }
  }

  const updatedRole = await roleModel.update(roleId, data);

  return {
    id: updatedRole.id,
    key: updatedRole.key,
    name: updatedRole.name,
    description: updatedRole.description ?? null,
    createdAt: updatedRole.createdAt.toISOString(),
    updatedAt: updatedRole.updatedAt.toISOString(),
    users: updatedRole.userRoles.map((assignment) => ({
      ...mapUserSummary(assignment.user),
      grantedAt: assignment.grantedAt.toISOString(),
      expiresAt: assignment.expiresAt?.toISOString() ?? null,
    })),
    permissions: updatedRole.rolePermissions.map((assignment) =>
      mapPermissionSummary(assignment.permission),
    ),
  };
}

export async function deleteRole(roleId: string) {
  const role = await roleModel.findById(roleId);

  if (!role) throw new NotFoundError('Role not found');

  await roleModel.deleteById(roleId);
}

export async function assignUser(userId: string, roleId: string, expiresAt?: Date): Promise<void> {
  const user = await userModel.findById(userId);
  const role = await roleModel.findById(roleId);

  if (!user) throw new NotFoundError('User not found');
  if (!role) throw new NotFoundError('Role not found');

  await roleModel.assignUser(userId, roleId, expiresAt);
}

export async function removeUser(userId: string, roleId: string): Promise<void> {
  const user = await userModel.findById(userId);
  const role = await roleModel.findById(roleId);

  if (!user) throw new NotFoundError('User not found');
  if (!role) throw new NotFoundError('Role not found');

  await roleModel.removeUser(userId, roleId);
}

export async function addPermission(roleId: string, permissionId: string): Promise<void> {
  const role = await roleModel.findById(roleId);
  const permission = await permissionModel.findById(permissionId);

  if (!role) throw new NotFoundError('Role not found');
  if (!permission) throw new NotFoundError('Permission not found');

  await roleModel.addPermission(roleId, permissionId);
}

export async function removePermission(roleId: string, permissionId: string): Promise<void> {
  const role = await roleModel.findById(roleId);
  const permission = await permissionModel.findById(permissionId);

  if (!role) throw new NotFoundError('Role not found');
  if (!permission) throw new NotFoundError('Permission not found');

  await roleModel.removePermission(roleId, permissionId);
}
