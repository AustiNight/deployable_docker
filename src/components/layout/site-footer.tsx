import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useContentStore } from "@/state/content-store";

export const SiteFooter = () => {
  const navigation = useContentStore((state) => state.content.navigation);
  const brand = useContentStore((state) => state.content.brand);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-md flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <img src={brand.logoUrl} alt="" className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-semibold">{brand.name}</span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{brand.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>(c) {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <Button variant="link" size="sm" className="p-0 text-xs" asChild>
            <Link to="/dashboard">Launch dashboard</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};
