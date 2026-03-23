import { prisma } from '@/db';
import type { Prisma } from '@/prisma/generated/client';

const groupSummarySelect = {
  id: true,
  key: true,
  name: true,
  type: true,
} satisfies Prisma.GroupSelect;

const roleSummarySelect = {
  id: true,
  key: true,
  name: true,
} satisfies Prisma.RoleSelect;

const permissionSummarySelect = {
  id: true,
  key: true,
  resource: true,
  action: true,
  description: true,
} satisfies Prisma.PermissionSelect;

const userDetailsInclude = {
  groupMemberships: {
    where: {
      leftAt: null,
    },
    orderBy: {
      joinedAt: 'asc',
    },
    include: {
      group: {
        select: groupSummarySelect,
      },
    },
  },
  userRoles: {
    orderBy: {
      grantedAt: 'desc',
    },
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
      permission: {
        select: permissionSummarySelect,
      },
    },
  },
} satisfies Prisma.UserInclude;

export async function findAll(search?: string) {
  const normalizedSearch = search?.trim();
  const where: Prisma.UserWhereInput | undefined = normalizedSearch
    ? {
        OR: [
          { name: { contains: normalizedSearch, mode: 'insensitive' } },
          { email: { contains: normalizedSearch, mode: 'insensitive' } },
          { username: { contains: normalizedSearch, mode: 'insensitive' } },
          { displayUsername: { contains: normalizedSearch, mode: 'insensitive' } },
        ],
      }
    : undefined;

  return prisma.user.findMany({
    where,
    orderBy: [{ name: 'asc' }, { email: 'asc' }],
    include: userDetailsInclude,
  });
}

export async function findById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: userDetailsInclude,
  });
}
