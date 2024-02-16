import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full w-full">
      <DashboardLayout>{children}</DashboardLayout>
    </section>
  );
}
