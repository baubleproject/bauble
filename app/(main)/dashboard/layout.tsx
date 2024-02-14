import DashboardLayout from "@/components/Layouts/DashboardLayout";
export default function DashboardMainLayout({
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

