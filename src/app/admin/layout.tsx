import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinic Admin Panel",
  description: "Manage website content for the clinic.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
