import { NavBar } from '@/components/common/NavBar';
import { initialUserCreation } from '@/lib/ClerkAuthTools';

export default async function Home() {
    const profile = await initialUserCreation()
    if(!profile){
        return null;
    }
    return (
        <main className="min-h-screen dark:bg-main flex-col items-center">
            <main className='p-12'>
                <p>Welcome {profile.name}</p>
            </main>
        </main>
    )
}
