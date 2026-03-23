import { prisma } from '@/db';
import type { PermissionEffect, Prisma } from '@/prisma/generated/client';

const userSummarySelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  displayUsername: true,
  role: true,
} satisfies Prisma.UserSelect;

const roleSummarySelect = {
  id: true,
  key: true,
  name: true,
  description: true,
} satisfies Prisma.RoleSelect;

const permissionDetailsInclude = {
  rolePermissions: {
    include: {
      role: {
        select: roleSummarySelect,
      },
    },
  },
  userPermissions: {
    orderBy: {
      grantedAt: 'desc',
    },
    include: {
      user: {
        select: userSummarySelect,
      },
    },
  },
} satisfies Prisma.PermissionInclude;

export async function findAll() {
  return prisma.permission.findMany({
    orderBy: [{ resource: 'asc' }, { action: 'asc' }, { key: 'asc' }],
    include: permissionDetailsInclude,
  });
}

export async function findById(id: string) {
  return prisma.permission.findUnique({
    where: { id },
    include: permissionDetailsInclude,
  });
}

export async function findByKey(key: string) {
  return prisma.permission.findUnique({
    where: { key },
    include: permissionDetailsInclude,
  });
}

export async function create(data: Prisma.PermissionCreateInput) {
  return prisma.permission.create({
    data,
    include: permissionDetailsInclude,
  });
}

export async function update(id: string, data: Prisma.PermissionUpdateInput) {
  return prisma.permission.update({
    where: { id },
    data,
    include: permissionDetailsInclude,
  });
}

export async function deleteById(id: string) {
  return prisma.permission.delete({
    where: { id },
  });
}

export async function grantUser(
  userId: string,
  permissionId: string,
  effect: PermissionEffect,
  expiresAt?: Date,
  reason?: string,
) {
  return prisma.userPermission.upsert({
    where: {
      userId_permissionId: {
        userId,
        permissionId,
      },
    },
    create: {
      user: { connect: { id: userId } },
      permission: { connect: { id: permissionId } },
      effect,
      expiresAt,
      reason,
    },
    update: {
      effect,
      expiresAt,
      reason,
    },
  });
}

export async function revokeUser(userId: string, permissionId: string) {
  return prisma.userPermission.delete({
    where: {
      userId_permissionId: {
        userId,
        permissionId,
      },
    },
  });
}
