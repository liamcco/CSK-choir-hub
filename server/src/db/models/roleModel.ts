import { prisma } from '@/db';
import type { Prisma } from '@/prisma/generated/client';

const userSummarySelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  displayUsername: true,
  role: true,
} satisfies Prisma.UserSelect;

const permissionSummarySelect = {
  id: true,
  key: true,
  resource: true,
  action: true,
  description: true,
} satisfies Prisma.PermissionSelect;

const roleDetailsInclude = {
  userRoles: {
    orderBy: {
      grantedAt: 'desc',
    },
    include: {
      user: {
        select: userSummarySelect,
      },
    },
  },
  rolePermissions: {
    include: {
      permission: {
        select: permissionSummarySelect,
      },
    },
  },
} satisfies Prisma.RoleInclude;

export async function create(data: Prisma.RoleCreateInput) {
  return prisma.role.create({
    data,
    include: roleDetailsInclude,
  });
}

export async function findById(id: string) {
  return prisma.role.findUnique({
    where: { id },
    include: roleDetailsInclude,
  });
}

export async function findByKey(key: string) {
  return prisma.role.findUnique({
    where: { key },
    include: roleDetailsInclude,
  });
}

export async function update(id: string, data: Prisma.RoleUpdateInput) {
  return prisma.role.update({
    where: { id },
    data,
    include: roleDetailsInclude,
  });
}

export async function deleteById(id: string) {
  return prisma.role.delete({
    where: { id },
  });
}

export async function findAll() {
  return prisma.role.findMany({
    orderBy: {
      name: 'asc',
    },
    include: roleDetailsInclude,
  });
}

export const assignUser = async (userId: string, roleId: string, expiresAt?: Date) => {
  return prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId,
        roleId,
      },
    },
    create: {
      user: { connect: { id: userId } },
      role: { connect: { id: roleId } },
      expiresAt,
    },
    update: {
      expiresAt,
    },
  });
};

export const removeUser = async (userId: string, roleId: string) => {
  return prisma.userRole.delete({
    where: {
      userId_roleId: {
        userId,
        roleId,
      },
    },
  });
};

export const addPermission = async (roleId: string, permissionId: string) => {
  return prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId,
      },
    },
    create: {
      role: { connect: { id: roleId } },
      permission: { connect: { id: permissionId } },
    },
    update: {},
  });
};

export const removePermission = async (roleId: string, permissionId: string) => {
  return prisma.rolePermission.delete({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId,
      },
    },
  });
};
