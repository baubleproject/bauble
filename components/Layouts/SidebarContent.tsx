"use client"
import React from 'react'
import SideBarControl from './_components/SidebarWidthControl'
import { Separator } from '../ui/separator'
import UserSidebarButton from './_components/UserSidebarButton'
import SidebarTeamWrapper from './_components/SidebarTeamWrapper'
import SidebarNavigation from './_components/SidebarNavigation'

export default function SideBarContent() {
    return (
        <div className='w-full h-full bg-transparent md:p-2 md:py-3'>
            <SideBarControl />
            <Separator className='my-3' />
            <SidebarNavigation />
            <Separator className='my-3' />
            <SidebarTeamWrapper />
            <Separator className='my-3' />
            <UserSidebarButton />
        </div>
    )
}



