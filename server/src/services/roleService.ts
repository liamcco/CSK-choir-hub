import { roleModel } from '@/db';

/**
 * Get all roles in the system.
 * @returns {Promise<any[]>} - A promise that resolves to an array of all roles.
 */
export async function getAllRoles() {
  return await roleModel.findAll();
}

/**
 * Create a new role.
 * @param name - The name of the role.
 * @param description - The description of the role.
 * @returns The created role.
 */
export async function createRole(name: string, description?: string) {
  return await roleModel.create({ name, description });
}

/**
 * Delete a role by its ID.
 * @param roleId
 */
export async function deleteRole(roleId: string) {
  await roleModel.deleteById(roleId);
}

/**
 * Assign a role to a user.
 * @param {string} userId - The user ID.
 * @param {string} roleId - The role ID to assign.
 * @returns {Promise<void>}
 */
export async function assignUser(userId: string, roleId: string): Promise<void> {
  await roleModel.assignUser(userId, roleId);
}

/**
 * Remove a role from a user.
 * @param {string} userId - The user ID.
 * @param {string} roleId - The role to remove.
 * @returns {Promise<void>}
 */
export async function removeUser(roleId: string): Promise<void> {
  await roleModel.removeUser(roleId);
}
