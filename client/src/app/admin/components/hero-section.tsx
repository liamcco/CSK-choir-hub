import { SummaryPill } from './ui';

export function HeroSection({
  userCount,
  groupCount,
  roleCount,
  permissionCount,
}: {
  userCount: number;
  groupCount: number;
  roleCount: number;
  permissionCount: number;
}) {
  return (
    <section className="bg-card text-card-foreground border border-border p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-primary text-[11px] uppercase tracking-[0.32em]">Admin control room</p>
          <h1 className="text-foreground text-3xl leading-tight sm:text-4xl">
            Manage RBAC from the schema outward.
          </h1>
          <p className="text-muted-foreground text-sm leading-6">
            Groups, inherited structure, role assignments, direct user permissions, and the user
            overview now sit on one route and the generated API client behind it.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <SummaryPill label="Users" value={userCount} />
          <SummaryPill label="Groups" value={groupCount} />
          <SummaryPill label="Roles" value={roleCount} />
          <SummaryPill label="Permissions" value={permissionCount} />
        </div>
      </div>
      <div className="text-muted-foreground mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em]">
        <a className="bg-secondary text-secondary-foreground border border-border px-3 py-2" href="#users">
          Users
        </a>
        <a className="bg-secondary text-secondary-foreground border border-border px-3 py-2" href="#groups">
          Groups
        </a>
        <a className="bg-secondary text-secondary-foreground border border-border px-3 py-2" href="#roles">
          Roles
        </a>
        <a
          className="bg-secondary text-secondary-foreground border border-border px-3 py-2"
          href="#permissions"
        >
          Permissions
        </a>
      </div>
    </section>
  );
}
