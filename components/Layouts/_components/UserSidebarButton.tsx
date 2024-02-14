//
// import { UserButton } from '@/components/custom/UserButton'
// import useSidebarStore from '@/store/SideBarStore'
// import React from 'react'
// import { } from "@clerk/nextjs"
// import { initialProfile } from "@/actions/InitialProfile";
// import { useEffect, useState } from "react";
// import { Profile } from "@prisma/client";
// import { useRouter } from 'next/navigation'
// import { truncateText } from '@/lib/utils';
//
// export default function UserSidebarButton() {
//     const { isCollapsed } = useSidebarStore()
//
//
//     const [profile, setProfile] = useState<Profile | null>(null);
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const userProfile = await initialProfile();
//                 setProfile(userProfile);
//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//             }
//         };
//         fetchProfile();
//     }, []);
//
//     if (!profile) {
//         return null
//     }
//
//
//     return (
//         <div className='w-full flex items-center justify-center gap-2 px-0 cursor-pointer bg-zinc-300 dark:bg-zinc-900 hover:bg-zinc-400 dark:hover:bg-zinc-800 transition-colors duration-300 py-1.5 rounded-md'>
//             <div className="rounded-full w-10 h-10 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${profile?.imageUrl})` }}></div>
//             <div className={`${isCollapsed ? "hidden" : "block"} flex flex-col gap-1`}>
//                 <p className='text-xs font-semibold'>{truncateText(`${profile?.lastname}${" "}${profile?.firstname}`, 15)}</p>
//                 <p className='text-xs font-light'>{truncateText(profile?.email!, 14)}</p>
//             </div>
//         </div>
//     )
// }

import useSidebarStore from '@/store/SideBarStore'
import React, { useEffect, useState } from 'react'
import { initialProfile } from "@/actions/InitialProfile";
import { Profile } from "@prisma/client";
import { truncateText } from '@/lib/utils';
import { useRouter } from "next/navigation"

export default function UserSidebarButton() {
    const router = useRouter()
    const { isCollapsed } = useSidebarStore();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false); // State to control visibility

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await initialProfile();
                setProfile(userProfile);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false); // Set loading to false when fetch is complete
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        // Delay setting visibility to true after a short delay
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // Adjust the delay time as needed
        return () => clearTimeout(timeout);
    }, []);

    if (loading || !profile) {
        return null; // Render nothing while loading or if profile is null
    }

    const routeToProfile = () => {
        router.push(`/dashboard/profile/${profile.id}`)
    }

    return (
        <div onClick={routeToProfile} className='w-full flex items-center justify-center gap-2 px-0 cursor-pointer bg-zinc-300 dark:bg-zinc-900 hover:bg-zinc-400 dark:hover:bg-zinc-800 transition-colors duration-300 py-1.5 rounded-md'>
            <div className="rounded-full w-10 h-10 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${profile?.imageUrl})` }}></div>
            <div className={`${isVisible && !isCollapsed ? "block" : "hidden"} flex flex-col gap-1 transition-opacity duration-300`}>
                <p className='text-xs font-semibold'>{truncateText(`${profile?.lastname}${" "}${profile?.firstname}`, 18)}</p>
                <p className='text-xs font-light'>{truncateText(profile?.email!, 18)}</p>
            </div>
        </div>
    )
}

