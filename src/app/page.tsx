import { ModeToggle } from '@/components/custom/themeToggle'
import Image from 'next/image'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>Hello world</p>
           <ModeToggle /> 
       </main>
    )
}
