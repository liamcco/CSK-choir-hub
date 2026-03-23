import { submitAdminMutationAction } from '../actions';

export function SummaryPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-secondary text-secondary-foreground flex min-w-28 flex-col border border-border px-3 py-2">
      <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      <span className="mt-1 text-lg">{value}</span>
    </div>
  );
}

export function SectionHeader({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div id={id} className="space-y-2">
      <p className="text-primary text-[11px] uppercase tracking-[0.32em]">{title}</p>
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <h2 className="text-foreground text-2xl">{title}</h2>
        <p className="text-muted-foreground max-w-2xl text-sm">{description}</p>
      </div>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <p className="text-muted-foreground text-xs">{message}</p>;
}

export function TagList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <EmptyState message="None yet." />;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="bg-secondary text-secondary-foreground border border-border px-2 py-1 text-[11px]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function MutationForm({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form action={submitAdminMutationAction} className={className}>
      {children}
    </form>
  );
}
