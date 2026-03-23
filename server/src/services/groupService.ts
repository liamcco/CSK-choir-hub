import { groupModel, userModel } from '@/db';
import { type GroupType } from '@/prisma/generated/client';
import { ConflictError, NotFoundError } from '@/utils/errors';

import { mapGroupSummary, mapUserSummary } from './rbacMappers';

export async function getAllGroups(type?: GroupType) {
  const groups = await groupModel.findAll(type ? { type } : undefined);

  return groups.map((group) => ({
    id: group.id,
    key: group.key,
    name: group.name,
    type: group.type,
    description: group.description ?? null,
    createdAt: group.createdAt.toISOString(),
    updatedAt: group.updatedAt.toISOString(),
    members: group.memberships.map((membership) => ({
      ...mapUserSummary(membership.user),
      joinedAt: membership.joinedAt.toISOString(),
      leftAt: membership.leftAt?.toISOString() ?? null,
    })),
    parents: group.parentRelations.map((relation) => mapGroupSummary(relation.parent)),
    children: group.childRelations.map((relation) => mapGroupSummary(relation.child)),
  }));
}

export async function deleteGroup(groupId: string) {
  const group = await groupModel.findById(groupId);

  if (!group) throw new NotFoundError('Group not found');

  await groupModel.deleteById(groupId);
}

export async function createGroup(data: {
  key: string;
  name: string;
  type: GroupType;
  description?: string;
}) {
  const existingGroup = await groupModel.findByKey(data.key);

  if (existingGroup) {
    throw new ConflictError('A group with that key already exists');
  }

  const createdGroup = await groupModel.create(data);

  return {
    id: createdGroup.id,
    key: createdGroup.key,
    name: createdGroup.name,
    type: createdGroup.type,
    description: createdGroup.description ?? null,
    createdAt: createdGroup.createdAt.toISOString(),
    updatedAt: createdGroup.updatedAt.toISOString(),
    members: [],
    parents: [],
    children: [],
  };
}

export async function updateGroup(
  groupId: string,
  data: { key?: string; name?: string; type?: GroupType; description?: string },
) {
  const existingGroup = await groupModel.findById(groupId);

  if (!existingGroup) throw new NotFoundError('Group not found');

  if (data.key && data.key !== existingGroup.key) {
    const groupWithKey = await groupModel.findByKey(data.key);

    if (groupWithKey) {
      throw new ConflictError('A group with that key already exists');
    }
  }

  const updatedGroup = await groupModel.update(groupId, data);

  return {
    id: updatedGroup.id,
    key: updatedGroup.key,
    name: updatedGroup.name,
    type: updatedGroup.type,
    description: updatedGroup.description ?? null,
    createdAt: updatedGroup.createdAt.toISOString(),
    updatedAt: updatedGroup.updatedAt.toISOString(),
    members: updatedGroup.memberships.map((membership) => ({
      ...mapUserSummary(membership.user),
      joinedAt: membership.joinedAt.toISOString(),
      leftAt: membership.leftAt?.toISOString() ?? null,
    })),
    parents: updatedGroup.parentRelations.map((relation) => mapGroupSummary(relation.parent)),
    children: updatedGroup.childRelations.map((relation) => mapGroupSummary(relation.child)),
  };
}

export async function addGroup(parentGroupId: string, subgroupId: string) {
  const parentGroup = await groupModel.findById(parentGroupId);

  if (!parentGroup) throw new NotFoundError('Parent group not found');

  const subgroup = await groupModel.findById(subgroupId);

  if (!subgroup) throw new NotFoundError('Subgroup not found');

  if (parentGroupId === subgroupId) {
    throw new ConflictError('A group cannot be a child of itself');
  }

  await groupModel.addGroup(parentGroupId, subgroupId);
}

export async function removeGroup(parentGroupId: string, subgroupId: string) {
  const parentGroup = await groupModel.findById(parentGroupId);

  if (!parentGroup) throw new NotFoundError('Parent group not found');

  const subgroup = await groupModel.findById(subgroupId);

  if (!subgroup) throw new NotFoundError('Subgroup not found');

  await groupModel.removeGroup(parentGroupId, subgroupId);
}

export async function addUser(userId: string, groupId: string): Promise<void> {
  const user = await userModel.findById(userId);
  const group = await groupModel.findById(groupId);

  if (!user) throw new NotFoundError('User not found');
  if (!group) throw new NotFoundError('Group not found');

  await groupModel.addUser(userId, groupId);
}

export async function removeUser(userId: string, groupId: string): Promise<void> {
  const user = await userModel.findById(userId);
  const group = await groupModel.findById(groupId);

  if (!user) throw new NotFoundError('User not found');
  if (!group) throw new NotFoundError('Group not found');

  await groupModel.removeUser(userId, groupId);
}
