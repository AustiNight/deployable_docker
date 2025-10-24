import { Navigate, useLocation } from "react-router-dom";

import { useAuthStore } from "@/state/auth-store";

import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center text-muted-foreground">
        Checking access.
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};


