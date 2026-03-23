import { Context } from 'hono';

import { GroupType } from '@/prisma/generated/client';
import { groupService } from '@/services';
import { BadRequestError } from '@/utils/errors';

import { getTrimmedString, parseEnumValue, requireTrimmedString } from './rbacUtils';

export const getGroups = async (c: Context) => {
  const typeParam = c.req.query('type');
  const type = typeParam
    ? parseEnumValue(typeParam, Object.values(GroupType), 'type')
    : undefined;

  const groups = await groupService.getAllGroups(type);

  return c.json({ groups });
};

export const deleteGroup = async (c: Context) => {
  const groupId = c.req.param('groupId');

  if (!groupId) throw new BadRequestError('Invalid group ID');

  await groupService.deleteGroup(groupId);

  return c.status(204);
};

export const createGroup = async (c: Context) => {
  const body = await c.req.json();
  const key = requireTrimmedString(body.key, 'Group key is required');
  const name = requireTrimmedString(body.name, 'Group name is required');
  const type = parseEnumValue(body.type, Object.values(GroupType), 'type');
  const description = getTrimmedString(body.description);

  const group = await groupService.createGroup({ key, name, type, description });

  return c.json({ group }, 201);
};

export const updateGroup = async (c: Context) => {
  const groupId = c.req.param('groupId');

  if (!groupId) throw new BadRequestError('Invalid group ID');

  const body = await c.req.json();
  const key = getTrimmedString(body.key);
  const name = getTrimmedString(body.name);
  const description = body.description === null ? undefined : getTrimmedString(body.description);
  const type = body.type
    ? parseEnumValue(body.type, Object.values(GroupType), 'type')
    : undefined;

  if (!key && !name && description === undefined && !type) {
    throw new BadRequestError('At least one field must be provided');
  }

  const group = await groupService.updateGroup(groupId, { key, name, type, description });

  return c.json({ group });
};

export const addGroupToGroup = async (c: Context) => {
  const parentGroupId = c.req.param('groupId');
  const body = await c.req.json();
  const childGroupId = requireTrimmedString(body.childGroupId, 'childGroupId is required');

  if (!parentGroupId) throw new BadRequestError('Invalid group ID');

  await groupService.addGroup(parentGroupId, childGroupId);

  return c.status(204);
};

export const removeGroupFromGroup = async (c: Context) => {
  const parentGroupId = c.req.param('groupId');
  const childGroupId = c.req.param('childGroupId');

  if (!parentGroupId || !childGroupId) {
    throw new BadRequestError('Invalid group ID or child group ID');
  }

  await groupService.removeGroup(parentGroupId, childGroupId);

  return c.status(204);
};

export const addUserToGroup = async (c: Context) => {
  const groupId = c.req.param('groupId');
  const body = await c.req.json();
  const userId = requireTrimmedString(body.userId, 'userId is required');

  if (!groupId) throw new BadRequestError('Invalid group ID');

  await groupService.addUser(userId, groupId);

  return c.status(204);
};

export const removeUserFromGroup = async (c: Context) => {
  const userId = c.req.param('userId');
  const groupId = c.req.param('groupId');

  if (!userId || !groupId) throw new BadRequestError('Invalid user ID or group ID');

  await groupService.removeUser(userId, groupId);

  return c.status(204);
};
