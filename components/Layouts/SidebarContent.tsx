"use client"
import React from 'react'
import SideBarControl from './_components/SidebarWidthControl'
import { Separator } from '../ui/separator'
import UserSidebarButton from './_components/UserSidebarButton'

export default function SideBarContent() {
    return (
        <div className='w-full h-full bg-transparent md:p-2 md:py-3'>
            <SideBarControl />
            <Separator className='my-4' />
            <UserSidebarButton />
        </div>
    )
}



