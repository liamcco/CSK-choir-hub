'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  addGroupChild,
  addPermissionToRole,
  addUserToGroup,
  assignUserToRole,
  createGroup,
  createPermission,
  createRole,
  deleteGroup,
  deletePermission,
  deleteRole,
  grantUserPermission,
  removeGroupChild,
  removePermissionFromRole,
  removeUserFromGroup,
  removeUserFromRole,
  revokeUserPermission,
  updateGroup,
  updatePermission,
  updateRole,
} from '@/lib/api-client';
import {
  zAddChildGroupInput,
  zAddPermissionToRoleInput,
  zAddUserToGroupInput,
  zAssignUserToRoleInput,
  zCreateGroupInput,
  zCreatePermissionInput,
  zCreateRoleInput,
  zGrantUserPermissionInput,
  zUpdateGroupInput,
  zUpdatePermissionInput,
  zUpdateRoleInput,
} from '@/lib/api-client/zod.gen';
import { getApiRequestHeaders } from '@/lib/api-auth';

type AdminIntent =
  | 'create-group'
  | 'update-group'
  | 'delete-group'
  | 'add-group-user'
  | 'remove-group-user'
  | 'add-group-child'
  | 'remove-group-child'
  | 'create-role'
  | 'update-role'
  | 'delete-role'
  | 'assign-user-role'
  | 'remove-user-role'
  | 'add-role-permission'
  | 'remove-role-permission'
  | 'create-permission'
  | 'update-permission'
  | 'delete-permission'
  | 'grant-user-permission'
  | 'revoke-user-permission';

