import type { Metadata } from "next";
import { ModeToggle } from "@/components/ui/theme-toggle";

export const metadata: Metadata = {
    title: "Bauble | Dashboard",
};

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full dark:bg-black bg-slate-100 space-y-6">
            <ModeToggle />
            <main className="pt-56 pb-20 bg-transparent">{children}</main>
        </div>
    );
}
