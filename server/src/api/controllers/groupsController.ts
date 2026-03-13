import { type NextFunction, type Request, type Response } from 'express';

import { groupService } from '@/services';
import { BadRequestError } from '@/utils/errors';

// Get all groups
export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
  const type = req.query.type as string | undefined;

  const groups = await groupService.getAllGroups();

  res.json({ groups });
};

// Delete a group by ID
export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = req.params.groupId;

  if (!groupId) return next(new BadRequestError('Invalid group ID'));

  await groupService.deleteGroup(groupId);

  return res.status(204).send();
};

// Create a new group
export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, type, description } = req.body;

  if (!name || !type) throw new BadRequestError('Group name and type are required');

  const newGroup = await groupService.createGroup({ name, type, description });

  return res.status(201).json({ group: newGroup });
};

// Update a group by ID
export const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = req.params.groupId;

  if (!groupId) throw new BadRequestError('Invalid group ID');

  const { name, description } = req.body;

  if (!name) throw new BadRequestError('Group name is required');

  const updatedGroup = await groupService.updateGroup(groupId, { name, description });

  return res.json({ group: updatedGroup });
};

// Add a subgroup to a group
export const addGroupToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const parentGroupId = req.params.groupId;
  const { subgroupId } = req.body;

  if (!parentGroupId || typeof subgroupId !== 'string' || !subgroupId.trim())
    throw new BadRequestError('Invalid group ID or subgroup ID');

  await groupService.addGroup(parentGroupId, subgroupId);

  return res.status(204).send();
};

// Remove a subgroup from a group
export const removeGroupFromGroup = async (req: Request, res: Response, next: NextFunction) => {
  const parentGroupId = req.params.groupId;
  const subgroupId = req.params.subgroupId;

  if (!parentGroupId || !subgroupId) throw new BadRequestError('Invalid group ID or subgroup ID');

  await groupService.removeGroup(parentGroupId, subgroupId);

  return res.status(204).send();
};

// Assign a role to a group
export const addRoleToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = req.params.groupId;
  const { roleId } = req.body;

  if (!groupId || typeof roleId !== 'string' || !roleId.trim())
    throw new BadRequestError('Invalid group ID or role ID');

  await groupService.addRole(groupId, roleId);

  return res.status(204).send();
};

// Remove a role from a group
export const removeRoleFromGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = req.params.groupId;
  const roleId = req.params.roleId;

  if (!groupId || !roleId) throw new BadRequestError('Invalid group ID or role ID');

  await groupService.removeRole(groupId, roleId);

  return res.status(204).send();
};

// Add a user to a group
export const addUserToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  const groupId = req.params.groupId?.trim();

  if (typeof userId !== 'string' || !userId.trim() || !groupId)
    throw new BadRequestError('Invalid user ID or group ID');

  await groupService.addUser(userId.trim(), groupId);

  return res.status(204).send();
};

// Remove a user from a group
export const removeUserFromGroup = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const groupId = req.params.groupId;

  if (!userId || !groupId) throw new BadRequestError('Invalid user ID or group ID');

  await groupService.removeUser(userId, groupId);

  return res.status(204).send();
};
