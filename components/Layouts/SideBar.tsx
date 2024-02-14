"use client"
import useSidebarStore from '@/store/SideBarStore'
import React from 'react'
import SideBarContent from './SidebarContent'

export default function SideBar() {
    const { isCollapsed } = useSidebarStore()
    //<Button onClick={toggleSidebarCollapse}>Toggle</Button>
    return (
        <aside className={`hidden md:block transition-width duration-300 ${isCollapsed ? "w-0 md:w-20" : "w-52"} bg-zinc-100 dark:bg-zinc-950 h-full `}>
            <SideBarContent />
        </aside>
    )
}



