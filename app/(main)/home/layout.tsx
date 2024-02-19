import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bauble :: Dashboard",
    description: "accelerate university projects",
}

export default function HomeMainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="h-full w-full">
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </section>
    );
}
