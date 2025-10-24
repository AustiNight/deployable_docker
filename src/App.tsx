import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "@/components/layout/app-layout";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { useAuthStore } from "@/state/auth-store";
import { useContentStore } from "@/state/content-store";

const LoadingScreen = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background text-muted-foreground">
    <span className="text-sm uppercase tracking-widest text-muted-foreground/80">Loading</span>
    <span className="font-medium">Preparing moldable clay workspace…</span>
  </div>
);

const App = () => {
  const hydrateContent = useContentStore((state) => state.hydrate);
  const contentLoaded = useContentStore((state) => state.loaded);
  const hydrateAuth = useAuthStore((state) => state.hydrate);
  const authLoading = useAuthStore((state) => state.loading);

  useEffect(() => {
    void hydrateContent();
    void hydrateAuth();
  }, [hydrateContent, hydrateAuth]);

  if (!contentLoaded || authLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
