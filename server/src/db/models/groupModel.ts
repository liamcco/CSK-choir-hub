import { prisma } from '@/db';
import { type GroupType, type Prisma } from '@/prisma/generated/client';

const userSummarySelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  displayUsername: true,
  role: true,
} satisfies Prisma.UserSelect;

const groupSummarySelect = {
  id: true,
  key: true,
  name: true,
  type: true,
} satisfies Prisma.GroupSelect;

const groupDetailsInclude = {
  memberships: {
    where: {
      leftAt: null,
    },
    orderBy: {
      joinedAt: 'asc',
    },
    include: {
      user: {
        select: userSummarySelect,
      },
    },
  },
  parentRelations: {
    include: {
      parent: {
        select: groupSummarySelect,
      },
    },
  },
  childRelations: {
    include: {
      child: {
        select: groupSummarySelect,
      },
    },
  },
} satisfies Prisma.GroupInclude;

export async function create(data: Prisma.GroupCreateInput) {
  return prisma.group.create({
    data,
    include: groupDetailsInclude,
  });
}

export async function findById(id: string) {
  return prisma.group.findUnique({
    where: { id },
    include: groupDetailsInclude,
  });
}

export async function findByKey(key: string) {
  return prisma.group.findUnique({
    where: { key },
    include: groupDetailsInclude,
  });
}

export async function update(id: string, data: Prisma.GroupUpdateInput) {
  return prisma.group.update({
    where: { id },
    data,
    include: groupDetailsInclude,
  });
}

export async function deleteById(id: string) {
  return prisma.group.delete({
    where: { id },
  });
}

export async function findAll(filters?: { type?: GroupType }) {
  return prisma.group.findMany({
    where: filters?.type
      ? {
          type: filters.type,
        }
      : undefined,
    orderBy: [{ type: 'asc' }, { name: 'asc' }],
    include: groupDetailsInclude,
  });
}

export async function findBy(filters: { type?: GroupType; name?: string }) {
  const where: Prisma.GroupWhereInput = {};

  if (filters.type) where.type = filters.type;
  if (filters.name) where.name = { contains: filters.name, mode: 'insensitive' };

  return prisma.group.findMany({
    where,
    orderBy: [{ type: 'asc' }, { name: 'asc' }],
    include: groupDetailsInclude,
  });
}

export const addUser = async (userId: string, groupId: string) => {
  return prisma.groupMembership.upsert({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
    create: {
      user: { connect: { id: userId } },
      group: { connect: { id: groupId } },
    },
    update: {
      leftAt: null,
    },
  });
};

export const removeUser = async (userId: string, groupId: string) => {
  return prisma.groupMembership.update({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
    data: {
      leftAt: new Date(),
    },
  });
};

export const addGroup = async (parentGroupId: string, subgroupId: string) => {
  return prisma.groupRelation.upsert({
    where: {
      parentId_childId: {
        parentId: parentGroupId,
        childId: subgroupId,
      },
    },
    create: {
      parent: { connect: { id: parentGroupId } },
      child: { connect: { id: subgroupId } },
    },
    update: {},
  });
};

export const removeGroup = async (parentGroupId: string, subgroupId: string) => {
  return prisma.groupRelation.delete({
    where: {
      parentId_childId: {
        parentId: parentGroupId,
        childId: subgroupId,
      },
    },
  });
};
