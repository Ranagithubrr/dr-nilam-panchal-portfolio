"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/lib/siteContentTypes";

type AdminSessionContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  siteContent: SiteContent | null;
  setSiteContent: (content: SiteContent) => void;
  refreshSession: (options?: { showLoader?: boolean }) => Promise<void>;
};

const AdminSessionContext = createContext<AdminSessionContextValue | null>(null);

export const AdminSessionProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const refreshSession = useCallback(
    async ({ showLoader = false }: { showLoader?: boolean } = {}) => {
      if (showLoader) {
        setIsLoading(true);
      }
      try {
        const [sessionRes, contentRes] = await Promise.all([
          fetch("/api/admin/session", { cache: "no-store" }),
          fetch("/api/admin/content", { cache: "no-store" }),
        ]);
        const session = await sessionRes.json();
        setIsAuthenticated(Boolean(session.authenticated));

        if (contentRes.ok) {
          const contentData = (await contentRes.json()) as SiteContent;
          setSiteContent(contentData);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setHasLoaded(true);
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!hasLoaded) {
      refreshSession({ showLoader: true });
    }
  }, [hasLoaded, refreshSession]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      siteContent,
      setSiteContent,
      refreshSession,
    }),
    [isAuthenticated, isLoading, siteContent, refreshSession]
  );

  return (
    <AdminSessionContext.Provider value={value}>
      {children}
    </AdminSessionContext.Provider>
  );
};

export const useAdminSession = () => {
  const context = useContext(AdminSessionContext);
  if (!context) {
    throw new Error("useAdminSession must be used within AdminSessionProvider");
  }
  return context;
};
