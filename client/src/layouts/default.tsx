export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="relative flex h-full flex-1 flex-col justify-center overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>

      <footer className="hidden w-full shrink-0 items-center justify-center self-end px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:flex">
        <a
          className="flex items-center gap-1 text-current"
          href="https://github.com/chalmers-choir"
          title="webmästariets github"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Chalmers Sångkörs Webbmästeri</p>
        </a>
      </footer>
    </div>
  );
}
