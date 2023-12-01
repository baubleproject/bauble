import { ModeToggle } from '@/components/custom/themeToggle'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { NavBar } from '@/components/common/NavBar';
import { isSignedIn } from '@/lib/ClerkAuthTools';

export default async function Home() {
    return (
        <main className="min-h-screen dark:bg-slate-400 flex-col items-center">
            <NavBar />
            <main className='p-10'>
           </main>
        </main>
    )
}
