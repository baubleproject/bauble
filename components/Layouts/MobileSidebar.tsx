"use client"
import useSidebarStore from '@/store/SideBarStore'
import React, { useEffect } from 'react'
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

    if (!isMobile) {
        return null
    }

    //useEffect(() => {},[isMobileCollapsed])

    return (
        <Sheet open={!isMobileCollapsed} onOpenChange={toggleMobileSidebarCollapse} >
            <SheetContent side={"left"} className='w-64 block md:hidden'>
                <SideBarContent />
            </SheetContent>
        </Sheet>
    )
}



