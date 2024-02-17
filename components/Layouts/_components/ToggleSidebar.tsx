"use client"
import useSidebarStore from '@/store/SideBarStore'
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export default function ToggleSideBar() {
    const { isMobileCollapsed, toggleMobileSidebarCollapse } = useSidebarStore()
    return (
        <div className={`items-center flex md:hidden`}>
            <div onClick={toggleMobileSidebarCollapse} className='p-2 rounded-md bg-zinc-300 dark:bg-zinc-950 text-myPrimary dark:text-white cursor-pointer'>
                {isMobileCollapsed ? (
                    <TbLayoutSidebarRightCollapse className='w-6 h-6' />
                ) : (
                    <TbLayoutSidebarLeftCollapse className='w-6 h-6' />
                )}
            </div>
        </div >
    )
}

