import type { Metadata } from "next";
import { Navbar } from "./_components/Navbar";
import { Advert } from "./_components/Advert";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
    title: "Bauble | Task Management",
};

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full dark:bg-black bg-slate-100">
            <Navbar />
            <Advert />
            <main className="pt-56 pb-20 bg-transparent">{children}</main>
            <Footer />
        </div>
    );
}
