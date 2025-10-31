import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/state/auth-store";
import { useContentStore } from "@/state/content-store";
import { cn } from "@/utils/cn";

const activeLinkClass =
  "text-foreground after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:rounded-full after:bg-primary";

export const SiteHeader = () => {
  const navigation = useContentStore((state) => state.content.navigation);
  const brand = useContentStore((state) => state.content.brand);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const desktopLinks = navigation.filter((item) => item.path !== "/login");
  const loginLink = navigation.find((item) => item.path === "/login");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <img
              src={brand.logoUrl}
              alt={`${brand.name} logo`}
              className="h-6 w-6"
            />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold text-foreground">
              {brand.name}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {brand.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {desktopLinks.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-medium text-muted-foreground transition hover:text-foreground",
                  isActive && activeLinkClass,
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button asChild size="sm">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            loginLink && (
              <Button asChild size="sm" variant="secondary">
                <Link to={loginLink.path}>{loginLink.label}</Link>
              </Button>
            )
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 max-w-sm rounded-xl border-border p-6">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-base font-medium text-muted-foreground transition hover:text-foreground",
                        isActive && "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                {isAuthenticated ? (
                  <Button asChild className="mt-2">
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                ) : null}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

