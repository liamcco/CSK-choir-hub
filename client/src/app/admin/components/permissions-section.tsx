import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminUser, Permission } from '@/lib/api-client';

import { nativeSelectClassName, permissionEffects } from './constants';
import { EmptyState, MutationForm, SectionHeader, TagList } from './ui';

function CreatePermissionCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Create permission</CardTitle>
        <CardDescription>Keep keys predictable: `resource.action` works well here.</CardDescription>
      </CardHeader>
      <CardContent>
        <MutationForm className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <input type="hidden" name="intent" value="create-permission" />
          <Input name="key" placeholder="events.update" required />
          <Input name="resource" placeholder="events" required />
          <Input name="action" placeholder="update" required />
          <Textarea
            name="description"
            placeholder="Description"
            className="md:col-span-2 lg:col-span-1"
          />
          <Button type="submit">Create permission</Button>
        </MutationForm>
      </CardContent>
    </Card>
  );
}

function PermissionCard({ permission, users }: { permission: Permission; users: AdminUser[] }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>{permission.key}</CardTitle>
        <CardDescription>
          {permission.resource} / {permission.action}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <MutationForm className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="intent" value="update-permission" />
            <input type="hidden" name="permissionId" value={permission.id} />
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Key</label>
              <Input name="key" defaultValue={permission.key} required />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
                Resource
              </label>
              <Input name="resource" defaultValue={permission.resource} required />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
                Action
              </label>
              <Input name="action" defaultValue={permission.action} required />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
                Description
              </label>
              <Textarea name="description" defaultValue={permission.description || ''} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Save permission</Button>
            </div>
          </MutationForm>
          <MutationForm>
            <input type="hidden" name="intent" value="delete-permission" />
            <input type="hidden" name="permissionId" value={permission.id} />
            <Button type="submit" variant="destructive">
              Delete permission
            </Button>
          </MutationForm>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
              Roles using this permission
            </p>
            <TagList items={permission.roles.map((role) => role.name)} />
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
              Direct user grants
            </p>
            {users.length === 0 ? (
              <EmptyState message="No users available." />
            ) : (
              <MutationForm className="grid gap-2">
                <input type="hidden" name="intent" value="grant-user-permission" />
                <input type="hidden" name="permissionId" value={permission.id} />
                <select name="userId" className={nativeSelectClassName} defaultValue={users[0]?.id}>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} · {user.email}
                    </option>
                  ))}
                </select>
                <select name="effect" className={nativeSelectClassName} defaultValue="ALLOW">
                  {permissionEffects.map((effect) => (
                    <option key={effect} value={effect}>
                      {effect}
                    </option>
                  ))}
                </select>
                <Input name="expiresAt" type="datetime-local" />
                <Textarea name="reason" placeholder="Optional reason" />
                <Button type="submit" variant="outline">
                  Grant direct permission
                </Button>
              </MutationForm>
            )}
            <div className="space-y-2">
              {permission.users.length === 0 ? (
                <EmptyState message="No direct grants." />
              ) : (
                permission.users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-background flex items-center justify-between gap-3 border border-border px-3 py-2"
                  >
                    <div>
                      <p className="text-foreground text-xs">
                        {user.name} · {user.effect.toLowerCase()}
                      </p>
                      <p className="text-muted-foreground text-[11px]">{user.email}</p>
                    </div>
                    <MutationForm>
                      <input type="hidden" name="intent" value="revoke-user-permission" />
                      <input type="hidden" name="permissionId" value={permission.id} />
                      <input type="hidden" name="userId" value={user.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        Revoke
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

export function PermissionsSection({
  users,
  permissions,
}: {
  users: AdminUser[];
  permissions: Permission[];
}) {
  return (
    <section className="space-y-4">
      <SectionHeader
        id="permissions"
        title="Permissions"
        description="Create the atomic resource-action permissions, then grant them directly or through roles."
      />
      <CreatePermissionCard />
      <div className="grid gap-4 xl:grid-cols-2">
        {permissions.map((permission) => (
          <PermissionCard key={permission.id} permission={permission} users={users} />
        ))}
      </div>
    </section>
  );
}
