import type { ReactNode } from "react";
import { AdminSessionProvider } from "@/components/admin/AdminSessionProvider";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
};

export default AdminLayout;
