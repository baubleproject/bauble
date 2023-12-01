import '@/app/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentication',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="bg-slate-900 h-full">{children}</div>;
}
