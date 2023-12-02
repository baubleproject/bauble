import { NavBar } from '@/components/common/NavBar';
import { Button } from '@/components/ui/button';
import { initialUserCreation } from '@/lib/ClerkAuthTools';
import { FaBell } from "react-icons/fa6";

export default async function Home() {
    const profile = await initialUserCreation()
    if (!profile) {
        return null;
    }
    return (
        <main className="min-h-screen flex flex-col items-center bg-slate-200">
            <section className='h-64 w-full bg-contain bg-center relative rounded-b-[2rem]'
                style={{
                    backgroundImage: `url(${profile.headerImageUrl})`
                }}>

                <div className='-bottom-10 md:-bottom-12 lg:-bottom-16 lg:left-40 md:left-1/2 absolute w-24 h-24 md:h-28 md:w-28 lg:h-40 lg:w-40 rounded-full bg-contain bg-center border-white border-4'
                    style={{
                        backgroundImage: `url(${profile.profileImageUrl})`
                    }}
                >

                </div>
            </section>
            <div className='w-full h-52 flex flex-col lg:flex-row'>
                <div className='h-full lg:w-2/5 flex flex-col justify-center items-center'>
                    <div className='text-center lg:text-start'>
                        <p className='-tracking-wider font-bold text-3xl'>{profile.name}</p>
                        <p className='-tracking-wide font-light'>{profile.email}</p>
                        <p className='-tracking-wide text-base'>{profile.bio ? profile.bio : "No bio"}</p>
                        <p className='text-xs font-light -tracking-wider'>Accocunt created at {}</p>
                    </div>
                </div>
                <div className='flex-1 flex justify-end'>
                    <div className='lg:m-8 flex gap-2'>
                        <Button className=''>Edit Profile</Button>
                        <Button>
                            <FaBell />
                        </Button>
                        <Button>Follow</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
