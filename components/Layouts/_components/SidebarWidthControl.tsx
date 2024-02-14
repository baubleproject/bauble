"use client"
import useSidebarStore from '@/store/SideBarStore'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export default function SideBarControl() {
    const { isCollapsed, toggleSidebarCollapse } = useSidebarStore()
    return (
        <div className={`items-center hidden md:flex ${isCollapsed ? "justify-center" : "justify-between"} w-full`}>
            <div className=''></div>
            <div onClick={toggleSidebarCollapse} className='p-2 px-3 rounded-md bg-zinc-300 dark:bg-zinc-800 text-myPrimary dark:text-white cursor-pointer'>
                {isCollapsed ? (
                    <TbLayoutSidebarRightCollapse className='w-6 h-6' />
                ) : (
                    <TbLayoutSidebarLeftCollapse className='w-6 h-6' />
                )}
            </div>
        </div >
    )
}

