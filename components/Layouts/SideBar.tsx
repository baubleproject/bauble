"use client"
import useSidebarStore from '@/store/SideBarStore'
import React from 'react'
import { Button } from '../ui/button'

export default function SideBar() {
    const { isCollapsed, toggleSidebarCollapse } = useSidebarStore()
    return (
        <aside className={`transition-width duration-300 ${isCollapsed ? "w-28" : "w-52"} bg-zinc-900 h-full`}>
            <Button onClick={toggleSidebarCollapse}>Toggle</Button>
        </aside>
    )
}

