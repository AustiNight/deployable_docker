import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/state/auth-store";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({
    defaultValues: { email: "", password: "" },
  });
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const redirectTo = (location.state as { from?: string })?.from ?? "/dashboard";
      void navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, location.state]);

  const submit = handleSubmit(async ({ email, password }) => {
    setAuthError(null);
    const success = await login(email, password);
    if (!success) {
      setAuthError("Incorrect credentials. Try admin@moldableclay.dev / moldable or password demo.");
      return;
    }
    void navigate("/dashboard", { replace: true });
  });

  if (loading) {
    return <div className="flex h-[40vh] items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border border-border/70">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>Sign in to access the dashboard controls.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => {
              void submit(event);
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /.+@.+\..+/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 4, message: "At least 4 characters" },
                })}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            {authError && <p className="text-sm text-destructive">{authError}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-xs text-muted-foreground">Demo access: admin@moldableclay.dev / moldable or use password demo.</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
