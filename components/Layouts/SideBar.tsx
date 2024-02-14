"use client"
import useSidebarStore from '@/store/SideBarStore'
import React from 'react'
import { Button } from '../ui/button'
import SideBarControl from './_components/SidebarWidthControl'
import { Separator } from '../ui/separator'
import UserSidebarButton from './_components/UserSidebarButton'

export default function SideBar() {
    const { isCollapsed, toggleSidebarCollapse } = useSidebarStore()
    //<Button onClick={toggleSidebarCollapse}>Toggle</Button>
    return (
        <aside className={`transition-width duration-300 ${isCollapsed ? "w-0 md:w-20" : "w-52"} bg-zinc-100 dark:bg-zinc-950 h-full md:p-2 md:py-3`}>
            <div className='bg-transparent w-full h-full'>
                <SideBarControl />
                <Separator className='my-4' />
                <UserSidebarButton />
            </div>
        </aside>
    )
}

