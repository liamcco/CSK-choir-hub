import { userModel } from '@/db';

import {
  mapGroupSummary,
  mapPermissionSummary,
  mapRoleSummary,
  mapUserSummary,
} from './rbacMappers';

export async function getAllUsers(search?: string) {
  const users = await userModel.findAll(search);

  return users.map((user) => ({
    ...mapUserSummary(user),
    groups: user.groupMemberships.map((membership) => ({
      ...mapGroupSummary(membership.group),
      joinedAt: membership.joinedAt.toISOString(),
      leftAt: membership.leftAt?.toISOString() ?? null,
    })),
    roles: user.userRoles.map((assignment) => ({
      ...mapRoleSummary(assignment.role),
      grantedAt: assignment.grantedAt.toISOString(),
      expiresAt: assignment.expiresAt?.toISOString() ?? null,
    })),
    permissions: user.userPermissions.map((grant) => ({
      ...mapPermissionSummary(grant.permission),
      effect: grant.effect,
      grantedAt: grant.grantedAt.toISOString(),
      expiresAt: grant.expiresAt?.toISOString() ?? null,
      reason: grant.reason ?? null,
    })),
  }));
}
