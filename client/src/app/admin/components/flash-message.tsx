export function FlashMessage({
  status,
  message,
}: {
  status?: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`border px-4 py-3 text-sm ${
        status === 'error'
          ? 'border-border bg-secondary text-foreground'
          : 'border-border bg-primary text-primary-foreground'
      }`}
    >
      {message}
    </div>
  );
}
