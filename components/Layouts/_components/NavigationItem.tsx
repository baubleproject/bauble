"use client"
import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import useSidebarStore from '@/store/SideBarStore'
import { useRouter } from "next/navigation"
import { capitalizeFirstLetter, cn, truncateText } from '@/lib/utils'

interface Link {
    name: string,
    icon: IconType,
    description: string
}

interface Props {
    link: Link
    classname?: string
}

export default function NavigationItem({ link, classname }: Props) {
    const [isVisible, setIsVisible] = useState(false); // State to control visibility
    const { isCollapsed } = useSidebarStore()
    const router = useRouter()


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

    if (!link) {
        return null; // Render nothing while loading or if profile is null
    }

    const routeToProfile = () => {
        router.push(`/${link.name}`)
    }


    return (
        <div onClick={routeToProfile} className={cn(`py-2 justify-center items-center dark:bg-zinc-900 dark:hover:bg-zinc-800 bg-zinc-300 hover:bg-zinc-400 transition-colors duration-300 rounded-md cursor-pointer ${isCollapsed ? ("w-5/6 flex") : ("w-full px-2 grid grid-cols-6")}`, classname)}>
            <link.icon className='w-5 h-5 col-span-1' />
            {
                isVisible ? (
                    <div className={`${isCollapsed && !isVisible ? ("hidden") : ("col-span-5 flex flex-col  items-center  justify-start")}`}>
                        <p className='text-xs text-start w-full font-light'>{capitalizeFirstLetter(link.name)}</p>
                    </div>
                ) : (null)
            }
        </div>

    )
}