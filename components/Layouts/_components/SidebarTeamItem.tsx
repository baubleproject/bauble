"use client"
import React, { useEffect, useState } from 'react'
import type { Team } from '@prisma/client'
import { cn, formatDate, truncateText } from '@/lib/utils'
import useSidebarStore from '@/store/SideBarStore'
import { useRouter } from "next/navigation"


interface Props {
    team: Team
    classname: string
}

export default function SidebarTeamItem({ team, classname }: Props) {
    const [isVisible, setIsVisible] = useState(false); // State to control visibility
    const { isCollapsed } = useSidebarStore()
    const router = useRouter()

    // useEffect(() => {
    //     // Delay setting visibility to true after a short delay
    //     const timeout = setTimeout(() => {
    //         setIsVisible(true);
    //     }, 1000); // Adjust the delay time as needed
    //     return () => clearTimeout(timeout);
    // }, []);

    useEffect(() => {
        if (!isCollapsed) {
            setIsVisible(false)
            const timeout = setTimeout(() => {
                setIsVisible(true);
            }, 300); // Adjust the delay time as needed
            return () => clearTimeout(timeout);
        }

        if (isCollapsed) {
            setIsVisible(false)
        }
    }, [isCollapsed])

    if (!team) {
        return null; // Render nothing while loading or if profile is null
    }

    const routeToProfile = () => {
        router.push(`/dashboard/team/${team.id}`)
    }


    return (
        <div onClick={routeToProfile} className={cn(`p-1.5 justify-center items-center dark:bg-zinc-900 dark:hover:bg-zinc-800 bg-zinc-300 hover:bg-zinc-400 transition-colors duration-300 rounded-md cursor-pointer grid ${isCollapsed ? ("grid-cols-1") : ("grid-cols-3")}`, classname)}>
            <div className="rounded-full w-11 h-11 bg-center bg-cover bg-no-repeat col-span-1" style={{ backgroundImage: `url(${team?.imageUrl})` }}></div>
            {
                isVisible ? (
                    <div className={`${isCollapsed && !isVisible ? ("hidden") : ("col-span-2 flex flex-col  items-center justify-start")}`}>
                        <p className='text-sm text-start w-full font-semibold'>{truncateText(team.name, 15)}</p>
                        <p className='text-xs font-extralight w-full'>{truncateText(formatDate(team.createdAt), 20)}</p>
                    </div>
                ) : (null)
            }
        </div>
    )
}
