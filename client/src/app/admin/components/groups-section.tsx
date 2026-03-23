import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminUser, Group } from '@/lib/api-client';

import { groupTypes, nativeSelectClassName } from './constants';
import { EmptyState, MutationForm, SectionHeader, TagList } from './ui';

function CreateGroupCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Create group</CardTitle>
        <CardDescription>Use stable keys so the RBAC graph remains scriptable.</CardDescription>
      </CardHeader>
      <CardContent>
        <MutationForm className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <input type="hidden" name="intent" value="create-group" />
          <Input name="key" placeholder="group-key" required />
          <Input name="name" placeholder="Display name" required />
          <select name="type" defaultValue="CHOIR" className={nativeSelectClassName}>
            {groupTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Button type="submit">Create group</Button>
          <Textarea
            name="description"
            placeholder="Description"
            className="md:col-span-2 lg:col-span-4"
          />
        </MutationForm>
      </CardContent>
    </Card>
  );
}

function GroupCard({ group, users, groups }: { group: Group; users: AdminUser[]; groups: Group[] }) {
  const availableChildGroups = groups.filter((candidate) => candidate.id !== group.id);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>{group.name}</span>
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.22em]">
            {group.type}
          </span>
        </CardTitle>
        <CardDescription>{group.key}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <MutationForm className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="intent" value="update-group" />
            <input type="hidden" name="groupId" value={group.id} />
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Key</label>
              <Input name="key" defaultValue={group.key} required />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Name</label>
              <Input name="name" defaultValue={group.name} required />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Type</label>
              <select name="type" defaultValue={group.type} className={nativeSelectClassName}>
                {groupTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
                Description
              </label>
              <Textarea name="description" defaultValue={group.description || ''} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Save group</Button>
            </div>
          </MutationForm>
          <MutationForm>
            <input type="hidden" name="intent" value="delete-group" />
            <input type="hidden" name="groupId" value={group.id} />
            <Button type="submit" variant="destructive">
              Delete group
            </Button>
          </MutationForm>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Members</p>
            {users.length === 0 ? (
              <EmptyState message="No users available." />
            ) : (
              <MutationForm className="flex gap-2">
                <input type="hidden" name="intent" value="add-group-user" />
                <input type="hidden" name="groupId" value={group.id} />
                <select name="userId" className={nativeSelectClassName} defaultValue={users[0]?.id}>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} · {user.email}
                    </option>
                  ))}
                </select>
                <Button type="submit" variant="outline">
                  Add
                </Button>
              </MutationForm>
            )}
            <div className="space-y-2">
              {group.members.length === 0 ? (
                <EmptyState message="No active members." />
              ) : (
                group.members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-background flex items-center justify-between gap-3 border border-border px-3 py-2"
                  >
                    <div>
                      <p className="text-foreground text-xs">{member.name}</p>
                      <p className="text-muted-foreground text-[11px]">{member.email}</p>
                    </div>
                    <MutationForm>
                      <input type="hidden" name="intent" value="remove-group-user" />
                      <input type="hidden" name="groupId" value={group.id} />
                      <input type="hidden" name="userId" value={member.id} />
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
            <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
              Child groups
            </p>
            {availableChildGroups.length === 0 ? (
              <EmptyState message="No other groups available." />
            ) : (
              <MutationForm className="flex gap-2">
                <input type="hidden" name="intent" value="add-group-child" />
                <input type="hidden" name="groupId" value={group.id} />
                <select
                  name="childGroupId"
                  className={nativeSelectClassName}
                  defaultValue={availableChildGroups[0]?.id}
                >
                  {availableChildGroups.map((candidate) => (
                    <option key={candidate.id} value={candidate.id}>
                      {candidate.name} · {candidate.type}
                    </option>
                  ))}
                </select>
                <Button type="submit" variant="outline">
                  Add
                </Button>
              </MutationForm>
            )}
            <div className="space-y-2">
              {group.children.length === 0 ? (
                <EmptyState message="No child groups." />
              ) : (
                group.children.map((child) => (
                  <div
                    key={child.groupId}
                    className="bg-background flex items-center justify-between gap-3 border border-border px-3 py-2"
                  >
                    <div>
                      <p className="text-foreground text-xs">{child.name}</p>
                      <p className="text-muted-foreground text-[11px]">{child.type}</p>
                    </div>
                    <MutationForm>
                      <input type="hidden" name="intent" value="remove-group-child" />
                      <input type="hidden" name="groupId" value={group.id} />
                      <input type="hidden" name="childGroupId" value={child.groupId} />
                      <Button type="submit" variant="ghost" size="sm">
                        Remove
                      </Button>
                    </MutationForm>
                  </div>
                ))
              )}
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Parents</p>
              <TagList items={group.parents.map((parent) => parent.name)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function GroupsSection({ users, groups }: { users: AdminUser[]; groups: Group[] }) {
  return (
    <section className="space-y-4">
      <SectionHeader
        id="groups"
        title="Groups"
        description="Create and update organizational groups, control active memberships, and define parent-child structure."
      />
      <CreateGroupCard />
      <div className="grid gap-4 xl:grid-cols-2">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} users={users} groups={groups} />
        ))}
      </div>
    </section>
  );
}
