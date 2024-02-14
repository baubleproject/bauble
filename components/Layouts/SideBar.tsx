"use client"
import useSidebarStore from '@/store/SideBarStore'
import React from 'react'
import { Button } from '../ui/button'
import SideBarControl from './_components/SidebarWidthControl'

export default function SideBar() {
    const { isCollapsed, toggleSidebarCollapse } = useSidebarStore()
    //<Button onClick={toggleSidebarCollapse}>Toggle</Button>
    return (
        <aside className={`transition-width duration-300 ${isCollapsed ? "w-0 md:w-20" : "w-48"} bg-zinc-100 dark:bg-zinc-950 h-full md:p-2 md:py-3`}>
            <SideBarControl  />
        </aside>
    )
}

