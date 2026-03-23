import type { AdminUser, Group, Permission, Role } from '@/lib/api-client';

import { FlashMessage } from './components/flash-message';
import { GroupsSection } from './components/groups-section';
import { HeroSection } from './components/hero-section';
import { PermissionsSection } from './components/permissions-section';
import { RolesSection } from './components/roles-section';
import { UsersSection } from './components/users-section';

export function AdminDashboard({
  users,
  groups,
  roles,
  permissions,
  status,
  message,
}: {
  users: AdminUser[];
  groups: Group[];
  roles: Role[];
  permissions: Permission[];
  status?: string;
  message?: string;
}) {
  return (
    <div className="bg-background px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <HeroSection
          userCount={users.length}
          groupCount={groups.length}
          roleCount={roles.length}
          permissionCount={permissions.length}
        />
        <FlashMessage status={status} message={message} />
        <UsersSection users={users} />
        <GroupsSection users={users} groups={groups} />
        <RolesSection users={users} roles={roles} permissions={permissions} />
        <PermissionsSection users={users} permissions={permissions} />
      </div>
    </div>
  );
}
