import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AdminUser } from '@/lib/api-client';

import { SectionHeader, TagList } from './ui';

export function UsersSection({ users }: { users: AdminUser[] }) {
  return (
    <section className="space-y-4">
      <SectionHeader
        id="users"
        title="Users"
        description="Read-only overview of each user’s active memberships, role assignments, and direct permission grants."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {users.map((user) => (
          <Card key={user.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex flex-wrap items-center gap-2 text-sm">
                <span>{user.name}</span>
                <span className="text-muted-foreground text-[10px] uppercase tracking-[0.22em]">
                  {user.systemRole || 'member'}
                </span>
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Groups</p>
                <TagList
                  items={user.groups.map((group) => `${group.name} (${group.type.toLowerCase()})`)}
                />
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Roles</p>
                <TagList items={user.roles.map((role) => role.name)} />
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
                  Direct permissions
                </p>
                <TagList
                  items={user.permissions.map(
                    (permission) => `${permission.key} [${permission.effect.toLowerCase()}]`,
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
