"use client"
import useSidebarStore from "@/store/SideBarStore";
import { BiHomeAlt2, BiCalendarAlt } from "react-icons/bi";
import { RiSettings6Line } from "react-icons/ri";
import NavigationItem from "./NavigationItem";

const links = [
    {
        name: "home",
        icon: BiHomeAlt2,
        description: "Go home"
    },
    {
        name: "calendar",
        icon: BiCalendarAlt,
        description: "Go to calendar"
    },
    {
        name: "settings",
        icon: RiSettings6Line,
        description: "Go to settings"
    },
]


export default function SidebarNavigation() {
    const { isCollapsed } = useSidebarStore()
    return (
        <div className=' w-full'>
            {
                isCollapsed || 1 ? (null) : (
                    <p className="font-semibold text-zinc-600 dark:text-zinc-300 mb-1.5 tracking-tight">Navigation</p>
                )
            }

            <div className="w-full h-full space-y-2 flex items-center flex-col"> {/*WARN: potential styling threat */}
                {
                    links.map((link, index) => (
                        <NavigationItem key={index} link={link} />
                    ))
                }
            </div>
        </div>
    )
}
