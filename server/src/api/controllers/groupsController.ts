import { Context } from 'hono';

import { groupService } from '@/services';
import { BadRequestError } from '@/utils/errors';

// Get all groups
export const getGroups = async (c: Context) => {
  const type = c.req.query('type');

  const groups = await groupService.getAllGroups();

  return c.json({ groups });
};

// Delete a group by ID
export const deleteGroup = async (c: Context) => {
  const groupId = c.req.param('groupId');

  if (!groupId) throw new BadRequestError('Invalid group ID');

  await groupService.deleteGroup(groupId);

  return c.status(204);
};

// Create a new group
export const createGroup = async (c: Context) => {
  const { name, type, description } = await c.req.json();

  if (!name || !type) throw new BadRequestError('Group name and type are required');

  const newGroup = await groupService.createGroup({ name, type, description });

  return c.json({ group: newGroup }, 201);
};

// Update a group by ID
export const updateGroup = async (c: Context) => {
  const groupId = c.req.param('groupId');

  if (!groupId) throw new BadRequestError('Invalid group ID');

  const { name, description } = await c.req.json();

  if (!name) throw new BadRequestError('Group name is required');

  const updatedGroup = await groupService.updateGroup(groupId, { name, description });

  return c.json({ group: updatedGroup });
};

// Add a subgroup to a group
export const addGroupToGroup = async (c: Context) => {
  const parentGroupId = c.req.param('groupId');
  const { subgroupId } = await c.req.json();

  if (!parentGroupId || typeof subgroupId !== 'string' || !subgroupId.trim())
    throw new BadRequestError('Invalid group ID or subgroup ID');

  await groupService.addGroup(parentGroupId, subgroupId);

  return c.status(204);
};

// Remove a subgroup from a group
export const removeGroupFromGroup = async (c: Context) => {
  const parentGroupId = c.req.param('groupId');
  const subgroupId = c.req.param('subgroupId');

  if (!parentGroupId || !subgroupId) throw new BadRequestError('Invalid group ID or subgroup ID');

  await groupService.removeGroup(parentGroupId, subgroupId);

  return c.status(204);
};

// Assign a role to a group
export const addRoleToGroup = async (c: Context) => {
  const groupId = c.req.param('groupId');
  const { roleId } = await c.req.json();

  if (!groupId || typeof roleId !== 'string' || !roleId.trim())
    throw new BadRequestError('Invalid group ID or role ID');

  await groupService.addRole(groupId, roleId);

  return c.status(204);
};

// Remove a role from a group
export const removeRoleFromGroup = async (c: Context) => {
  const groupId = c.req.param('groupId');
  const roleId = c.req.param('roleId');

  if (!groupId || !roleId) throw new BadRequestError('Invalid group ID or role ID');

  await groupService.removeRole(groupId, roleId);

  return c.status(204);
};

// Add a user to a group
export const addUserToGroup = async (c: Context) => {
  const { userId } = await c.req.json();
  const groupId = c.req.param('groupId');

  if (typeof userId !== 'string' || !userId.trim() || !groupId)
    throw new BadRequestError('Invalid user ID or group ID');

  await groupService.addUser(userId.trim(), groupId);

  return c.status(204);
};

// Remove a user from a group
export const removeUserFromGroup = async (c: Context) => {
  const userId = c.req.param('userId');
  const groupId = c.req.param('groupId');

  if (!userId || !groupId) throw new BadRequestError('Invalid user ID or group ID');

  await groupService.removeUser(userId, groupId);

  return c.status(204);
};
