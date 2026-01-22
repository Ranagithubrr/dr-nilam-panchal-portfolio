"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AdminLoginPanel from "@/components/admin/AdminLoginPanel";
import { useAdminSession } from "@/components/admin/AdminSessionProvider";

const AdminLoginPage = () => {
  const router = useRouter();
  const { refreshSession } = useAdminSession();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

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

    await refreshSession({ showLoader: true });
    router.replace("/admin");
  };

  return (
    <AdminLoginPanel
      subtitle="Use your admin credentials to edit the website content."
      username={username}
      password={password}
      error={error}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
    />
  );
};

export default AdminLoginPage;
