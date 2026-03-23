type UserSummary = {
  id: string;
  name: string;
  email: string;
  username?: string | null;
  displayUsername?: string | null;
  role?: string | null;
};

type GroupSummary = {
  id: string;
  key: string;
  name: string;
  type: string;
};

type RoleSummary = {
  id: string;
  key: string;
  name: string;
  description?: string | null;
};

type PermissionSummary = {
  id: string;
  key: string;
  resource: string;
  action: string;
  description?: string | null;
};

export function mapUserSummary(user: UserSummary) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username ?? null,
    displayUsername: user.displayUsername ?? null,
    systemRole: user.role ?? null,
  };
}

export function mapGroupSummary(group: GroupSummary) {
  return {
    groupId: group.id,
    key: group.key,
    name: group.name,
    type: group.type,
  };
}

export function mapRoleSummary(role: RoleSummary) {
  return {
    roleId: role.id,
    key: role.key,
    name: role.name,
    description: role.description ?? null,
  };
}

export function mapPermissionSummary(permission: PermissionSummary) {
  return {
    permissionId: permission.id,
    key: permission.key,
    resource: permission.resource,
    action: permission.action,
    description: permission.description ?? null,
  };
}
