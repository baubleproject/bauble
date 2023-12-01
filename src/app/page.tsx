import { ModeToggle } from '@/components/custom/themeToggle'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { NavBar } from '@/components/common/NavBar';

export default function Home() {
    return (
        <main className="min-h-screen dark:bg-main flex-col items-center">
            <NavBar />
            <main className='p-12'>
                <p>Hello world</p>
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </main>
        </main>
    )
}
