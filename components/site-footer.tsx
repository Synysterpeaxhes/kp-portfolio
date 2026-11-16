import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href={`mailto:${site.email}`} className="w-fit hover:text-foreground">
          {site.email}
        </a>
      </div>
    </footer>
  );
}
