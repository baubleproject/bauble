"use client"
import useSidebarStore from '@/store/SideBarStore'
import React from 'react'
import SideBarContent from './SidebarContent'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useMobile } from '@/hooks/useMobile'


export default function MobileSideBar() {
    const { isMobileCollapsed, toggleMobileSidebarCollapse } = useSidebarStore()
    const isMobile = useMobile()
    const isOpen = !isMobileCollapsed

    if (!isMobile) {
        return null
    }

    return (
        <Sheet open={!isOpen} onOpenChange={toggleMobileSidebarCollapse} >
            <SheetContent side={"left"} className='w-72 block md:hidden'>
                <SideBarContent />
            </SheetContent>
        </Sheet>
    )
}



