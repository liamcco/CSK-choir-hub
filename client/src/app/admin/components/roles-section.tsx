import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminUser, Permission, Role } from '@/lib/api-client';

import { nativeSelectClassName } from './constants';
import { EmptyState, MutationForm, SectionHeader } from './ui';

function CreateRoleCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Create role</CardTitle>
        <CardDescription>Role keys should describe the job, not the current holder.</CardDescription>
      </CardHeader>
      <CardContent>
        <MutationForm className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <input type="hidden" name="intent" value="create-role" />
          <Input name="key" placeholder="role-key" required />
          <Input name="name" placeholder="Display name" required />
          <Textarea
            name="description"
            placeholder="Description"
            className="md:col-span-2 lg:col-span-1"
          />
          <Button type="submit">Create role</Button>
        </MutationForm>
      </CardContent>
    </Card>
  );
}

function RoleCard({
  role,
  users,
  permissions,
}: {
  role: Role;
  users: AdminUser[];
  permissions: Permission[];
}) {
  const availablePermissions = permissions.filter(
    (permission) =>
      !role.permissions.some((currentPermission) => currentPermission.permissionId === permission.id),
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>{role.name}</CardTitle>
        <CardDescription>{role.key}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <MutationForm className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="intent" value="update-role" />
            <input type="hidden" name="roleId" value={role.id} />
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Key</label>
              <Input name="key" defaultValue={role.key} required />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Name</label>
              <Input name="name" defaultValue={role.name} required />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
                Description
              </label>
              <Textarea name="description" defaultValue={role.description || ''} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Save role</Button>
            </div>
          </MutationForm>
          <MutationForm>
            <input type="hidden" name="intent" value="delete-role" />
            <input type="hidden" name="roleId" value={role.id} />
            <Button type="submit" variant="destructive">
              Delete role
            </Button>
          </MutationForm>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
              User assignments
            </p>
            {users.length === 0 ? (
              <EmptyState message="No users available." />
            ) : (
              <MutationForm className="grid gap-2">
                <input type="hidden" name="intent" value="assign-user-role" />
                <input type="hidden" name="roleId" value={role.id} />
                <select name="userId" className={nativeSelectClassName} defaultValue={users[0]?.id}>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} · {user.email}
                    </option>
                  ))}
                </select>
                <Input name="expiresAt" type="datetime-local" />
                <Button type="submit" variant="outline">
                  Assign role
                </Button>
              </MutationForm>
            )}
            <div className="space-y-2">
              {role.users.length === 0 ? (
                <EmptyState message="No users assigned." />
              ) : (
                role.users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-background flex items-center justify-between gap-3 border border-border px-3 py-2"
                  >
                    <div>
                      <p className="text-foreground text-xs">{user.name}</p>
                      <p className="text-muted-foreground text-[11px]">{user.email}</p>
                    </div>
                    <MutationForm>
                      <input type="hidden" name="intent" value="remove-user-role" />
                      <input type="hidden" name="roleId" value={role.id} />
                      <input type="hidden" name="userId" value={user.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        Remove
                      </Button>
                    </MutationForm>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Permissions</p>
            {availablePermissions.length === 0 ? (
              <EmptyState message="Every permission is already attached." />
            ) : (
              <MutationForm className="flex gap-2">
                <input type="hidden" name="intent" value="add-role-permission" />
                <input type="hidden" name="roleId" value={role.id} />
                <select
                  name="permissionId"
                  className={nativeSelectClassName}
                  defaultValue={availablePermissions[0]?.id}
                >
                  {availablePermissions.map((permission) => (
                    <option key={permission.id} value={permission.id}>
                      {permission.key}
                    </option>
                  ))}
                </select>
                <Button type="submit" variant="outline">
                  Add
                </Button>
              </MutationForm>
            )}
            <div className="space-y-2">
              {role.permissions.length === 0 ? (
                <EmptyState message="No permissions attached." />
              ) : (
                role.permissions.map((permission) => (
                  <div
                    key={permission.permissionId}
                    className="bg-background flex items-center justify-between gap-3 border border-border px-3 py-2"
                  >
                    <div>
                      <p className="text-foreground text-xs">{permission.key}</p>
                      <p className="text-muted-foreground text-[11px]">
                        {permission.resource} / {permission.action}
                      </p>
                    </div>
                    <MutationForm>
                      <input type="hidden" name="intent" value="remove-role-permission" />
                      <input type="hidden" name="roleId" value={role.id} />
                      <input type="hidden" name="permissionId" value={permission.permissionId} />
                      <Button type="submit" variant="ghost" size="sm">
                        Remove
                      </Button>
                    </MutationForm>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RolesSection({
  users,
  roles,
  permissions,
}: {
  users: AdminUser[];
  roles: Role[];
  permissions: Permission[];
}) {
  return (
    <section className="space-y-4">
      <SectionHeader
        id="roles"
        title="Roles"
        description="Define reusable roles, assign them to users, and connect permissions to those roles."
      />
      <CreateRoleCard />
      <div className="grid gap-4 xl:grid-cols-2">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} users={users} permissions={permissions} />
        ))}
      </div>
    </section>
  );
}
