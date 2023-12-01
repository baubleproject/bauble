import { ModeToggle } from '@/components/custom/themeToggle'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <main className="min-h-screen dark:bg-main flex-col items-center justify-between p-24">
            <p>Hello world</p>
           <ModeToggle /> 
           <UserButton afterSignOutUrl="/"/>
       </main>
    )
}
