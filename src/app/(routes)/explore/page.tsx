import { NavBar } from '@/components/common/NavBar';

export default function Home() {
    return (
        <main className="min-h-screen dark:bg-main flex-col items-center">
            <NavBar />
            <main className='p-10'>
            <p>Explore</p>
            </main>
        </main>
    )
}