function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    throw new Error(`Missing field: ${key}`);
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    throw new Error(`Missing field: ${key}`);
  }

  return trimmedValue;
}

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function getOptionalIsoDateTime(formData: FormData, key: string) {
  const value = getOptionalString(formData, key);

  if (!value) {
    return undefined;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid field: ${key}`);
  }

  return parsedDate.toISOString();
}

function buildRedirectUrl(status: 'error' | 'success', message: string) {
  const searchParams = new URLSearchParams({
    status,
    message,
  });

  return `/admin?${searchParams.toString()}`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'The admin update failed.';
}

async function expectSuccess<T extends { data?: unknown; error?: unknown }>(
  responsePromise: Promise<T>,
  fallbackMessage: string,
) {
  const response = await responsePromise;

  if (response.data !== undefined) {
    return response.data;
  }

  const error = response.error;

  if (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    throw new Error(error.error);
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    throw new Error(error.message);
  }

  if (typeof error === 'string' && error.length > 0) {
    throw new Error(error);
  }

  throw new Error(fallbackMessage);
}

export async function submitAdminMutationAction(formData: FormData) {
  const intent = getRequiredString(formData, 'intent') as AdminIntent;
  const headers = await getApiRequestHeaders();

  try {
    switch (intent) {
      case 'create-group': {
        const body = zCreateGroupInput.parse({
          key: getRequiredString(formData, 'key'),
          name: getRequiredString(formData, 'name'),
          type: getRequiredString(formData, 'type'),
          description: getOptionalString(formData, 'description'),
        });

        await expectSuccess(createGroup({ body, headers }), 'Could not create group.');
        break;
      }

      case 'update-group': {
        const groupId = getRequiredString(formData, 'groupId');
        const body = zUpdateGroupInput.parse({
          key: getOptionalString(formData, 'key'),
          name: getOptionalString(formData, 'name'),
          type: getOptionalString(formData, 'type'),
          description: getOptionalString(formData, 'description'),
        });

        await expectSuccess(
          updateGroup({
            path: { groupId },
            body,
            headers,
          }),
          'Could not update group.',
        );
        break;
      }

      case 'delete-group': {
        const groupId = getRequiredString(formData, 'groupId');

        await expectSuccess(deleteGroup({ path: { groupId }, headers }), 'Could not delete group.');
        break;
      }

      case 'add-group-user': {
        const groupId = getRequiredString(formData, 'groupId');
        const body = zAddUserToGroupInput.parse({
          userId: getRequiredString(formData, 'userId'),
        });

        await expectSuccess(
          addUserToGroup({
            path: { groupId },
            body,
            headers,
          }),
          'Could not add user to group.',
        );
        break;
      }

      case 'remove-group-user': {
        const groupId = getRequiredString(formData, 'groupId');
        const userId = getRequiredString(formData, 'userId');

        await expectSuccess(
          removeUserFromGroup({
            path: { groupId, userId },
            headers,
          }),
          'Could not remove user from group.',
        );
        break;
      }

      case 'add-group-child': {
        const groupId = getRequiredString(formData, 'groupId');
        const body = zAddChildGroupInput.parse({
          childGroupId: getRequiredString(formData, 'childGroupId'),
        });

        await expectSuccess(
          addGroupChild({
            path: { groupId },
            body,
            headers,
          }),
          'Could not add child group.',
        );
        break;
      }

      case 'remove-group-child': {
        const groupId = getRequiredString(formData, 'groupId');
        const childGroupId = getRequiredString(formData, 'childGroupId');

        await expectSuccess(
          removeGroupChild({
            path: { groupId, childGroupId },
            headers,
          }),
          'Could not remove child group.',
        );
        break;
      }

      case 'create-role': {
        const body = zCreateRoleInput.parse({
          key: getRequiredString(formData, 'key'),
          name: getRequiredString(formData, 'name'),
          description: getOptionalString(formData, 'description'),
        });

        await expectSuccess(createRole({ body, headers }), 'Could not create role.');
        break;
      }

      case 'update-role': {
        const roleId = getRequiredString(formData, 'roleId');
        const body = zUpdateRoleInput.parse({
          key: getOptionalString(formData, 'key'),
          name: getOptionalString(formData, 'name'),
          description: getOptionalString(formData, 'description'),
        });

        await expectSuccess(
          updateRole({
            path: { roleId },
            body,
            headers,
          }),
          'Could not update role.',
        );
        break;
      }

      case 'delete-role': {
        const roleId = getRequiredString(formData, 'roleId');

        await expectSuccess(deleteRole({ path: { roleId }, headers }), 'Could not delete role.');
        break;
      }

      case 'assign-user-role': {
        const roleId = getRequiredString(formData, 'roleId');
        const body = zAssignUserToRoleInput.parse({
          userId: getRequiredString(formData, 'userId'),
          expiresAt: getOptionalIsoDateTime(formData, 'expiresAt'),
        });

        await expectSuccess(
          assignUserToRole({
            path: { roleId },
            body,
            headers,
          }),
          'Could not assign role to user.',
        );
        break;
      }

      case 'remove-user-role': {
        const roleId = getRequiredString(formData, 'roleId');
        const userId = getRequiredString(formData, 'userId');

        await expectSuccess(
          removeUserFromRole({
            path: { roleId, userId },
            headers,
          }),
          'Could not remove role from user.',
        );
        break;
      }

      case 'add-role-permission': {
        const roleId = getRequiredString(formData, 'roleId');
        const body = zAddPermissionToRoleInput.parse({
          permissionId: getRequiredString(formData, 'permissionId'),
        });

        await expectSuccess(
          addPermissionToRole({
            path: { roleId },
            body,
            headers,
          }),
          'Could not add permission to role.',
        );
        break;
      }

      case 'remove-role-permission': {
        const roleId = getRequiredString(formData, 'roleId');
        const permissionId = getRequiredString(formData, 'permissionId');

        await expectSuccess(
          removePermissionFromRole({
            path: { roleId, permissionId },
            headers,
          }),
          'Could not remove permission from role.',
        );
        break;
      }

      case 'create-permission': {
        const body = zCreatePermissionInput.parse({
          key: getRequiredString(formData, 'key'),
          resource: getRequiredString(formData, 'resource'),
          action: getRequiredString(formData, 'action'),
          description: getOptionalString(formData, 'description'),
        });

        await expectSuccess(createPermission({ body, headers }), 'Could not create permission.');
        break;
      }

      case 'update-permission': {
        const permissionId = getRequiredString(formData, 'permissionId');
        const body = zUpdatePermissionInput.parse({
          key: getOptionalString(formData, 'key'),
          resource: getOptionalString(formData, 'resource'),
          action: getOptionalString(formData, 'action'),
          description: getOptionalString(formData, 'description'),
        });

        await expectSuccess(
          updatePermission({
            path: { permissionId },
            body,
            headers,
          }),
          'Could not update permission.',
        );
        break;
      }

      case 'delete-permission': {
        const permissionId = getRequiredString(formData, 'permissionId');

        await expectSuccess(
          deletePermission({
            path: { permissionId },
            headers,
          }),
          'Could not delete permission.',
        );
        break;
      }

      case 'grant-user-permission': {
        const permissionId = getRequiredString(formData, 'permissionId');
        const body = zGrantUserPermissionInput.parse({
          userId: getRequiredString(formData, 'userId'),
          effect: getRequiredString(formData, 'effect'),
          expiresAt: getOptionalIsoDateTime(formData, 'expiresAt'),
          reason: getOptionalString(formData, 'reason'),
        });

        await expectSuccess(
          grantUserPermission({
            path: { permissionId },
            body,
            headers,
          }),
          'Could not grant direct permission.',
        );
        break;
      }

      case 'revoke-user-permission': {
        const permissionId = getRequiredString(formData, 'permissionId');
        const userId = getRequiredString(formData, 'userId');

        await expectSuccess(
          revokeUserPermission({
            path: { permissionId, userId },
            headers,
          }),
          'Could not revoke direct permission.',
        );
        break;
      }

      default:
        throw new Error(`Unsupported admin intent: ${intent}`);
    }
  } catch (error) {
    redirect(buildRedirectUrl('error', getErrorMessage(error)));
  }

  revalidatePath('/admin');
  redirect(buildRedirectUrl('success', 'Admin settings updated.'));
}
