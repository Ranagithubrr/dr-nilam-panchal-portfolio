"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminBanner from "@/components/admin/AdminBanner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMainContent from "@/components/admin/AdminMainContent";
import type { SiteContent } from "@/lib/siteContent";

const AdminPanel = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [sessionRes, contentRes] = await Promise.all([
          fetch("/api/admin/session"),
          fetch("/api/admin/content", { cache: "no-store" }),
        ]);
        const session = await sessionRes.json();
        const contentData = await contentRes.json();
        setIsAuthenticated(session.authenticated);
        setContent(contentData);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || "Login failed.");
      return;
    }

    setIsAuthenticated(true);
    setUsername("");
    setPassword("");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || "Failed to save content.");
      setIsSaving(false);
      return;
    }

    const saved = (await response.json()) as SiteContent;
    setContent(saved);
    setMessage("Changes saved.");
    setIsSaving(false);
  };

  const uploadImage = async (file: File, field: "bannerImageUrl" | "profileImageUrl") => {
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || "Upload failed.");
      return;
    }

    const payload = await response.json();
    setContent((prev) => (prev ? { ...prev, [field]: payload.url } : prev));
    setMessage("Image uploaded. Save to apply.");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center text-sm text-[#4c5f66]">
        Loading admin panel...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] bg-[radial-gradient(circle_at_top,#f6f1e7_0%,#f3ede1_35%,#ebe4d6_65%,#e2d9c7_100%)]">
        <div className="mx-auto max-w-md px-6 py-16">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur">
            <h1 className="text-2xl font-semibold text-[#17323D]">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-[#4c5f66]">
              Use your admin credentials to edit the homepage content.
            </p>
            {error && (
              <div className="mt-4 rounded-2xl bg-red-50 px-4 py-2 text-xs text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                className="w-full rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm text-[#2d3b41] outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm text-[#2d3b41] outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#17323D] py-2 text-sm font-semibold text-white"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center text-sm text-[#4c5f66]">
        No content loaded.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f6f1e7_0%,#f3ede1_35%,#ebe4d6_65%,#e2d9c7_100%)]">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between pt-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#17323D]">Admin</h1>
            <p className="text-sm text-[#4c5f66]">
              Edit the homepage content and save changes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold text-[#17323D]"
            >
              Log out
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-[#17323D] px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {(error || message) && (
          <div className="mt-4 rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-xs text-[#17323D]">
            {error || message}
          </div>
        )}

        <AdminBanner
          bannerImageUrl={content.bannerImageUrl}
          onUpload={(file) => uploadImage(file, "bannerImageUrl")}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <AdminSidebar
            profileImageUrl={content.profileImageUrl}
            onUpload={(file) => uploadImage(file, "profileImageUrl")}
          />
          <AdminMainContent content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
