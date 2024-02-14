"use client"
import React from 'react'
import { UserButton } from '../custom/UserButton'
import { ModeToggle } from '../ui/theme-toggle'
import { Button } from '../ui/button'
import { MdOutlineAdd } from "react-icons/md";
import ToggleSideBar from './_components/ToggleSidebar'

export default function TopBar() {
    return (
        <nav className='w-full h-16 p-1 bg-white dark:bg-black flex items-center justify-end space-x-4 px-3 py-2'>
            
            <ToggleSideBar />
            <UserButton />
            <ModeToggle />
            <Button className='hidden md:flex font-semibold px-3 gap-0.5 items-center justify-center'><MdOutlineAdd className='text-xl font-bold' /> Create a New Organization</Button>
        </nav>
    )
}
